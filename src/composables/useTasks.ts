import { ref, onMounted } from 'vue'
import { taskService } from '../services/TasksServices'
import type { Task, TaskPayload } from '../types/Task'

export function useTasks() {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTasks = async () => {
    tasks.value = [
      {id: 1, done: true, title: 'aoba', description:'teste'},
      {id: 2, done: false, title: 'teste', description:'teste'}
    ]

    // isLoading.value = true
    // error.value = null
    // try {
    //   tasks.value = await taskService.getAll()
    // } catch (err) {
    //   error.value = (err as Error).message
    // } finally {
    //   isLoading.value = false
    // }
  }

  const createTask = async (taskData: Partial<Task>) => {
    try {
      await taskService.create(taskData)

    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const updateTask = async (id: number, taskData: Partial<Task>) => {
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

 function taskToPayload(task: Task): TaskPayload {
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
    taskToPayload
  }
}
