import Taro, { Component, Config } from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'
import {AtButton, AtIcon, AtSearchBar, AtTag} from "taro-ui";

import { Homeitem, Waterfall } from './../../components';

import searchBar from '../../static/home/searchBar.svg';


import './home.scss'


export default class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      hospitalList: [
        {name: '家具/饰品',
          imageSource: require('./../../static/home/home_hospital.png'),
        },
        {name: '潮品',
          imageSource: require('./../../static/home/home_chinese_medial.png'),

        },
        {name: '家用电器',
          imageSource: require('./../../static/home/home_mediacal_store.png'),

          },
        {name: '生活百货',
          imageSource: require('./../../static/home/home_socal_big_perosn.png'),
        },
      ],
      keyword: '',
      tagList: [
        { name: 'Free shipping', active: false },
        { name: 'Brand New', active: false },
        { name: 'Used', active: false },
        { name: 'On Sale', active: false },
        { name: 'Soon', active: false }
      ],
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
  toSearch = () => {
    Taro.navigateTo({
      url: '/pages/search/search'
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

  // renderSearch = () => {
  //   const { keyword } = this.state
  //   return (
  //     <AtSearchBar
  //       className='searchBar'
  //       circle
  //       value={keyword}
  //       onChange={this.onChange.bind(this)}
  //       onActionClick={this.onActionClick.bind(this)}
  //     />
  //
  //   )
  // }


  onClick (data) {
    const { tagList } = this.state
    const findIndex = this.state.tagList.findIndex(item => item.name === data.name)
    const active = !tagList[findIndex].active
    tagList[findIndex].active = active
    const content = `您点击的 tag 标签名是：${data.name}，点击前是否选中：${data.active}，点击后：${active}`
    this.setState({ tagList })
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) Taro.showModal({ content, showCancel: false })
    else if (Taro.getEnv() === Taro.ENV_TYPE.WEB) alert(content)
  }
  render() {
    const { keyword } = this.state.keyword
    return (
      <View className='home'>
        {/*{this.renderSearch()}*/}
        {/*<view class='page_row' >*/}
        {/*  <view class="search" >*/}
        {/*    <view class="df search_arr" >*/}
        {/*      /!*<input class="sousuo" disabled placeholder="搜索" onClick={this.onActionSearch}/>*!/*/}
        {/*      <AtButton className="sousuo" onClick={this.toSearch}>*/}
        {/*        <icon className="searchcion" size='15' type='search' /><text>搜索</text>*/}
        {/*      </AtButton>*/}
        {/*    </view>*/}
        {/*  </view>*/}
        {/*</view>*/}
        <View onClick={this.toSearch.bind(this)}>
          <AtSearchBar
            actionName='搜一下'
            disabled={true}
            value={keyword}
            onChange={this.toSearch.bind(this)}
          />
        </View>
        <View className='index-top-view-second'>
          {
            this.state.hospitalList.map((item, index) => {
              return <Homeitem
                key={index}
                itemText={item.name}
                imageSource={item.imageSource}
                onItemClick={item.onItemClick}
              />
            })
          }
        </View>

        <ScrollView scrollX className='tag-list'>
          {this.state.tagList.map((item, index) => <View className='tag' key={index}><AtTag name={item.name} type='primary' active={item.active} circle onClick={this.onClick.bind(this)}>{item.name}</AtTag></View>)}
        </ScrollView>
        <Waterfall />
      </View>
    )
  }


}

