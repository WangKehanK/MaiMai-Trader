import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        authenticate(user: UserInput!): UserToken
    }

    extend type Query {
        getUser(phoneNumber: String): User,
        phoneNumberLogin(phoneNumber: String): String
        # getUsers: [User]
    }

    type User {
        userId: ID
        userName: String
        contact: Contact
        gender: Gender
        locale: Locale
        school: School
        avatar: String
    }

    type UserToken {
        token: String
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

    type Locale {
        city: String
        state: String
        country: String
    }

    enum Gender {
        Male
        Female
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
        userName: String # WeChat nickName
        openId: ID # WeChat openId
        unionId: ID # WeChat unionId
        code: ID # WeChat login Code
        gender: Gender
        locale: LocaleInput
        school: SchoolInput
        avatar: String
        contact: ContactInput
    }


`

export default typeDefs;