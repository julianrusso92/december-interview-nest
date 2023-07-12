import { Module } from '@nestjs/common';
import { TrasferService } from './trasfer.service';
import { TrasferController } from './trasfer.controller';

@Module({
  controllers: [TrasferController],
  providers: [TrasferService]
})
export class TrasferModule {}
