import type { Mensagem } from '~/types'

export const useChat = () => {
  const supabase = useSupabaseClient()
  const { currentUser } = useUser()
  const listaMensagens = ref<Mensagem[]>([])

  const inicializaChat = async () => {
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .order('id', { ascending: true })

    if (data && !error) {
      listaMensagens.value = data as Mensagem[]
    }
  }

  const enviarMensagem = async (texto: string) => {
    if (!texto.trim() || !currentUser.value) return false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('mensagens') as any)
      .insert([
        {
          nome: currentUser.value.nome,
          conteudo: texto,
          user_id: currentUser.value.id
        }
      ])

    if (error) {
      console.error('Erro ao enviar mensagem!', error.message)
      return false
    }
    return true
  }

  const inscreverRealtime = (onNovaMensagem: () => void) => {
    const channel = supabase
      .channel('mensagens_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensagens' },
        (payload) => {
          const nova = payload.new as Mensagem
          if (!listaMensagens.value.find(m => m.id === nova.id)) {
            listaMensagens.value = [...listaMensagens.value, nova]
            onNovaMensagem()
          }
        }
      )
      .subscribe()

    return channel
  }

  const desinscreverRealtime = (channel: ReturnType<typeof supabase.channel>) => {
    supabase.removeChannel(channel)
  }

  return {
    listaMensagens,
    currentUser,
    inicializaChat,
    enviarMensagem,
    inscreverRealtime,
    desinscreverRealtime
  }
}
