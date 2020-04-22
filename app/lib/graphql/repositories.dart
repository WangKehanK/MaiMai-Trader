class Repository {
  static const String Get_Posts = """
    query GetPosts(\$limit: Int!, \$offset: Int!, \$filters: PostFilters!) {
      getPosts(limit: \$limit, offset: \$offset, filters: \$filters) {
          postId
          title
          description
          image
          price {
            offerPrice
            originalPrice
          }
      }
    }
  """;

  static const String Get_Post_By_Id = """
    query GetPostById(\$postId: ID!) {
        getPostById(postId: \$postId) {
          title
          description
          category
          condition
          image
          price {
            offerPrice
            originalPrice
          }
        }
      }
  """;
}
