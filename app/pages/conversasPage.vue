<script setup lang="ts">
import type { Conversation } from '~/types'

const conversas: Conversation[] = [
  {
    id: 1,
    participant_name: 'Mariana Silva',
    participant_avatar: 'https://i.pravatar.cc/150?img=12',
    ultima_mensagem: 'Claro! Vamos agendar para amanhã às 10h?',
    ultimo_horario: '09:24'
  },
  {
    id: 2,
    participant_name: 'Lucas Almeida',
    participant_avatar: 'https://i.pravatar.cc/150?img=24',
    ultima_mensagem: 'O relatório já está pronto e envio em breve.',
    ultimo_horario: '08:57'
  },
  {
    id: 3,
    participant_name: 'Ana Costa',
    participant_avatar: 'https://i.pravatar.cc/150?img=33',
    ultima_mensagem: 'Adorei a sugestão de receitas, obrigada!',
    ultimo_horario: 'Ontem'
  },
  {
    id: 4,
    participant_name: 'Rafael Pereira',
    participant_avatar: 'https://i.pravatar.cc/150?img=45',
    ultima_mensagem: 'Podemos conversar sobre o projeto na próxima semana?',
    ultimo_horario: 'Seg'
  },
  {
    id: 5,
    participant_name: 'Beatriz Santos',
    participant_avatar: 'https://i.pravatar.cc/150?img=52',
    ultima_mensagem: 'Vou preparar os documentos e te envio até o fim do dia.',
    ultimo_horario: 'Hoje'
  },
  {
    id: 6,
    participant_name: 'Fernando Lima',
    participant_avatar: 'https://i.pravatar.cc/150?img=66',
    ultima_mensagem: 'Ainda não recebi o comprovante, pode reenviar?',
    ultimo_horario: '07:40'
  },
  {
    id: 7,
    participant_name: 'Camila Rocha',
    participant_avatar: 'https://i.pravatar.cc/150?img=70',
    ultima_mensagem: 'Sim, eu confirmo a presença e te aviso até amanhã.',
    ultimo_horario: 'Sex'
  },
  {
    id: 8,
    participant_name: 'Thiago Nunes',
    participant_avatar: 'https://i.pravatar.cc/150?img=81',
    ultima_mensagem: 'O evento foi incrível, vamos planejar o próximo ainda este mês.',
    ultimo_horario: 'Qui'
  },
  {
    id: 9,
    participant_name: 'Isabela Moura',
    participant_avatar: 'https://i.pravatar.cc/150?img=95',
    ultima_mensagem: 'Ah, ótimo! Me marcando no calendário, por favor.',
    ultimo_horario: '14:12'
  }
]

function abrirConversa(_conversa: Conversation) {
  navigateTo('/chat')
}
</script>

<template>
  <div class="flex justify-center items-center gap-3 w-full">
    <div class="flex w-[50%] gap-10">
      <BarraLateral />
      <div class="flex flex-col w-full gap-3">
        <div
          v-for="conversa in conversas"
          :key="conversa.id"
          class="light:shadow-[0px_0px_8px_#000b] rounded-lg cursor-pointer"
          @click="abrirConversa(conversa)"
        >
          <UPageCard
            class="flex flex-col bg-[#ff83b705] w-full"
            :ui="{
              container: 'p-0 sm:p-3'
            }"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="flex items-center gap-2">
                  <img
                    class="rounded-full h-10 w-10"
                    :src="conversa.participant_avatar"
                    :alt="conversa.participant_name"
                  >
                  <h2>{{ conversa.participant_name }}</h2>
                </div>
              </div>
              <div>
                <p>{{ conversa.ultimo_horario }}</p>
              </div>
            </div>
            <div>
              <div>
                <p>{{ conversa.ultima_mensagem }}</p>
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
