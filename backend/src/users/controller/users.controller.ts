import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../service/users.service";

@Controller("users")
export class UsersController {
  // Create the constructor
  constructor(private userService: UsersService) {}
  // Post method to create a new user
  @Post("register")
  // Register function
  async register(@Body() body: { email: string; password: string }) {
    try {
      // Call the create function from the UsersService, pass the email and password
      return await this.userService.create(body?.email, body?.password);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  // Post method to login a user
  @Post(`login`)
  // Login function
  async loginUser(@Body() body: { email: string; password: string }) {
    try {
      const data = await this.userService.login(body.email, body.password);

      return {
        message: "Login successful",
        user_email: data?.user?.email,
        token: data?.token,
      };
    } catch (error) {
      // You can check the error type or message and respond accordingly
      throw new UnauthorizedException(error?.message || "Invalid credentials");
    }
  }
}
