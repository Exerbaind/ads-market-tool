import type { UrlParams } from '@shared/types'

const URL_PARAM_KEYS = {
  refId: true,
} satisfies Record<UrlParams, true>

const isUrlParam = (key: string): key is UrlParams => key in URL_PARAM_KEYS

export const parseUrlParams = (
  value: string | null,
): Partial<Record<UrlParams, string>> => {
  if (!value) return {}

  const normalizedValue = value.startsWith('?') ? value.slice(1) : value
  const searchParams = new URLSearchParams(normalizedValue)
  const result: Partial<Record<UrlParams, string>> = {}

  for (const [key, paramValue] of searchParams.entries()) {
    if (!isUrlParam(key)) continue
    result[key] = paramValue
  }

  return result
}
