import { ref } from 'vue'

export function useCreateEditDialog<T = any>() {
  const dialogCreateEdit = ref(false)
  const editedItem = ref<T | null>(null)

  const openDialog = (item?: T) => {
    dialogCreateEdit.value = true
    editedItem.value = item ?? null
  }

  const closeDialog = () => {
    dialogCreateEdit.value = false
    editedItem.value = null
  }

  return {
    dialogCreateEdit,
    editedItem,
    openDialog,
    closeDialog
  }
}
