import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor) private readonly flavorsRepo: Repository<Flavor>,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsRepo.createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees','coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
