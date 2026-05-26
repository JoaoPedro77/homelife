export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path === '/initialPage') {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/initialPage')
  }
})
