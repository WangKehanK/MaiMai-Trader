import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtRadio, AtButton } from 'taro-ui'

import { ProductTitle } from '../../components'
import graphql from '../../api/graphql'
import { createProduct } from "../../api/gpl";

import './createPost.scss'

async function getOpenID() {
  const {data} = await Taro.getStorage({key: "userInfo"})
  const { openID } = data
  return openID
}
let openID = getOpenID()


type PageState = {
  products: {
    postId: string
    title: string,
    description: string,
    category: string,
    condition: string,
    image: [],
    delieveryMethod: string,
    price: number,
    userId: string,
    tags: [],
    expiryTime: string,
    city: string,
    school: [],
  },
  categoryList: Array<{
    name: string,
    id: string,
  }>,
  showCategory: boolean
}

export default class Add extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      products: {
        postId:'',
        title: '',
        description: '',
        expiryTime: '2020-03-15T00:48:09Z',
        category: '',
        userId: Taro.getStorageSync('userInfo').openID,
        // categoryId: '',
        // categoryName: ''
      },
      categoryList: [
        {name: 'Furniture', id: '1'},
        {name: 'Electronic Device', id: '2'},
        {name: 'Fashion', id: '3', },
        {name: 'Home Appliance', id: '4'},
      ],
      showCategory: false
    }
  }
  componentDidShow(){
    //如果没登录，乖乖给我去登录
    const token = Taro.getStorageSync('userInfo')
    console.log(token.openID)
    if(!!!token) {
      Taro.switchTab({url: '/pages/ucenter/ucenter'}).then(
        Taro.showToast({
          title: '请登录',
          icon: "loading",
          duration: 2000
        })
      )
      return
    }
  }

  config: Config = {
    navigationBarTitleText: '添加'
  }

  handleChangeCategory (value) {
    this.setState({
      products: {...this.state.products, category:value}
    })
  }

  createNext = async (category) => {
    const result = await graphql.mutate({mutation: createProduct , variables: {category: category}})
    const pid = result.data.createPost
    Taro.navigateTo({
      url: `/pages/createPost2/createPost2?category=${category}&postId=${pid}`
    })
  }
  cancel = () => {
    Taro.showActionSheet({
      itemList: [
        "您确定要退出吗",
        "继续",
      ],
      success: function ({tapIndex}) {
        if(tapIndex===0) {
          Taro.switchTab({url: '/pages/home/home'})
        }

      }
    })
  }
  render() {
    return (
      <View className='add'>
        <text>\n</text>
        <ProductTitle title='Category' />
        <View className='category-group'>
          {
            this.state.categoryList.map((item) => {
              return <AtRadio
                className='radio'
                key={item.id}
                options={[
                  {label: item.name, value: item.name}
                ]}
                value={this.state.products.category}
                onClick={this.handleChangeCategory.bind(this)}
              />
            })
          }
        </View>
        <AtButton type='primary' className='nextButton' circle= true onClick={this.createNext.bind(this, this.state.products.category)}> Next </AtButton>
        <AtButton type= 'secondary' className='cancelButton' circle= true onClick={this.cancel}> cancel </AtButton>

      </View>
    )
  }
}
