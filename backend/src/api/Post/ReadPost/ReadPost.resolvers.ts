import { getRepository } from 'typeorm';
import { ReadPostQueryArgs, ReadPostResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    ReadPost: async (_, args: ReadPostQueryArgs): Promise<ReadPostResponse> => {
      const { id } = args;

      try {
        const post = await getRepository(Post).findOne({ id });

        if (!post) {
          return {
            ok: false,
            error: '해당 포스트가 없습니다.',
            post: null,
          };
        } else {
          return {
            ok: true,
            error: null,
            post,
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          post: null,
        };
      }
    },
  },
};

export default resolvers;
