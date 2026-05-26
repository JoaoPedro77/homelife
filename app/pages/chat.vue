<script setup lang="ts">
const novaMensagem = ref('')
const {
  listaMensagens,
  currentUser,
  inicializaChat,
  enviarMensagem,
  inscreverRealtime,
  desinscreverRealtime
} = useChat()

const scrollArea = useTemplateRef('scrollArea')

function scrollToBottom() {
  const viewport = scrollArea.value?.$el?.querySelector('[data-radix-scroll-area-viewport]')
    ?? scrollArea.value?.$el

  if (viewport) {
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const handleEnviar = async () => {
  if (!novaMensagem.value.trim()) return
  const texto = novaMensagem.value
  novaMensagem.value = ''
  
  const sucesso = await enviarMensagem(texto)
  if (!sucesso) {
    novaMensagem.value = texto
  } else {
    nextTick(scrollToBottom)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let channel: any

onMounted(async () => {
  await inicializaChat()
  scrollToBottom()
  channel = inscreverRealtime(() => {
    nextTick(scrollToBottom)
  })
})

onUnmounted(() => {
  if (channel) {
    desinscreverRealtime(channel)
  }
})
</script>

<template>
  <div class="flex flex-col w-full h-[calc(100vh-120px)] min-h-0 overflow-hidden relative">
    <UScrollArea
      ref="scrollArea"
      class="flex-1 w-full px-2 pt-2"
    >
      <div class="flex flex-col pb-4">
        <div
          v-for="item in listaMensagens"
          :key="item.id"
          :class="[
            'rounded-2xl p-3 m-2 gap-0 max-w-[80%] flex flex-col shadow-sm',
            item.user_id === currentUser?.id
              ? 'self-end rounded-tr-none bg-primary-400/90 text-white'
              : 'self-start rounded-tl-none bg-neutral-500/20 dark:bg-neutral-800/40'
          ]"
        >
          <span
            v-if="item.user_id !== currentUser?.id"
            class="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1"
          >
            {{ item.nome }}
          </span>
          <p class="text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
            {{ item.conteudo }}
          </p>
        </div>
      </div>
    </UScrollArea>
    
    <div class="w-full shrink-0 bg-transparent mt-2">
      <UForm
        class="flex flex-row gap-2 items-end backdrop-blur-xl p-2 rounded-2xl border border-neutral-500/30 shadow-xl"
        @submit="handleEnviar"
      >
        <UTextarea
          v-model="novaMensagem"
          class="flex-1"
          placeholder="Digite sua mensagem..."
          :autofocus="true"
          :autoresize="true"
          :rows="1"
          :max-rows="6"
          size="lg"
          variant="none"
          :ui="{
            base: 'px-3 py-2.5 w-full focus:ring-0'
          }"
          @keydown.enter.exact.prevent="handleEnviar"
        />
        <UButton
          type="submit"
          icon="solar:map-arrow-right-bold-duotone"
          size="xl"
          class="rounded-xl"
          :disabled="!novaMensagem.trim()"
        />
      </UForm>
    </div>
  </div>
</template>
