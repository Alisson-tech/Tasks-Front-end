import { ref, watch, computed } from 'vue'
import type { PaginationParams, PaginationResult } from '../../types/pagination'

export function usePagination<T>(fetchFn: (params: PaginationParams) => Promise<PaginationResult<T>>) {
  const page = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const items = ref<T[]>([])
  const loading = ref(false)

  const params = computed(() => ({
    page: page.value,
    limit: itemsPerPage.value
  }))

  async function fetchData() {
    loading.value = true
    try {
      const result = await fetchFn(params.value)
      items.value = result.data
      totalItems.value = result.total
    } finally {
      loading.value = false
    }
  }

  watch(params, fetchData, { immediate: true })

  return {
    page,
    itemsPerPage,
    totalItems,
    items,
    loading,
    fetchData
  }
}
