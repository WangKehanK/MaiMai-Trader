import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Button, Navigator, Text, Block, Input, Image, RichText} from '@tarojs/components';

import { ProductTitle } from "../../components"
export default class productDetail extends Component {
  state = {
    title: '拖鞋'
  }
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '详情',
  }

  render () {
    const {title} = this.state
    return (
      <View>
        <Swiper className='goodsimgs' indicator-dots='true' autoplay='true' interval='3000' duration='1000'>
          <SwiperItem>
            <Image className='img' background-size='cover'></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className='img' background-size='cover'></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className='img' background-size='cover'></Image>
          </SwiperItem>
        </Swiper>
        <ProductTitle title={title} />
      </View>
    )
  }
}
