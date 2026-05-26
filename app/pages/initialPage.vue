<script lang="ts" setup>
const postText = ref('')
</script>

<template>
  <div class="flex justify-center items-center gap-3 w-full">
    <div class="flex w-[50%] gap-10">
      <BarraLateral />

      <div class="flex flex-col justify-center items-center m-3 gap-3 w-full">
        <UPageCard class="bg-surface-container w-lg rounded-xl border border-white/5 light:shadow-[0px_0px_10px_#000b]">
          <div class="flex flex-col">
            <div class="flex gap-3">
              <div class="w-9 h-9 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  class="w-full h-full object-cover"
                  src="https://camo.githubusercontent.com/5ec959ed0f4d52dd2988dda8c2c7ba5f52edffbbcb8299ecd4c87bd2960726c3/68747470733a2f2f69312e736e6463646e2e636f6d2f617661746172732d566934706e704d417a36756f3857306c2d4f4d5a3055672d743130383078313038302e6a7067"
                >
              </div>
              <UForm class="flex-1">
                <UInput
                  v-model="postText"
                  class="w-full bg-transparent border-none focus:ring-0 text-body-md placeholder:text-on-surface-variant/50"
                  placeholder="O que você está criando hoje?"
                  type="text"
                />
              </UForm>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center pt-md border-t border-white/5">
                <div class="flex gap-sm">
                  <button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <UIcon
                      name="material-symbols:add-photo-alternate-rounded"
                      class="size-8"
                    />
                  </button>
                </div>
                <UButton
                  variant="outline"
                  class="bg-primary-container px-lg py-sm rounded-full"
                >
                  Postar
                  <UIcon
                    name="material-symbols:library-add-outline-sharp"
                    class="size-4"
                  />
                </UButton>
              </div>
            </div>
          </div>
        </UPageCard>
        <div class="flex flex-col items-center justify-center w-full">
          <div class="w-lg">
            <postCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
