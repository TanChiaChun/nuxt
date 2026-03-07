import { getProductivities } from '#server/services/productivities.services'

export default defineEventHandler((event) => {
  return getProductivities()
})
