import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkRotine } from './services/workRotine.service';
import { DatabaseTask } from './database/db.task';

@Module({
  imports: [
    ScheduleModule.forRoot(), // importa o módulo de schedule
  ],
  providers: [WorkRotine, DatabaseTask],
})
export class workModule {}
