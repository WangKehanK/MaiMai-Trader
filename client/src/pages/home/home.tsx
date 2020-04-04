import Taro, { Component, Config } from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'
import {AtSearchBar, AtTag} from "taro-ui";
import { Homeitem } from './../../components';

import {
  VirtualListDataManager,
  VirtualListItemData,
} from 'taro-list-data-manager';
import TaroList from 'taro-list';

import './home.scss'

type LoadStatus =
  | 'none'
  | 'loadMore'
  | 'ended'
  | 'loading'
  | 'refreshing'
  | 'noData';

const HEIGHT = '410rpx';
function getTopic(page: number) {
  return Taro.request({
    method: 'GET',
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      page
    }
  });
}

export default class Home extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      list:[],
      current: 0,
      categoryList: [
        {name: '家具/饰品',
          imageSource: require('./../../static/home/home_hospital.png'),
        },
        {name: '潮品',
          imageSource: require('./../../static/home/home_chinese_medial.png'),

        },
        {name: '家用电器',
          imageSource: require('./../../static/home/home_mediacal_store.png'),

          },
        {name: '生活百货',
          imageSource: require('./../../static/home/home_socal_big_perosn.png'),
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

  ///////////////////////////////////////////////
  // List function /////////////////////////////
  loadStatus: LoadStatus = 'none';

  dataManager = new VirtualListDataManager(
    {
      itemSize: HEIGHT,
      overscan: 5,
      // estimatedSize 尽可能接近真实尺寸
      estimatedSize: 70,
      column: 2,
      onChange: data => {
        this.setState({
          list: data
        });
      }
    },
    Taro
  );

  count = 0;

  handleInit = () => {
    this.loadStatus = 'loading';

    this.dataManager.setLoadStatus(
      {
        type: 'loading'
      },
      '140rpx'
    );

    this.refresh();
  };

  refresh = () => {
    this.count = 0;

    return this.fetch().then(({ list, status }) => {
      // 请求结束后 清空所有加载状态 复原 itemSize
      this.dataManager.clearAllLoadStatus();
      this.dataManager.updateConfig({
        itemSize: HEIGHT
      });

      if (status !== 'none') {
        this.dataManager.clear();
        this.dataManager.setLoadStatus({ type: status }, '140rpx');
      } else {
        this.dataManager.set(list);
      }

      this.loadStatus = status;
    });
  };

  fetch = (): Promise<{
    list: any[];
    status: 'noData' | 'ended' | 'none';
  }> => {
    return new Promise((resolve, reject) => {
      getTopic(this.page)
        .then(({ data }) => {
          this.count++;
          const list: any[] = data.data || [];
          // 这里模仿数据记载完
          if (this.count === 10) {
            list.length = 0;
          }

          if (list.length) {
            this.page++;
          }

          resolve({
            list,
            status:
              list.length === 0
                ? this.page === 1
                  ? 'noData'
                  : 'ended'
                : 'none'
          });
        })
        .catch(reject);
    });
  };

  handleLoadMore = () => {
    // 这里假设加载完毕就不能再次加载了
    if (this.loadStatus !== 'none') {
      return;
    }

    this.loadStatus = 'loadMore';
    const { clearAndAddData } = this.dataManager.setLoadStatus(
      {
        type: 'loadMore'
      },
      '140rpx'
    );

    this.fetch().then(({ list, status }) => {
      this.loadStatus = status;
      clearAndAddData(...list);

      if (status !== 'none') {
        this.dataManager.setLoadStatus(
          {
            type: 'ended'
          },
          '140rpx'
        );
      }
    });
  };

  handleRefresh = cb => {
    if (this.loadStatus !== 'none') {
      return;
    }

    this.page = 1;
    this.loadStatus = 'refreshing';

    // 刷新时 清空所有加载状态 复原 itemSize
    this.dataManager.clearAllLoadStatus();
    this.dataManager.updateConfig({
      itemSize: HEIGHT
    });

    this.refresh()
      .then(cb)
      .catch(cb);
  };
  //////////////////////////////////////////
  // List function//////////////////////////
  /////////////////////////////////////////

  onTagClick (data) {
    const { tagList } = this.state
    const findIndex = this.state.tagList.findIndex(item => item.name === data.name)
    const active = !tagList[findIndex].active
    tagList[findIndex].active = active
    this.setState({ tagList })
  }

  render() {
    const { keyword, list } = this.state;
    list.forEach(item => {
      item.item.forEach(topic => {
        if (!topic.type) {
          topic.avatarUrl = `url(${topic.author.avatar_url}) no-repeat center / cover`;
        }
      });
    });
    return (
      <View className='home'>
        <View className='page column-page'>
          <View>
          <TaroList
            enableBackToTop
            onRefresh={this.handleRefresh}
            onLoadMore={this.handleLoadMore}
            onVirtualListInit={this.handleInit}
            virtual
            height='100vh'
            dataManager={this.dataManager}
          >
            <View onClick={this.toSearch.bind(this)}>
              <AtSearchBar
                actionName='搜一下'
                disabled={true}
                value={keyword}
                onChange={this.toSearch.bind(this)}
              />
            </View>
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
            <ScrollView scrollX className='tag-list'>
              {this.state.tagList.map((item) => <View className='tag' key={item.id}>
                <AtTag name={item.name} type='primary' active={item.active} circle onClick={this.onTagClick.bind(this)}>{item.name}</AtTag></View>)}
            </ScrollView>

            {list.map(item =>
              item.item[0].type === 'loadMore' ? (
                <View className='loadStatus' style={item.style}>
                  加载更多...
                </View>
              ) : item.item[0].type === 'ended' ? (
                <View className='loadStatus' style={item.style}>
                  没有更多了
                </View>
              ) : item.item[0].type === 'loading' ? (
                <View className='loadStatus' style={item.style}>
                  加载中...
                </View>
              ) : (
                <View
                  style={{
                    ...item.style
                  }}
                  key={item.index}
                  className='topic-column'
                  style='z-index=-1'
                >
                  {item.item.map((topic, k) => (
                    <View className='topic-item' key={topic.id}>
                      <View className='topic-item-inner'>
                        <View
                          style={{
                            background: topic.avatarUrl
                          }}
                          className='topic-item__avatar'
                        />
                        <View className='topic-item__main'>
                          <View className='topic-item__title'>
                            #{item.index * 2 + k} - {topic.title}
                          </View>
                          <View className='topic-item__price'>{topic.author.loginname}</View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )
            )}
          </TaroList>
          </View>
      </View>
      </View>
    )
  }
}

