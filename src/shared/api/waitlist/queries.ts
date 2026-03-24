import type { ApiClientError } from '@shared/services'
import type { Channel, Waitlist } from '@shared/types'
import { useQuery } from '@tanstack/react-query'
import { waitlistApi } from './api'

export const waitlistKeys = {
  all: ['waitlist'] as const,
  waitlistPolling: (ids: string) => [waitlistKeys.all, 'polling', ids] as const,
}

type WaitlistQueryOptions = {
  enabled?: boolean
}

type PollingWaitlistQueryOptions = WaitlistQueryOptions & {
  baselineChannels?: Channel[]
  refetchInterval?: number
}

export const useGetWaitlistQuery = (options?: WaitlistQueryOptions) => {
  return useQuery<Waitlist, ApiClientError>({
    queryKey: waitlistKeys.all,
    queryFn: waitlistApi.getWaitlist,
    enabled: options?.enabled,
    staleTime: 15_000,
  })
}

export const usePollingWaitlistChannelQuery = (
  options?: PollingWaitlistQueryOptions,
) => {
  const baselineIds = new Set(
    (options?.baselineChannels ?? []).map((item) => item.id),
  )
  const baselineSignature = Array.from(baselineIds).join('|')

  const query = useQuery<Waitlist, ApiClientError, Channel | null>({
    queryKey: waitlistKeys.waitlistPolling(baselineSignature),
    enabled: options?.enabled ?? false,
    refetchInterval: options?.refetchInterval ?? 3000,
    refetchOnWindowFocus: true,
    queryFn: waitlistApi.getWaitlist,
    select: (channels) => {
      return (
        channels.channels_connected.find(
          (channel) => !baselineIds.has(channel.id),
        ) ?? null
      )
    },
  })

  return {
    ...query,
    newChannel: query.data ?? null,
  }
}
