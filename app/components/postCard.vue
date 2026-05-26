<script lang="ts" setup>
import type { Post } from '~/types'

const posts: Post[] = [
  {
    id: 1,
    user_id: '1',
    display_name: 'Mariana Silva',
    avatar_url: 'https://i.pravatar.cc/150?img=47',
    content: 'Explorando novas receitas saudáveis e práticas para a rotina diária. Hoje testei uma salada com quinoa e legumes assados — ficou incrível!',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    user_id: '2',
    display_name: 'Lucas Almeida',
    avatar_url: 'https://i.pravatar.cc/150?img=58',
    content: 'Organizei meu plano semanal de tarefas e estou me sentindo muito mais focado. Pequenas vitórias fazem a diferença no dia a dia.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    user_id: '3',
    display_name: 'Ana Costa',
    avatar_url: 'https://i.pravatar.cc/150?img=59',
    content: 'Comecei a praticar meditação pela manhã e já notei menos ansiedade e mais clareza para lidar com as prioridades.'
  },
  {
    id: 4,
    user_id: '4',
    display_name: 'Rafael Pereira',
    avatar_url: 'https://i.pravatar.cc/150?img=60',
    content: 'Finalizei um projeto de decoração sustentável usando móveis reciclados. É incrível como pequenas mudanças deixam o ambiente mais aconchegante.',
    image_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    user_id: '5',
    display_name: 'Beatriz Santos',
    avatar_url: 'https://i.pravatar.cc/150?img=61',
    content: 'Passei o fim de semana plantando ervas na varanda. Agora tenho manjericão, hortelã e alecrim sempre frescos para as receitas.',
    image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    user_id: '6',
    display_name: 'Tiago Moura',
    avatar_url: 'https://i.pravatar.cc/150?img=62',
    content: 'Reduzi o uso de plástico em casa e comecei a usar potes reutilizáveis. A economia é ótima e a sensação de viver de forma mais sustentável é ainda melhor.'
  }
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <UPageCard class="light:shadow-[0px_0px_8px_#000b]">
        <div class="flex flex-col w-full gap-3">
          <div class="flex items-center justify-between mb-md">
            <UButton
              variant="ghost"
              class="flex items-center gap-3"
              @click="navigateTo(`/perfilPage/${post.user_id}`)"
            >
              <div class="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
                <img
                  alt="Avatar do autor"
                  class="w-full h-full object-cover"
                  :src="post.avatar_url"
                >
              </div>
              <div class="flex flex-col items-start gap-1">
                <h4 class="font-label-md text-label-md text-on-surface font-bold">
                  {{ post.display_name }}
                </h4>
                <p class="font-label-sm text-label-sm text-on-surface-variant">
                  @{{ post.display_name?.toLowerCase().replace(/\s+/g, '') }} • 5 horas atrás
                </p>
              </div>
            </UButton>
            <button class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
              <UIcon
                name="solar:menu-dots-bold-duotone"
                class="size-6"
              />
            </button>
          </div>
          <div class="mb-md">
            <p class="font-body-md text-on-surface leading-relaxed">
              {{ post.content }}
            </p>
          </div>
          <div
            v-if="post.image_url"
            class="overflow-hidden rounded-xl"
          >
            <img
              :src="post.image_url"
              :alt="`Imagem da postagem de ${post.display_name}`"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </UPageCard>
    </div>
  </div>
</template>

<style></style>
