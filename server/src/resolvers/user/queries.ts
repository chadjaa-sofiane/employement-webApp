import { Types } from "mongoose";
import {
  Authorized,
  Resolver,
  Query,
  Ctx,
  ArgsType,
  Field,
  Int,
  Args,
  Arg,
  ID,
  registerEnumType,
} from "type-graphql";
import { User, default as userModel } from "../../models/user.model";
import { PostApplicationRequest } from "../../models/postAppReq.model";
import Post from "../../models/postAppReq.model";
import { FilterInput, UsersFilter } from "./inputs";
import { getNewAccessToken } from "../../lib/token";
import Context from "../../interfaces/ContextType";
import { jobAccordingField, JobFileds, States } from "../../enums";
import {
  getPostsInputFilter,
  getUsersInputFilter,
} from "../../lib/inputsFilters";

registerEnumType(JobFileds, { name: "JobFileds" });

@ArgsType()
class input {
  @Field(() => JobFileds)
  jobField!: JobFileds;
}
@ArgsType()
class Option {
  @Field({ nullable: true })
  title?: string;

  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

@ArgsType()
class UserOptions {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

// I will work to make it cleanner later
// you can say that is version one of filter

@Resolver()
class userQueries {
  @Query(() => [PostApplicationRequest])
  async getAllPosts(
    @Args() { title = "", skip = 0, limit = 10 }: Option,
    @Arg("filter") filter: FilterInput = {}
  ) {
    try {
      (title as unknown as RegExp) = new RegExp(title);
      const input: any = getPostsInputFilter(title, filter);
      skip = Math.abs(skip);
      const posts = await Post.find(input)
        .skip(skip)
        .limit(limit)
        .populate("employer");
      return posts;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => Number)
  async getPostsCount(
    @Args() { title = "" }: Option,
    @Arg("filter") filter: FilterInput = {}
  ) {
    try {
      (title as unknown as RegExp) = new RegExp(title);
      const input: any = getPostsInputFilter(title, filter);
      const count = await Post.count(input);
      return count;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => PostApplicationRequest)
  async gePostById(@Arg("id", () => ID) id: string) {
    try {
      const post = await Post.findById(Types.ObjectId(id)).populate("employer");
      return post;
    } catch (e) {}
  }
  @Authorized()
  @Query(() => User)
  async getMyInfo(@Ctx() ctx: Context) {
    const { _id } = ctx.payload;
    try {
      return await userModel.findById(Types.ObjectId(_id));
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => [User])
  async getUsers(
    @Args() { skip = 0, limit = 10 }: UserOptions,
    @Arg("filter") filter: UsersFilter = {}
  ) {
    try {
      const input: any = getUsersInputFilter(filter);
      skip = Math.abs(skip);
      return await userModel
        .find(input)
        .skip(skip)
        .limit(limit)
        .populate("dealWith.userId");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => User)
  async getUserById(@Arg("id", () => ID) userId: string) {
    try {
      return userModel
        .findById(Types.ObjectId(userId))
        .populate("dealWith.userId");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => User)
  async getUserByName(@Arg("userName") userName: string) {
    try {
      (userName as unknown as string[]) = userName.split("_");
      const firstName: string = userName[0] || "";
      const lastName: string = userName[1] || "";
      return await userModel
        .findOne({ firstName, lastName })
        .populate("dealWith.userId");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Query(() => String)
  async refreshToken(@Arg("refreshToken") refreshToken: string) {
    try {
      return getNewAccessToken(refreshToken);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  // get values to fit it in inputs
  @Query((type) => [String])
  async getAllStates() {
    return Object.keys(States).sort();
  }
  @Query((type) => [String])
  async getAllJobsField() {
    return Object.keys(JobFileds).sort();
  }
  @Query((type) => [String])
  async jobAccordingField(@Args() { jobField }: input) {
    return jobAccordingField[jobField];
  }
  @Query((type) => [String])
  async getJobsByJobFieldName(@Arg("jobField") jobField: string) {
    return jobAccordingField[jobField];
  }
}

export default userQueries;
