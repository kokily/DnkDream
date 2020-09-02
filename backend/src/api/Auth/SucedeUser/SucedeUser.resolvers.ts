import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { SucedeUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { privateResolver } from '../../../utils/authResolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    SucedeUser: privateResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<SucedeUserResponse> => {
        const { user } = ctx.state;

        try {
          await getRepository(User).delete({ id: user.id });

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
