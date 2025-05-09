import { ref } from 'vue'

export function useDeleteDialog() {
  const dialogDelete = ref(false)
  const itemName = ref<string | null>(null)

  const openDeleteDialog = (itemId: string) => {
    dialogDelete.value = true
    itemName.value = itemId
  }

  const closeDeleteDialog = () => {
    dialogDelete.value = false
    itemName.value = null
  }

  return {
    dialogDelete,
    itemName,
    openDeleteDialog,
    closeDeleteDialog
  }
}
