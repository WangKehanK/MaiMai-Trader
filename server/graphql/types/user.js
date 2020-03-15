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
        userId: ID
        userName: String
        contact: Contact
    }

    type Contact {
        wechat: String
        qq: String
        email: String
        phone: String
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
        schoolId: String
        schoolName: String
    }

    input LocaleInput {
        city: String
        state: String
        country: String
    }

    input ContactInput {
        qq: String
        email: String
        phone: String
        wechat: String
    }

    input UserInput {
        userId: ID 
        userName: String # WeChat nickName
        openId: ID # WeChat openId
        unionId: ID # WeChat unionId
        gender: Gender
        locale: LocaleInput
        school: SchoolInput
        avatar: String
        contact: ContactInput
    }
`

export default typeDefs;