import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
// Defining the schema for the employee
@Schema()
export class Employee extends Document {
  // Full name
  @Prop({ required: true })
  full_name: string;
  // Email
  @Prop({ required: true, unique: true })
  email: string;
  // Password
  @Prop({ required: true })
  department: string;
  // Position
  @Prop({ required: true })
  position: string;
  // Address
  @Prop({ required: true })
  address: string;
  // Phone
  @Prop({ required: true })
  phone: string;
  // Salary
  @Prop({ required: true })
  salary: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
