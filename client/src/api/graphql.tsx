import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const fetch = (url, { body: data, ...fetchOptions }) => {
  return Taro.request({ url, data, ...fetchOptions, header: {'content-type': 'application/json', token: 'a' },dataType: 'text' })
    .then((res) => {
      res.text = () => Promise.resolve(res.data)
      console.log(res.data)
      return res
    }).catch(error => {
        console.error(error)
      },
    );
}
const uri = 'http://localhost:4000/graphql'

export default new ApolloClient({uri, fetch, cache: new InMemoryCache({
    addTypename: false
  })})
