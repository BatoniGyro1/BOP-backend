import { role } from "list/user/roles.enum";

export interface TokenInterface {
    id: number;
    email: string;
    phoneNumber: string;
    role: role;
}