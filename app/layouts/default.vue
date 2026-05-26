<template>
  <div class="flex justify-center items-start gap-3 w-full h-full p-4">
    <div class="flex w-full sm:w-[90%] md:w-[80%] gap-6 h-full">
      <!-- Barra lateral visível apenas em telas médias para cima, ou adaptável no futuro -->
      <BarraLateral class="hidden sm:flex" />

      <!-- O slot renderiza o conteúdo principal da página -->
      <div class="flex flex-col flex-1 w-full gap-3 h-full overflow-y-auto px-3 md:px-10">
        <slot />
      </div>
    </div>
  </div>
</template>
