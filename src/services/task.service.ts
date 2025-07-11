import { Injectable } from '@nestjs/common';
import { DatabaseTask } from '../database/db.task';
import { IResult, ITask } from 'src/types';
import { Validations } from '../validations/task.validation';

@Injectable()
export class TaskService {

  constructor(private validation: Validations, private database: DatabaseTask) { }


  async getAllTasks(): Promise<IResult> {
    const result = await this.database.getAllTask()
    return result
  }

  async registerTask(tarefa: ITask): Promise<IResult> {
    try {
      const validate = await this.validation.validationTask(tarefa)
      const result = await this.database.addTask(validate)
      return result
    } catch (error) {
      return { status: false, messagem: '', value: error }
    }
  }

  async searchTaskById(id: number): Promise<IResult> {
    const result = await this.database.getTaskById(id)
    return result
  }

  async updateTask(tarefa: ITask): Promise<IResult> {
    const { value } = await this.searchTaskById(tarefa.id)
    if (value == null)
      return { status: false, messagem: 'task não encontrada' }
    const validate = await this.validation.validationUpdateTask(tarefa)
    if (!validate.status)
      return validate
    const result = await this.database.updateTask(tarefa)
    return result
  }

  async finishTask(id: number, status: boolean): Promise<IResult> {
    const { value } = await this.searchTaskById(id)
    if (value == null)
      return { status: false, messagem: 'task não encontrada' }
      if(!status)
        return { status: false, messagem: 'o estado é falso'}
    const result = await this.database.finishTask(id, status)
    return result
  }

  async deleteTask(id: number): Promise<IResult> {
    const result = await this.database.deleteTask(id)
    return result
  }
}