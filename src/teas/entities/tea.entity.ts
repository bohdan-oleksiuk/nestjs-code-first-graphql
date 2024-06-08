// import { Entity } from "typeorm";
import { ObjectType } from "@nestjs/graphql";
import { Drink } from "../../common/interfaces/drink.interface";

// @Entity()
@ObjectType({ implements: () => Drink })
export class Tea implements Drink{
  name: string;
}
