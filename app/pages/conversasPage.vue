<script setup lang="ts">
import { useConversas } from '~/composables/useConversas'
import type { Conversa } from '~/types'

const { listaConversas, carregando, carregarConversas } = useConversas()

onMounted(async () => {
  await carregarConversas()
})

function abrirConversa(conversa: Conversa) {
  navigateTo(`/chat/${conversa.id}`)
}
</script>

<template>
  <div class="flex flex-col w-full gap-3 mt-4">
    <div class="flex items-center justify-between pb-3 border-b border-neutral-500/20 mb-2 shrink-0">
      <h1 class="text-2xl font-bold text-on-surface">
        Minhas Conversas
      </h1>
    </div>

    <!-- Estado de Carregamento -->
    <div
      v-if="carregando"
      class="flex flex-col gap-3"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="animate-pulse flex gap-3 p-4 bg-[#ff83b705] rounded-xl border border-neutral-500/10"
      >
        <div class="rounded-full h-12 w-12 bg-neutral-500/20 shrink-0" />
        <div class="flex-1 flex flex-col justify-center gap-2">
          <div class="h-4 bg-neutral-500/20 rounded w-1/3" />
          <div class="h-3 bg-neutral-500/20 rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Estado Vazio (Sem conversas) -->
    <div
      v-else-if="listaConversas.length === 0"
      class="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <UIcon
        name="solar:chat-round-line-bold-duotone"
        class="size-16 text-primary/40 mb-4"
      />
      <h3 class="text-lg font-bold text-on-surface">
        Nenhuma conversa por aqui
      </h3>
      <p class="text-sm text-neutral-400 max-w-sm mt-1 leading-relaxed">
        Visite o perfil de outros criadores e clique em "Conversar" para começar a bater papo!
      </p>
      <UButton
        class="mt-6 font-semibold"
        variant="outline"
        @click="navigateTo('/initialPage')"
      >
        Ir para o Feed
      </UButton>
    </div>

    <!-- Lista de Conversas Ativas -->
    <div
      v-else
      class="flex flex-col gap-3"
    >
      <div
        v-for="conversa in listaConversas"
        :key="conversa.id"
        class="light:shadow-[0px_0px_8px_#000b] rounded-xl cursor-pointer hover:bg-neutral-500/5 transition-all duration-300 border border-neutral-500/10"
        @click="abrirConversa(conversa)"
      >
        <UPageCard
          class="flex flex-col bg-[#ff83b705] w-full"
          :ui="{
            container: 'p-4 sm:p-5'
          }"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-primary/20 shrink-0">
                <img
                  class="h-full w-full object-cover"
                  :src="conversa.outro_participante?.avatar_url"
                  :alt="conversa.outro_participante?.nome"
                >
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <h2 class="font-bold text-sm leading-none text-on-surface truncate">
                  {{ conversa.outro_participante?.nome }}
                </h2>
                <p class="text-xs text-neutral-400 truncate mt-2 pr-4 leading-normal">
                  {{ conversa.ultima_mensagem?.conteudo || 'Nenhuma mensagem gravada' }}
                </p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="text-[10px] text-neutral-500">
                {{ conversa.ultima_mensagem?.criado_em || '' }}
              </p>
            </div>
          </div>
        </UPageCard>
      </div>
    </div>
  </div>
</template>
