import { ref, onMounted } from 'vue'
import { taskService } from '../services/tasksServices'
import { useSnackbar } from './useSnackBarFeedback'

import type { Task, TaskPayload } from '../types/Task'
import type { PaginationParams } from '../types/pagination'

export function useTasks() {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const { openSuccess, openError } = useSnackbar()

  const fetchTasks = async (params: PaginationParams) => {
      try {
      const response = await taskService.getAll(params);
      return response
    } catch (err) {
      return {
        data: [],
        total: 0
      }
    }
  }

  const createTask = async (taskData: Partial<TaskPayload>) => {
    try {
      await taskService.create(taskData)
      openSuccess('Tarefa criada com sucesso')
    } catch (err) {
      openError((err as Error).message)
    }
  }

  const updateTask = async (id: number, taskData: Partial<TaskPayload>) => {
    try {
      await taskService.update(id, taskData)
      openSuccess('Tarefa atualizada com sucesso')
    } catch (err) {
      openError((err as Error).message)
    }
  }

  const updateTaskCompleted = async (id: number, completed: boolean) => {
    try {
      await taskService.updateCompleted(id, completed)
      openSuccess('Status da tarefa atualizado!')
    } catch (error) {
      openError((error as Error).message)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await taskService.delete(id)
      openSuccess('Tarefa deletada com sucesso')
    } catch (err) {
      openError((err as Error).message)
    }
  }

 function createTaskToPayload(task: Task): TaskPayload {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
    }
  }

  onMounted(fetchTasks)

  return {
    tasks,
    isLoading,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskCompleted,
    deleteTask,
    createTaskToPayload
  }
}
