<script setup lang="ts">
import type { Conversa } from '~/types'

const conversas: Conversa[] = [
  {
    id: 1,
    user1_id: 'me',
    user2_id: '1',
    outro_participante: { id: '1', nome: 'Mariana Silva', avatar_url: 'https://i.pravatar.cc/150?img=12' },
    ultima_mensagem: { id: 1, nome: 'Mariana Silva', conteudo: 'Claro! Vamos agendar para amanhã às 10h?', criado_em: '09:24' }
  },
  {
    id: 2,
    user1_id: 'me',
    user2_id: '2',
    outro_participante: { id: '2', nome: 'Lucas Almeida', avatar_url: 'https://i.pravatar.cc/150?img=24' },
    ultima_mensagem: { id: 2, nome: 'Lucas Almeida', conteudo: 'O relatório já está pronto e envio em breve.', criado_em: '08:57' }
  },
  {
    id: 3,
    user1_id: 'me',
    user2_id: '3',
    outro_participante: { id: '3', nome: 'Ana Costa', avatar_url: 'https://i.pravatar.cc/150?img=33' },
    ultima_mensagem: { id: 3, nome: 'Ana Costa', conteudo: 'Adorei a sugestão de receitas, obrigada!', criado_em: 'Ontem' }
  },
  {
    id: 4,
    user1_id: 'me',
    user2_id: '4',
    outro_participante: { id: '4', nome: 'Rafael Pereira', avatar_url: 'https://i.pravatar.cc/150?img=45' },
    ultima_mensagem: { id: 4, nome: 'Rafael Pereira', conteudo: 'Podemos conversar sobre o projeto na próxima semana?', criado_em: 'Seg' }
  },
  {
    id: 5,
    user1_id: 'me',
    user2_id: '5',
    outro_participante: { id: '5', nome: 'Beatriz Santos', avatar_url: 'https://i.pravatar.cc/150?img=52' },
    ultima_mensagem: { id: 5, nome: 'Beatriz Santos', conteudo: 'Vou preparar os documentos e te envio até o fim do dia.', criado_em: 'Hoje' }
  },
  {
    id: 6,
    user1_id: 'me',
    user2_id: '6',
    outro_participante: { id: '6', nome: 'Fernando Lima', avatar_url: 'https://i.pravatar.cc/150?img=66' },
    ultima_mensagem: { id: 6, nome: 'Fernando Lima', conteudo: 'Ainda não recebi o comprovante, pode reenviar?', criado_em: '07:40' }
  },
  {
    id: 7,
    user1_id: 'me',
    user2_id: '7',
    outro_participante: { id: '7', nome: 'Camila Rocha', avatar_url: 'https://i.pravatar.cc/150?img=70' },
    ultima_mensagem: { id: 7, nome: 'Camila Rocha', conteudo: 'Sim, eu confirmo a presença e te aviso até amanhã.', criado_em: 'Sex' }
  },
  {
    id: 8,
    user1_id: 'me',
    user2_id: '8',
    outro_participante: { id: '8', nome: 'Thiago Nunes', avatar_url: 'https://i.pravatar.cc/150?img=81' },
    ultima_mensagem: { id: 8, nome: 'Thiago Nunes', conteudo: 'O evento foi incrível, vamos planejar o próximo ainda este mês.', criado_em: 'Qui' }
  },
  {
    id: 9,
    user1_id: 'me',
    user2_id: '9',
    outro_participante: { id: '9', nome: 'Isabela Moura', avatar_url: 'https://i.pravatar.cc/150?img=95' },
    ultima_mensagem: { id: 9, nome: 'Isabela Moura', conteudo: 'Ah, ótimo! Me marcando no calendário, por favor.', criado_em: '14:12' }
  }
]

function abrirConversa(_conversa: Conversa) {
  navigateTo('/chat')
}
</script>

<template>
  <div class="flex flex-col w-full gap-3 mt-4">
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
                :src="conversa.outro_participante?.avatar_url"
                :alt="conversa.outro_participante?.nome"
              >
              <h2>{{ conversa.outro_participante?.nome }}</h2>
            </div>
          </div>
          <div>
            <p>{{ conversa.ultima_mensagem?.criado_em }}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{{ conversa.ultima_mensagem?.conteudo }}</p>
          </div>
        </div>
      </UPageCard>
    </div>
  </div>
</template>

<style></style>
