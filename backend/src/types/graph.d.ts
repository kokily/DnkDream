export const typeDefs = ["type CheckUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  CheckUser: CheckUserResponse!\n  ListUsers(cursor: ID, username: String): ListUsersResponse!\n  ReadUser(id: ID!): ReadUserResponse!\n  user: User\n}\n\ntype LoginUserResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  LoginUser(username: String!, password: String!): LoginUserResponse!\n  RegisterUser(username: String!, password: String!): RegisterUserResponse!\n  SecedeUser: SecedeUserResponse!\n  UpdateUser(password: String!): UpdateUserResponse!\n  RemoveUser(id: ID!): RemoveUserResponse!\n  SetAdmin(id: ID!): SetAdminResponse!\n}\n\ntype RegisterUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SecedeUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\nscalar Date\n\ntype ListUsersResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype ReadUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype RemoveUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SetAdminResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: ID!\n  username: String!\n  password: String!\n  admin: Boolean!\n  createdAt: Date!\n  updatedAt: Date\n}\n"];
/* tslint:disable */

export interface Query {
  CheckUser: CheckUserResponse;
  ListUsers: ListUsersResponse;
  ReadUser: ReadUserResponse;
  user: User | null;
}

export interface ListUsersQueryArgs {
  cursor: string | null;
  username: string | null;
}

export interface ReadUserQueryArgs {
  id: string;
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

export interface ListUsersResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface ReadUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  LoginUser: LoginUserResponse;
  RegisterUser: RegisterUserResponse;
  SecedeUser: SecedeUserResponse;
  UpdateUser: UpdateUserResponse;
  RemoveUser: RemoveUserResponse;
  SetAdmin: SetAdminResponse;
}

export interface LoginUserMutationArgs {
  username: string;
  password: string;
}

export interface RegisterUserMutationArgs {
  username: string;
  password: string;
}

export interface UpdateUserMutationArgs {
  password: string;
}

export interface RemoveUserMutationArgs {
  id: string;
}

export interface SetAdminMutationArgs {
  id: string;
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

export interface SecedeUserResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface RemoveUserResponse {
  ok: boolean;
  error: string | null;
}

export interface SetAdminResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}
