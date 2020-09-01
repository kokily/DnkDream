import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import { ApolloError } from 'apollo-server-koa';
import { getRepository } from 'typeorm';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new ApolloError('JWT_KEY is missing!!');
}

// Decode Token
export const decodeToken = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await getRepository(User).findOne({ id: decoded.id });

    if (!user) {
      throw new ApolloError('존재하지 않는 사용자입니다.');
    }

    return user;
  } catch (err) {
    return undefined;
  }
};

// Private Resolvers
const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  const { ctx }: { ctx: Context } = context;
  const token = ctx.request.headers['dnkdream_authenticate'];

  if (token) {
    const user = await decodeToken(token);

    if (user) {
      ctx.state.user = user;
    } else {
      ctx.state.user = undefined;
    }
  }

  console.log(ctx.state.user);

  if (ctx.state.user === undefined) {
    throw new Error('로그인을 해주세요');
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

export default privateResolver;
