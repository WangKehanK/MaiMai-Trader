import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { PostCard } from '../../components'

export default function Post() {
  const router = useRouter()
  const { params } = router
  function toShare(){
    Taro.navigateTo({
      url: "/pages/index/index"
    })
  }

  return (
    <View className="post">
      {/*<PostCard title={params.title} content={params.content} />*/}
      <View onClick={toShare}>
        <button>分享</button>
      </View>
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情',
}
