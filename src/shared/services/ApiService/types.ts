export type ApiError = {
  code: string
  message: string
  details?: unknown
}

export type ApiFailure = {
  ok: false
  status: number
  data: null
  error: ApiError
}
