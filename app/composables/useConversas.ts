/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conversa, Perfil, Mensagem } from '~/types'
import { usePerfil } from './usePerfil'

export const useConversas = () => {
  const supabase = useSupabaseClient()
  const { currentUser, obterAvatarUrl } = usePerfil()
  const listaConversas = ref<Conversa[]>([])
  const carregando = ref(false)

  const carregarConversas = async () => {
    if (!currentUser.value) return
    carregando.value = true

    try {
      const me = currentUser.value.id

      // 1. Busca todas as conversas em que eu sou participante
      const { data: conversasData, error: conversasError } = await (supabase.from('conversas') as any)
        .select('*')
        .or(`user1_id.eq.${me},user2_id.eq.${me}`)
        .order('criado_em', { ascending: false })

      if (conversasError) throw conversasError
      if (!conversasData || conversasData.length === 0) {
        listaConversas.value = []
        return
      }

      // 2. Extrai IDs dos outros participantes para buscar os perfis de uma vez só
      const listOutrosIds = conversasData.map((c: any) => c.user1_id === me ? c.user2_id : c.user1_id)

      const { data: perfisData, error: perfisError } = await (supabase.from('perfis') as any)
        .select('*')
        .in('id', listOutrosIds)

      if (perfisError) throw perfisError

      // Mapeia perfis indexando por ID para busca rápida
      const perfisMap = new Map<string, Perfil>()
      perfisData?.forEach((p: any) => {
        const perfilComAvatar = {
          ...p,
          avatar_url: obterAvatarUrl(p)
        }
        perfisMap.set(p.id, perfilComAvatar)
      })

      // 3. Busca a última mensagem de todas as conversas ativas
      const conversasIds = conversasData.map((c: any) => c.id)
      const { data: mensagensData, error: mensagensError } = await (supabase.from('mensagens') as any)
        .select('*')
        .in('id_conversa', conversasIds)
        .order('id', { ascending: false })

      if (mensagensError) throw mensagensError

      // Agrupa a mensagem mais recente de cada conversa
      const ultimasMensagensMap = new Map<number, Mensagem>()
      mensagensData?.forEach((m: any) => {
        if (!ultimasMensagensMap.has(m.id_conversa)) {
          ultimasMensagensMap.set(m.id_conversa, m)
        }
      })

      // 4. Monta o objeto final de Conversa esperado pelo frontend
      listaConversas.value = conversasData.map((c: any) => {
        const outroId = c.user1_id === me ? c.user2_id : c.user1_id

        // Se o perfil do outro não existir ainda no banco, cria um perfil padrão provisório
        const outro = perfisMap.get(outroId) || {
          id: outroId,
          nome: 'Usuário',
          avatar_url: `https://ui-avatars.com/api/?name=U&background=random`
        }

        const ultimaMsg = ultimasMensagensMap.get(c.id)

        // Se for criado_em, converte o timestamp em hora legível
        if (ultimaMsg && ultimaMsg.criado_em) {
          const dataMsg = new Date(ultimaMsg.criado_em)
          ultimaMsg.criado_em = dataMsg.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }

        return {
          id: c.id,
          user1_id: c.user1_id,
          user2_id: c.user2_id,
          criado_em: c.criado_em,
          outro_participante: outro,
          ultima_mensagem: ultimaMsg
        }
      })
    } catch (e) {
      console.error('Erro ao carregar conversas:', e)
    } finally {
      carregando.value = false
    }
  }

  const buscarOuCriarConversa = async (outroUsuarioId: string): Promise<number | null> => {
    if (!currentUser.value) return null
    const me = currentUser.value.id

    try {
      // Ordena alfabeticamente para garantir a unicidade no banco (regra UNIQUE)
      const [u1, u2] = [me, outroUsuarioId].sort()

      // 1. Tenta buscar se a conversa já existe
      const { data, error } = await (supabase.from('conversas') as any)
        .select('id')
        .eq('user1_id', u1)
        .eq('user2_id', u2)
        .maybeSingle()

      if (error) throw error

      if (data) {
        return data.id
      }

      // 2. Se não existir, cria a nova conversa
      const { data: nova, error: insertError } = await (supabase.from('conversas') as any)
        .insert({ user1_id: u1, user2_id: u2 })
        .select('id')
        .single()

      if (insertError) throw insertError

      return nova.id
    } catch (e) {
      console.error('Erro ao buscar/criar conversa:', e)
      return null
    }
  }

  return {
    listaConversas,
    carregando,
    carregarConversas,
    buscarOuCriarConversa,
    obterAvatarUrl
  }
}
