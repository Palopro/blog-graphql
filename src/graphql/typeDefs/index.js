import { mergeTypes } from 'merge-graphql-schemas';
import UserTypeDef from './userTypeDef';
import PostTypeDef from './postTypeDef';

const typeDefs = [UserTypeDef, PostTypeDef];

export default mergeTypes(typeDefs, { all: true });
