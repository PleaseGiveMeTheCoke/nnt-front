<template>
	<view>
		<view class="search-box">
		
			<uni-search-bar @confirm="search"  :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->

		
		<view class="history-box">
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="clean"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag :text="item" class="uni-tag" v-for="(item, i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		  </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				historyList:['apple','water','asdad'],
				
				 // 搜索的结果列表
				searchResults: [
					// {goods_name:"123adasada"},
					// {goods_name:"123qe1rafssdfsdvsa"},
					// {goods_name:"123qe1r13sgrearther13"},
				],
				timer:null,
				keyword:"",
			};
		},
		onLoad() {
		  this.historyList = JSON.parse(uni.getStorageSync('keyword') || '[]')
		},
		methods:{
			gotoDetail(item){
				//TODO
				
			},
			search(res){
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
				this.keyword = res.value
				this.saveSearchHistory();
				uni.navigateTo({
				   url: '/subpkg/goods_list/goods_list?query=' + this.keyword
				})
			},
			
			
			clean() {
			  this.historyList = []
			  uni.setStorageSync('keyword', '[]')
			},
			saveSearchHistory() {
			
			  const set = new Set(this.historyList)
			  set.delete(this.keyword)
			  set.add(this.keyword)
			
			  this.historyList = Array.from(set)
			
			  // 对搜索历史数据，进行持久化的存储
			  uni.setStorageSync('keyword', JSON.stringify(this.historyList))
			},
			
		}
	}
</script>

<style lang="scss">
.search-box{
		position: sticky;
		
		top: 0;
		
		z-index: 999;
	}
	
 .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;
	
      .uni-tag { 
        margin-top: 10px;
        margin-right: 5px;
		
      }
    }
  }
	
</style>
