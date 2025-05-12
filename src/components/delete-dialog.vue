<template>
    <v-dialog v-model="model" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          Confirmar exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir
          <strong>{{ item?.name }}</strong>?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="close">Cancelar</v-btn>
          <v-btn color="error" @click="save">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
<script setup lang="ts">
  import { computed } from 'vue'
  import { ItemDelete } from '../types/itemDelete';
  
  const props = defineProps<{
    modelValue: boolean
    item: ItemDelete | null
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void,
    (e: 'delete', value: number): void;
  }>()
  
  const model = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
  })
  
  function close(): void {
    model.value = false
  }

  function save(): void{
    if(props.item != null)
      emit('delete', props.item.id)
    
      close();
  }
  
  </script>
  