import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const user = await this.findByEmail(signUpDto.email);
    if (user) {
      throw new BadRequestException('user already exists');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(signUpDto.password, salt);
    const createdUser = new this.userModel({
      ...signUpDto,
      _id: uuid(),
      password: hash,
    });

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async getAll(
    query: { jobTitle?: string; companyName?: string } = {},
  ): Promise<User[]> {
    return this.userModel.find(query).exec();
  }

  async remove(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('user not found');
    }
    this.userModel.deleteOne({ _id: user._id }).exec();
  }
}
