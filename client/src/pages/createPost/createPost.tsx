import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtListItem, AtActionSheet, AtActionSheetItem, AtButton } from 'taro-ui'
import Title from '../../components/title'
// import graphql from '../../api/graphql'
// import { category, createGarbage } from '../../api/gql'
import './createPost.scss'

type PageState = {
  products: {
    name: string,
    description: string,
    // categoryId: string,
    // categoryName: string
  },
  categoryList: Array<{
    name: string,
    id: string
  }>,
  showCategory: boolean
}

export default class Add extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      products: {
        name: '',
        description: '',
        // categoryId: '',
        // categoryName: ''
      },
      // categoryList: [],
      // showCategory: false
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
      products: { ...this.state.products, name: value }
    })
    return value
  }

  handleChangeDescription = (event) => {
    this.setState({
      products: { ...this.state.products, description: event.target.value }
    })
  }

  // handleChangeType = (item) => {
  //   this.setState({
  //     products: { ...this.state.products, categoryId: item.id, categoryName: item.name },
  //     showCategory: false
  //   })
  // }

  handleInput = async () => {
    const { products } = this.state
    // const res = await graphql.mutate({ mutation: createProducts, variables: products })
    // if (res.data.createGarbage) {
    //   Taro.showToast({
    //     title: '添加成功',
    //     icon: 'success',
    //     duration: 2000
    //   })
    //   Taro.navigateBack()
    // }
    console.log(products)
  }

  renderForm = () => {
    const { products } = this.state
    return (
      <View>
        <View className='section'>
          <Title title='商品名称'></Title>
          <AtInput
            name='name'
            title='名称'
            type='text'
            placeholder='请输入商品名称'
            value={products.name}
            onChange={this.handleChangeName.bind(this)}
          />
        </View>
        {/*<View className='section'>*/}
        {/*  <Title title='垃圾类别'></Title>*/}
        {/*  <AtListItem title='类别' extraText={garbage.categoryName} onClick={() => {*/}
        {/*    this.setState({ showCategory: true })*/}
        {/*  }}*/}
        {/*  />*/}
        {/*</View>*/}
        <View className='section'>
          <Title title='描述'></Title>
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

  // renderCategory = () => {
  //   const { categoryList, showCategory } = this.state
  //   return (
  //     <View>
  //       <AtActionSheet isOpened={showCategory}>
  //         {categoryList && categoryList.map((item) => {
  //           return (
  //             <AtActionSheetItem key={item.id} onClick={() => {
  //               this.handleChangeType(item)
  //             }}
  //             >{item.name}</AtActionSheetItem>
  //           )
  //         })}
  //       </AtActionSheet>
  //     </View>
  //   )
  // }

  render() {
    return (
      <View className='add'>
        {this.renderForm()}
        {/*{this.renderCategory()}*/}
      </View>
    )
  }
}
