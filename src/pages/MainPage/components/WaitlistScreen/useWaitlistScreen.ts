import clockIcon from '@assets/icons/clock.svg?raw'
import percentCircleIcon from '@assets/icons/percent-circle-fill.svg?raw'
import { useGetWaitlistQuery } from '@shared/api'
import { APP_CONFIG, FEATURE_FLAGS } from '@shared/config'
import { useTelegram } from '@shared/hooks'
import { toBase64Url } from '@shared/lib'
import { useNavigate } from 'react-router-dom'

export const useWaitlistScreen = () => {
  const { handleHaptic, telegramId, webApp } = useTelegram()
  const navigate = useNavigate()

  const { data: waitlistData, isLoading: waitlistIsLoading } =
    useGetWaitlistQuery({
      enabled: FEATURE_FLAGS.WAITLIST_ENABLED,
    })

  const items = [
    {
      title: 'You are in waitlist',
      text: "You'll get a notification as soon as the app launches.",
      icon: clockIcon,
    },
    {
      title: 'Referral system',
      text: 'Invite other channels and earn a share of our fee from every deal they close.',
      icon: percentCircleIcon,
    },
  ]

  const handleReferralClick = () => {
    handleHaptic('soft')
    const refUrl = `refId=${telegramId}`
    const refParamBase64 = toBase64Url(refUrl)
    webApp?.openTelegramLink?.(
      `https://t.me/share/url?url=${APP_CONFIG.tgBotLink}?startapp=${refParamBase64}`,
    )
  }

  const handleAddChannel = () => {
    handleHaptic('soft')
    navigate('/add-bot-to-channel')
  }

  return {
    items,
    waitlistData,
    waitlistIsLoading,
    handleReferralClick,
    handleAddChannel,
  }
}
