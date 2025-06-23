import { SetMetadata } from "@nestjs/common"
import { role } from "list/user/roles.enum"

export const ROLE_KEY = 'R0le_KeY'
export const Role = ((...role: role[]) => SetMetadata(ROLE_KEY, role));