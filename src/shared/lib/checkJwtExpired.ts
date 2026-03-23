import { STORAGE_KEYS } from '@shared/config'
import { jwtDecode } from 'jwt-decode'

import ls from 'localstorage-slim'

export const checkJwtExpired = () => {
  const jwt = ls.get(STORAGE_KEYS.ADS_MARKET_JWT)
  try {
    if (!jwt) return true
    const { exp } = jwtDecode(jwt as string)
    if (!exp) return true
    return exp <= Math.floor(Date.now() / 1000) + 30
  } catch {
    return true
  }
}
