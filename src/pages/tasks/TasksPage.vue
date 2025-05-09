<template>
      <v-container class="fill-height">
        <v-row>
          <v-col align="center">
            <h1 class="mb-7 mx-2"><v-icon color="#FF8C00" class="mx-1">mdi-text-box-edit-outline</v-icon> Lista de Tarefas</h1>
            <v-btn class="mb-14" color="success font-weight-bold" @click="CreateEditDialogState.openDialog"><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn>
              <v-data-table
                class="rounded-lg"
                :headers="headers"
                :items="TaskManager.tasks.value"
                :items-per-page="5"
                no-data-text="Cadastre uma Tarefa"
              >
                <template v-slot:item.done="{ item }">
                  <v-checkbox
                    v-model="item.done"
                    class="d-flex justify-center"
                    color="success"
                  ></v-checkbox>
                </template>
                
                <template v-slot:item.actions="{ item }">
                  
                  <v-icon color="error"  @click="deleteDialogState.openDialog(item.title)" class="ma-2">mdi-delete</v-icon>
  
                  <v-icon color="primary"  class="ma-2" @click="onEditItem(item)">mdi-pencil</v-icon>
                </template>
                
              </v-data-table>
          </v-col>
        </v-row>

        <delete-dialog v-model="deleteDialogState.dialog.value" :item-name="deleteDialogState.itemName.value || ''" @update:model-value="deleteDialogState.closeDialog" @delete="onDelete"></delete-dialog>
        <create-edit-dialog v-model="CreateEditDialogState.dialog.value" :task="CreateEditDialogState.editedItem.value"  @update:model-value="CreateEditDialogState.closeDialog" @create="CreateEditDialogState.closeDialog" @edit="CreateEditDialogState.closeDialog"></create-edit-dialog>
      </v-container>
</template>

<script setup lang="ts">
import deleteDialog from '../../components/delete-dialog.vue';
import createEditDialog from './components/create-edit-dialog.vue';

import { useDeleteDialog } from '../../composables/useDeleteDialog';
import { useCreateEditDialog } from '../../composables/useCreateEditDialog';
import { useTasks } from '../../composables/useTasks';

import { Header } from '../../types/Headers';
import { Task, TaskPayload } from '../../types/Task';



const deleteDialogState = useDeleteDialog();
const CreateEditDialogState = useCreateEditDialog<TaskPayload>();
const TaskManager = useTasks();

const headers: Header[] = [
  { title: 'Feito', value: 'done', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' }},
  { title: 'Tarefa', value: 'title', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' }},
  { title: 'Descrição', value: 'description', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' } },
  { title: 'Ações', value: 'actions', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' } },
]

function onDelete(){
  console.log("deletado");
}

function onEditItem(item: Task){
  const editedTaks = TaskManager.taskToPayload(item)
  CreateEditDialogState.openDialog(editedTaks)
}
</script>
