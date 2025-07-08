import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User/user.schema";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UsersService {
  // Create a constructor to inject the User model
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  // Function to create a new user
  async create(email: string, password: string): Promise<User> {
    try {
      // Check if the email already exists in the database
      const existingUser = await this.userModel.findOne({ email }).exec();
      // if existing, throw an error
      if (existingUser) throw new ConflictException("User already exists");
      // if not, add the password using bcrypt to hash it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create the user
      const user = new this.userModel({ email, password: hashedPassword });
      // Save the user
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : "Error creating user"
      );
    }
  }
  // Function to login a user
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    // Check if the email exists in the database
    const user = await this.userModel.findOne({ email }).exec();
    // if not, throw an error
    if (!user) throw new ConflictException("Email not found");
    // if yes, check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if not, throw an error
    if (!isPasswordCorrect)
      throw new UnauthorizedException("Invalid email or password");
    // if yes, return the user
    return { user, token: this.jwtService.sign({ email }) };
  }
}
