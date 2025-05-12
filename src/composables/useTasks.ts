import { ref, onMounted } from 'vue'
import { taskService } from '../services/tasksServices'
import type { Task, TaskPayload } from '../types/task'
import type { PaginationParams, PaginationResult } from '../types/pagination'

export function useTasks() {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const updateTask = async (id: number, taskData: Partial<TaskPayload>) => {
    try {
      await taskService.update(id, taskData)
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const deleteTask = async (id: number) => {
    try {
      const success = await taskService.delete(id)
      return success
    } catch (err) {
      error.value = (err as Error).message
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
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    createTaskToPayload
  }
}
