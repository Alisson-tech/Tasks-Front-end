<template>
      <v-container class="fill-height">
        <v-row>
          <v-col align="center">
            <h1 class="mb-7 mx-2"><v-icon color="#FF8C00" class="mx-1">mdi-text-box-edit-outline</v-icon> Lista de Tarefas</h1>
            <v-btn class="mb-14" color="success font-weight-bold"><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn>
              <v-data-table
                class="rounded-lg"
                :headers="headers"
                :items="tasks"
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
                  
                  <v-icon color="error"  @click="openDeleteDialog(item.title)" class="ma-2">mdi-delete</v-icon>
  
                  <v-icon color="primary"  class="ma-2">mdi-pencil</v-icon>
                </template>
                
              </v-data-table>
          </v-col>
        </v-row>

        <delete-dialog v-model="dialogDelete" :item-name="itemName || ''" @update:model-value="closeDeleteDialog" @delete="onDelete"></delete-dialog>
      </v-container>
</template>

<script setup lang="ts">
import { Header } from '../../types/Headers';
import { Task } from '../../types/Task';

import deleteDialog from '../../components/delete-dialog.vue';
import { useDeleteDialog } from '../../composables/useDeleteDialog';

const { dialogDelete, itemName, openDeleteDialog, closeDeleteDialog} = useDeleteDialog();

const headers: Header[] = [
  { title: 'Feito', value: 'done', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' }},
  { title: 'Tarefa', value: 'title', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' }},
  { title: 'Descrição', value: 'description', sortable: false, align:'center', width: 40, headerProps: { class: 'font-weight-bold' } },
  { title: 'Ações', value: 'actions', sortable: false, align:'center', width: 10, headerProps: { class: 'font-weight-bold' } },
]

const tasks : Task[] = [
  {done: true, title: 'aoba', description:'teste'},
  {done: false, title: 'teste', description:'teste'}
]

function onDelete(){
  console.log("deletado");
}
</script>
