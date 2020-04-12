import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        createPost(post: PostInput!): Boolean
        createPostDraft(post: PostInput!): Boolean
        updatePost(post: PostInput!): Boolean
        updatePostDraft(post: PostInput!): Boolean
    }

    extend type Query {
        getPostById(postId: ID!): Post,
        getPosts(limit: Int!, offset: Int!, filters: PostFilters!): [Post]
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

    enum Order {
        priceAscending,
        priceDescending,
        ratingAscending,
        ratingDescending,
        distanceAscending,
        distanceDescending
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
        postId: ID
        title: String
        description: String
        category: Category
        condition: Condition
        image: [String]
        delieveryMethod: DelieveryMethodInput
        price: PriceInput
        userId: ID
        tags: [String]
        orderBy: Order
        expiryTime: Date
        city: String
        school: [String]
    }

    input PostFilters {
        category: Category
        condition: Condition
        delieveryMethod: DelieveryMethodInput
        price: PriceInput
        userId: ID
        tags: [String]
        orderBy: Order
        expiryTime: Date
        text: String
        city: String
        school: [String]
    }
`

export default typeDefs;