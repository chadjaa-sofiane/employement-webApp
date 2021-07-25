import { gql } from "@apollo/client";

export const REGESTER = gql`
  mutation register($input: RegisterInput!) {
    Register(Inputs: $input) {
      accessToken
      refreshToken
    }
  }
`;
export const LOG_IN = gql`
  mutation Login($input: LoginInputs!) {
    Login(Inputs: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_POST = gql`
mutation createPost($inputs: PostApplicationRequestInputs!){
  createPost(Inputs:$inputs){
    _id
    createdAt
    close
  }
}
`