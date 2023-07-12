import { Test, TestingModule } from '@nestjs/testing';
import { TrasferService } from './trasfer.service';

describe('TrasferService', () => {
  let service: TrasferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrasferService],
    }).compile();

    service = module.get<TrasferService>(TrasferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
