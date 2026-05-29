<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useConversas } from '~/composables/useConversas'
import { usePerfil } from '~/composables/usePerfil'
import { usePostagens } from '~/composables/usePostagens'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { supabaseUser: user } = useAuth()

const { buscarOuCriarConversa } = useConversas()
const {
  perfil,
  carregandoPerfil,
  carregarPerfil
} = usePerfil()
const {
  posts,
  carregando,
  carregarPostagens,
  apagarPostagem
} = usePostagens(perfil)
const carregandoConversa = ref(false)

const isOwnProfile = computed(() => {
  const loggedInId = user.value?.id || (user.value as any)?.sub
  return route.params.id === 'me' || route.params.id === loggedInId
})

const handleDeletePost = async (postId: number) => {
  if (!postId) return
  const sucesso = await apagarPostagem(postId)
  if (sucesso && perfil.value) {
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

  if (targetId === 'me') {
    if (!user.value) return
    targetId = user.value.id || (user.value as any).sub
  }

  await carregarPerfil(targetId)
  await carregarPostagens(targetId)
}

onMounted(async () => {
  await inicializarDados()
})

watch(() => route.params.id, async () => {
  await inicializarDados()
})
</script>

<template>
  <div class="flex flex-col gap-7 pt-10">
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

    <div class="border-t border-neutral-500/20 pt-6">
      <h3 class="text-lg text-center font-bold mb-4 text-on-surface">
        Publicações
      </h3>

      <div
        v-if="carregando"
        class="grid grid-cols-3 gap-4"
      >
        <div
          v-for="n in 3"
          :key="n"
          class="animate-pulse aspect-square bg-neutral-500/20 rounded-xl"
        />
      </div>

      <div
        v-else-if="posts.length === 0"
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

      <div
        v-else
        class="justify-center items-center flex gap-4"
      >
        <div class="w-full sm:w-lg flex flex-col gap-4">
          <postCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @delete-post="handleDeletePost(post.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
