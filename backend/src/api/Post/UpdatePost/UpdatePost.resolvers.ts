import { getRepository } from 'typeorm';
import {
  UpdatePostMutationArgs,
  UpdatePostResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../utils/authResolvers';
import Post from '../../../entities/Post';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    UpdatePost: adminResolver(
      async (_, args: UpdatePostMutationArgs): Promise<UpdatePostResponse> => {
        const { id } = args;

        try {
          const wedding = await getRepository(Post).findOne({ id });

          if (!wedding) {
            return {
              ok: false,
              error: '해당 포스트가 존재하지 않습니다.',
              post: null,
            };
          } else {
            const notNull = cleanNullArgs(args);

            await getRepository(Post).update(
              { id },
              { ...notNull, updatedAt: new Date() }
            );

            const updatePost = await getRepository(Post).findOne({ id });

            if (!updatePost) {
              return {
                ok: false,
                error: '알 수 없는 오류',
                post: null,
              };
            } else {
              return {
                ok: true,
                error: null,
                post: updatePost,
              };
            }
          }
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
