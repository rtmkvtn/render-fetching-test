import { useQuery } from '@tanstack/react-query'

import { loyaltyBatcher } from './loyaltyBatcher'

export function useBatchedLoyalty(brandId: number) {
  return useQuery({
    queryKey: ['loyalty', brandId],
    queryFn: () => loyaltyBatcher.fetch(brandId),
    staleTime: 10 * 60 * 1000,
  })
}
