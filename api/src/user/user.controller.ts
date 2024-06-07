import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import MongooseClassSerializerInterceptor from './interceptor/mongoose-serializer.interceptor';
import { User } from './user.schema';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getAll();
  }
}
