<script lang="ts" setup>
import type { Post } from '~/types'

const posts: Post[] = [
  {
    id: 1,
    user_id: '1',
    content: 'Explorando a intersecção entre moda digital e design gerativo.',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    user_id: '1',
    content: 'Novas texturas e padrões surgindo.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    user_id: '1',
    content: 'Arte generativa em movimento.',
    image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    user_id: '1',
    content: 'Minimalismo e cores escuras.',
    image_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    user_id: '1',
    content: 'Coleção de outono inspirada no espaço.',
    image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    user_id: '1',
    content: 'Design bio-inspirado.',
    image_url: 'https://images.unsplash.com/photo-1518977956810-4978c1bd0d97?auto=format&fit=crop&w=900&q=80'
  }
]
</script>

<template>
  <div class="flex justify-center items-center w-full h-full p-10">
    <div class="flex w-[80%] gap-10">
      <BarraLateral />

      <div class="flex flex-col justify-between gap-7">
        <div class="flex gap-3">
          <div class="w-32 h-32">
            <img
              class="rounded-full w-full h-full object-cover"
              src="https://i.pravatar.cc/150?img=47"
              alt="Avatar do perfil"
            >
          </div>

          <div class="flex flex-col justify-between w-md">
            <div class="flex justify-between">
              <div>
                <h2 class="text-3xl">
                  Stitch Designer
                </h2>
              </div>

              <div class="flex justify-between gap-2">
                <UButton variant="subtle">
                  Seguir
                </UButton>

                <UButton
                  color="neutral"
                  variant="outline"
                >
                  Conversar
                </UButton>
              </div>
            </div>

            <div>
              <p>
                Explorando a intersecção entre moda digital e design gerativo.
              </p>
            </div>
          </div>
        </div>

        <UPageGrid>
          <div
            v-for="post in posts"
            :key="post.id"
            class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :src="post.image_url"
              :alt="post.content"
            >
          </div>
        </UPageGrid>
      </div>
    </div>
  </div>
</template>

<style></style>
