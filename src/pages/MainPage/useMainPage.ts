import { useGetWaitlistQuery } from '@shared/api'
import { FEATURE_FLAGS } from '@shared/config'

export const useMainPage = () => {
  const { data: waitlistData, isLoading: waitlistIsLoading } =
    useGetWaitlistQuery({
      enabled: FEATURE_FLAGS.WAITLIST_ENABLED,
    })

  return { waitlistData, waitlistIsLoading }
}
