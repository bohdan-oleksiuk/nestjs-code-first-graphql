import { Injectable } from '@nestjs/common';
import { CoffeesService } from "../coffees/coffees.service";
import { IDataloaders } from "./dataloader.interface";
import * as DataLoader from 'dataloader';
import { Flavor } from "../coffees/entities/flavor.entity";

@Injectable()
export class DataloaderService {
  constructor(
    private readonly coffeesService: CoffeesService,
  ) {}

  getLoaders(): IDataloaders {
    const flavorsLoader = this._createFlavorsLoader();
    return {
      flavorsLoader,
    };
  }

  private _createFlavorsLoader() {
    return new DataLoader<number, Flavor[]>(
      async (keys: readonly number[]) =>
        await this.coffeesService.coffeesWithFlavors(keys as number[]),
    );
  }
}
