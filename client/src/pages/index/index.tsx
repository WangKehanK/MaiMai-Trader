import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Button, Image, Text } from "@tarojs/components";
import "./index.scss";
import ImgElement from "../../components/img-element";
import { AtIcon, AtGrid } from "taro-ui";
import { gql } from 'apollo-boost';

import client from "../../graphql-client";
type PageState = {
  checkedImages: Array<String>;
  imgTemp: Array<{ id: string; url: string }>;
};

class Index extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: "首页"
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedImages: [],
      imgTemp: [
        {
          id: "001",
          url:
            "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          id: "002",
          url:
            "https://d2r55xnwy6nx47.cloudfront.net/uploads/2016/07/RandomShape_Lead04.gif"
        },
        {
          id: "003",
          url: "https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg"
        },
        {
          id: "004",
          url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
        },
        {
          id: "005",
          url:
            "https://media.nesta.org.uk/images/Predictions-2019_Twitter_02.width-1200.png"
        },
        {
          id: "006",
          url:
            "https://hsm.utimaco.com/wp-content/uploads/2017/09/Applications_Grey_RGB_Random_Number_Generation-300x300.png"
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getDetail(id) {
    const { checkedImages } = this.state;
    const afterCheckedImages: String[] = checkedImages;
    if (afterCheckedImages.includes(id)) {
      afterCheckedImages.splice(afterCheckedImages.indexOf(id), 1);
    } else {
      afterCheckedImages.push(id);
    }
    this.setState({
      checkedImages: afterCheckedImages
    });
  }

  imgElements() {
    const { checkedImages, imgTemp } = this.state;
    const listItems = imgTemp.map((item, index) => {
      return (
        <View
          className="img_element"
          key={item.id}
          onClick={this.getDetail.bind(this, item.id)}
        >
          <View className="img_element--wrap">
            <View className="img_element--check">
              <AtIcon
                value={
                  checkedImages.includes(item.id)
                    ? "check-circle"
                    : "close-circle"
                }
                size="20"
                color="#000"
              ></AtIcon>
            </View>
            <Image src={item.url} className="img_element" />
          </View>

        </View>

      );
    });
    return listItems;
  }

  imgDisplay() {
    const { checkedImages, imgTemp } = this.state;
    let listResults: JSX.Element[] = null;
    if (this.checkIndexIsEven(checkedImages.length)) {
      listResults = checkedImages.map((item, index) => {
        const correspondingData = imgTemp.find(e => e.id == item);
        const url = correspondingData ? correspondingData.url : "";
        return (
          <Image
            // className={classValue}
            src={url}
          />
        );
      });
    } else {
      listResults = checkedImages.map((item, index) => {
        const correspondingData = imgTemp.find(e => e.id == item);
        const url = correspondingData ? correspondingData.url : "";
        return <Image className={this.imgElementStyle(index)} src={url} />;
      });
    }
    return listResults;
  }

  imgElementStyle(index) {
    var classValue = "postDetail__post__image--image";
    if (index == 0) {
      classValue = "postDetail__post__image--main";
    } else if (index == 1) {
      classValue += " postDetail__post__image--evenImage";
    } else if (index == 2) {
      classValue += "";
    } else if (index == 3) {
      classValue += " postDetail__post__image--evenImage";
    } else if (index == 4) {
      classValue += "";
    } else if (index == 5) {
      classValue += " postDetail__post__image--evenImage";
    }
    return classValue;
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  render() {
    const { checkedImages } = this.state;
    return (
      <View className="index">
        <ScrollView className="scrollview" scrollX>
          {this.imgElements()}
        </ScrollView>

        <View className="postDetail_container">
          <View className="postDetail__post__image">{this.imgDisplay()}</View>
        </View>
        <Button
          onClick = {this.toPage}
        >
          选择图片
        </Button>
        <Button onClick={this.getData}>
          获取数据
        </Button>
      </View>
    );
  }
  getData = () => {
    // const query = gql`{
    //   getPost {
    //     title
    //     postId
    //     description
    //   }
    //   }
    // `;
    // graphqlClient.query({query, variables: {}}).then(result => {
    //   console.log('result===', result.data);
    // });
    client.query({
      query: gql`
         {
          getPost {
            title
          }
        }
      `
    }).then(data => console.log("1",data))
      .catch(error => console.log("2",error));
  }
  toPage = () => {
      this.showActionSheet((path) =>{
      console.log('choosedImage', path)
      for(let i=0; i<6; i++){
        if (path[i] === undefined){
          path[i] = "https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg"
        }
      }
      // Taro.redirectTo({
      //   url: 'pages/select/select'
      // })
      // let data = Object.assign({},this.state.imgTemp[0], {url: path})

      this.setState({
        imgTemp: [
          {
            id: "001",
            url: path[0]
          },
          {
            id: "002",
            url: path[1]
          },
          {
            id: "003",
            url: path[2]
          },
          {
            id: "004",
            url: path[3]
          },
          {
            id: "005",
            url: path[4]
          },
          {
            id: "006",
            url: path[5]
          }
        ]
      });
    })
  }
  showActionSheet = async (callback) => {
    Taro.showActionSheet({
      itemList: [
        '拍摄',
        '从相册选择',
      ],
      success: function ({tapIndex}) {
        if (tapIndex === 0) {
          Taro.authorize({
            scope: "scope.camera",
          }).then(res => {
            Taro.chooseImage({
              count: 1,
              sourceType: ['camera'],
              sizeType: ['compressed'],
            }).then(({tempFilePaths: [path]}) => {
              typeof callback === 'function' && callback(path)
            })
          }, err => {
            console.log('authorize err', err)
            Taro.getSetting().then(authSetting => {
              if (authSetting['scope.camera']) {
              } else {
                Taro.showModal({
                  title: '拍摄图片需要授权',
                  content: '拍摄图片需要授权\n可以授权吗？',
                  confirmText: "允许",
                  cancelText: "拒绝",
                })
              }
            })
          })
        } else if (tapIndex === 1) {
          Taro.chooseImage({
            count: 6,
            sourceType: ['album'],
          }).then(({tempFilePaths: [path1, path2, path3, path4, path5, path6]}) => {
            for (let i = 0; i < 6; i++){
              typeof callback === 'function' && callback([path1, path2, path3, path4, path5, path6])}
          })
        }
      }
    })
  }
}
export default Index as ComponentClass;
