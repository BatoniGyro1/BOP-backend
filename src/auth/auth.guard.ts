import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AUTH_DECORATOR_KEY } from "./auth.decorator";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class MyAuthGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(AUTH_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if(isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = await this.getToken(request);
        

        try {
            const verificated = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWTSECRET
            });
            if(!verificated) {
                throw new UnauthorizedException()
            }
            request.user = verificated;
            return true;
        } catch(err) {
            throw new UnauthorizedException()
        }

    }

    async getToken(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined
    }
}