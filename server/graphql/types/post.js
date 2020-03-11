import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        createPost(post: PostInput!): Post
    }

    extend type Query {
        getPostById(postId: ID!): Post,
        getPosts: [Post]
    }

    type Post {
        postId: ID
        title: String
        description: String
        category: Category
        condition: Condition
        image: [String]
        delieveryMethod: DelieveryMethod
        price: Price
        user: User
    }

    type Price {
        offerPrice: Float
        originalPrice: Float
    }

    type DelieveryMethod {
        type: String!
        address: String!
        carrier: String
    }

    enum Condition {
        New
        GentlyUsed
        Used
        VeryUsed
    }

    enum Category {
        Furniture
        ElectronicDevice
        Fashion
        HomeAppliance
    }

    input PriceInput {
        offerPrice: Float
        originalPrice: Float
    }

    input DelieveryMethodInput {
        type: String
        address: String
        carrier: String
    }

    input PostInput {
        title: String!
        description: String!
        category: Category!
        condition: Condition!
        image: [String!]!
        delieveryMethod: DelieveryMethodInput!
        price: PriceInput!
        user: UserInput!
    }
`

export default typeDefs;