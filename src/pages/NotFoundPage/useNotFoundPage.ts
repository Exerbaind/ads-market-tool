import { useNavigate } from 'react-router-dom'

export const useNotFoundPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    const canGoBack = (window.history.state?.idx ?? 0) > 0

    if (canGoBack) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }
  return {
    handleBack,
  }
}
