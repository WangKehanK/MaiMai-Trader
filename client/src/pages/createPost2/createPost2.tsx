import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtRadio, AtButton, AtGrid } from 'taro-ui'

// import graphql from '../../api/graphql'
import { ProductTitle, UploadImage } from '../../components'
import graphql from '../../api/graphql'
import { createProduct } from "../../api/gpl";

import './createPost2.scss'

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
  handleChange (value) {
    this.setState({
      value
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


  // renderCategory = () => {
  //   const { categoryList, showCategory } = this.state
  //   console.log(categoryList)
  //   return (
  //     <View>
  //       <AtActionSheet isOpened={showCategory}>
  //         {categoryList && categoryList.map((item) => {
  //           return (
  //             <AtActionSheetItem key={item.id} onClick={() => {
  //               this.handleChangeType(item)
  //             }}
  //             >{item.name}{console.log(item.name)}</AtActionSheetItem>
  //           )
  //         })}
  //       </AtActionSheet>
  //     </View>
  //   )
  // }
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
  createNext = () => {
    Taro.navigateTo({
      url: "/pages/createPost3/createPost3"
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
        {/*{this.renderForm()}*/}
        {this.renderCategoryList()}
        <View className='radio-group'>
          <text>\n</text>
          <ProductTitle title= 'Sub Category' />
          <AtRadio
            className='radio'
            options={[
              { label: '沙发', value: 'option1' },
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'GOOD', value: 'option2'},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'FINE', value: 'option3',},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'GOOD', value: 'option2'},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'FINE', value: 'option3',},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'FINE', value: 'option3',},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
        </View>
        <View className='radio-group'>
          <ProductTitle title='Condition' />
          <AtRadio
            className='radio'
            options={[
              { label: 'NEW', value: 'option1' },
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'GOOD', value: 'option2'},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
          <AtRadio
            className='radio'
            options={[
              { label: 'FINE', value: 'option3',},
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
        </View>
        {/*<View className="btn-group">*/}
        {/*  <AtButton className="button">Button</AtButton>*/}
        {/*  <AtButton className="button">Button</AtButton>*/}
        {/*  <AtButton className="button">Button</AtButton>*/}
        {/*  <AtButton className="button">Button</AtButton>*/}
        {/*</View>*/}
        <AtButton type='primary' className='nextButton' circle=true onClick={this.createNext}> Next </AtButton>
        <AtButton type= 'secondary' className='cancelButton' circle=true onClick={this.cancel}> cancel </AtButton>

      </View>
    )
  }
}
