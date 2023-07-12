import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: string }) {
    console.log(
      '🚀 ~ file: jwt.strategy.ts:16 ~ JwtStrategy ~ validate ~ payload:',
      payload,
    );
    const user = await this.usersService.findById(payload.userId);
    console.log(
      '🚀 ~ file: jwt.strategy.ts:17 ~ JwtStrategy ~ validate ~ user:',
      user,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
