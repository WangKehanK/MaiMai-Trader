import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import {AtButton, AtImagePicker, AtNoticebar} from 'taro-ui';
import {ProductTitle} from "../../components";

import './createPost4.scss'

export default class ImagePicker extends Component {
  uploadImage: string = 'http://localhost:4000/upload'
  config = {
    navigationBarTitleText: '图片'
  }

  state = {
    files: [],
    upLoadImg: []
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
  toUpload = async () => {
    const { files } = this.state
    if(files.length>0){
      const rootUrl = this.uploadImage
      await this.uploadLoader({rootUrl,path:files})
      this.createNext()
    }else{
      Taro.showToast({
        title: '请先点击+号选择图片',
        icon: 'none',
        duration: 2000
      })
    }
  }
  uploadLoader = (data)=>{
    let that = this
    let i = data.i ? data.i : 0 // 当前所上传的图片位置
    let success=data.success?data.success:0//上传成功的个数
    let fail=data.fail?data.fail:0;//上传失败的个数
    Taro.showLoading({
      title: `正在上传第${i+1}张`
    })
    //发起上传
    Taro.uploadFile({
      url:this.uploadImage,
      header:{
        'content-type': 'multipart/form-data',
      },
      name:'file',
      filePath:data.path[i].url,
      success: (resp) => {
        //图片上传成功，图片上传成功的变量+1
        let resultData= JSON.parse(resp.data)
        if(resultData.code === "0"){
          success++;
          this.setState((prevState)=>{
            let oldUpload = prevState.upLoadImg
            oldUpload.push(resultData.data)
            return({
              upLoadImg:oldUpload
            })
          },()=>{
            // setSate会合并所有的setState操作，所以在这里等待图片传完之后再调用设置url方法
            /*
            * 该处十分重要
            **/
            //this.setFatherUploadSrc()// 设置数据图片地址字段
          })
        }else{
          fail++;
        }
      },
      fail: () => {
        fail++;//图片上传失败，图片上传失败的变量+1
      },
      complete: () => {
        Taro.hideLoading()
        i++;//这个图片执行完上传后，开始上传下一张
        if(i==data.path.length){   //当图片传完时，停止调用
          Taro.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          console.log('成功：'+success+" 失败："+fail);
        }else{//若图片还没有传完，则继续调用函数
          data.i=i;
          data.success=success;
          data.fail=fail;
          that.uploadLoader(data);
        }
      }
    })
  }
  createNext = () => {
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
          multiple ={false}
          files={this.state.files}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        />
        <text>\n</text>
        <AtButton type='primary' className='nextButton' circle=true onClick={this.toUpload}> Next </AtButton>
        <AtButton type= 'secondary' className='cancelButton' circle=true onClick={this.cancel}> cancel </AtButton>
      </View>
    );
  }
}
