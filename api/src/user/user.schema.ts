import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @Exclude()
  _id: string;

  @Prop({ required: true, maxlength: 120 })
  firstName: string;

  @Prop({ required: true, maxlength: 120 })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    validate: /\S+@\S+\.\S+/,
  })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ required: true, maxlength: 120 })
  companyName: string;

  @Prop({ maxlength: 120 })
  jobTitle?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
