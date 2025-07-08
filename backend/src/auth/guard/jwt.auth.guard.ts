import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// Payload of the JWT token
interface JwtPayload {
  email: string;
  // Issued at
  iat?: number;
  // Expiration time
  exp?: number;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // Inject the JWT service
  constructor(private jwtService: JwtService) {}

  // Check if the request is authorized
  canActivate(context: ExecutionContext): boolean {
    // Get the request from the context
    const request: Request = context.switchToHttp().getRequest();
    // Get the token from the authorization header
    const token = request.headers["authorization"] as string | undefined;

    // Check if the token is present
    if (!token) {
      // If not, throw an unauthorized exception
      throw new UnauthorizedException("No token provided");
    }

    try {
      // Verify the token
      const payload = this.jwtService.verify<JwtPayload>(token, {
        // Use the secret key from the environment variable
        secret: process.env.JWT_SECRET,
      });
      // Attach the user info to the request if needed
      request["user"] = payload;
      // Return true if the token is valid
      return true;
    } catch {
      // If the token is invalid, throw an unauthorized exception
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
