import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';

export default class ListItem extends Component {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    className: '',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={this.props.className + ' list-item'}>
        <View className='flex row middle'>
          <View className='flex-1 flex row middle'>{this.props.children}</View>
          <View className='iconfont icon-angle-right font30 iconmore'></View>
        </View>
      </View>
    );
  }
}
