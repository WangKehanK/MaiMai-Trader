import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'

import Logout from '../Logout'
import './index.scss'

export default function Footer(props) {
  const nickName = useSelector(state => state.user.nickName)

  const dispatch = useDispatch()

  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
  const isLogged = !!nickName

  // 使用 useSelector Hooks 获取 Redux Store 数据
  const isOpened = useSelector(state => state.user.isOpened)

  return (
    <View className="mine-footer">
      {isLogged && <Logout />}
      <View className="tuture-motto">
        {isLogged ? '消费！' : '您还未登录'}
      </View>
    </View>
  )
}
