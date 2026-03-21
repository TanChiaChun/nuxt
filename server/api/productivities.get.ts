import { z } from 'zod'
import { getProductivitiesByFrequency } from '#server/services/productivities.services'
import { FrequencyEnumSchema } from '#shared/schemas/productivities'

export default defineSafeEventHandler(async (event) => {
  const query = await validateQuery(
    event,
    z.object({ frequency: FrequencyEnumSchema }),
  )

  return getProductivitiesByFrequency(query.frequency)
})
