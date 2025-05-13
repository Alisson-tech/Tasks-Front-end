// composables/useSnackbar.ts
import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('')

export function useSnackbar() {
  const open = (msg: string, clr: string) => {
    message.value = msg
    color.value = clr
    show.value = true
  }

  const openSuccess = (msg: string) => open(msg, 'success')
  const openError = (msg: string) => open(msg, 'error')
  const openWarning = (msg: string) => open(msg, 'info')

  return {
    show,
    message,
    color,
    openSuccess,
    openError,
    openWarning
  }
}
