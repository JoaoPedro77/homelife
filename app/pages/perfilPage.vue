<template>
  <div class="flex justify-center items-center w-full h-full p-10">
    <div class="flex w-[80%] gap-10">

      <BarraLateral/>

      <div class="flex flex-col justify-between gap-7">
        <div class="flex gap-3">
          <div class="w-32 h-32">
            <img class="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="A detailed portrait of a creative professional woman known as Stitch Designer. She has a modern, high-fashion look with subtle glowing elements. The image is set in a dark, atmospheric studio with soft rose-colored key lighting and deep charcoal shadows, conveying expertise and artistic vision in a digital space."
              src="https://camo.githubusercontent.com/5ec959ed0f4d52dd2988dda8c2c7ba5f52edffbbcb8299ecd4c87bd2960726c3/68747470733a2f2f69312e736e6463646e2e636f6d2f617661746172732d566934706e704d417a36756f3857306c2d4f4d5a3055672d743130383078313038302e6a7067" />
          </div>

          <div class="flex flex-col justify-between w-md">
            <div class="flex justify-between">
              <div>
                <h2 class="text-3xl">Stitch Designer</h2>
              </div>

              <div class="flex justify-between gap-2">
                <UButton variant="subtle">
                  Seguir
                </UButton>

                <UButton color="neutral" variant="outline">
                  Conversar
                </UButton>
              </div>
            </div>

            <div>
              <p>
                Explorando a intersecção entre moda digital e design gerativo. ✨ <br />
              </p>
            </div>

          </div>
        </div>

        <UPageGrid>
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="A high-contrast digital art piece featuring abstract flowing silk textures in deep crimson and charcoal. The lighting is moody and cinematic, highlighting the intricate folds and crystalline particles floating in the air. The overall aesthetic is elegant and futuristic, perfectly aligned with a dark mode luxury design system."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx2qDmqUJgBh6ph-Hh7_ZdhsTy7FiIhudw6vuuG3zSeVYvrwtefmtPdH6_doYR07lQTOHKC2TJnT1dqhqkNrNI5kdCO5LDibTLbzWn-Fk3-H9qHE6sSbMXdQRRA7BAPoz0ljxSRfHGHj3kLDEzPUdg8DtucQRkGGMdYwaqC-h9YqejKFcieqB3vqScSMwAStLidiYg3ztPg202nehLM9Yz6wSXRPXAfCy7C1oPdL079OV9CelF9VR9Q3mg8VNt-jg7r5zA7JDVG8E" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 2.4k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 124</span>
              </div>
            </div>
          </div>
          <!-- Post 2 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Vibrant 3D abstract waves in soft rose and deep mauve tones. The composition is fluid and organic, with a glossy finish that reflects soft white highlights. The atmosphere is calm yet energetic, showcasing premium digital craftsmanship in a contemporary art style focused on color depth and smooth gradients."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_nKD8ykIOy62dvUFb_g2eVgqLsNtiBC8spyg02ezW-pDaQHIVRG0idStDe_OrxEikNQ-LInQaeDw8KxNivzV8PNtx-REmom_FeAjrm0ZyZPL1JLVjbkjyubj6vEd7P_dfyPuQBLG7UwWmpA0I6UlM0CSfA4osNXXgWtw9Q0bCGE8R2aT2tJk3e8cQng-zaPALwYZflTMd1sWJEgGLhJ7z1iBsJyqJbbXuRUxwLoin0TmD46fZsHfxgprz7Zd6hc7vm2j57p9HDss" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 1.8k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 89</span>
              </div>
            </div>
          </div>
          <!-- Post 3 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="An ethereal digital landscape featuring glowing geometric structures floating above a dark, reflective liquid surface. The color palette is dominated by deep blues and purples, with sharp rose-colored laser lines cutting through the haze. The mood is mysterious and high-tech, evoking a sense of future exploration and sophisticated digital architecture."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZDx8zB2iL9zest-67KTmCghi3l4OkX4qoqT77Gh2HJh1dXAI4KkrNFAg9ZTyiBgqXSh6WPg5zpQateyWBvbkzMNYMuv4EkYwGmmixE5i3YfFnK3gdh5dKL-CwFNN_jJvTJh-Mn6z15VgenRNS2vm-NEtbJ0_gjNa-T9zth8TYvSNqRLLFvws8pivrwKF68cbWV_6_q_ZSirvB_DfQkxxxpOTL1m9YrN0wrqIAu9HFJXxgAgSKx9ZF8Z4p_cQ1YrlyDfx-IUVcwRg" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 3.1k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 210</span>
              </div>
            </div>
          </div>
          <!-- Post 4 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="A minimalist composition of iridescent bubbles floating in a void of deep charcoal. The bubbles reflect a spectrum of neon rose and violet colors, creating a pearl-like sheen. The lighting is soft and diffused, emphasizing the fragile and precious nature of the digital objects in a high-energy, creative digital environment."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKH_Ex5_25slej4byBQTGFwnFpp9oaRYXhQpS0HbTbSS3gCSI6fMM_o78eTa2K-77S5_YE-dtBf6j7LjQyxrpCU_ckIuvDRddjp_i3utK6VBfCcra9bJKFJsvIBX6svzWq-na2mw-nufQHtvmVj0ec04lMwiTs7uKSFQ2uHVEh5THZKIzrGu6zFLQf-9qjSkemYIQH6L4BSND2-52AmJyy9tMUO2RuYnOS7rhIAb7PAdmI91x5nQiLQDh55C3Rv5BwUAv1b0QO4UE" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 1.2k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 45</span>
              </div>
            </div>
          </div>
          <!-- Post 5 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Abstract digital texture resembling bioluminescent deep-sea organisms. Glowing pink fibers intertwine in a dark, navy blue liquid space. The lighting originates from the objects themselves, casting a soft magenta glow on the surroundings. It is a sophisticated example of generative art with a focus on organic forms and high-contrast dark aesthetics."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ82g-tUSfi7JVds7SEd5khSNjzgqlGFp5zii2yZNVbWaudeUGb3ocYzC6l_J_uGmLcXSvbWgU066KgfHrvUdHfQer15XNKcfjNmuOwEicicg3qZM3O1BVEKGoLC87YrcoKRq_5ibxnKTQZmK8CdrdQimtxy6h8rUX8FTVSw87U8yT7sh6ySjv5HjI42kMU-snz1tx8TrulRUteFHaAE63t1AdOJ9xj2-2BIqa07hxwXbN9yF8y1hsWbBJU7vz9MWdfrgGlJE8SrE" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 4.5k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 302</span>
              </div>
            </div>
          </div>
          <!-- Post 6 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Sleek 3D metallic sphere with a liquid mercury finish, reflecting a neon-drenched futuristic city. The primary colors in the reflection are electric rose and deep violet. The sphere sits on a matte black pedestal, creating a stark contrast between textures. The overall mood is hyper-modern and technologically advanced."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxAbjUFR1q-c5VWVTqsK31oOQKyyrrPYoGNlbLnVKH_I72mCu-XqmAcQfaNjImRriRCWtn04YvCgj8wLnyItV7oM96vVaDyOKUOrGjTzyzf5MCTuTQz5W7IT0h1vB54-bFHOoijTfhbops0NQ1BjPN4rag3RmGTCfJeiEebcw_Hejjh4GHtbqBWz-cuh1YlLqaJPLuB-cL-0P2_HR4udgcI3I6ABKbUt2ZSboH6g1sHjI73346At6gaEcc4x8bd_7oi59akW2YE34" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 2.7k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 118</span>
              </div>
            </div>
          </div>
          <!-- Post 7 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="A macro shot of digital glitches transformed into a vibrant color gradient. Pixels are stretched and distorted into long vertical lines of rose, coral, and midnight blue. The composition is highly rhythmic and abstract, suggesting a disruption in a high-tech system that has been aestheticized into a beautiful piece of modern digital art."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXfx40Wm11KU5NkDPBrMlIdVjl6lAIO8mqC8yqUoGjdLvARr6OjUngaMJztuNhTr63RVLuaZkLfMHyhhUai-I12z2c9-59P-WYqOuR4glVSxoQ0znKzOISYWHhQgQCeD2daApAtSS5Src_2slusaJ4PIHKYHXasgd8pqWfGa3OcSVzTv7PhlrjX74hCdXxmM7ARbLWM1DNarCOQuLJP4UJPZRG0z3b3ekoSTXV5yCwvRty2GiKVA8nuNA7TtI_wCLwYH9_fS122XE" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 1.5k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 56</span>
              </div>
            </div>
          </div>
          <!-- Post 8 -->
          <div class="group relative profile-grid-item aspect-square rounded-xl overflow-hidden cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="A soft, blurred gradient background transitioning from deep indigo to a warm, glowing rose center. Subtle grain texture is applied to give it a cinematic, film-like quality. The lighting appears to be emanating from the center of the frame, creating a sense of focus and warmth within a dark, sophisticated digital interface."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzTHxTJsYEfrSRAIOzeMrL1oxCfGEq7DJlHZbouorjztw4qfv7YssjNPmkPuqlFjolItKFjSpU84ZSAJ8Eq5JPNnud6fkyAm5vjxWO2sGS13IifXVM3_ZyxsfUGtPv7t_W3eTlT8SwQJbneVIztHziG4SukUnujPzkyDFwo-iSGiOLyQsbX_XcV2BDpBX8G1MKam5HnUrA-gK0mNIctx5WyO8MO1EZS1NfIn4qpuKPBBZ7mUsqhhUUAYbpYWP7GyQUCHbX4OkAXvk" />
            <div
              class="overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <div class="flex gap-lg text-white font-label-md">
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">favorite</span> 5.2k</span>
                <span class="flex items-center gap-xs"><span class="material-symbols-outlined"
                    style="font-variation-settings: 'FILL' 1;">mode_comment</span> 412</span>
              </div>
            </div>
          </div>
        </UPageGrid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { disclosureVariants } from '@heroui/styles';
import BarraLateral from '~/components/barraLateral.vue';


</script>

<style></style>