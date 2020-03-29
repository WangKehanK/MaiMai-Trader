import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

type PageStateProps = {
  title: string
}

interface ProductTitle {
  props: PageStateProps;
}

export default class ProductTitle extends Component<{}, PageStateProps> {
  render() {
    return (
      <View className='title'>
        <Text className='text'>{this.props.title}</Text>
      </View>
    )
  }
}

