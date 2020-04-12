import { gql } from 'apollo-boost'

export const category = gql`
  query {
    category {
      name
      id
      image
    }
  }
`

export const createProduct = gql`
  mutation CreatePost($title: String, $description: String, $category: Category){
    createPost(post: {title: $title, description: $description, category: $category,expiryTime:"2020-03-15T00:48:09Z"})
  }
`

export const login = gql`
  mutation authenticate($code: ID, $nickName: String){
    authenticate(user: {
      code: $code
      userName: $nickName
    }) {
      token
    }
  }
`
