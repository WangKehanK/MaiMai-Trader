import Taro from '@tarojs/taro'

Taro.getStorage({
  key: 'keywordsList'
})

export const formatNumber = (n: number | string) : string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


// 存储搜索关键字
export const setKeywordInHistory = (keyword: string) => {
  const keywordsList: Array<string> = Taro.getStorageSync('keywordsList') || []
  console.log('keywordsList', keywordsList)
  const index = keywordsList.findIndex((item) => item === keyword)
  if (index !== -1) {
    keywordsList.splice(index, 1)
  }
  keywordsList.unshift(keyword)
  Taro.setStorage({ key: 'keywordsList', data: keywordsList })
}

// 获取搜索关键字
export const getKeywordInHistory = () : Array<string> => {
  return Taro.getStorageSync('keywordsList')
}

// 清除搜索关键字
export const clearKeywordInHistory = () => {
  Taro.removeStorageSync('keywordsList')
}

// 格式化时间戳为日期
export const formatTimeStampToTime = (timestamp) => {
  const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const year = date.getFullYear();
  const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  // const hour = date.getHours() + ':';
  // const minutes = date.getMinutes() + ':';
  // const second = date.getSeconds();
  return `${year}-${month}-${day}`
}
