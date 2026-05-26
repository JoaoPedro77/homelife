<script lang="ts" setup>
async function acessarFeed() {
  navigateTo('/initialPage')
}

async function acessarPerfil() {
  navigateTo('/perfilPage')
}

async function acessarChat() {
  navigateTo('/chat')
}

async function acessarConversas() {
  navigateTo('/conversasPage')
}
</script>

<template>
  <div class="flex flex-col m-2 gap-2 w-[20%]">
    <UButton
      variant="ghost"
      @click="acessarFeed"
    >
      <UIcon
        name="material-symbols:dynamic-feed-sharp"
        class="size-5"
      /> Feed
    </UButton>

    <UButton
      variant="ghost"
      @click="acessarConversas"
    >
      <UIcon
        name="bx:bxs-conversation"
        class="size-5"
      /> Conversas
    </UButton>

    <UButton
      variant="ghost"
      @click="acessarChat"
    >
      <UIcon
        name="solar:dialog-2-bold-duotone"
        class="size-5"
      /> Chat
    </UButton>

    <UButton
      variant="ghost"
      @click="acessarPerfil"
    >
      <UIcon
        name="material-symbols:account-box"
        class="size-5"
      /> Perfil
    </UButton>
  </div>

  <USeparator
    orientation="vertical"
    class="h-[90]"
  />
</template>

<style></style>
