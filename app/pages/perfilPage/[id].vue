<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useConversas } from '~/composables/useConversas'
import { usePerfil } from '~/composables/usePerfil'

const route = useRoute()
const user = useSupabaseUser()

const { buscarOuCriarConversa } = useConversas()
const {
  perfil,
  postagens,
  carregandoPerfil,
  carregandoPostagens,
  carregarPerfil,
  carregarPostagens
} = usePerfil()
const {apagarPostagem} = usePostagens(perfil)
const carregandoConversa = ref(false)

// Identifica se é o próprio perfil, suportando id padrão e sub do JWT
const isOwnProfile = computed(() => {
  const loggedInId = user.value?.id || (user.value as any)?.sub
  return route.params.id === 'me' || route.params.id === loggedInId
})
const handleDeletePost = async (postId: number) => {
  if (!postId) return

  const sucesso = await apagarPostagem(postId)
if (sucesso && perfil.value) {
    // Chama a função de carregar novamente
    await carregarPostagens(perfil.value.id)
  }
}
const iniciarConversa = async () => {
  if (isOwnProfile.value || !perfil.value) return
  carregandoConversa.value = true
  const idConversa = await buscarOuCriarConversa(perfil.value.id)
  carregandoConversa.value = false
  if (idConversa) {
    navigateTo(`/chat/${idConversa}`)
  }
}

const inicializarDados = async () => {
  let targetId = route.params.id as string
  let idParaBuscar = targetId

  if (targetId === 'me') {
    if (!user.value) {
      console.log('inicializarDados: user.value ainda é undefined em /me. Aguardando a sessão carregar...')
      return
    }
    targetId = user.value.id || (user.value as any).sub
  }
  await carregarPerfil(targetId)
  await carregarPostagens(targetId)

  // Logs de diagnóstico no console do navegador (F12)
  const loggedInId = user.value?.id || (user.value as any)?.sub
  console.log('--- DIAGNÓSTICO DE PERFIL ---')
  console.log('ID na URL:', route.params.id)
  console.log('Objeto USER inteiro logado:', user.value)
  console.log('ID do seu usuário logado no Supabase:', loggedInId)
  console.log('É o seu próprio perfil?', isOwnProfile.value)

  await carregarPerfil(targetId)
  await carregarPostagens(targetId)
}

// Watch robusto para lidar com o atraso de carregamento do Supabase (Hydration)
watch(user, async (newUser) => {
  console.log('watch(user) disparou! Conteúdo do newUser:', newUser)

  const userId = newUser?.id || (newUser as any)?.sub
  if (newUser && userId) {
    console.log('watch(user): Sessão do Supabase carregada! ID do usuário:', userId)

    // Se o UUID digitado na URL for o meu próprio UUID de login, redireciona para /me
    if (route.params.id === userId) {
      console.log('watch(user): Detectado meu próprio UUID na rota. Redirecionando para /me...')
      navigateTo('/perfilPage/me', { replace: true })
      return
    }

    // Se a rota for /me, agora que o usuário carregou, inicializamos os dados reais do perfil
    if (route.params.id === 'me') {





      
      await inicializarDados()
    }
  } else if (newUser === null && route.params.id === 'me') {
    // Redireciona para login apenas se a sessão for confirmada como nula (deslogado)
    console.log('watch(user): Usuário deslogado em /me. Redirecionando para login...')
    navigateTo('/login')
  }
}, { immediate: true })

onMounted(async () => {
  // Se for um perfil de outro UUID, podemos disparar a consulta imediatamente
  if (route.params.id !== 'me') {
    await inicializarDados()
  }
})

// Recarrega os dados caso mude de perfil clicando no feed/conversas (mudança de rota sem remontar)
watch(() => route.params.id, async () => {
  await inicializarDados()
})
</script>

<template>
  <div class="flex flex-col gap-7 pt-10">
    <!-- Skeleton Carregando Perfil -->
    <div
      v-if="carregandoPerfil"
      class="animate-pulse flex gap-3"
    >
      <div class="w-32 h-32 rounded-full bg-neutral-500/20 shrink-0" />
      <div class="flex flex-col justify-between w-full sm:w-md py-2 gap-2">
        <div class="h-8 bg-neutral-500/20 rounded w-1/2" />
        <div class="h-4 bg-neutral-500/20 rounded w-full mt-2" />
      </div>
    </div>

    <!-- Perfil Real Carregado -->
    <div
      v-else-if="perfil"
      class="flex gap-3 items-center justify-center"
    >
      <div class="size-20 shrink-0">
        <img
          class="rounded-full w-full h-full object-cover border border-primary/20"
          :src="perfil.avatar_url"
          alt="Avatar do perfil"
        >
      </div>

      <div class="flex flex-col justify-between w-full sm:w-md">
        <div class="flex justify-between items-start gap-2">
          <div>
            <h2 class="text-3xl font-bold text-on-surface">
              {{ perfil.nome }}
            </h2>
            <p class="text-xs text-neutral-400 mt-1">
              @{{ perfil.nome.toLowerCase().replace(/\s+/g, '') }}
            </p>
          </div>

          <div
            v-if="!isOwnProfile"
            class="flex justify-between gap-2 shrink-0"
          >
            <UButton
              color="neutral"
              variant="outline"
              :loading="carregandoConversa"
              @click="iniciarConversa"
            >
              Conversar
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Publicações Reais -->
    <div class="border-t border-neutral-500/20 pt-6">
      <h3 class="text-lg text-center font-bold mb-4 text-on-surface">
        Publicações
      </h3>

      <!-- Carregando Posts -->
      <div
        v-if="carregandoPostagens"
        class="grid grid-cols-3 gap-4"
      >
        <div
          v-for="n in 3"
          :key="n"
          class="animate-pulse aspect-square bg-neutral-500/20 rounded-xl"
        />
      </div>

      <!-- Sem Publicações -->
      <div
        v-else-if="postagens.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <UIcon
          name="solar:gallery-wide-bold-duotone"
          class="size-12 text-neutral-500/40 mb-2"
        />
        <p class="text-sm text-neutral-400">
          Nenhuma publicação por enquanto.
        </p>
      </div>

      <!-- Lista de Publicações -->
      <div
        v-else
        class="justify-center items-center flex gap-4"
      >
        <div class="w-full sm:w-lg flex flex-col gap-4">
        <postCard
          v-for="post in postagens"
          :key="post.id"
          :post="post"
          @delete-post="handleDeletePost(post.id)"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
