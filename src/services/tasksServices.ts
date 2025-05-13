import api from '../plugins/api'
import type { PaginationParams, PaginationResult } from '../types/pagination'
import type { Task, TaskPayload } from '../types/Task'

const BASE_SERVICE_URL = '/api/task'

export const taskService = {
  async getAll(params : PaginationParams) {
    try {
      const response = await api.get<PaginationResult<Task>>(BASE_SERVICE_URL, {params: params })
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível carregar as tarefas: ${error}`)
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get<Task>(`${BASE_SERVICE_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Tarefa não encontrada: ${error}`)
    }
  },

  async create(task: Partial<TaskPayload>) {
    try {
      const response = await api.post<Task>(BASE_SERVICE_URL, task)
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível criar a tarefa: ${error}`)
    }
  },

  async update(id: number, task: Partial<TaskPayload>) {
    try {
      const response = await api.put<Task>(`${BASE_SERVICE_URL}/${id}`, task)
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível atualizar a tarefa: ${error}`)
    }
  },

  async delete(id: number) {
    try {
      const response = await api.delete(`${BASE_SERVICE_URL}/${id}`)
      return response.status === 204
    } catch (error) {
      throw new Error(`Não foi possível deletar a tarefa: ${error}`)
    }
  }
}
