export type Perfil = {
  id: string
  nome: string
  avatar_url?: string
  criado_em?: string
}

export type Postagem = {
  id: number
  user_id: string
  conteudo: string
  imagem_url?: string
  criado_em?: string
  // Usado quando retornamos os dados "juntos" do banco (JOIN)
  perfil?: Perfil
}

export type Conversa = {
  id: number
  user1_id: string
  user2_id: string
  criado_em?: string
  // Dados que preenchemos no frontend para exibir na lista:
  outro_participante?: Perfil
  ultima_mensagem?: Mensagem
}

export type Mensagem = {
  id: number
  id_conversa?: number
  nome: string
  conteudo: string
  user_id?: string
  criado_em?: string
}
