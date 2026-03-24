import { ApiService } from '@shared/services'
import type { Waitlist } from '@shared/types'

const GET_WAITLIST_ENDPOINT = '/market/waitlist'

export const waitlistApi = {
  getWaitlist: () => ApiService.get<Waitlist>(GET_WAITLIST_ENDPOINT),
}
