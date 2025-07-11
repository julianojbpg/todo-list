export interface ITask{
  id: number
  titulo: string
  conteudo: string
  dataCriacao: string
  dataAtualizacao:string
  estado: boolean
}

export interface IResult{
    status: boolean
    messagem: string
    value?: object
}