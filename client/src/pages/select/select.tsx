import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Index extends Component {
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '分享页'
  }

  render () {
    return (
      <View>
        Hello world!
      </View>
    )
  }
}
