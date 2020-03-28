import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from "taro-ui";

import './home.scss'

type PageState = {
  keyword: string,
}


export default class Home extends Component<{}, PageState>{
  constructor() {
    super(...arguments)
    this.state = {
      keyword: '',
    }
  }

  componentWillMount(){

  }
  config: Config = {
    navigationBarTitleText: '首页'
  }

  onChange(value) {
    this.setState({
      keyword: value
    })
  }

  onActionClick() {
    const { keyword } = this.state
    if (keyword) {
      Taro.navigateTo({ url: `/pages/search`})
    } else {
      Taro.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration: 2000
      })
    }
  }

  renderSearch = () => {
    const keyword = this.state.keyword
    return (
      <AtSearchBar
        value={keyword}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    )
  }

  render() {
    return (
      <View className='home'>
        {this.renderSearch()}
      </View>
    )
  }


}

