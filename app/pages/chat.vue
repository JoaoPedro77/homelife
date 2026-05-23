<script setup lang="ts">
import type { Mensagem, User } from '~/types'

const listaMensagens = ref<Mensagem[]>([])
const currentUser = ref<User | null>(null)
const novaMensagem = ref('')
const supabase = useSupabaseClient()

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

const inicializaChat = async () => {
  // Pega o usuário logado
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user) {
    currentUser.value = {
      id: session.user.id,
      nome: session.user.user_metadata?.display_name
    }
  }

  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .order('id', { ascending: true })

  if (data && !error) {
    listaMensagens.value = data as Mensagem[]
  }
}

const enviarMensagem = async () => {
  if (!novaMensagem.value.trim() || !currentUser.value) return

  const textoParaEnviar = novaMensagem.value
  novaMensagem.value = ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('mensagens') as any)
    .insert([
      {
        nome: currentUser.value.nome,
        conteudo: textoParaEnviar,
        user_id: currentUser.value.id
      }
    ])

  if (error) {
    console.error('Erro ao enviar mensagem!', error.message)
    novaMensagem.value = textoParaEnviar
  }
}

onMounted(async () => {
  await inicializaChat()
  scrollToBottom()
  // Configura o Realtime
  const channel = supabase
    .channel('mensagens_realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'mensagens' },
      (payload) => {
        const nova = payload.new as Mensagem
        if (!listaMensagens.value.find(m => m.id === nova.id)) {
          listaMensagens.value = [...listaMensagens.value, nova]
          nextTick(scrollToBottom)
        }
      }
    )
    .subscribe()

  onUnmounted(() => {
    supabase.removeChannel(channel)
  })
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-0 h-[calc(100vh-64px)] w-full overflow-hidden">
    <UScrollArea
      ref="scrollArea"
      class="w-full sm:w-[75%] lg:w-[60%] flex-1 px-4 pt-4"
    >
      <div class="flex flex-col pb-1">
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
    <div class="w-full p-4 shrink-0">
      <div class="max-w-4xl mx-auto w-full sm:w-[85%] lg:w-[70%]">
        <UForm
          class="flex flex-row gap-2 items-end backdrop-blur-xl p-2 rounded-2xl border border-neutral-500/30 shadow-xl"
          @submit="enviarMensagem"
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
            @keydown.enter.exact.prevent="enviarMensagem"
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
  </div>
</template>
