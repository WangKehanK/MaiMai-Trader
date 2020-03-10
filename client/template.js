/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}


const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Index extends Component {
  componentWillMount () {
  }
  config = {
    navigationBarTitleText: '${dirName}',
  }

  render () {
    return (
      <View>
        Hello world!
      </View>
    )
  }
}
`;
// scss文件模版
const scssTep = `@import "../../styles/mixin";

.${dirName}-page {
  @include wh(100%, 100%);
}
`;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('home.tsx.tsx', indexTep);
fs.writeFileSync('home.tsx.scss', scssTep);


console.log(`模版${dirName}已创建`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
