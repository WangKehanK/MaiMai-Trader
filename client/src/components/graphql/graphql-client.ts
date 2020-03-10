// import Taro from '@tarojs/taro'
// import ApolloClient from 'apollo-boost';
//
// const fetch = (url, { body: data, ...fetchOptions }) => {
//   return Taro.request({ url, data, ...fetchOptions, dataType: 'txt', responseType: 'text' })
//     .then((res) => {
//       res.text = () => Promise.resolve(res.data)
//       return res
//     }).catch(error => {
//         console.error(error)
//       },
//     );
// }
// const uri = 'http://localhost:3000/graphql'
//
// export default new ApolloClient({uri, fetch})

import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  fetch: (url, options) => Taro.request({
    url,
    method: options.method,
    data: options.body,
    header: options.headers,
  }).then(({data, statusCode}) => {
    return {
      ok: () => {
        return statusCode >= 200 && statusCode < 300;
      },
      text: () => {
        return Promise.resolve(JSON.stringify(data));
      }
    }
  })
});
export default client
