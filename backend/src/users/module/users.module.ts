import { Module } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { UsersController } from "../controller/users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  // Importing the user schema
  imports: [
    // Add mongoose module for database
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Add JWT module for authentication
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
