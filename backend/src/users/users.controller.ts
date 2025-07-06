import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Create the constructor
  constructor(private userService: UsersService) {}
  // Post method to create a new user
  @Post('register')
  // Register function
  async register(@Body() body: { email: string; password: string }) {
    // Call the create function from the UsersService, pass the email and password
    return this.userService.create(body?.email, body?.password);
  }
  // Post method to login a user
  @Post(`login`)
  // Login function
  async loginUser(@Body() body: { email: string; password: string }) {
    const data = await this.userService.login(body?.email, body?.password);
    // Call the login function from the UsersService, pass the email and password
    return {
      message: 'Login successful',
      user_email: data?.user?.email,
      token: data?.token,
    };
  }
}
