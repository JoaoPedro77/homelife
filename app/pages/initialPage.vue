<script lang="ts" setup>
const postText = ref('')
</script>

<template>
  <div class="flex flex-col items-center gap-5 w-full">
    <UPageCard class="bg-surface-container w-full sm:w-lg rounded-xl border border-white/5 light:shadow-[0px_0px_10px_#000b]">
      <div class="flex flex-col">
        <div class="flex gap-3 items-center">
          <div class="w-9 h-9 rounded-full overflow-hidden shrink-0">
            <img
              alt="User Avatar"
              class="w-full h-full object-cover"
              src="https://camo.githubusercontent.com/5ec959ed0f4d52dd2988dda8c2c7ba5f52edffbbcb8299ecd4c87bd2960726c3/68747470733a2f2f69312e736e6463646e2e636f6d2f617661746172732d566934706e704d417a36756f3857306c2d4f4d5a3055672d743130383078313038302e6a7067"
            >
          </div>
          <UForm class="flex-1 flex items-center gap-2">
            <UInput
              v-model="postText"
              class="flex-1 bg-transparent text-body-md placeholder:text-on-surface-variant/50"
              placeholder="O que você está criando hoje?"
              type="text"
              variant="soft"
              :ui="{ base: ' w-full' }"
            />
            <button
              type="button"
              class="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors shrink-0 flex items-center justify-center"
            >
              <UIcon
                name="solar:gallery-add-bold-duotone"
                class="size-7"
              />
            </button>
          </UForm>
        </div>
        <div class="mt-4 border-t border-white/5 pt-4">
          <UButton
            variant="outline"
            class="w-full flex justify-center py-2.5 rounded-xl bg-primary-container font-semibold"
          >
            Postar
            <UIcon
              name="solar:pen-new-square-bold-duotone"
              class="size-5 ml-1"
            />
          </UButton>
        </div>
      </div>
    </UPageCard>
    <div class="flex flex-col items-center w-full">
      <div class="w-full sm:w-lg">
        <postCard />
      </div>
    </div>
  </div>
</template>

<style></style>
