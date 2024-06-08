import { Injectable } from "@nestjs/common";
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Repository } from "typeorm";
import { UserInputError } from "apollo-server-express";
import { UpdateCoffeeInput } from "./dto/update-coffee.input";
import { Flavor } from "./entities/flavor.entity";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeesRepo: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepo: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll() {
    return this.coffeesRepo.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepo.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeesRepo.create({ ...createCoffeeInput, flavors });
    const newCoffee = await this.coffeesRepo.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffee });
    return newCoffee;
  }

  async update (id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors = updateCoffeeInput.flavors && (await Promise.all(
      updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
    ));
    const coffee = await this.coffeesRepo.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepo.save(coffee);
  }

  async remove (id: number) {
    const coffee = await this.findOne(id);
    return this.coffeesRepo.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepo.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepo.create({ name });
  }
}
