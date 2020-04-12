import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtListItem, AtActionSheet, AtActionSheetItem, AtButton, AtGrid, AtCheckbox, AtCalendar } from 'taro-ui'

// import graphql from '../../api/graphql'
import { ProductTitle, UploadImage } from '../../components'
import graphql from '../../api/graphql'
import {category, createProduct} from "../../api/gpl";

import './createPost5.scss'

type PageState = {
  products: {
    title: string,
    description: string,
    expiryTime: string,
    price:string,
    originalPrice:string,
    // categoryId: string,
    // categoryName: string
  },
  categoryList: Array<{
    name: string,
    id: string,
    image: string,
  }>,
  showCategory: boolean,
  checkedList: string
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
      showCategory: false,
      checkedList: ['list1']

    }
    this.checkboxOption = [{
      value: 'list1',
      label: 'Pick Up',
      desc: '部分提供送货上门'
    },{
      value: 'list2',
      label: 'Delievery'
    },]
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
  handleDeliveryChange (value) {
    this.setState({
      checkedList: value
    })
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
    const { products, checkedList } = this.state
    return (
      <View>
        <View className='section'>
          <Text>\n</Text>
          <ProductTitle title='Price' />
          <AtInput
            className='at-input'
            name='title'
            title='价格'
            type='text'
            placeholder='selling price'
            value={products.title}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            className='at-input-original'
            name='title'
            title='原价'
            type='text'
            placeholder='original price'
            value={products.title}
            onChange={this.handleChangeName.bind(this)}
          />
          <Text>\n</Text>

        </View>
        <View className='section'>
          <ProductTitle title='Delivery' />
          <Text>\n</Text>
          <AtCheckbox
            options={this.checkboxOption}
            selectedList={checkedList}
            onChange={this.handleDeliveryChange.bind(this)}
          />
        </View>
        <View className='section'>
          <ProductTitle title='Deadline' />
          <AtCalendar />
          <Text>\n</Text>
        </View>
        <View className='section'>
          <AtButton type='primary' onClick={this.handleInput.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
  createNext = async (callback) => {
    Taro.navigateTo({
      url: "/pages/createPost4/createPost4"
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
        {this.renderForm()}
        <AtButton type='primary' className='nextButton' circle=true onClick={this.createNext}> Next </AtButton>
        <AtButton type= 'secondary' className='cancelButton' circle=true onClick={this.cancel}> cancel </AtButton>
      </View>
    )
  }
}
