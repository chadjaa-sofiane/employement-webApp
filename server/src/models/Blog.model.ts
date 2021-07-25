import { getModelForClass, Prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.model";

@ObjectType()
class Comments {
  @Field((type) => ID)
  _id!: string;

  @Prop({ required: true })
  @Field()
  body!: String;

  @Prop({ required: true })
  @Field()
  likes!: number;
}
@ObjectType()
export class Blogs {
  @Field((type) => ID)
  _id!: string;

  @Prop({ required: true })
  @Field()
  body!: string;

  @Prop({ required: true })
  @Field()
  likes!: number;

  @Prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => ID)
  user!: Ref<User, string>;

  @Prop({ default: false })
  @Field()
  close!: boolean;

  @Prop({ type: () => Comments })
  @Field((type) => [Comments])
  comments!: Comments[];
}

export default getModelForClass(Blogs);
