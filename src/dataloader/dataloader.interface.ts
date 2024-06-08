import DataLoader from 'dataloader';
import { Flavor } from "../coffees/entities/flavor.entity";

export interface IDataloaders {
  flavorsLoader: DataLoader<number, Flavor[]>;
}
