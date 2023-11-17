import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateApplicantDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  nik: string;
  @ApiProperty()
  @IsNotEmpty()
  noHp: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  alamat: string;
  @ApiProperty()
  @IsNotEmpty()
  jenisKelamin: string;
  @ApiProperty()
  @IsNotEmpty()
  usia: string;
  @ApiProperty()
  @IsNotEmpty()
  url_berkas: string;

  createAt: string;
  status: string;
  userId: number;
}
