<template>
  <v-dialog v-model="model" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h6">{{ localTask.id ? 'Editar Tarefa' : 'Nova Tarefa' }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            v-model="localTask.title"
            label="Título"
            :rules="[rules.required]"
            required
          />
          <v-textarea
            v-model="localTask.description"
            label="Descrição"
            rows="3"
            auto-grow
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="primary" @click="save">{{ localTask.id ? 'Salvar' : 'Criar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { TaskPayload } from '../../../types/task';
  const rules = {
    required: (v: string) => !!v || 'Campo obrigatório',
  }
  
  const props = defineProps<{
    modelValue: boolean
    task: TaskPayload | null
  }>()
  
  const localTask = ref<TaskPayload>({
    id: null,
    title: '',
    description: '',
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void,
    (e: 'create', value: TaskPayload): void;
    (e: 'edit', value: TaskPayload): void;
  }>()
  
  const model = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
  })
  
  watch(model, (isOpen) => {
    console.log(props.task)
    if (isOpen && props.task) {
      Object.assign(localTask.value, {
        id: props.task.id,
        title: props.task.title ?? '',
        description: props.task.description ?? '',
      })
    }
  })

  function close(): void {
    console.log(localTask)
    model.value = false
  }

  function save(): void {
    if (localTask.value.id) {
      emit('edit', localTask.value)
    } else {
      emit('create', localTask.value)
    }
    close()
  }
  
  </script>