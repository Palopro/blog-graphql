export default `
type User {
    _id: ID
    username: String
    password: String
    email: String
}
type AuthUser {
    user: User
    authToken: String
}
type Query {
    users: [User]
    user(_id: ID): User
}
type Mutation {
    registerUser(user: RegisterUserInput): User!
    loginUser(user: LoginUserInput): AuthUser
}
input RegisterUserInput {
    username: String!
    email: String!
    password: String!
}
input LoginUserInput {
    email: String!
    password: String!
}
`;
