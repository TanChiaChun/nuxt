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
    return useFetch('/api/productivities')
  }

  function updateProductivity(id: number, productivity: ProductivityForm) {
    return $fetch(`/api/productivities/${id}`, {
      method: 'PUT',
      body: productivity,
    })
  }

  return {
    createProductivity,
    deleteProductivity,
    getProductivities,
    updateProductivity,
  }
}
