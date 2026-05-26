import type { User } from '~/types'

export const useUser = () => {
  const supabaseUser = useSupabaseUser()

  const currentUser = computed<User | null>(() => {
    if (!supabaseUser.value) return null
    return {
      id: supabaseUser.value.id,
      nome: supabaseUser.value.user_metadata?.display_name ?? supabaseUser.value.email?.split('@')[0] ?? 'Usuário'
    }
  })

  return {
    supabaseUser,
    currentUser
  }
}
