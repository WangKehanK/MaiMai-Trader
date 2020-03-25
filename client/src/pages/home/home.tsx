import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { MySwiper } from '../../components'

export default function Index() {
  return (
    <View className="index">
      <MySwiper />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
