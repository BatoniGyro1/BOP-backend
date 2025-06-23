import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { role } from "list/user/roles.enum";
import { ROLE_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const role = this.reflector.getAllAndOverride<role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(!role) {
            return true;
        }

        try {
            const request = context.switchToHttp().getRequest();
            const userRole = request.user.role;          
            return role.some((role) => role.includes(userRole));
        } catch {
            throw new ForbiddenException()
        }

    }
}