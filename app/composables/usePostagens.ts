import { computed, ref } from 'vue'
import type { Postagem, Perfil } from '~/types'

const posts = ref<Postagem[]>([])
const nextPostId = ref(1)

const perfilPadrao: Perfil = {
  id: '0',
  nome: 'Você',
  avatar_url: 'https://i.pravatar.cc/150?img=12'
}

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

const montarPostagem = (
  conteudo: string,
  perfil: Perfil,
  imagem_url?: string
): Postagem => ({
  id: nextPostId.value,
  user_id: perfil.id,
  conteudo: conteudo.trim(),
  criado_em: new Date().toISOString(),
  perfil,
  imagem_url
})

const criarPostagem = async (
  conteudo: string,
  perfil: Perfil = perfilPadrao,
  imagemArquivo?: File
) => {
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

  const novaPostagem = montarPostagem(conteudo, perfil, imagem_url)
  posts.value = [novaPostagem, ...posts.value]
  nextPostId.value += 1
  return novaPostagem
}

const limparPostagens = () => {
  posts.value = []
  nextPostId.value = 1
}

export const usePostagens = () => {
  const mensagemMaxima = computed(() => 500)
  const podeCriar = (conteudo: string) => validarConteudo(conteudo)

  return {
    posts,
    perfilPadrao,
    criarPostagem,
    limparPostagens,
    podeCriar,
    mensagemMaxima
  }
}
