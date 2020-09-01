import { Context } from 'koa';
import { getRepository } from 'typeorm';
import {
  UpdateUserMutationArgs,
  UpdateUserResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { privateResolver } from '../../../utils/authResolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    UpdateUser: privateResolver(
      async (
        _,
        args: UpdateUserMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<UpdateUserResponse> => {
        const { user } = ctx.state;
        const { password } = args;

        try {
          const beforeUser = await getRepository(User).findOne({ id: user.id });

          if (!beforeUser) {
            return {
              ok: false,
              error: '해당하는 사용자가 없습니다.',
              user: null,
            };
          } else {
            await beforeUser.setPassword(password);
            await beforeUser.save();

            const updateUser = await getRepository(User).findOne({
              id: user.id,
            });

            if (!updateUser) {
              return {
                ok: false,
                error: '알 수 없는 오류',
                user: null,
              };
            } else {
              return {
                ok: true,
                error: null,
                user: updateUser,
              };
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
