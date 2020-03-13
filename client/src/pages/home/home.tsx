import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'

import { PostCard, PostForm, MySwiper, UploadImage } from '../../components'

export default function Index() {
  const [posts, setPosts] = useState([
    {
      title: '11',
      content: '778',
    },
  ])
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const newPosts = posts.concat({ title: formTitle, content: formContent })
    setPosts(newPosts)
    setFormTitle('')
    setFormContent('')
    setIsOpened(false)

    Taro.atMessage({
      message: '商品发布成功',
      type: 'success',
    })
  }

  return (
    <View className="index">
      <MySwiper />
      <AtMessage />
      {posts.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          content={post.content}
          isList
        />
      ))}
      <AtFloatLayout
        scrollY='true'
        isOpened={isOpened}
        title="发表新文章"
        onClose={() => setIsOpened(false)}
      >
        <PostForm
          formTitle={formTitle}
          formContent={formContent}
          handleSubmit={e => handleSubmit(e)}
          handleTitleInput={e => setFormTitle(e.target.value)}
          handleContentInput={e => setFormContent(e.target.value)}
        />
      </AtFloatLayout>
      <View className="post-button">
        <AtFab onClick={() => setIsOpened(true)}>
          <Text className="at-fab__icon at-icon at-icon-edit"></Text>
        </AtFab>
      </View>

    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
