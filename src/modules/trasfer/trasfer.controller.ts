import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrasferService } from './trasfer.service';
import { CreateTrasferDto } from './dto/create-trasfer.dto';
import { UpdateTrasferDto } from './dto/update-trasfer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('trasfer')
@ApiTags('trasfer')
export class TrasferController {
  constructor(private readonly trasferService: TrasferService) { }

  @Post()
  create(@Body() createTrasferDto: CreateTrasferDto) {
    return this.trasferService.create(createTrasferDto);
  }
}
