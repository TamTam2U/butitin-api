import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EditItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  deskripsi: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  gambar: string | null;

  updateAt:Date;
}
