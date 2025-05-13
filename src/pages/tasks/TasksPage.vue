<template>
      <v-container class="fill-height">
        <v-row>
          <v-col align="center">
            <h1 class="mb-7 mx-2"><v-icon color="#FF8C00" class="mx-1">mdi-text-box-edit-outline</v-icon> Lista de Tarefas</h1>
            <v-btn class="mb-14" color="success font-weight-bold" @click="createEditDialogState.openDialog"><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn>
              <v-data-table-server
                class="rounded-lg"
                :headers="headers"
                :items="paginationManager.items.value"
                :items-length="paginationManager.totalItems.value"
                :items-per-page="paginationManager.itemsPerPage.value"
                :page="paginationManager.page.value"
                :loading="paginationManager.loading.value"
                :items-per-page-options="[5, 10, 25, 50]"
                @update:page="paginationManager.page.value = $event; paginationManager.fetchData()"
                @update:items-per-page="paginationManager.itemsPerPage.value = $event; paginationManager.fetchData()"
                no-data-text="Cadastre uma Tarefa"
              >
                <template v-slot:item.completed="{ item }">
                  <v-checkbox
                    v-model="item.completed"
                    class="d-flex justify-center"
                    color="success"
                  ></v-checkbox>
                </template>
                
                <template v-slot:item.actions="{ item }">
                  
                  <v-icon color="error"  @click="deleteDialogState.openDialog({ id: item.id, name: item.title })" class="ma-2">mdi-delete</v-icon>
  
                  <v-icon color="primary"  class="ma-2" @click="openEditItem(item)">mdi-pencil</v-icon>
                </template>
                
              </v-data-table-server>
          </v-col>
        </v-row>

        <delete-dialog v-model="deleteDialogState.dialog.value" :item="deleteDialogState.itemDelete.value" @update:model-value="deleteDialogState.closeDialog" @delete="handleDelete"></delete-dialog>
        <create-edit-dialog v-model="createEditDialogState.dialog.value" :task="createEditDialogState.editedItem.value"  @update:model-value="createEditDialogState.closeDialog" @create="handleCreate" @edit="handleEdit"></create-edit-dialog>
      </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import deleteDialog from '../../components/delete-dialog.vue';
import createEditDialog from './components/create-edit-dialog.vue';

import { useDeleteDialog } from '../../composables/useDeleteDialog';
import { useCreateEditDialog } from '../../composables/useCreateEditDialog';
import { useTasks } from '../../composables/useTasks';
import { usePagination } from '../../composables/usePagination';

import { Header } from '../../types/Headers';
import { Task, TaskPayload } from '../../types/Task';

const deleteDialogState = useDeleteDialog();
const createEditDialogState = useCreateEditDialog<TaskPayload>();
const taskManager = useTasks();
const paginationManager = usePagination<Task>(taskManager.fetchTasks)

const headers: Header[] = [
  { title: 'Feito', key: 'completed', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' }},
  { title: 'Tarefa', key: 'title', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' }},
  { title: 'Descrição', key: 'description', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' } },
  { title: 'Ações', key: 'actions', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' } },
]

onMounted(() => {
  paginationManager.fetchData()
})

function openEditItem(item: Task){
  const editedTaks = taskManager.createTaskToPayload(item)
  createEditDialogState.openDialog(editedTaks)

  paginationManager.fetchData()
}

async function handleCreate(item: TaskPayload) {
  await taskManager.createTask(item)
  await paginationManager.fetchData()
}

async function handleEdit(item: TaskPayload) {
  await taskManager.updateTask(item.id!, item)
  await paginationManager.fetchData()
}

async function handleDelete(id : number){
  await taskManager.deleteTask(id);
  await paginationManager.fetchData()
}
</script>
