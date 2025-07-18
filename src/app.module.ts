import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TaskController } from "./controllers/task.controller";
import { TaskService } from "./services/task.service";
import { Validations } from "./validations/task.validation";
import { DatabaseTask } from "./database/db.task";
import { workModule } from "./workRoutine.module";




@Module({
  imports: [ConfigModule.forRoot(), workModule],
  controllers: [TaskController],
  providers: [TaskService, Validations, DatabaseTask],
})
export class AppModule {}
