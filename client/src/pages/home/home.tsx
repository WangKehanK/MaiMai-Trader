import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MySwiper from "../../components/swpier";

export default class Home extends Component {
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '首页',
  }

  render () {
    // const { banner } = "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    return (
      <View>
        <View onClick={this.goIndex}>
          <button> 分享 </button>
        </View>
        <MySwiper />
      </View>

    )
  }
  goIndex = () =>{
    Taro.navigateTo({
      url: "/pages/index/index",
    })
  }
}
