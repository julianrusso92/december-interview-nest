import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthEntity } from './entity/auth.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  create(@Body() { email, password }: LoginAuthDto) {
    return this.authService.login(email, password);
  }

  @Get('login')
  @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return { ok: true };
    // const users = await this.usersService.findAll();
    // return users.map((user) => new UserEntity(user));
  }
}
