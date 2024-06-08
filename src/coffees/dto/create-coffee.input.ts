import { Field, InputType } from "@nestjs/graphql";

@InputType({ description: 'Create coffee input object type.' })
export class CreateCoffeeInput {
  @Field(() => String, { description: 'Coffee name' })
  name: string;
  brand: string;
  flavors: string[];
}
