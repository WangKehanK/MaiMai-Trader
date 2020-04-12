import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'
import graphql from '../../api/graphql'
import { login } from "../../api/gpl";
import './index.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function WeappLoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useDispatch()

  async function onGetUserInfo(e) {
    setIsLogin(true)
    const { avatarUrl, nickName } = e.detail.userInfo
    console.log(e.detail.userInfo)
    await Taro.login({
      success: async function (res) {
        if (res.code) {
          const code = res.code
          const result = await graphql.mutate({mutation: login, variables: {code: code, nickName: nickName}})
          console.log(result)
          await Taro.setStorage({
            key: 'userInfo',
            data: { avatar: avatarUrl, nickName, openID:result.data.authenticate.token},
          })
        }
      }
    })


    dispatch({
      type: SET_LOGIN_INFO,
      payload: {
        avatar: avatarUrl,
        nickName,
      },
    })


    setIsLogin(false)
  }

  return (
    <Button
      openType="getUserInfo"
      onGetUserInfo={onGetUserInfo}
      type="primary"
      className="login-button"
      loading={isLogin}
    >
      微信登录
    </Button>
  )
}
