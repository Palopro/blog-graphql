import { mergeResolvers } from 'merge-graphql-schemas';
import UserResolver from './userResolver';
import PostResolver from './postResolver';

const resolvers = [UserResolver, PostResolver];

export default mergeResolvers(resolvers);
