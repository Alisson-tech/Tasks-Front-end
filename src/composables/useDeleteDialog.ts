import { ref } from 'vue'

export function useDeleteDialog() {
  const dialog = ref(false)
  const itemName = ref<string | null>(null)

  const openDialog = (itemId: string) => {
    dialog.value = true
    itemName.value = itemId
  }

  const closeDialog = () => {
    dialog.value = false
    itemName.value = null
  }

  return {
    dialog,
    itemName,
    openDialog,
    closeDialog
  }
}
