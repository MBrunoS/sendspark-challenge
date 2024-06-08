import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const user = await this.userService.create(signUpDto);

    const payload = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
