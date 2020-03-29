import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";


import ProductCard from "./../Productcard/";
import ListItem from "./../Listitem";
import JsonData from "./Json";

import "./index.scss";


export default class Index extends Component {
  config = {
    addGlobalClass: true,
    navigationBarTitleText: "首页"
  };

  state = {
    list1: JsonData.goodsList,
    isScrollTop: true
  };

  pageScrollFn = scrollTop => {
    console.log("TCL: Index -> scrollTop", scrollTop);

    this.setState({ isScrollTop: scrollTop === 0 }, () => {
      console.log("TCL: Index -> isScrollTop", this.state.isScrollTop);
    });
    // do something
  };

  onPageScroll(e) {
    this.pageScrollFn(e.scrollTop);
  }

  componentWillMount() {}

  componentDidMount() {
    // 只有编译为h5时下面代码才会被编译
    if (process.env.TARO_ENV === "h5") {
      window.addEventListener("scroll", this.pageScrollFn);
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let { isScrollTop } = this.state;
    return (
      <View className='home'>
        <View className=' bgfff pb30'>
          <ListItem className='mt20 pt20 pb20'>
            <View className='font30 pl30'>
              <View>Classified selection</View>
            </View>
          </ListItem>
          <View className='product-list'>
            {this.state.list1.map((e, index) => (
              <ProductCard
                className='ml30 mb10'
                width='166px'
                key={"key" + index}
                taroKey={index}
                title={e.title}
                src={e.image3}
                price={e.price}
                originalPrice={e.originalPrice}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
}
