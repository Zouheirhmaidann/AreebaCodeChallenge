import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrUpdateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  department: string;

  @IsString()
  position: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @Type(() => Number)
  @IsNumber({}, { message: "salary must be a number" })
  salary: number;
}
