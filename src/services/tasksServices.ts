import axios from 'axios'
import type { Task } from '../types/Task'

const BASE_URL = '/api/tasks'

export const taskService = {
  async getAll() {
    try {
      const response = await axios.get<Task[]>(BASE_URL)
      return response.data
    } catch (error) {
      throw new Error('Não foi possível carregar as tarefas.')
    }
  },

  async getById(id: number) {
    try {
      const response = await axios.get<Task>(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Task não encontrada.')
    }
  },

  async create(task: Partial<Task>) {
    try {
      const response = await axios.post<Task>(BASE_URL, task)
      return response.data
    } catch (error) {
      throw new Error('Não foi possível criar a tarefa.')
    }
  },

  async update(id: number, task: Partial<Task>) {
    try {
      const response = await axios.put<Task>(`${BASE_URL}/${id}`, task)
      return response.data
    } catch (error) {
      throw new Error('Não foi possível atualizar a tarefa.')
    }
  },

  async delete(id: number) {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`)
      return response.status === 204
    } catch (error) {
      throw new Error('Não foi possível deletar a tarefa.')
    }
  }
}
