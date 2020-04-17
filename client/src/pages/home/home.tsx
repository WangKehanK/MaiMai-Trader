import Taro, { Component, Config } from '@tarojs/taro'
import {Block, ScrollView, View} from '@tarojs/components'
import {AtSearchBar, AtTag} from "taro-ui";
import {Homeitem, ProductTitle, ProductCard} from './../../components';

import ListView, { LazyBlock } from 'taro-listView';

import './home.scss'
import graphql from "../../api/graphql";
import {getPost} from "../../api/gpl";

let pageOffset = 1;

export default class Home extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      isLoaded: false,
      hasMore: true,
      list: [],
      current: 0,
      categoryList: [
        {name: '家具/饰品',
          imageSource: require('./../../static/home/home.svg'),
        },
        {name: '潮品',
          imageSource: require('./../../static/home/fashion.svg'),

        },
        {name: '家用电器',
          imageSource: require('./../../static/home/electronic.svg'),

          },
        {name: '书',
          imageSource: require('./../../static/home/book.svg'),
        },
      ],
      keyword: '',
      tagList: [
        { name: 'Free shipping', active: false },
        { name: 'Brand New', active: false },
        { name: 'Used', active: false },
        { name: 'On Sale', active: false },
        { name: 'Soon', active: false }
      ],
    }
  }
  getData = async (pLimit = pageOffset) => {
    if (pLimit === 1) this.setState({isLoaded:false})
    const {data} = await graphql.query({
      query: getPost,
      variables:{limit: 5, offset: pageOffset},
    })
    // this.setState({
    //   list: data.getPosts
    // })
    return {data, hasMore: true, isLoaded: pLimit === 1};
  };

  componentDidMount = async () => {
    const res = await this.getData(1)
    console.log("hasMore", res.hasMore)
    console.log("res",res.data.getPosts)
    this.setState({
      list: res.data.getPosts
    })
  }


  onScrollToLower = async (fn) => {
    const { list } = this.state;
    console.log("origin")
    const res = await this.getData(pageOffset+=5);
    const newList = res.data.getPosts
    const hasMore = res.hasMore
    this.setState({
      list: list.concat(newList),
      hasMore
    });
    fn();
  };
  refList = {};

  insRef = (node) => {
    this.refList = node;
  };

  componentWillMount(){

  }
  config: Config = {
    navigationBarTitleText: '首页',
    disableScroll:true
  }

  toSearch = () => {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }


  onTagClick (data) {
    const { tagList } = this.state
    const findIndex = this.state.tagList.findIndex(item => item.name === data.name)
    const active = !tagList[findIndex].active
    tagList[findIndex].active = active
    this.setState({ tagList })
  }

  toProductDetail = () => {
    Taro.navigateTo({
      url: "/pages/productDetail/productDetail"
    })
  }


  render() {
    const {keyword, isLoaded, error, hasMore, isEmpty, list} = this.state;
    // return (
    //   <View className='home'>
    //     <View className='page column-page'>
    //       <View>
    //         <View onClick={this.toSearch.bind(this)}>
    //           <AtSearchBar
    //             actionName='搜一下'
    //             disabled={true}
    //             value={keyword}
    //             onChange={this.toSearch.bind(this)}
    //             customStyle = 'background: transparent;'
    //           />
    //         </View>
    //
    //         <ScrollView scrollX className='tag-list'>
    //           {this.state.tagList.map((item) => <View className='tag' key={item.id}>
    //             <AtTag name={item.name} type='primary' active={item.active} circle onClick={this.onTagClick.bind(this)}>{item.name}</AtTag></View>)}
    //         </ScrollView>
    //
    //         <View className='index-top-view-second'>
    //           {
    //             this.state.categoryList.map((item) => {
    //               return <Homeitem
    //                 key={item.id}
    //                 itemText={item.name}
    //                 imageSource={item.imageSource}
    //                 // onItemClick={item.onItemClick}
    //               />
    //             })
    //           }
    //         </View>
    //         <View className='lazy-view'>
    //           <ListView
    //             lazy
    //             isLoaded={isLoaded}
    //             hasMore={hasMore}
    //             style={{height: '100vh'}}
    //             onScrollToLower={this.onScrollToLower}
    //           >
    //             {list.map((item, index) => {
    //               return (
    //                 <View className='item' key={index}>
    //                   <LazyBlock current={index} className='avatar'>
    //                     <Image className='avatar' src={item.author.avatar_url} />
    //                   </LazyBlock>
    //                   <View className='title'>
    //                     {item.title}
    //                   </View>
    //                 </View>
    //               )
    //             })}
    //           </ListView>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // )
    return (
      <View className='lazy-view'>
        <ListView
          // ref={node => this.insRef(node)}
          lazy
          isLoaded
          hasMore={hasMore}
          style={{height: '100vh'}}
          distanceToRefresh= {10}
          onScrollToLower={fn => this.onScrollToLower(fn)}
        >
          <View onClick={this.toSearch.bind(this)}>
            <AtSearchBar
              actionName='搜一下'
              disabled={true}
              value={keyword}
              onChange={this.toSearch.bind(this)}
              customStyle = 'background: transparent;'
            />
          </View>

          <ScrollView scrollX className='tag-list'>
            {this.state.tagList.map((item) => <View className='tag' key={item.id}>
              <AtTag name={item.name} type='primary' active={item.active} circle onClick={this.onTagClick.bind(this)}>{item.name}</AtTag></View>)}
          </ScrollView>

          <View className='index-top-view-second'>
            {
              this.state.categoryList.map((item) => {
                return <Homeitem
                  key={item.id}
                  itemText={item.name}
                  imageSource={item.imageSource}
                  // onItemClick={item.onItemClick}
                />
              })
            }
          </View>
          <View className='h'>
            <Text>推荐</Text>
          </View>
          {list.map((item, index) => {
            return (
              <View className='item' key={index}>
                {/*<LazyBlock current={index} className='avatar'>*/}
                {/*  <Image className='avatar' src={item.image[0]} />*/}
                {/*</LazyBlock>*/}
                {/*<View className='title'>*/}
                {/*  {item.title}*/}
                {/*</View>*/}
                {/*<ProductCard*/}
                {/*  title={item.title}*/}
                {/*  image={item.image[0]}/>*/}
                <text>\n</text>
                <View className="good-grid" onClick={this.toProductDetail}>
                  <View className='b'>
                    <Block key={item.id}>
                      <View className={`item ${index % 2 == 0 ? '' : 'item-b'}`}>
                          <Image className='img' src={item.image[0]}></Image>
                          <Text className='name'>{item.title}</Text>
                          <Text className='price'>￥{item.condition}</Text>
                      </View>
                    </Block>
                  </View>
                </View>
              </View>
            )
          })}
        </ListView>
      </View>)
  }
}

