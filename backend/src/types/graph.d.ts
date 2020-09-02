export const typeDefs = ["type CheckUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  CheckUser: CheckUserResponse!\n  ListPosts(cursor: ID, title: String): ListPostsResponse!\n  ReadPost(id: ID!): ReadPostResponse!\n  post: Post\n  ListUsers(cursor: ID, username: String): ListUsersResponse!\n  ReadUser(id: ID!): ReadUserResponse!\n  user: User\n}\n\ntype LoginUserResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  LoginUser(username: String!, password: String!): LoginUserResponse!\n  RegisterUser(username: String!, password: String!): RegisterUserResponse!\n  SucedeUser: SucedeUserResponse!\n  UpdateUser(password: String!): UpdateUserResponse!\n  AddPost(title: String!, body: String!, thumbnail: String): AddPostResponse!\n  RemovePost(id: ID!): RemovePostResponse!\n  UpdatePost(id: ID!, title: String, body: String, thumbnail: String): UpdatePostResponse!\n  RemoveUser(id: ID!): RemoveUserResponse!\n}\n\ntype RegisterUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SucedeUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\nscalar Date\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype ListPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype ReadPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype RemovePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  body: String!\n  thumbnail: String\n  createdAt: Date!\n  updatedAt: Date\n}\n\ntype UpdatePostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype ListUsersResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype ReadUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype RemoveUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: ID!\n  username: String!\n  password: String!\n  admin: Boolean!\n  createdAt: Date!\n  updatedAt: Date\n}\n"];
/* tslint:disable */

export interface Query {
  CheckUser: CheckUserResponse;
  ListPosts: ListPostsResponse;
  ReadPost: ReadPostResponse;
  post: Post | null;
  ListUsers: ListUsersResponse;
  ReadUser: ReadUserResponse;
  user: User | null;
}

export interface ListPostsQueryArgs {
  cursor: string | null;
  title: string | null;
}

export interface ReadPostQueryArgs {
  id: string;
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

export interface ListPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ReadPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

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
  SucedeUser: SucedeUserResponse;
  UpdateUser: UpdateUserResponse;
  AddPost: AddPostResponse;
  RemovePost: RemovePostResponse;
  UpdatePost: UpdatePostResponse;
  RemoveUser: RemoveUserResponse;
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

export interface AddPostMutationArgs {
  title: string;
  body: string;
  thumbnail: string | null;
}

export interface RemovePostMutationArgs {
  id: string;
}

export interface UpdatePostMutationArgs {
  id: string;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
}

export interface RemoveUserMutationArgs {
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

export interface SucedeUserResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface AddPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface RemovePostResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdatePostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface RemoveUserResponse {
  ok: boolean;
  error: string | null;
}
