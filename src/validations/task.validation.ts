import { BadRequestException, Injectable } from "@nestjs/common";
import { IResult, ITask } from "src/types";
import { boolean, object, string } from "yup";

type ITaskUpdate = {
    titulo: string
    conteudo: string
}


@Injectable()
export class Validations {

    async validationTask(task: ITask): Promise<Omit<ITask, 'id'>> {
        const validation = object({
            titulo: string().required('Título é obrigatório'),
            conteudo: string().required('Conteúdo é obrigatório'),
            dataCriacao: string().default(() => new Date().toLocaleString('pt-BR')),
            dataAtualizacao: string().default(() => new Date().toLocaleString('pt-BR')),
            estado: boolean().default(() => false)
        })
        try {
            return await validation.validate(task, { abortEarly: false });
        } catch (err) {
            throw new BadRequestException({
                message: 'Erro de validação',
                errors: err.errors,
            })
        }
    }

    async validationUpdateTask(task: ITaskUpdate): Promise<IResult> {
        const validation = object({
            titulo: string().required('Título é obrigatório'),
            conteudo: string().required('Conteúdo é obrigatório'),
        })
        try {
            // Validação síncrona (pode usar .validateSync ou async com .validate)
            const result = await validation.validate(task, { abortEarly: false })
            return { status: true, messagem: 'validação feita com sucesso', value: result }
        } catch (err) {
            throw new BadRequestException({
                status: false,
                message: 'Erro de validação',
                value: err.errors,
            })
        }
    }
}