export type UserRole = 'admin' | 'user'

export type User = {
  first_name: string
  id: number
  last_name: string
  locale: string
  photo: string
  role: UserRole
  username: string
  wallet_address: string
}
