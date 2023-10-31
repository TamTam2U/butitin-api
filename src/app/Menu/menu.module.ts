import { MenuController } from './controller/menu.controller';
import { MenuProviders } from './Provider/menu.provider';
import { MenuService } from './Service/menu.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService,...MenuProviders],
})
export class MenuModule {}
