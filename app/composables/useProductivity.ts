import type { ProductivityForm } from '#shared/schemas/productivities'

export function useProductivity() {
  function createProductivity(productivity: ProductivityForm) {
    return $fetch('/api/productivities', {
      method: 'POST',
      body: productivity,
    })
  }

  function deleteProductivity(id: number) {
    return $fetch(`/api/productivities/${id}`, { method: 'DELETE' })
  }

  function getProductivities() {
    return useFetch('/api/productivities', {
      transform: productivities => productivities.map(productivity => ({
        ...productivity,
        lastCheck: new Date(productivity.lastCheck),
      }))
    })
  }

  function getProductivity(id: number) {
    return useFetch(`/api/productivities/${id}`, {
      transform: productivity => ({
        ...productivity,
        lastCheck: new Date(productivity.lastCheck),
        previousLastCheck: new Date(productivity.previousLastCheck),
      })
    })
  }

  function updateProductivity(id: number, productivity: ProductivityForm) {
    return $fetch(`/api/productivities/${id}`, {
      method: 'PUT',
      body: productivity,
    })
  }

  function updateProductivityLastCheck(id: number, lastCheck: Date) {
    return $fetch(`/api/productivities/${id}`, {
      method: 'PATCH',
      body: { lastCheck: lastCheck },
    })
  }

  return {
    createProductivity,
    deleteProductivity,
    getProductivity,
    getProductivities,
    updateProductivity,
    updateProductivityLastCheck,
  }
}
