import type { Mensagem } from '~/types'

export const useChat = () => {
  const supabase = useSupabaseClient()
  const { currentUser } = usePerfil()
  const listaMensagens = ref<Mensagem[]>([])

  const inicializaChat = async (idConversa: number) => {
    if (!idConversa) return

    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .eq('id_conversa', idConversa)
      .order('id', { ascending: true })

    if (data && !error) {
      listaMensagens.value = data as Mensagem[]
    }
  }

  const enviarMensagem = async (idConversa: number, texto: string) => {
    if (!idConversa || !texto.trim() || !currentUser.value) return false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('mensagens') as any)
      .insert([
        {
          id_conversa: idConversa,
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

  const inscreverRealtime = (idConversa: number, onNovaMensagem: () => void) => {
    if (!idConversa) return null

    const channel = supabase
      .channel(`mensagens_realtime_${idConversa}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensagens',
          filter: `id_conversa=eq.${idConversa}`
        },
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
    if (channel) {
      supabase.removeChannel(channel)
    }
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
