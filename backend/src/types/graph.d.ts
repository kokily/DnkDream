export const typeDefs = ["type CheckUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  CheckUser: CheckUserResponse!\n  user: User\n}\n\ntype LoginUserResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  LoginUser(username: String!, password: String!): LoginUserResponse!\n  RegisterUser(username: String!, password: String!): RegisterUserResponse!\n}\n\ntype RegisterUserResponse {\n  ok: Boolean!\n  error: String\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  password: String!\n  admin: Boolean!\n  createdAt: Date!\n  updatedAt: Date\n}\n"];
/* tslint:disable */

export interface Query {
  CheckUser: CheckUserResponse;
  user: User | null;
}

export interface CheckUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: string;
  username: string;
  password: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export type Date = any;

export interface Mutation {
  LoginUser: LoginUserResponse;
  RegisterUser: RegisterUserResponse;
}

export interface LoginUserMutationArgs {
  username: string;
  password: string;
}

export interface RegisterUserMutationArgs {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface RegisterUserResponse {
  ok: boolean;
  error: string | null;
}
