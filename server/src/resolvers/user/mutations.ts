import { UserInputError } from "apollo-server-errors";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { createTokens } from "../../lib/token";
import { LoginInputs, RegisterInput } from "./inputs";
import User from "../../models/user.model";
import { hash, verify } from "argon2";

@ObjectType()
class TokenFileds {
  @Field({ nullable: false })
  accessToken!: string;

  @Field({ nullable: false })
  refreshToken!: string;

  @Field()
  userType!: string;
}

@Resolver()
class userMutations {
  @Mutation(() => TokenFileds)
  async Register(@Arg("Inputs") Inputs: RegisterInput) {
    const { employer, jobSekeer, userType, phone } = Inputs;
    //employer cannot be employer and jobSekeer in the same time
    if (isNaN(Number(phone.number))) {
      throw new UserInputError("phone most be a number", {
        errors: {
          phone: "phone number most be a valide number",
        },
      });
    }
    if (employer && jobSekeer) {
      throw new UserInputError("user Input Error", {
        errors: {
          message: "user cannot be employer and jobSekeer in the smae time ",
        },
      });
    }
    if (
      (jobSekeer && userType == "employer") ||
      (employer && userType == "jobSekeer")
    ) {
      throw new UserInputError("user Input Error", {
        errors: {
          userType: "Inputs do not match with userType !!! ",
        },
      });
    }
    if (
      (userType == "employer" && !employer) ||
      (userType == "jobSekeer" && !jobSekeer)
    ) {
      throw new UserInputError("there are no enough data");
    }
    const hashPassowrd = await hash(Inputs.password).catch((e) => {
      throw new Error();
    });
    //add new user
    const newUser = new User({ ...Inputs, password: hashPassowrd });
    const res = await newUser.save();

    //prepare tokens
    const [accessToken, refreshToken] = createTokens({
      _id: res._id,
      userType: Inputs.userType,
    });
    //sned accessToken and refreshToken to the client
    return {
      userType: Inputs.userType,
      accessToken,
      refreshToken,
    };
  }
  @Mutation(() => TokenFileds)
  async Login(@Arg("Inputs") Inputs: LoginInputs) {
    const { email, password } = Inputs;
    const res = await User.findOne({ email });
    if (!res) {
      throw new UserInputError("email doe's not exist !!", {
        errors: { email: "email doe's not exist " },
      });
    }
    if (!(await verify(res.password!, password))) {
      throw new UserInputError("incorrect password !!", {
        errors: { password: "incorrect password !!" },
      });
    }
    const [accessToken, refreshToken] = createTokens({
      _id: res._id,
      userType: res.userType,
    });
    //send tokens and refreshToken to the client
    return {
      userType: res.userType,
      accessToken,
      refreshToken,
    };
  }
}

export default userMutations;
