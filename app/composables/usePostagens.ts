/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ref, type Ref } from 'vue'
import type { Postagem, Perfil } from '~/types'

export const usePostagens = (usuario?: Ref<Perfil | null>) => {
  const supabase = useSupabaseClient()
  const posts = ref<Postagem[]>([])
  const carregando = ref(false)
  const perfilPadrao = computed(() => usuario?.value ?? null)

  const validarConteudo = (conteudo: string, imagemArquivo?: File) => {
    const texto = conteudo.trim()
    return (texto.length > 0 && texto.length <= 500) || Boolean(imagemArquivo)
  }

  const converterImagemParaDataUrl = (arquivo: File): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!arquivo.type.startsWith('image/')) {
        resolve(null)
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          resolve(null)
        }
      }
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(arquivo)
    })
  }

  const mapPostagem = (p: any): Postagem => ({
    id: p.id,
    user_id: p.user_id,
    conteudo: p.conteudo,
    imagem_url: p.imagem_url,
    criado_em: p.criado_em,
    perfil: p.perfis
      ? {
          id: p.perfis.id,
          nome: p.perfis.nome,
          avatar_url: p.perfis.avatar_url
        }
      : undefined
  })

  const carregarPostagens = async (targetId?: string) => {
    carregando.value = true
    try {
      let query = (supabase.from('postagens') as any)
        .select('*, perfis(*)')

      if (targetId) {
        query = query.eq('user_id', targetId)
      }

      const { data, error } = await query.order('id', { ascending: false })

      if (error || !data) {
        posts.value = []
        return
      }

      posts.value = data.map(mapPostagem)
    } catch (e) {
      console.error('Erro ao carregar postagens:', e)
      posts.value = []
    } finally {
      carregando.value = false
    }
  }

  const criarPostagem = async (conteudo: string, imagemArquivo?: File) => {
    if (!perfilPadrao.value) return null
    if (!validarConteudo(conteudo, imagemArquivo)) {
      return null
    }

    let imagem_url: string | undefined
    if (imagemArquivo) {
      const resultado = await converterImagemParaDataUrl(imagemArquivo)
      if (!resultado) {
        return null
      }
      imagem_url = resultado
    }

    try {
      const { data, error } = await (supabase.from('postagens') as any)
        .insert([
          {
            user_id: perfilPadrao.value.id,
            conteudo: conteudo.trim(),
            imagem_url
          }
        ])
        .select('*, perfis(*)')
        .single()

      if (error || !data) {
        console.error('Erro ao criar postagem:', error?.message ?? 'Resposta inválida')
        return null
      }

      const novaPostagem = mapPostagem(data)
      posts.value = [novaPostagem, ...posts.value]
      return novaPostagem
    } catch (e) {
      console.error('Erro ao criar postagem:', e)
      return null
    }
  }

  const apagarPostagem = async (postId: number) => {
    if (!perfilPadrao.value) return false

    try {
      const { error } = await (supabase.from('postagens') as any)
        .delete()
        .eq('id', postId)
        .eq('user_id', perfilPadrao.value.id)

      if (error) {
        console.error('Erro ao apagar postagem:', error.message)
        return false
      }

      posts.value = posts.value.filter(post => post.id !== postId)
      return true
    } catch (e) {
      console.error('Erro ao apagar postagem:', e)
      return false
    }
  }

  const limparPostagens = () => {
    posts.value = []
  }

  const mensagemMaxima = computed(() => 500)
  const podeCriar = (conteudo: string) => validarConteudo(conteudo)

  return {
    posts,
    carregando,
    perfilPadrao,
    criarPostagem,
    apagarPostagem,
    limparPostagens,
    carregarPostagens,
    podeCriar,
    mensagemMaxima
  }
}
