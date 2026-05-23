<script setup lang="ts">
const supabase = useSupabaseClient()
const name = ref('')
const password = ref('')
const loading = ref(false)
const toast = useToast()

const login = async () => {
  if (!name.value || !password.value) return

  loading.value = true

  const email = `${name.value.toLowerCase().trim().replace(/\s+/g, '')}@homechat.com`

  try {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password: password.value
    })

    if (loginError) {
      if (loginError.message === 'Invalid login credentials') {
        const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
          email,
          password: password.value,
          options: { data: { display_name: name.value } }
        })

        if (signUpError) {
          toast.add({
            title: 'Erro de Acesso',
            description: signUpError.message === 'User already registered'
              ? 'Usuário já existe. Verifique sua senha.'
              : signUpError.message,
            color: 'error'
          })
          return
        }

        // Se foi e n logou, loga
        if (!signUpData.session) {
          await supabase.auth.signInWithPassword({ email, password: password.value })
        }
      } else {
        // Outros erro
        toast.add({ title: 'Erro de Login', description: loginError.message, color: 'error' })
        return
      }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      navigateTo('/chat')
    }
  } catch (err) {
    console.error('Erro inesperado:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-0 h-[calc(100vh-64px)] w-full overflow-hidden">
    <UPageCard
      variant="subtle"
      class="w-sm m-2 py-3"
    >
      <template #title>
        <LogoTexto
          titulo="Login"
          descricao="entre no lar da conversa"
          foto="entrar.png"
        />
      </template>
      <UForm
        class="flex flex-col gap-3"
        @submit="login"
      >
        <UInput
          v-model="name"
          required
          size="lg"
          name="usuario"
          autofocus
          icon="solar:user-bold-duotone"
          placeholder="Insira seu usuário"
        />
        <UInput
          v-model="password"
          required
          size="lg"
          name="senha"
          type="password"
          icon="solar:lock-bold-duotone"
          placeholder="Insira sua senha"
        />
        <UButton
          class="rounded-full justify-center"
          size="lg"
          type="submit"
          label="Entrar na conversa"
          icon="solar:dialog-2-bold-duotone"
          :loading="loading"
        />
      </UForm>
    </UPageCard>
  </div>
</template>
