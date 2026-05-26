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

const title = 'Home Life'
const description = 'O lar da sua vida!'

const { supabaseUser: user, currentUser } = useUser()
const supabase = useSupabaseClient()

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/favicon.ico',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary_large_image'
})

const nomeUsuario = computed(() => currentUser.value?.nome ?? 'Usuário')

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
            titulo="Home Life"
            descricao="O lar da sua vida!"
            foto="favicon.png"
          />
        </NuxtLink>
      </template>

      <template #right>
        <span
          v-if="user"
          class="text-sm font-medium text-(--ui-text-muted) hidden sm:inline"
        >
          {{ nomeUsuario }}
        </span>

        <UColorModeButton />

        <UButton
          v-if="user"
          icon="solar:logout-3-bold-duotone"
          aria-label="Logout"
          color="neutral"
          variant="ghost"
          @click="logout"
        />
      </template>
    </UHeader>

    <UMain class="h-[calc(100vh-64px)] overflow-hidden">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
