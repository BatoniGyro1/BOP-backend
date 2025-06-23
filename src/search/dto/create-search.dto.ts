import { IsString } from "class-validator";

export class CreateSearchDto {
    @IsString()
    find: string
}
