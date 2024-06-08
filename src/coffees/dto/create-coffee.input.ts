import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType({ description: 'Create coffee input object type.' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'Coffee name' })
  name: string;
  brand: string;
  flavors: string[];
}
