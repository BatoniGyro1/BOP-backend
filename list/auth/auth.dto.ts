import { Expose } from "class-transformer";

export class AuthTokenResponseDto {
    @Expose()
    succesful: boolean

    @Expose()
    access_token: string

}