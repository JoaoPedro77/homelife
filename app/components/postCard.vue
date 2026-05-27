<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useRouter } from 'vue-router'
import type { Postagem } from '~/types'
import { usePerfil } from '~/composables/usePerfil'

const props = defineProps<{ post: Postagem }>()
const emit = defineEmits<{
  (event: 'delete-post', postId: number): void
}>()
const post = toRef(props, 'post')
const router = useRouter()
const { currentUser } = usePerfil()

const isMyPost = computed(() => currentUser.value?.id === post.value.user_id)

const navegarParaPerfil = (userId: string) => {
  router.push(`/perfilPage/${userId}`)
}

const handleDelete = () => {
  emit('delete-post', post.value.id)
}
</script>

<template>
  <UPageCard class="light:shadow-[0px_0px_8px_#000b]">
    <div class="flex flex-col w-full gap-3">
      <div class="flex items-center justify-between mb-md">
        <button
          type="button"
          class="flex items-center gap-3 text-left"
          @click="navegarParaPerfil(post.user_id)"
        >
          <div class="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
            <img
              alt="Avatar do autor"
              class="w-full h-full object-cover"
              :src="post.perfil?.avatar_url"
            >
          </div>
          <div class="flex flex-col items-start gap-1">
            <h4 class="font-label-md text-label-md text-on-surface font-bold">
              {{ post.perfil?.nome }}
            </h4>
            <p class="font-label-sm text-label-sm text-on-surface-variant">
              @{{ post.perfil?.nome?.toLowerCase().replace(/\s+/g, '') }} • 5 horas atrás
            </p>
          </div>
        </button>
        <div class="flex items-center gap-2">
          <button
            v-if="isMyPost"
            type="button"
            class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
            @click.prevent.stop="handleDelete"
          >
            <UIcon
              name="solar:trash-bin-bold-duotone"
              class="size-6"
            />
          </button>
          <button class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
            <UIcon
              name="solar:menu-dots-bold-duotone"
              class="size-6"
            />
          </button>
        </div>
      </div>
      <div class="mb-md">
        <p class="font-body-md text-on-surface leading-relaxed">
          {{ post.conteudo }}
        </p>
      </div>
      <div
        v-if="post.imagem_url"
        class="overflow-hidden rounded-xl"
      >
        <img
          :src="post.imagem_url"
          :alt="`Imagem da postagem de ${post.perfil?.nome}`"
          class="w-full h-full object-cover"
        >
      </div>
    </div>
  </UPageCard>
</template>
