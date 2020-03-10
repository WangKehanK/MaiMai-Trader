import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Home extends Component {
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '首页',
  }

  render () {
    return (
      <View onClick={this.goIndex}>
        <button> 分享 </button>
      </View>
    )
  }
  goIndex = () =>{
    Taro.navigateTo({
      url: "/pages/index/index",
    })
  }
}
