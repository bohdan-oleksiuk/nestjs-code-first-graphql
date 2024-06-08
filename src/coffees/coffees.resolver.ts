import { Resolver, Query, Args, ID } from "@nestjs/graphql";
import { Coffee } from "./entities/coffee.entity";

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return null;
  }
}
