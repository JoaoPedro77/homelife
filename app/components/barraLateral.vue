<script lang="ts" setup>

async function acessarFeed() {
  navigateTo('/initialPage')
}

async function acessarPerfil() {
  navigateTo('/perfilPage')
}

async function acessarConversas() {
  navigateTo('/conversasPage')
}

</script>

<template>
  <div class="flex flex-col m-2 gap-2 w-[20%]">
    <UButton @click="acessarFeed" variant="ghost">
      <UIcon name="material-symbols:dynamic-feed-sharp" class="size-5" /> Feed
    </UButton>

    <UButton @click="acessarPerfil" variant="ghost">
      <UIcon name="material-symbols:account-box" class="size-5" /> Perfil
    </UButton>

    <UButton @click="acessarConversas" variant="ghost">
      <UIcon name="bx:bxs-conversation" class="size-5" /> Conversas
    </UButton>
  </div>

  <USeparator orientation="vertical" class="h-[90]" />

</template>



<style></style>