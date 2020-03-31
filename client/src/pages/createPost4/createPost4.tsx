import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import {AtButton, AtImagePicker, AtNoticebar} from 'taro-ui';
import {ProductTitle} from "../../components";

import './createPost4.scss'

export default class ImagePicker extends Component {

  config = {
    navigationBarTitleText: 'ImagePicker 图片选择器'
  }

  state = {
    files: [{
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    },
      {
        url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
      },
      {
        url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
      }]
  }

  onChange(files) {
    this.setState({
      files
    })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }
  createNext = async (callback) => {
    Taro.navigateTo({
      url: "/pages/createPost5/createPost5"
    })
  }
  cancel = () => {
    Taro.showActionSheet({
      itemList: [
        "您确定要退出吗",
        "继续",
      ],
      success: function ({tapIndex}) {
        if(tapIndex===0) {
          Taro.switchTab({url: '/pages/home/home'})
        }

      }
    })
  }

  render() {
    return (
      <View className='add'>
        <text>\n</text>
        <ProductTitle title='Iamges' />
        <AtNoticebar close marquee >Lovely Images help you sell products faster</AtNoticebar>

        <AtImagePicker
          length={3}
          count={9}
          files={this.state.files}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        />
        <text>\n</text>
        <AtButton type='primary' className='nextButton' circle=true onClick={this.createNext}> Next </AtButton>
        <AtButton type= 'secondary' className='cancelButton' circle=true onClick={this.cancel}> cancel </AtButton>
      </View>
    );
  }
}
