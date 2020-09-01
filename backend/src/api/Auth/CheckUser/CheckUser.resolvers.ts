import { Context } from 'koa';
import { CheckUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    CheckUser: privateResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<CheckUserResponse> => {
        const { user } = ctx.state;

        try {
          if (!user) {
            return {
              ok: false,
              error: '로그인을 해주세요',
              user: null,
            };
          } else {
            return {
              ok: true,
              error: null,
              user,
            };
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
