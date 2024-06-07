import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { PaginatedResponse } from 'src/utils/types/PaginatedResponse';

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
    query: {
      jobTitle?: string;
      companyName?: string;
      page?: number;
      per_page?: number;
    } = {},
  ): Promise<PaginatedResponse<User>> {
    const { jobTitle, companyName } = query;
    let { page = 1, per_page = 10 } = query;

    page = Number(page);
    per_page = Number(per_page);

    if (page < 1 || per_page < 1) {
      throw new BadRequestException('invalid page or per_page');
    }

    let filters = {};

    if (jobTitle) {
      filters['jobTitle'] = jobTitle;
    }
    if (companyName) {
      filters['companyName'] = companyName;
    }

    const users = await this.userModel
      .find(filters)
      .skip((page - 1) * per_page)
      .limit(per_page)
      .exec();

    const totalUsers = await this.userModel.countDocuments(filters).exec();

    return {
      data: users,
      totalPages: Math.ceil(totalUsers / per_page),
      page: Number(page),
      per_page: Number(per_page),
    };
  }

  async remove(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('user not found');
    }
    this.userModel.deleteOne({ _id: user._id }).exec();
  }
}
