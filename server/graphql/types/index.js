import gql from 'graphql-tag';
import postTypeDefs from './Post.js';
import userTypeDefs from './User.js';

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
