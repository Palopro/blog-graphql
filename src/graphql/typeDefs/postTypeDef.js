export default `
type Post {
    _id: ID
    title: String
    post: String
}

input NewPostInput {
    title: String
    post: String
}

type Query {
    posts: [Post]
    post(_id: ID): Post
}

type Mutation {
    createPost(post: NewPostInput): Post
}

`;
