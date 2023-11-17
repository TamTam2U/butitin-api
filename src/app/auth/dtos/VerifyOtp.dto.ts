import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    otp: string;
}