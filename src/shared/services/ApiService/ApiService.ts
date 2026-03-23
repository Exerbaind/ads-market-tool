import { APP_CONFIG, STORAGE_KEYS } from '@shared/config'
import ky, { HTTPError, type Input, type KyInstance, type Options } from 'ky'
import ls from 'localstorage-slim'
import type { ApiFailure } from './types'

type RequestOptions = Omit<Options, 'json'>
type ApiVersion = string
type ApiRequestOptions = RequestOptions & {
  version?: ApiVersion
}

const DEFAULT_API_VERSION = 'v1'
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i
const AUTH_PATH_SUFFIX = '/market/auth'

export class ApiClientError extends Error {
  readonly status: number
  readonly code: string
  readonly payload: ApiFailure

  constructor(payload: ApiFailure) {
    super(payload.error.message)
    this.name = 'ApiClientError'
    this.status = payload.status
    this.code = payload.error.code
    this.payload = payload
  }
}

const getJwtToken = () => {
  try {
    return ls.get<string>(STORAGE_KEYS.ADS_MARKET_JWT)
  } catch {
    return null
  }
}

const isAuthRequest = (request: Request): boolean => {
  try {
    return new URL(request.url).pathname.endsWith(AUTH_PATH_SUFFIX)
  } catch {
    return false
  }
}

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getOptionalString = (
  value: Record<string, unknown>,
  key: string,
): string | null => {
  const field = value[key]

  return typeof field === 'string' && field.trim() ? field : null
}

const parsePayloadError = (
  payload: unknown,
  status: number,
): ApiFailure | null => {
  if (!isObjectRecord(payload)) {
    return null
  }

  const code = getOptionalString(payload, 'error_code')

  if (!code) {
    return null
  }

  const message =
    getOptionalString(payload, 'error_message') ??
    getOptionalString(payload, 'message') ??
    code

  return {
    ok: false,
    status,
    data: null,
    error: {
      code,
      message,
      details: payload,
    },
  }
}

const toApiError = async (error: unknown): Promise<ApiFailure> => {
  if (error instanceof ApiClientError) {
    return error.payload
  }

  if (error instanceof HTTPError) {
    const status = error.response.status
    let responsePayload: unknown = null

    try {
      responsePayload = await error.response.clone().json()
    } catch {
      responsePayload = null
    }

    const payloadError = parsePayloadError(responsePayload, status)

    if (payloadError) {
      return payloadError
    }

    return {
      ok: false,
      status,
      data: null,
      error: {
        code: `HTTP_${status}`,
        message: error.message,
        details: responsePayload,
      },
    }
  }

  return {
    ok: false,
    status: 0,
    data: null,
    error: {
      code: 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    },
  }
}

const apiClient: KyInstance = ky.create({
  prefixUrl: APP_CONFIG.domain,
  hooks: {
    beforeRequest: [
      (request) => {
        if (isAuthRequest(request)) {
          request.headers.delete('Authorization')
          return
        }

        const jwt = getJwtToken()

        if (jwt) {
          request.headers.set('Authorization', `Bearer ${jwt}`)
        }
      },
    ],
  },
})

const withVersion = (input: Input, version?: ApiVersion): Input => {
  if (typeof input !== 'string' || ABSOLUTE_URL_PATTERN.test(input)) {
    return input
  }

  const normalizedPath = input.replace(/^\/+/, '')
  const resolvedVersion = version ?? DEFAULT_API_VERSION

  return `${resolvedVersion}/${normalizedPath}`
}

const request = async <TData>(
  input: Input,
  options?: Options & { version?: ApiVersion },
): Promise<TData> => {
  const { version, ...kyOptions } = options ?? {}
  const endpoint = withVersion(input, version)

  try {
    const response = await apiClient(endpoint, kyOptions)

    if (response.status === 204) {
      return null as TData
    }

    const payload = (await response.json()) as unknown
    const payloadError = parsePayloadError(payload, response.status)

    if (payloadError) {
      throw new ApiClientError(payloadError)
    }

    return payload as TData
  } catch (error) {
    const apiError = await toApiError(error)

    throw new ApiClientError(apiError)
  }
}

export const ApiService = {
  get: <TData>(input: Input, options?: ApiRequestOptions) =>
    request<TData>(input, { ...options, method: 'GET' }),

  post: <TData, TBody = unknown>(
    input: Input,
    body?: TBody,
    options?: ApiRequestOptions,
  ) => request<TData>(input, { ...options, method: 'POST', json: body }),

  put: <TData, TBody = unknown>(
    input: Input,
    body?: TBody,
    options?: ApiRequestOptions,
  ) => request<TData>(input, { ...options, method: 'PUT', json: body }),

  delete: <TData>(input: Input, options?: ApiRequestOptions) =>
    request<TData>(input, { ...options, method: 'DELETE' }),
}
