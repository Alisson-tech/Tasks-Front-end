import { ref } from 'vue'

export function useCreateEditDialog<T = any>() {
  const dialog = ref(false)
  const editedItem = ref<T | null>(null)

  const openDialog = (item?: T) => {
    dialog.value = true
    editedItem.value = item ?? null
  }

  const closeDialog = () => {
    dialog.value = false
    editedItem.value = null
  }

  return {
    dialog,
    editedItem,
    openDialog,
    closeDialog
  }
}
