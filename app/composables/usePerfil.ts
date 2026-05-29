/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Perfil } from '~/types'

export const usePerfil = () => {
  const supabase = useSupabaseClient()

  const perfil = ref<Perfil | null>(null)
  const carregandoPerfil = ref(false)

  const carregarPerfil = async (targetId: string) => {
    carregandoPerfil.value = true
    try {
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

  return {
    perfil,
    carregandoPerfil,
    carregarPerfil
  }
}
