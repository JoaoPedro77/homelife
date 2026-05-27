/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Postagem, Perfil } from '~/types'

export const usePerfil = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const perfil = ref<Perfil | null>(null)
  const postagens = ref<Postagem[]>([])
  const carregandoPerfil = ref(false)
  const carregandoPostagens = ref(false)

  // Obtém os dados do usuário atualmente logado (antigo useUser)
  const currentUser = computed<Perfil | null>(() => {
    if (!user.value) return null
    return {
      id: user.value.id || (user.value as any).sub,
      nome: user.value.user_metadata?.display_name
    }
  })

  const carregarPerfil = async (targetId: string) => {
    carregandoPerfil.value = true
    try {
      // Busca o perfil real na tabela 'perfis'
      const { data, error } = await (supabase.from('perfis') as any)
        .select('*')
        .eq('id', targetId)
        .single()

      if (data && !error) {
        perfil.value = {
          id: data.id,
          nome: data.nome,
          avatar_url: data.avatar_url
        }
      } else {
        if (error) {
          console.warn('Nota: Perfil não encontrado no banco (ou bloqueado por RLS). Erro:', error.message)
        }
        perfil.value = null
      }
    } catch (e) {
      console.error('Erro de exceção ao carregar perfil:', e)
      perfil.value = null
    } finally {
      carregandoPerfil.value = false
    }
  }

  const carregarPostagens = async (targetId: string) => {
    carregandoPostagens.value = true
    try {
      const { data, error } = await (supabase.from('postagens') as any)
        .select('*, perfis(*)')
        .eq('user_id', targetId)
        .order('id', { ascending: false })

      if (data && !error) {
        postagens.value = data.map((p: any) => ({
          id: p.id,
          user_id: p.user_id,
          conteudo: p.conteudo,
          imagem_url: p.imagem_url,
          criado_em: p.criado_em,
          perfil: p.perfis
            ? {
                id: p.perfis.id,
                nome: p.perfis.nome,
                avatar_url: p.perfis.avatar_url
              }
            : undefined
        }))
      } else {
        postagens.value = []
      }
    } catch (e) {
      console.error('Erro ao carregar postagens:', e)
      postagens.value = []
    } finally {
      carregandoPostagens.value = false
    }
  }

  return {
    perfil,
    postagens,
    carregandoPerfil,
    carregandoPostagens,
    carregarPerfil,
    carregarPostagens,
    currentUser,
    supabaseUser: user
  }
}
