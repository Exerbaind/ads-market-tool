import crownIcon from '@assets/icons/crown.svg'
import lockCircleIcon from '@assets/icons/lock-circle-fill.svg'
import percentCircleIcon from '@assets/icons/percent-circle-fill.svg'
import { APP_CONFIG } from '@shared/config'
import { useTelegram } from '@shared/hooks'

export const useMainPage = () => {
  const { webApp, handleHaptic } = useTelegram()

  const items = [
    {
      title: 'You set the price and format',
      text: 'Set your own price for a post or story in your channel. No deal goes through without your ok.',
      icon: crownIcon,
    },
    {
      title: 'Payment is locked upfront',
      text: 'We hold the money before the campaign starts and release it once the ad is live.',
      icon: lockCircleIcon,
    },
    {
      title: 'Earn from referrals',
      text: 'Invite other channel owners and advertisers, earn a share of our fee from every deal they close.',
      icon: percentCircleIcon,
    },
  ]

  const handleAddChanel = () => {
    handleHaptic('soft')
    const link = `${APP_CONFIG.tgBotLink}?startchannel&admin=post_messages+edit_messages+delete_messages+invite_users+manage_chat+promote_members+post_stories+edit_stories+delete_stories`
    webApp?.openTelegramLink?.(link)
  }

  return { items, handleAddChanel }
}
