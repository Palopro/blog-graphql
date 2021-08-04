import Post from '../models/Post.model';

class PostController {
  allPosts = async () => {
    const posts = await Post.find();
    return posts;
  }

  findPostById = async (args) => {
    const {_id} = args;
    const post = await Post.findById(_id);
    return post;
  }

  createPost = async (args) => {
    const {post} = args;

    const newPost = await Post.create({
      title: post.title,
      post: post.post,
      authorId: post.authorId,
    });
    return newPost;
  }
}

export const postController = new PostController();
