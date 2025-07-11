import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { IResult, ITask } from 'src/types';



// aqui sao as rotas 

@Controller('/tarefa')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('/buscarTodasAsTarefas')
  async buscarTodasAsTarefas(): Promise<IResult> {
    return await this.taskService.getAllTasks();
  }

  @Get('/buscarTarefaPorId/:id')
  async buscarTarefaPorId(@Param('id') id: string): Promise<IResult> {
    return await this.taskService.searchTaskById(Number(id));
  }

  @Post('/cadastrarTarefa')
  async cadastrarTarefa(@Body() tarefa: ITask): Promise<IResult> {
    return await this.taskService.registerTask(tarefa)
  }

  @Patch('/atualizarTarefa')
  async atualizarTarefa(@Body() tarefa: ITask) {
    return await this.taskService.updateTask(tarefa)
  }

  @Patch('/finalizarTarefa/:id')
  async finalizarTarefa(@Param('id') id: string , @Body() body: {status:boolean}) {
    return await this.taskService.finishTask(Number(id), body.status)
  }

  @Delete('/deletarTarefa/:id')
  async deletarTarefa(@Param('id') id: string): Promise<IResult> {
    return await this.taskService.deleteTask(Number(id))
  }

}
