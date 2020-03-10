import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Query {
        getUser: User,
        getUsers: [User]
    }


    type User {
        userId: String
        userName: String
    }
`

export default typeDefs;