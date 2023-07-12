import { Test, TestingModule } from '@nestjs/testing';
import { TrasferController } from './trasfer.controller';
import { TrasferService } from './trasfer.service';

describe('TrasferController', () => {
  let controller: TrasferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrasferController],
      providers: [TrasferService],
    }).compile();

    controller = module.get<TrasferController>(TrasferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
