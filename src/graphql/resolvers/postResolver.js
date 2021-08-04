import { PubSub } from 'graphql-subscriptions';
import { postController } from '../../controllers/postController';

const pubsub = new PubSub();

export default {
  Query: {
    posts: async () => postController.allPosts(),
    post: async (parent, args, context) => postController.findPostById(args),
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const newPost = await postController.createPost(args);
      await pubsub.publish('POST_CREATED', {
        post: { ...newPost },
      });
      return newPost;
    },
  },
  Subscription: {
    OnPostCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};
