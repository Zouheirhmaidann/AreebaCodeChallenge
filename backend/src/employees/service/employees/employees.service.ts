import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOrUpdateEmployeeDto } from "src/employees/dto/create-employee.dto";
import { Employee } from "src/schemas/Employees/employees.schema";

@Injectable()
export class EmployeesService {
  // Create the constructor to inject the User model
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>
  ) {}

  // Function to create an employee
  async upsert(data: CreateOrUpdateEmployeeDto): Promise<Employee> {
    try {
      const { email, full_name, department, position, address, phone, salary } =
        data;
      // Check if email already exists in the database
      const existingEmployee = await this.employeeModel
        .findOne({ email })
        .exec();
      // if existing, update the employee
      if (existingEmployee) {
        await this.employeeModel
          .findOneAndUpdate(
            { email },
            { full_name, department, position, address, phone, salary },
            {
              new: true,
            }
          )
          .exec();
        return existingEmployee;
      }
      // Create the employee
      const newEmployee = new this.employeeModel(data);
      // Save the employee
      return newEmployee.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error upserting"
      );
    }
  }
  // Function to create multiple employees for testing
  async upsertMany(
    employees: CreateOrUpdateEmployeeDto[]
  ): Promise<Employee[]> {
    const results: Employee[] = [];

    for (const emp of employees) {
      try {
        // Call the upsert function from the EmployeesService
        const updatedOrCreated = await this.upsert(emp);
        results.push(updatedOrCreated);
      } catch (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : "Error upserting"
        );
      }
    }

    return results;
  }

  // Function to fetch all employees
  async findAllPaginated(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    let filter = {};
    if (search) {
      // Use regex for case-insensitive partial matching
      const searchRegex = new RegExp(search, "i");
      // Use $or operator to search in multiple fields
      filter = {
        $or: [
          { email: searchRegex },
          { address: searchRegex },
          { phone: searchRegex },
          { department: searchRegex },
          { position: searchRegex },
          { full_name: searchRegex },
        ],
      };
    }

    try {
      // Fetch the employees
      const [data, total] = await Promise.all([
        this.employeeModel.find(filter).skip(skip).limit(limit).exec(),
        this.employeeModel.countDocuments(filter).exec(),
      ]);
      // Return the employees
      return { data, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error fetching employees"
      );
    }
  }

  // Function to fetch an employee by id
  async findOne(email: string): Promise<Employee> {
    try {
      // Check if email already exists in the database
      const existingEmployee = await this.employeeModel
        .findOne({ email: email })
        .exec();
      // if existing, throw an error
      if (!existingEmployee)
        throw new ConflictException("Employee with this email does not exist");
      // Return the employee
      return existingEmployee;
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error fetching employee"
      );
    }
  }

  // Function to delete an employee
  async deleteById(id: string): Promise<Employee | null> {
    try {
      // Find and delete the employee, returning the deleted doc
      return await this.employeeModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error deleting employee"
      );
    }
  }
}
