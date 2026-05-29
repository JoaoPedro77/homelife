<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { usePostagens } from '~/composables/usePostagens'
import { usePerfil } from '~/composables/usePerfil'
import { useAuth } from '~/composables/useAuth'

const postText = ref('')
const selectedImageFile = ref<File | null>(null)
const imagePreviewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const { currentUser } = useAuth()
const { perfil, carregarPerfil } = usePerfil()
const { posts, carregando, perfilPadrao, criarPostagem, apagarPostagem, podeCriar, mensagemMaxima, carregarPostagens } = usePostagens(perfil)

watch(currentUser, async (val) => {
  if (val?.id) {
    await carregarPerfil(val.id)
    await carregarPostagens()
  }
}, { immediate: true })

const handleDeletePost = async (postId: number) => {
  if (!postId) return

  const sucesso = await apagarPostagem(postId)
  if (!sucesso) {
    console.warn('Não foi possível apagar a postagem', postId)
  }
}

const isPostDisabled = computed(
  () => !podeCriar(postText.value) && !selectedImageFile.value
)

const definirImagem = (arquivo: File | null) => {
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value)
    imagePreviewUrl.value = null
  }

  if (!arquivo || !arquivo.type.startsWith('image/')) {
    selectedImageFile.value = null
    return
  }

  selectedImageFile.value = arquivo
  imagePreviewUrl.value = URL.createObjectURL(arquivo)
}

const abrirSeletorImagem = () => {
  fileInput.value?.click()
}

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const arquivo = target.files?.[0] ?? null
  definirImagem(arquivo)
}

const limparImagemSelecionada = () => {
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value)
    imagePreviewUrl.value = null
  }
  selectedImageFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const enviarPostagem = async () => {
  const postagemCriada = await criarPostagem(postText.value, selectedImageFile.value ?? undefined)

  if (!postagemCriada) {
    return
  }

  postText.value = ''
  limparImagemSelecionada()
}

onBeforeUnmount(() => {
  limparImagemSelecionada()
})
</script>

<template>
  <div class="flex flex-col items-center gap-5 w-full">
    <UPageCard class="bg-surface-container w-full sm:w-lg rounded-xl border border-white/5 light:shadow-[0px_0px_10px_#000b]">
      <div class="flex flex-col">
        <div class="flex gap-3 items-center">
          <div class="w-9 h-9 rounded-full overflow-hidden shrink-0">
            <img
              alt="User Avatar"
              class="w-full h-full object-cover"
              :src="perfilPadrao?.avatar_url"
            >
          </div>
          <UForm class="flex-1 flex items-center gap-2">
            <UInput
              v-model="postText"
              class="flex-1 bg-transparent text-body-md placeholder:text-on-surface-variant/50"
              placeholder="O que você está criando hoje?"
              type="text"
              variant="soft"
              :ui="{ base: ' w-full' }"
              :maxlength="mensagemMaxima"
            />
            <button
              type="button"
              class="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors shrink-0 flex items-center justify-center"
              aria-label="Adicionar imagem"
              @click="abrirSeletorImagem"
            >
              <UIcon
                name="solar:gallery-add-bold-duotone"
                class="size-7"
              />
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onImageChange"
            >
          </UForm>
        </div>
        <div
          v-if="imagePreviewUrl"
          class="mt-4 rounded-xl overflow-hidden border border-white/10"
        >
          <img
            :src="imagePreviewUrl"
            alt="Pré-visualização da imagem selecionada"
            class="w-full h-64 object-cover"
          >
          <div class="flex items-center justify-between gap-3 p-3 bg-surface-container">
            <p class="font-label-sm text-on-surface-variant truncate">
              Imagem selecionada
            </p>
            <button
              type="button"
              class="text-primary hover:underline"
              @click="limparImagemSelecionada"
            >
              Remover
            </button>
          </div>
        </div>
        <div class="mt-4 border-t border-white/5 pt-4">
          <UButton
            type="button"
            :disabled="isPostDisabled"
            variant="outline"
            class="w-full flex justify-center py-2.5 rounded-xl bg-primary-container font-semibold"
            @click="enviarPostagem"
          >
            Postar
            <UIcon
              name="solar:pen-new-square-bold-duotone"
              class="size-5 ml-1"
            />
          </UButton>
        </div>
      </div>
    </UPageCard>

    <div class="flex flex-col items-center w-full">
      <div class="w-full sm:w-lg flex flex-col gap-4">
        <template v-if="carregando">
          <div
            v-for="n in 3"
            :key="n"
            class="flex flex-col gap-3 p-4 rounded-xl border border-neutral-500/10"
          >
            <div class="flex items-center gap-3">
              <USkeleton class="size-12 rounded-full" />
              <div class="flex flex-col gap-2 flex-1">
                <USkeleton class="h-4 w-1/3" />
                <USkeleton class="h-3 w-1/4" />
              </div>
            </div>
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-2/3" />
          </div>
        </template>

        <template v-else>
          <postCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @delete-post="handleDeletePost(post.id)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
