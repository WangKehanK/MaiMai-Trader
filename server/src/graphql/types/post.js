import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation {
        createPost(post: PostInput!): ID
        createPostDraft(post: PostInput!): ID
        updatePost(post: PostInput!): ID
        updatePostDraft(post: PostInput!): ID
    }

    extend type Query {
        getPostById(postId: ID!): Post,
        getPosts(limit: Int, offset: Int, filters: PostFilters): [Post]
    }

    type Post {
        postId: ID
        title: String
        description: String
        category: Category
        subCategory: SubCategory
        condition: Condition
        image: [String]
        delieveryMethod: DelieveryMethod
        price: Price
        user: User
        tags: [String]
        isSellBefore: Boolean
    }

    type Price {
        offerPrice: Float
        originalPrice: Float
    }

    type DelieveryMethod {
        acceptPickUp: Boolean
        acceptDelievery: Boolean
        address: String
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

    enum SubCategory {
        Bed
        Sofa
        Desk
        Chair
        Organizer
        Lighting
        Appliance
        Decor
        Bathroom
        Kitchen
        Supplies
        Service
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
        acceptPickUp: Boolean
        acceptDelievery: Boolean
        address: String
        carrier: String
    }

    input PostInput {
        postId: ID
        title: String
        description: String
        category: Category
        subCategory: SubCategory
        condition: Condition
        image: [String]
        delieveryMethod: DelieveryMethodInput
        price: PriceInput
        userId: ID
        tags: [String]
        orderBy: Order
        expiryTime: Date
        isSellBefore: Boolean
        # city: String
        # school: [String]
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