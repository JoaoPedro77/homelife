export type Mensagem = {
  id: number
  nome: string
  conteudo: string
  user_id?: string
  criado_em?: string
}

export type User = {
  id: string
  nome: string
}
