import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtListItem, AtActionSheet, AtActionSheetItem, AtButton, AtGrid } from 'taro-ui'

// import graphql from '../../api/graphql'
import { ProductTitle, UploadImage } from '../../components'
import graphql from '../../api/graphql'
import {category, createProduct} from "../../api/gpl";

import './createPost3.scss'


type PageState = {
  products: {
    title: string,
    description: string,
    expiryTime: string,
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
        // categoryId: '',
        // categoryName: ''
      },
      categoryList: [
        {name: 'Furniture', id: '1', image:require('./../../static/home/home_hospital.png')},
        {name: 'ElectronicDevice', id: '2', image:require('./../../static/home/home_hospital.png')},
        {name: 'Fashion', id: '3', image:require('./../../static/home/home_hospital.png')},
        {name: 'HomeAppliance', id: '4', image:require('./../../static/home/home_hospital.png')},
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

  handleChangeName = (value) => {
    this.setState({
      products: { ...this.state.products, title: value }
    })
    return value
  }

  handleChangeDescription = (event) => {
    this.setState({
      products: { ...this.state.products, description: event.target.value }
    })
  }

  handleChangeType = (item) => {
    this.setState({
      products: { ...this.state.products, categoryId: item.id, categoryName: item.name },
      showCategory: false
    })
  }

  handleInput = async () => {
    const { products } = this.state
    console.log(products)
    console.log(createProduct)
    const res = await graphql.mutate({ mutation: createProduct, variables: products })
    // const res = await graphql.mutate({ mutation: gql`mutation {createPost(post: {description: "dfsf", expiryTime:"2020-03-15T00:48:09Z"})}`} );

    if (res.data.createProduct) {
      Taro.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      Taro.navigateBack()
    }
  }

  renderForm = () => {
    const { products } = this.state
    return (
      <View>
        <View className='section'>
          <ProductTitle title='商品名称'></ProductTitle>
          <AtInput
            name='title'
            title='名称'
            type='text'
            placeholder='请输入商品名称'
            value={products.title}
            onChange={this.handleChangeName.bind(this)}
          />
        </View>
        {/*<View className='section'>*/}
        {/*  <ProductTitle title='商品类别'></ProductTitle>*/}
        {/*  <AtListItem title='类别' extraText={products.categoryName} onClick={() => {*/}
        {/*    this.setState({ showCategory: true })*/}
        {/*  }}*/}
        {/*  />*/}
        {/*</View>*/}
        <View className='section'>
          <ProductTitle title='描述'></ProductTitle>
          <AtTextarea
            value={products.description}
            onChange={this.handleChangeDescription.bind(this)}
            maxLength={200}
            placeholder='请输入商品描述'
          />
        </View>
        <View className='section'>
          <AtButton type='primary' onClick={this.handleInput.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View className='add'>
        {this.renderForm()}
        <ProductTitle title = '上传图片'/>
        <UploadImage />
      </View>
    )
  }
}
