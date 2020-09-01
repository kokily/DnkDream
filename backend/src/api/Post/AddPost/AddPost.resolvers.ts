import { getRepository } from 'typeorm';
import { AddPostMutationArgs, AddPostResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../utils/authResolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Mutation: {
    AddPost: adminResolver(
      async (_, args: AddPostMutationArgs): Promise<AddPostResponse> => {
        try {
          const post = await getRepository(Post).create({ ...args });

          await post.save();

          return {
            ok: true,
            error: null,
            post,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            post: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
