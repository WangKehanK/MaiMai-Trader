import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        createPost(post: PostInput!): Post
        createPostDraft(post: PostInput!): Post
        updatePost(post: PostInput!): Post
        updatePostDraft(post: PostInput!): Post
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
        tags: [String]
    }

    type Price {
        offerPrice: Float
        originalPrice: Float
    }

    type DelieveryMethod {
        deliveryType: DeliveryType!
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

    enum DeliveryType {
        delievery,
        pickup
    }

    input PriceInput {
        offerPrice: Float
        originalPrice: Float
    }

    input DelieveryMethodInput {
        deliveryType: DeliveryType
        address: String
        carrier: String
    }

    input PostInput {
        postId: String
        title: String!
        description: String!
        category: Category!
        condition: Condition!
        image: [String!]!
        delieveryMethod: DelieveryMethodInput!
        price: PriceInput!
        userId: String!
        tags: [String]!
    }
`

export default typeDefs;