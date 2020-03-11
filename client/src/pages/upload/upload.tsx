import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

export default class UploadImage extends Component<any> {
  uploadImage: string = 'http://localhost:4000/upload'
  static defaultProps = {
    text: "上传"
  }

  state = {
    srcs: '',
    upImg: ''
  }

  uploadImg = () => {
    let that = this;
    let max = 1;
    let imgFilePaths;
    let upLength
    Taro.chooseImage({
      count: max, // 一次最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        imgFilePaths = res.tempFilePaths
        console.log(imgFilePaths);
        upLength = imgFilePaths.length
        if (upLength > max) {
          Taro.showToast({
            title: '图片最多只能选择' + max,
            icon: 'none',
            duration: 2000
          })
          return false
        }
        Taro.showLoading({
          title: '上传中...'
        })
        that.upLoad(imgFilePaths, 0, upLength)// 上传操作
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('commplete')
      }
    })
  }

  upLoad = (imgPath, i, upLength) => {
    let that = this
    // 上传文件
    console.log(this.uploadImage)
    Taro.uploadFile({
      url: `${this.uploadImage}`,
      filePath: imgPath[i],
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',      },
    }).then((res) => {
      if (JSON.parse(res.data).status) {
        let imgData: any = JSON.parse(res.data)
        let fileFullUrl: any = imgData.data[0].fileFullUrl
        that.setState({
          srcs: imgPath[i],
          upImg: fileFullUrl
        }, () => {
          i++
          if (i === upLength && that.state.upImg.length) {
            that.props.dealWithImage(that.props.type, fileFullUrl)
            Taro.hideLoading() // 上传结束，隐藏loading
          } else {
            Taro.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
            })
            Taro.hideLoading()
          }
        })
      } else {
        Taro.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false
        })
      }
    }).catch(() => {
      Taro.hideLoading()
      Taro.showModal({
        title: '错误提示',
        content: '上传图片失败',
        showCancel: false
      })
    })
  }

  previewImg() {
    let that = this
    Taro.showActionSheet({
      itemList: ['预览', '删除'],
      success: function (res) {
        if (res.tapIndex === 0) {
          Taro.previewImage({
            current: that.state.srcs,
            urls: [that.state.srcs]
          })
        } else {
          // 选择删除
          that.setState({
            srcs: "", // 删除本地图片地址数组中位置内容
            upImg: 0
          }, () => {
            that.props.dealWithImage(that.props.type, "")
          })
          // 删除提交给后台的图片数
          // that.$emit('choosed', that.upImg)

        }
      }
    })
  }

  render() {
    const {
      compStyle, text
    } = this.props
    const { srcs } = this.state
    return <View className="upload-image-field" >
      {!srcs ? <View className="upload-image--container" onClick={this.uploadImg}>
          <Text className="ui-text">{text}</Text>
          <View className="ui-button">
            <AtIcon value='camera' size='15' color='#fff'></AtIcon>
            <Text>点击上传</Text>
          </View>
        </View>:
        <Image onClick={this.previewImg} src={srcs} />}
    </View>
  }
}

