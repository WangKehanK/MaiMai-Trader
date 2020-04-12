import Taro, {Component} from '@tarojs/taro';
import {View, Image, Text} from '@tarojs/components';
import './index.scss';

export default class ProductCard extends Component {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    width: '200px',
    className: '',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let {src, price, title, originalPrice, width, className} = this.props;
    return (
      <View
        className={className + ' product-card'}
        style={{width, flex: `0 0 ${width}`}}
      >
        <Image
          style={{width, height: width}}
          className='img'
          src={src}
          mode='aspectFill'
        ></Image>
        <View className='title'>{title}</View>
        <View className='font20 lh1'>
          {price && <Text className='price'>{price}</Text>}
          {originalPrice && (
            <Text className='originalPrice'>{originalPrice}</Text>
          )}
        </View>
      </View>
    );
  }
}
