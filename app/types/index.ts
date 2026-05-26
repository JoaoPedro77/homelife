export type Mensagem = {
  id: number
  conversation_id?: number
  nome: string
  conteudo: string
  user_id?: string
  criado_em?: string
}

export type User = {
  id: string
  nome: string
}

export type Profile = {
  id: string
  display_name: string
  avatar_url?: string
  created_at?: string
}

export type Post = {
  id: number
  user_id: string
  content: string
  image_url?: string
  created_at?: string
  display_name?: string
  avatar_url?: string
}

export type Conversation = {
  id: number
  created_at?: string
  participant_name?: string
  participant_avatar?: string
  ultima_mensagem?: string
  ultimo_horario?: string
}
