import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Defining the schema for the user
@Schema()
export class User extends Document {
  // Add the email property
  @Prop({ required: true, unique: true })
  email: string;
  // Add the password property
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
