import Post from '../../models/Post.model';

export default {
  Query: {
    posts: async () => {
      const posts = await Post.find();
      return posts;
    },
    post: async (parent, { _id }, context, info) => {
      const post = await Post.findById(_id);
      return post;
    },
  },

  Mutation: {
    createPost: async (parent, { post }, context, info) => {
      const newPost = await Post.create({
        title: post.title,
        post: post.post,
      });
      return newPost;
    },
  },
};
