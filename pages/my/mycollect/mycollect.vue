<template>
	<view >
		
		<block>
			<!-- <common-list :item ="item" :index = "index"></common-list> -->
			<view class="Index">
			    <!-- 瀑布流布局列表 -->
			    <view class="pubuBox">
			        <view class="pubuItem">
			            <view class="item-masonry" v-for="(item, index) in commonList" :key="index" @click= goToGoodsDetail(item)>
			                <image :src="item.cover" mode="widthFix"></image>
			                <view class="listtitle"> <!-- 这是没有高度的父盒子（下半部分） -->
			                    <view class="listtitle1">
			                        {{item.desc}}
			                    </view>
			                    <view class="listtitle2">
			                        <text class="listtitle2son">￥</text>
			                        {{ item.price }}
			                    </view>
			                    
			                </view>
			            </view>
			        </view>
			    </view>
			</view>
		</block>
			
	</view>
</template>

<script>
	import { weBtoa, weAtob } from '@/weapp-jwt.js'
	import indexNav from "@/components/index/index-nav.vue"; 
	import card from "@/components/common/card.vue";
	import commonList from "@/components/common/common-list.vue";
	
	export default {
		created() {
			console.log("hello world")
			this.__init()
		},
		components:{
			indexNav,
			card,
			commonList
			
		},
		data() {
			return{
				commonList:[
					
					
				],
				moniList:[
					{
						cover:"/static/images/demo/list/1.jpg",
						title:"标题",
						desc:"描述",
						price:"1111"
					}
					
				],
				loadText:"上拉加载更多",
				pageIndex:1
			}
			
		},
		
		onReady() {
			
		},
		onLoad() {
			 uni.getSystemInfo({
			 	success:(res)=>{
			 		this.scrollH = (res.screenHeight * (750 / res.windowWidth))-50
			 	}
			 })	
		},
		methods: {
		
			goToGoodsDetail(item){
				console.log("121231231232130000")
				console.log(item)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goodsId='+item.goodsId
				})
			},
			async __init(){
				const query = {
					page:1,
					userId: ''
				}
				query.userId = uni.getStorageSync('user_id')
				const { data: goodsList } = await uni.$http.get('/user/listAllCollections', query)
				
				console.log(goodsList)
				if (goodsList.code !== 200) return uni.$showMsg('查询失败!')
				for(var i = 0; i<goodsList.data.length;i++){
					
					const good = {
						goodsId:goodsList.data[i].goodsId,
						cover:"http://139.196.157.116:9000/"+goodsList.data[i].imageUrls.split("-")[0],
						
						desc:goodsList.data[i].goodsDetail,
						price:goodsList.data[i].price
					}
					
					
				
					this.commonList.push(good);
					
				}
					
			
				
			},
			async loadmore(){
			// 	if(this.loadText!=="上拉加载更多"){
			// 		return;
			// 	}
			// 	//模拟加载
			// 	this.loadText = "加载中......";
			// 	this.pageIndex++;
			// 	const query = {
			// 		page:this.pageIndex
			// 	}
				 
				
			// 	const { data: goodsList } = await uni.$http.post('/goods/listAllGoods', query)
				
			// 	console.log(goodsList)
			// 	if (goodsList.code !== 200) return uni.$showMsg('查询失败!')
				
			// 	if(goodsList.data.records.length < 10){
			// 		this.loadText = "没有更多了"
			// 	}
			// 	let moreList = []
			// 	for(var i = 0; i<goodsList.data.records.length;i++){
			// 		const good = {
			// 			goodsId:goodsList.data.records[i].goodsId,
					
			// 			cover:"http://139.196.157.116:9000/"+goodsList.data.records[i].imageUrls.split("-")[0],
						
			// 			desc:goodsList.data.records[i].goodsDetail,
			// 			price:goodsList.data.records[i].price
			// 		}
					
			// 		moreList.push(good);

			// 	}
				
			// 	this.commonList = [...this.commonList,...moreList];
			// 	if(goodsList.data.records.length < 10){
			// 		this.loadText = "没有更多了"
			// 	}else{
			// 		this.loadText = "上拉加载更多";
			// 	}
				console.log('暂不支持')
			}
			// console.log('暂不支持')
		}
	}
</script>

<style lang="scss">
	//瀑布流
	page {
	    background-color: #eee;
	    height: 100%;
	}
	
	.pubuBox {
	    padding: 22rpx;
	}
	
	.pubuItem {
	    column-count: 2;
	    column-gap: 20rpx;
	}
	
	.item-masonry {
	    box-sizing: border-box;
	    border-radius: 15rpx;
	    overflow: hidden;
	    background-color: #fff;
	    break-inside: avoid;
	    /*避免在元素内部插入分页符*/
	    box-sizing: border-box;
	    margin-bottom: 20rpx;
	    box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}
	
	.item-masonry image {
	    width: 100%;
	}
	
	.listtitle {
	    padding-left: 22rpx;
	    font-size: 24rpx;
	    padding-bottom: 22rpx;
	
	    .listtitle1 {
	        line-height: 39rpx;
	        text-overflow: -o-ellipsis-lastline;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        display: -webkit-box;
	        -webkit-line-clamp: 2;
	        line-clamp: 2;
	        -webkit-box-orient: vertical;
	        min-height: 39rpx;
	        max-height: 78rpx;
	    }
	
	    .listtitle2 {
	        color: #ff0000;
	        font-size: 32rpx;
	        line-height: 32rpx;
	        font-weight: bold;
	        padding-top: 22rpx;
	
	        .listtitle2son {
	            font-size: 32rpx;
	        }
	    }
	
	    .listtitle3 {
	        font-size: 28rpx;
	        color: #909399;
	        line-height: 32rpx;
	        padding-top: 22rpx;
	    }
	}
	
	.Index {
	    width: 100%;
	    height: 100%;
	}
	
</style>
