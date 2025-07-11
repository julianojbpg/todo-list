import { Injectable } from "@nestjs/common"
import { IResult, ITask } from "src/types"
import prisma from "./db.connect"


@Injectable()

export class DatabaseTask {


    async addTask(task: Omit <ITask, 'id'>): Promise <IResult> {
        try {
            const result = await prisma.task.create({
                data: task
            })
            return { status: true, messagem: 'O cadastro de tarefa realizado com sucesso', value: result }
        } catch (error) {
            return { status: false, messagem: 'O cadastro de tarefa não foi realizado com sucesso', value: error }
        }
    }

    async getAllTask(): Promise <IResult> {
        try {
            const result = await prisma.task.findMany()
            return { status: true, messagem: 'Todas as tasks encontradas', value: result }
        } catch (error) {
            return { status: false, messagem: 'Nenhuma tarefa foi encontrada', value: error }
        }
    }

    async getTaskById(id: number): Promise <IResult> {
        try {
            const result = await prisma.task.findUnique({ where: { id } })
            if (result == null){
                return { status: false, messagem: 'Tarefa não encontrada'}
            }
            return { status: true, messagem: 'Tarefa encontrada', value: result }
        } catch (error) {
            return { status: false, messagem: 'Nenhuma tarefa foi encontrada', value: error }
        }
    }

    async updateTask(task: ITask): Promise <IResult> {
        try {
            const result = await prisma.task.update({ where: { id: task.id }, data: {
                titulo: task.titulo,
                conteudo: task.conteudo,
                dataAtualizacao: new Date().toLocaleString('pt-BR')
            } })
            if (result == null)
                return { status: false, messagem: 'Tarefa não encontrada', value: result }
            return { status: true, messagem: 'Tarefa encontrada', value: result }
        } catch (error) {
            return { status: false, messagem: 'Nenhuma tarefa foi encontrada', value: error }
        }
    }

    async finishTask(id: number, estado: boolean): Promise <IResult> {
        try {
            const result = await prisma.task.update({ where: { id }, data: {
                dataAtualizacao: new Date().toLocaleString('pt-BR'),
                estado
            } })
            if (result == null)
                return { status: false, messagem: 'Tarefa não encontrada', value: result }
            return { status: true, messagem: 'Tarefa finalizada', value: result }
        } catch (error) {
            return { status: false, messagem: 'Nenhuma tarefa foi encontrada', value: error }
        }
    }

    async deleteTask(id: number): Promise <IResult> {
        try {
            await prisma.task.delete({ where: { id } })
            return { status: true, messagem: 'Tarefa foi deletada' }
        } catch (error) {
            return { status: false, messagem: 'Nenhuma tarefa foi deletada', value: error }
        }
    }
}