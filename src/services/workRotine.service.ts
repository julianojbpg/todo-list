import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { DatabaseTask } from "../database/db.task"


@Injectable()
export class WorkRotine {
    constructor(private database:DatabaseTask){

    }
    @Cron(CronExpression.EVERY_11_HOURS)
    async rotinaDeLimparTarefasFinalizadas(){
       await this.database.clearTask()
    }
}