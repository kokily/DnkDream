import { getRepository } from 'typeorm';
import {
  RemovePostMutationArgs,
  RemovePostResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../utils/authResolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Mutation: {
    RemovePost: adminResolver(
      async (_, args: RemovePostMutationArgs): Promise<RemovePostResponse> => {
        const { id } = args;

        try {
          await getRepository(Post).delete({ id });

          return {
            ok: true,
            error: null,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
