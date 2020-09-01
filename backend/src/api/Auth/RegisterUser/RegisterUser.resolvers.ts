import { getRepository } from 'typeorm';
import {
  RegisterUserMutationArgs,
  RegisterUserResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    RegisterUser: async (
      _,
      args: RegisterUserMutationArgs
    ): Promise<RegisterUserResponse> => {
      const { username, password } = args;
      let admin = false;

      try {
        // Exists User Check
        const exists = await getRepository(User).findOne({ username });

        if (exists) {
          return {
            ok: false,
            error: '이미 가입되어 있는 아이디입니다.',
          };
        } else {
          if (username === process.env.ADMIN_NAME) {
            admin = true;
          }

          // User Create
          const user = await getRepository(User).create({ ...args, admin });

          await user.setPassword(password);
          await user.save();

          return {
            ok: true,
            error: null,
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
