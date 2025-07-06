import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
import { EmployeesController } from "src/employees/controller/employees/employees.controller";
import { EmployeesService } from "src/employees/service/employees/employees.service";
import {
  Employee,
  EmployeeSchema,
} from "src/schemas/Employees/employees.schema";
import { UsersModule } from "src/users/module/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    // import UsersModule to get JwtService
    UsersModule,
  ],
  providers: [EmployeesService, JwtAuthGuard],
  controllers: [EmployeesController],
  exports: [EmployeesService],
})
export class EmployeesModule {}
