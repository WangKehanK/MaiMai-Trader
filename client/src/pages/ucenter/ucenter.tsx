import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import avatar from '../../static/images/avatar.png'
import './ucenter.scss'
export default function Mine() {
  return (
    <View className="mine">
      <View>
        <Image src={avatar} className="mine-avatar" />
        <View className="mine-nickName">老毛</View>
        <View className="mine-username">uohziyoam</View>
      </View>
      <View className="mine-footer"> Lalalala~</View>
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
