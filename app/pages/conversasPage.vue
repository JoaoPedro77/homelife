<script setup lang="ts">
interface Conversa {
  fotoPerfil: string
  nomeUsuario: string
  ultimaConversa: string
  horario: string
}

const conversas: Conversa[] = [
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=12',
    nomeUsuario: 'Mariana Silva',
    ultimaConversa: 'Claro! Vamos agendar para amanhã às 10h?',
    horario: '09:24',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=24',
    nomeUsuario: 'Lucas Almeida',
    ultimaConversa: 'O relatório já está pronto e envio em breve.',
    horario: '08:57',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=33',
    nomeUsuario: 'Ana Costa',
    ultimaConversa: 'Adorei a sugestão de receitas, obrigada!',
    horario: 'Ontem',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=45',
    nomeUsuario: 'Rafael Pereira',
    ultimaConversa: 'Podemos conversar sobre o projeto na próxima semana?',
    horario: 'Seg',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=52',
    nomeUsuario: 'Beatriz Santos',
    ultimaConversa: 'Vou preparar os documentos e te envio até o fim do dia.',
    horario: 'Hoje',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=66',
    nomeUsuario: 'Fernando Lima',
    ultimaConversa: 'Ainda não recebi o comprovante, pode reenviar?',
    horario: '07:40',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=70',
    nomeUsuario: 'Camila Rocha',
    ultimaConversa: 'Sim, eu confirmo a presença e te aviso até amanhã.',
    horario: 'Sex',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=81',
    nomeUsuario: 'Thiago Nunes',
    ultimaConversa: 'O evento foi incrível, vamos planejar o próximo ainda este mês.',
    horario: 'Qui',
  },
  {
    fotoPerfil: 'https://i.pravatar.cc/150?img=95',
    nomeUsuario: 'Isabela Moura',
    ultimaConversa: 'Ah, ótimo! Me marcando no calendário, por favor.',
    horario: '14:12',
  },
]
</script>

<template>
  <div class="flex justify-center items-center gap-3 w-full">
    <div class="flex w-[50%] gap-10">

      <BarraLateral />
      <div class="flex flex-col w-full gap-3">
        <div class="light:shadow-[0px_0px_8px_#000b] rounded-lg" v-for="(items, index) in conversas" :key="index">
          <UPageCard class="flex flex-col bg-[#ff83b705] w-full"
          :ui="{
            container: 'p-0 sm:p-3'
          }"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="flex items-center gap-2">
                  <img class="rounded-full h-10 w-10" :src="items.fotoPerfil">
                  <h2>{{ items.nomeUsuario }}</h2>
                </div>
              </div>
              <div>
                <p>{{ items.horario }}</p>
              </div>
            </div>
            <div>
              <div>
                <p>{{ items.ultimaConversa }}</p>
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>