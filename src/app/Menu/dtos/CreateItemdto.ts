import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  deskripsi: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  gambar: string;

  @ApiProperty()
  categoryId: string;

  createAt:string;
}
