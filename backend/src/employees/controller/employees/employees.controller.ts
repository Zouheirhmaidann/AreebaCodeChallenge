import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
import { CreateOrUpdateEmployeeDto } from "src/employees/dto/create-employee.dto";
import { EmployeesService } from "src/employees/service/employees/employees.service";
import { Employee } from "src/schemas/Employees/employees.schema";

@Controller("employees")
export class EmployeesController {
  // Create the constructor
  constructor(private employeesService: EmployeesService) {}
  // Post method to create an employee
  @Post(`upsertEmployee`)
  @UseGuards(JwtAuthGuard)
  async upsert(@Body() body: CreateOrUpdateEmployeeDto): Promise<Employee> {
    try {
      // Call the upsert function from the EmployeesService
      return await this.employeesService.upsert(body);
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error upserting"
      );
    }
  }
  // Get method to fetch all employees
  @Get(`getEmployees`)
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("search") search?: string
  ): Promise<{
    data: CreateOrUpdateEmployeeDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    page = Number(page);
    limit = Number(limit);
    // Call the findAllPaginated function from the EmployeesService
    return this.employeesService.findAllPaginated(page, limit, search);
  }
  // Delete method to delete an employee
  @Delete("deleteEmployee/:id")
  @UseGuards(JwtAuthGuard)
  async deleteEmployee(@Param("id") id: string): Promise<{ message: string }> {
    // Call the deleteById function from the EmployeesService
    const deletedEmployee = await this.employeesService.deleteById(id);
    // Return the message
    if (deletedEmployee) {
      return {
        message: `Employee with email ${deletedEmployee?.email} deleted successfully.`,
      };
    } else {
      return { message: `Employee with id ${id} not found.` };
    }
  }
}
