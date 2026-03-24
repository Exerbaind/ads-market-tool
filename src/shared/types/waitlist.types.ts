import type { Channel } from './channel.types'
import type { Referral } from './referral.types'

export type Waitlist = {
  channels_connected: Channel[]
  referrals: Referral[]
}
