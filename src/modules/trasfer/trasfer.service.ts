import { Injectable } from '@nestjs/common';
import { CreateTrasferDto } from './dto/create-trasfer.dto';
import { UpdateTrasferDto } from './dto/update-trasfer.dto';

@Injectable()
export class TrasferService {
  create(createTrasferDto: CreateTrasferDto) {
    return 'This action adds a new trasfer';
  }

  findAll() {
    return `This action returns all trasfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trasfer`;
  }

  update(id: number, updateTrasferDto: UpdateTrasferDto) {
    return `This action updates a #${id} trasfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trasfer`;
  }
}
