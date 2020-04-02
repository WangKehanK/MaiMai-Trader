import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtRadio, AtButton, AtGrid } from 'taro-ui'

// import graphql from '../../api/graphql'
import { ProductTitle } from '../../components'
import graphql from '../../api/graphql'
import { createProduct } from "../../api/gpl";

import './createPost.scss'

type PageState = {
  products: {
    title: string,
    description: string,
    expiryTime: string,
    category: string,
    // categoryId: string,
    // categoryName: string
  },
  categoryList: Array<{
    name: string,
    id: string,
    image: string,
  }>,
  showCategory: boolean
}

export default class Add extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      products: {
        title: '',
        description: '',
        expiryTime: '2020-03-15T00:48:09Z',
        category: '',
        // categoryId: '',
        // categoryName: ''
      },
      categoryList: [
        {name: 'Furniture', id: '1', image:require('./../../static/home/home_hospital.png')},
        {name: 'Electronic Device', id: '2', image:require('./../../static/home/home_hospital.png')},
        {name: 'Fashion', id: '3', image:require('./../../static/home/home_hospital.png')},
        {name: 'Home Appliance', id: '4', image:require('./../../static/home/home_hospital.png')},
      ],
      showCategory: false
    }
  }

  componentDidMount() {
    // this.getCategory()
  }

  config: Config = {
    navigationBarTitleText: '添加'
  }

  // getCategory = async () => {
  //   const res = await graphql.query({ query: category })
  //   this.setState({
  //     categoryList: res.data.category,
  //     garbage: { ...this.state.garbage, categoryId: res.data.category[0].id, categoryName: res.data.category[0].name, name: this.$router.params.name }
  //   })
  // }

  handleChangeCategory (value) {
    this.setState({
      products: {...this.state.products, category:value}
    })
  }

  renderCategoryList = () => {
    const { categoryList } = this.state
    return (
      <AtRadio className='grid' hasBorder={false} columnNum={2} onClick={(item: any) => { Taro.navigateTo({ url: `/pages/type/type?id=${item.id}&name=${item.value}&type=category` }) }} data={categoryList.map((item) => {
        return ({
          image: item.image,
          value: item.name,
          id: item.id
        })
      })}
      />
    )
  }
  createNext = (category) => {
    Taro.navigateTo({
      url: `/pages/createPost2/createPost2?category=${category}`
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
