/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Perfil } from '~/types'

export const useAuth = () => {
  const user = useSupabaseUser()

  const currentUser = computed<Perfil | null>(() => {
    if (!user.value) return null
    return {
      id: user.value.id || (user.value as any).sub,
      nome: user.value.user_metadata?.display_name
    }
  })

  return {
    currentUser,
    supabaseUser: user
  }
}
