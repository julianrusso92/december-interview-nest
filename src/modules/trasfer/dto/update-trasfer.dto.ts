import { PartialType } from '@nestjs/mapped-types';
import { CreateTrasferDto } from './create-trasfer.dto';

export class UpdateTrasferDto extends PartialType(CreateTrasferDto) {}
