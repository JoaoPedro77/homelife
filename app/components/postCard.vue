<script lang="ts" setup>
interface Post {
  author: string
  username: string
  content: string
  foto: string | null
  fotoPerfil: string
}

const posts: Post[] = [
  {
    author: 'Mariana Silva',
    username: '@mariana',
    content: 'Explorando novas receitas saudáveis e práticas para a rotina diária. Hoje testei uma salada com quinoa e legumes assados — ficou incrível!',
    foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=47',
  },
  {
    author: 'Lucas Almeida',
    username: '@lucasalmeida',
    content: 'Organizei meu plano semanal de tarefas e estou me sentindo muito mais focado. Pequenas vitórias fazem a diferença no dia a dia.',
    foto: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=58',
  },
  {
    author: 'Ana Costa',
    username: '@anacosta',
    content: 'Comecei a praticar meditação pela manhã e já notei menos ansiedade e mais clareza para lidar com as prioridades.',
    foto: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=59',
  },
  {
    author: 'Rafael Pereira',
    username: '@rafaelp',
    content: 'Finalizei um projeto de decoração sustentável usando móveis reciclados. É incrível como pequenas mudanças deixam o ambiente mais aconchegante.',
    foto: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=60',
  },
  {
    author: 'Beatriz Santos',
    username: '@beas',
    content: 'Passei o fim de semana plantando ervas na varanda. Agora tenho manjericão, hortelã e alecrim sempre frescos para as receitas.',
    foto: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=61',
  },
  {
    author: 'Tiago Moura',
    username: '@tiagom',
    content: 'Reduzi o uso de plástico em casa e comecei a usar potes reutilizáveis. A economia é ótima e a sensação de viver de forma mais sustentável é ainda melhor.',
    foto: 'https://images.unsplash.com/photo-1518977956810-4978c1bd0d97?auto=format&fit=crop&w=900&q=80',
    fotoPerfil: 'https://i.pravatar.cc/150?img=62',
  },
]

</script>

<template>


  <div class="flex flex-col gap-4">
    <div v-for="(post, index) in posts" :key="index">

      <UPageCard class="light:shadow-[0px_0px_8px_#000b]">
        <div class="flex flex-col w-full gap-3">
          <div class="flex items-center justify-between mb-md">
            <UButton
            variant="outline"
            class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
                <img alt="Avatar do autor" class="w-full h-full object-cover"
                  data-alt="Avatar do usuário associado à postagem."
                  :src="post.fotoPerfil" />
              </div>
              <div>
                <h4 class="font-label-md text-label-md text-on-surface font-bold">{{ post.author }}</h4>
                <p class="font-label-sm text-label-sm text-on-surface-variant">{{ post.username }} • 5 horas atrás</p>
              </div>
            </UButton>
            <button class="text-on-surface-variant hover:text-primary transition-colors">
              <span icon="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div class="mb-md">
            <p class="font-body-md text-on-surface leading-relaxed">
              {{ post.content }}
            </p>
          </div>
          <div v-if="post.foto" class="overflow-hidden rounded-xl">
            <img
              :src="post.foto"
              :alt="`Imagem da postagem de ${post.author}`"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </UPageCard>
    </div>
  </div>
</template>



<style></style>