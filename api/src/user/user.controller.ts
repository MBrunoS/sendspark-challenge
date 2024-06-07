import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import MongooseClassSerializerInterceptor from './interceptor/mongoose-serializer.interceptor';
import { User } from './user.schema';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: { jobTitle?: string; companyName?: string }) {
    return this.userService.getAll(query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
