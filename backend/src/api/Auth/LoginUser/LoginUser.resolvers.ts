import { LoginUserMutationArgs, LoginUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { getRepository } from 'typeorm';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    LoginUser: async (
      _,
      args: LoginUserMutationArgs
    ): Promise<LoginUserResponse> => {
      const { username, password } = args;

      try {
        // User find
        const user = await getRepository(User).findOne({ username });

        if (!user) {
          return {
            ok: false,
            error: '해당하는 사용자가 없습니다.',
            token: null,
          };
        } else {
          // 비밀번호 확인
          const valid = await user.validPassword(password);

          if (!valid) {
            return {
              ok: false,
              error: '비밀번호가 맞지 않습니다.',
              token: null,
            };
          } else {
            // 토큰 발행
            const token = user.generateToken();

            return {
              ok: true,
              error: null,
              token,
            };
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
