<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'pt-br'
  }
})

const title = 'Home Chat'
const description = 'O lar da conversa!'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/favicon.ico',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary_large_image'
})
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <UApp>
    <UHeader
      :toggle="false"
    >
      <template #left>
        <NuxtLink
          class="flex items-center gap-2"
          to="/"
        >
          <LogoTexto
            titulo="Home Chat"
            descricao="O lar da conversa!"
            foto="favicon.png"
          />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          v-if="$route.path === '/chat'"
          icon="solar:logout-3-bold-duotone"
          aria-label="Logout"
          color="neutral"
          variant="ghost"
          @click="logout"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
