import Taro, {useState} from '@tarojs/taro'
import { View, Form, Input, Textarea, Button, CoverView } from '@tarojs/components'
import { AtButton, AtTextarea, AtPagination} from 'taro-ui'
import UploadImage from '.././Upload'


import './index.scss'

export default function PostForm(props) {
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
    <View className="post-form">
      <Form onSubmit={props.handleSubmit}>
        <View>
          <View className="form-hint">标题</View>
          <Input
            className="input-title"
            type="text"
            placeholder="点击输入标题"
            value={props.formTitle}
            onInput={props.handleTitleInput}
          />
          <View className="form-hint">正文</View>
          <Textarea
            fixed= {true}
            placeholder="点击输入正文"
            className="input-content"
            value={props.formContent}
            onInput={props.handleContentInput}
          />
          <UploadImage />
          <AtButton formType="submit" type="primary">
            提交
          </AtButton>
        </View>
      </Form>
    </View>
  )
}
