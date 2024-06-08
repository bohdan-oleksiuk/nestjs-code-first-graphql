import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Repository } from "typeorm";
import { UserInputError } from "apollo-server-express";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeesRepo: Repository<Coffee>,
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
    const coffee = this.coffeesRepo.create(createCoffeeInput);
    return this.coffeesRepo.save(coffee);
  }
}
