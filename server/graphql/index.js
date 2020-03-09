import GraphqlTools from 'graphql-tools';
import typeDefs from './types/index.js';
import resolvers from './resolvers/index.js';

const makeExecutableSchema = GraphqlTools.makeExecutableSchema;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };


