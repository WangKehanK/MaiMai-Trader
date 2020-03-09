import gql from 'graphql-tag';
import postTypeDefs from './post.js';
import userTypeDefs from './user.js';

const defaultTypeDefs = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    type Subscription {
        _empty: String
    }
`

const typeDefs = [defaultTypeDefs, postTypeDefs, userTypeDefs];

export default typeDefs;
