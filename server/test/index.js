import A from "node-fetch";


const createProduct = `{
    getPostById(postId: "507f10116cd799f77bcf8439") {
      description
      title
      postId
    }
  }`;

A.fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: createProduct }),
})
    .then(res => res.json())
    .then(res => console.log(res.data));