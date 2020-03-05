import Taro, { Component } from "@tarojs/taro";
import { Text, View, Image } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from "taro-ui";

class ImgElement extends Component {
  render() {
    return (
      <View className="img-element">
        <Image
          // style="width: 150px;height: 150px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
        />
        {/* <AtIcon value="clock" size="30" color="#F00"></AtIcon> */}
      </View>
    );
  }
}

export default ImgElement;
