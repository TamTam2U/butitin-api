import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    id:string;
    @ApiProperty()
    @IsString()
    password:string;
}