import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image} from '@tarojs/components'
export default class Home extends Component {
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '首页',
  }
  render () {
    return (
      <View>
        <View onClick={this.goIndex}>
          <button> 分享 </button>
        </View>
        <Swiper className='banner' indicatorDots autoplay interval='1000' duration='100'>
          {
            <SwiperItem>
              <Image className = 'img' src={"https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"} />
            </SwiperItem>
          }
        </Swiper>
      </View>

    )
  }
  goIndex = () =>{
    Taro.navigateTo({
      url: "/pages/index/index",
    })
  }
}
