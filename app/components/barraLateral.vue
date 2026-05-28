<script lang="ts" setup>
function acessarFeed() {
  navigateTo('/initialPage')
}

function acessarPerfil() {
  navigateTo('/perfilPage/me')
}

function acessarConversas() {
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
        name="solar:home-2-bold-duotone"
        class="size-5"
      /> Feed
    </UButton>

    <UButton
      variant="ghost"
      @click="acessarConversas"
    >
      <UIcon
        name="solar:chat-round-dots-bold-duotone"
        class="size-5"
      /> Conversas
    </UButton>

    <UButton
      variant="ghost"
      @click="acessarPerfil"
    >
      <UIcon
        name="solar:user-circle-bold-duotone"
        class="size-5"
      /> Perfil
    </UButton>
  </div>

  <USeparator
    orientation="vertical"
    class="h-[90]"
  />
</template>
