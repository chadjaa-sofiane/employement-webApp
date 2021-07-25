import Post from "../../models/postAppReq.model";
import { ArgsType, Int, Ctx, Field, Query, Args } from "type-graphql";
import { Authorized, Resolver } from "type-graphql";
import { Context } from "vm";
import { PostApplicationRequest } from "../../models/postAppReq.model";

@ArgsType()
class Option {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

@Resolver()
class employerQueries {
  @Authorized("employer")
  @Query(() => [PostApplicationRequest])
  async getMyPosts(
    @Args() { skip = 0, limit = 10 }: Option,
    @Ctx() ctx: Context
  ) {
    try {
      const { _id } = ctx.payload;
      skip = Math.abs(skip);
      const myPosts = await Post.find({ employer: _id })
        .skip(skip)
        .limit(limit);
      return myPosts;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default employerQueries;
