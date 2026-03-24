import { AppRoutes } from '@Routes'
import { useAuthMutation } from '@shared/api'
import { useTelegram } from '@shared/hooks'
import { checkJwtExpired } from '@shared/lib'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function App() {
  const { mutate: authMutate } = useAuthMutation()
  const {
    webApp,
    applyTelegramTheme,
    initTelegramApp,
    subscribeTelegramTheme,
  } = useTelegram()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isExipred = checkJwtExpired()
    if (!isExipred) return
    authMutate()
  }, [authMutate])

  useEffect(() => {
    initTelegramApp()
  }, [initTelegramApp])

  useEffect(() => {
    applyTelegramTheme()
    return subscribeTelegramTheme()
  }, [applyTelegramTheme, subscribeTelegramTheme])

  useEffect(() => {
    const backButton = webApp?.BackButton
    if (!backButton) return

    const isRootRoute = location.pathname === '/'

    const handleBackClick = () => {
      const canGoBack = (window.history.state?.idx ?? 0) > 0

      if (canGoBack) {
        navigate(-1)
        return
      }

      navigate('/', { replace: true })
    }

    if (isRootRoute) {
      backButton.hide()
      return
    }

    backButton.show()
    backButton.onClick(handleBackClick)

    return () => {
      backButton.offClick(handleBackClick)
    }
  }, [location.pathname, navigate, webApp])

  return <AppRoutes />
}
