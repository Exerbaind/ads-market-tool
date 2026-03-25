import { ApiService } from '@shared/services'
import type { AuthRequest, AuthResponse } from '@shared/types'

const AUTH_ENDPOINT = '/market/auth'

export const authApi = {
  authorize: (payload: AuthRequest): Promise<AuthResponse> =>
    ApiService.post<AuthResponse>(
      AUTH_ENDPOINT,
      payload.refId ? { referrer: payload.refId } : undefined,
      {
        headers: payload.initData
          ? {
              'X-Telegram-InitData': payload.initData,
            }
          : undefined,
      },
    ),
}
