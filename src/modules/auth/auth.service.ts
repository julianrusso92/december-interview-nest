import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthEntity } from './entity/auth.entity';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) { }


  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
      // throw new AppError({
      //   httpCode: HttpCode.UNPROCESSABLE_ENTITY,
      //   description: 'Usuario o contraseña incorrecta',
      // });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');

      // throw new AppError({
      //   httpCode: HttpCode.UNPROCESSABLE_ENTITY,
      //   description: 'Usuario o contraseña incorrecta',
      // });
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };

    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }
}
