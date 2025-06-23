import { SetMetadata } from "@nestjs/common";

export const AUTH_DECORATOR_KEY = 'AUTHKeY';
export const Public = (() => SetMetadata(AUTH_DECORATOR_KEY, true))