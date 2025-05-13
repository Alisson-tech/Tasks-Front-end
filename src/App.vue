<script setup lang="ts">
import TasksPage from './pages/tasks/TasksPage.vue';
import feedbackSnackbar from './components/feedback-snackbar.vue';
</script>

<template>
  <v-app>
    <v-main>
      <TasksPage />
      <feedbackSnackbar />
    </v-main>
  </v-app>
</template>

