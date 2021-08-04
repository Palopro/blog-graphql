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
      pubsub.publish('POST_CREATED', { postCreated: args.post });
      return postController.createPost(args);
    },
  },

  Subscription: {
    OnPostCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};
