import { getProductivities } from '#server/services/productivities.services'

export default defineSafeEventHandler((event) => {
  return getProductivities()
})
