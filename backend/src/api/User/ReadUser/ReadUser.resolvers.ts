import { getRepository } from 'typeorm';
import { ReadUserQueryArgs, ReadUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../utils/authResolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Query: {
    ReadUser: adminResolver(
      async (_, args: ReadUserQueryArgs): Promise<ReadUserResponse> => {
        const { id } = args;

        try {
          const user = await getRepository(User).findOne({ id });

          if (!user) {
            return {
              ok: false,
              error: '해당 사용자가 존재하지 않습니다.',
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
