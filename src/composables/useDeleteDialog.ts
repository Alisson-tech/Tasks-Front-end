import { ref } from 'vue'
import { ItemDelete } from '../types/itemDelete'

export function useDeleteDialog() {
  const dialog = ref(false)
  const itemDelete = ref<ItemDelete | null>(null)

  const openDialog = (item: ItemDelete) => {
    dialog.value = true
    itemDelete.value = item
  }

  const closeDialog = () => {
    dialog.value = false
    itemDelete.value = null
  }

  return {
    dialog,
    itemDelete,
    openDialog,
    closeDialog
  }
}
