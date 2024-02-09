import { ApiProperty } from '@nestjs/swagger';

export class EditCategoryDto {
  @ApiProperty()
  name: string;
}
