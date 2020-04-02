import { SET_POSTS, SET_POST_FORM_IS_OPENED } from '../constants/counter'


const INITIAL_STATE = {
  post: [
    {
    title: '',
    description: '',
    category:'',
    condition: '',
    image: [],
    deliveryMethod: '',
    price: '',
    user:{
      name:''
    },
    tags:[]
    }
  ],
  isOpened: false,
}

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_POSTS: {
      const { post } = action.payload
      return { ...state, post: state.post.concat(post) }
    }

    case SET_POST_FORM_IS_OPENED: {
      const { isOpened } = action.payload

      return { ...state, isOpened }
    }

    default:
      return state
  }
}