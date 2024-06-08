import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { CoffeesModule } from "../coffees/coffees.module";

@Module({
  imports: [CoffeesModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
