<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from '~/composables/useChat'
import type { Perfil } from '~/types'

const route = useRoute()
const idConversa = Number(route.params.id)

const novaMensagem = ref('')
const {
  listaMensagens,
  currentUser,
  inicializaChat,
  enviarMensagem,
  inscreverRealtime,
  desinscreverRealtime
} = useChat()

const supabase = useSupabaseClient()
const outroParticipante = ref<Perfil | null>(null)

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

  const sucesso = await enviarMensagem(idConversa, texto)
  if (!sucesso) {
    novaMensagem.value = texto
  } else {
    nextTick(scrollToBottom)
  }
}

let channel: any

onMounted(async () => {
  if (idConversa) {
    // 1. Busca os detalhes do outro participante na conversa
    try {
      const { data: conversa, error: convError } = await (supabase.from('conversas') as any)
        .select('*')
        .eq('id', idConversa)
        .single()

      if (conversa && !convError && currentUser.value) {
        const me = currentUser.value.id
        const outroId = conversa.user1_id === me ? conversa.user2_id : conversa.user1_id

        const { data: perfilData } = await (supabase.from('perfis') as any)
          .select('*')
          .eq('id', outroId)
          .single()

        if (perfilData) {
          outroParticipante.value = {
            ...perfilData,
            avatar_url: perfilData.avatar_url
          }
        }
      }
    } catch (e) {
      console.error('Erro ao obter detalhes da conversa:', e)
    }

    // 2. Inicializa as mensagens e o realtime filtrado
    await inicializaChat(idConversa)
    scrollToBottom()
    channel = inscreverRealtime(idConversa, () => {
      nextTick(scrollToBottom)
    })
  }
})

onUnmounted(() => {
  if (channel) {
    desinscreverRealtime(channel)
  }
})
</script>

<template>
  <div class="flex flex-col w-full h-[calc(100vh-120px)] min-h-0 overflow-hidden relative">
    <!-- Header elegante da Conversa -->
    <div class="flex items-center gap-3 pb-3 border-b border-neutral-500/20 mb-2 shrink-0">
      <UButton
        variant="ghost"
        icon="solar:alt-arrow-left-bold-duotone"
        class="sm:hidden -ml-2"
        @click="navigateTo('/conversasPage')"
      />
      <div
        v-if="outroParticipante"
        class="flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-full overflow-hidden border border-primary/30 shrink-0">
          <img
            :src="outroParticipante.avatar_url"
            alt="Avatar do participante"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="flex flex-col">
          <h3 class="font-bold text-sm leading-none text-on-surface">
            {{ outroParticipante.nome }}
          </h3>
          <span class="text-[10px] text-neutral-400 mt-1">Chat Privado</span>
        </div>
      </div>
      <div
        v-else
        class="animate-pulse flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-full bg-neutral-500/20" />
        <div class="flex flex-col gap-1">
          <div class="w-24 h-3 bg-neutral-500/20 rounded" />
          <div class="w-12 h-2 bg-neutral-500/20 rounded" />
        </div>
      </div>
    </div>

    <!-- Área de Mensagens -->
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

    <!-- Barra de Input de Mensagem -->
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
          class="rounded-xl animate-button"
          :disabled="!novaMensagem.trim()"
        />
      </UForm>
    </div>
  </div>
</template>
