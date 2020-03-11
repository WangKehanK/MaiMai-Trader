import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        createUser(user: UserInput!): User
    }

    extend type Query {
        getUser: User,
        getUsers: [User]
    }

    type User {
        userId: String
        userName: String
    }

    type Point {
        lat: Float
        lon: Float
    }

    type School {
        schoolId: String
        schoolName: String
        schoolCity: String
        schoolState: String
        location: Point
    }

    enum Gender {
        Male
        Femal
    }

    input SchoolInput {
        schoolId: String!
        schoolName: String!
    }

    input UserInput {
        userId: String 
        userName: String # WeChat nickName
        openId: String # WeChat openId
        unionId: String # WeChat unionId
        gender: Gender
        city: String
        state: String
        country: String
        avatar: String
        school: SchoolInput
    }
`

export default typeDefs;