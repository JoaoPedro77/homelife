/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conversa, Perfil, Mensagem } from '~/types'

export const useConversas = () => {
  const supabase = useSupabaseClient()
  const { currentUser } = useAuth()
  const listaConversas = ref<Conversa[]>([])
  const carregando = ref(false)

  const carregarConversas = async () => {
    if (!currentUser.value) return
    carregando.value = true

    try {
      const me = currentUser.value.id

      const { data: conversasData, error: conversasError } = await (supabase.from('conversas') as any)
        .select('*')
        .or(`user1_id.eq.${me},user2_id.eq.${me}`)
        .order('criado_em', { ascending: false })

      if (conversasError) throw conversasError
      if (!conversasData || conversasData.length === 0) {
        listaConversas.value = []
        return
      }
      const listOutrosIds = conversasData.map((c: any) => c.user1_id === me ? c.user2_id : c.user1_id)

      const { data: perfisData, error: perfisError } = await (supabase.from('perfis') as any)
        .select('*')
        .in('id', listOutrosIds)

      if (perfisError) throw perfisError

      const perfisMap = new Map<string, Perfil>()
      perfisData?.forEach((p: any) => {
        const perfilComAvatar = {
          ...p,
          avatar_url: p.avatar_url
        }
        perfisMap.set(p.id, perfilComAvatar)
      })

      const conversasIds = conversasData.map((c: any) => c.id)
      const { data: mensagensData, error: mensagensError } = await (supabase.from('mensagens') as any)
        .select('*')
        .in('id_conversa', conversasIds)
        .order('id', { ascending: false })

      if (mensagensError) throw mensagensError

      const ultimasMensagensMap = new Map<number, Mensagem>()
      mensagensData?.forEach((m: any) => {
        if (!ultimasMensagensMap.has(m.id_conversa)) {
          ultimasMensagensMap.set(m.id_conversa, m)
        }
      })

      listaConversas.value = conversasData.map((c: any) => {
        const outroId = c.user1_id === me ? c.user2_id : c.user1_id

        const outro = perfisMap.get(outroId)

        const ultimaMsg = ultimasMensagensMap.get(c.id)

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
      const [u1, u2] = [me, outroUsuarioId].sort()

      const { data, error } = await (supabase.from('conversas') as any)
        .select('id')
        .eq('user1_id', u1)
        .eq('user2_id', u2)
        .maybeSingle()

      if (error) throw error

      if (data) {
        return data.id
      }

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
    buscarOuCriarConversa
  }
}
