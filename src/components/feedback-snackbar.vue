<template>
  <v-snackbar v-model="show" :color="color" timeout="2800" top class="text-center" height="7vh">
    <div class="text-center w-100">
      {{ message }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from '../composables/useSnackBarFeedback';

const { show, message, color } = useSnackbar()
</script>
