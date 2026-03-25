import crownIcon from '@assets/icons/crown.svg?raw'
import lockCircleIcon from '@assets/icons/lock-circle-fill.svg?raw'
import percentCircleIcon from '@assets/icons/percent-circle-fill.svg?raw'
import { useTelegram } from '@shared/hooks'
import { useNavigate } from 'react-router-dom'

export const useEmptyScreen = () => {
  const { handleHaptic } = useTelegram()
  const navigate = useNavigate()

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

  const handleButtonClick = () => {
    handleHaptic('soft')
    navigate('/add-bot-to-channel')
  }

  return { items, handleButtonClick }
}
