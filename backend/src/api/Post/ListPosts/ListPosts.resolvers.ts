import { getManager, getRepository } from 'typeorm';
import { ListPostsQueryArgs, ListPostsResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';
import limitHtml from '../../../utils/limitHtml';

const resolvers: Resolvers = {
  Query: {
    ListPosts: async (
      _,
      args: ListPostsQueryArgs
    ): Promise<ListPostsResponse> => {
      const { cursor, title } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Post, 'post')
          .limit(10)
          .orderBy('post.createdAt', 'DESC')
          .addOrderBy('post.id', 'DESC');

        if (cursor) {
          const post = await getRepository(Post).findOne({ id: cursor });

          if (!post) {
            return {
              ok: false,
              error: '잘못된 요청',
              posts: null,
            };
          } else {
            query.andWhere('post.createdAt < :date', { date: post.createdAt });
            query.orWhere('post.createdAt = :date AND post.id < :id', {
              date: post.createdAt,
              id: post.id,
            });
          }
        }

        if (title) {
          query.andWhere('post.title like :title', { title: `%${title}%` });
        }

        const beforePosts = await query.getMany();

        const posts = beforePosts.map((post) => ({
          ...post,
          title: limitHtml(post.title, 'title'),
          body: limitHtml(post.body, 'body'),
        }));

        return {
          ok: true,
          error: null,
          posts,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          posts: null,
        };
      }
    },
  },
};

export default resolvers;
