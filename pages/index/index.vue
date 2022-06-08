<template>
	<view>
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		
		<scroll-view scroll-y="true" :style="'height:'+scrollH+'rpx;'" @scrolltolower="loadmore()">
			<!-- 首页轮播图 -->
			<!-- <swiper-image :resdata="swipers"></swiper-image> -->
			<!-- 分类 -->
			   
			        
			            
			<index-nav :resdata="indexnavs"></index-nav>
			            
			        
			    
			
			
			<!-- 全局分割线 -->
			<!-- <divider></divider> -->
			
			
			
			
			<!-- <card>
				<block slot = "title">标题</block>
				<image src="../../static/images/bg.jpg" mode="widthFix"></image>
			</card> -->
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
			<divider></divider>
			<view class="d-flex a-center j-center text-light-muted font-md py-3">
				{{loadText}}
			</view>
		</scroll-view>
		
		
		
	</view>
	
	
</template>

<script>
	import { weBtoa, weAtob } from '@/weapp-jwt.js'
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav from "@/components/index/index-nav.vue"; 
	import card from "@/components/common/card.vue";
	import commonList from "@/components/common/common-list.vue";
	
	export default {
		created() {
			console.log("hello world")
			this.__init()
		},
		components:{
			swiperImage,
			indexNav,
			card,
			commonList
			
		},
		data() {
			return{
				scrollH:500,
				swipers:[
					{src:"http://139.196.157.116:9000/nnt1/201250130王明俊.JPG"},
					{src:"/static/images/demo/cate_02.png"},
					{src:"/static/images/demo/cate_03.png"}
				],
				indexnavs:[
					
					
					{src:"/static/images/indexnav/new.png",text:"最新发布"},
					{src:"/static/images/indexnav/book.png",text:"学习必备"},
					{src:"/static/images/indexnav/ball.png",text:"健康户外"},
					{src:"/static/images/indexnav/fan.png",text:"宿舍神器"},
					{src:"/static/images/indexnav/shoe.png",text:"潮玩衣饰"},
					{src:"/static/images/indexnav/computer.png",text:"影娱数码"},
					{src:"/static/images/indexnav/free.png",text:"零元专区"},
					{src:"/static/images/indexnav/talent.png",text:"技能服务"},
					{src:"/static/images/indexnav/help.png",text:"求助帮忙"},
					{src:"/static/images/indexnav/say.png",text:"社区交流"}
				],
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
			//this.getSwiperList()
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
					page:1
				}
				 
				
				const { data: goodsList } = await uni.$http.post('/goods/listAllGoods', query)
				
				console.log(goodsList)
				if (goodsList.code !== 200) return uni.$showMsg('查询失败!')
				for(var i = 0; i<goodsList.data.records.length;i++){
					
					const good = {
						goodsId:goodsList.data.records[i].goodsId,
						cover:"http://139.196.157.116:9000/"+goodsList.data.records[i].imageUrls.split("-")[0],
						
						desc:goodsList.data.records[i].goodsDetail,
						price:goodsList.data.records[i].price
					}
					
					
				
					this.commonList.push(good);
					
				}
					
			
				
			},
			async getSwiperList() {
			  const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
			  // 请求失败
			  if (res.meta.status !== 200) return uni.showToast({
			  	title:'数据请求失败！',
				duration:1500,
				icon:'none'
			  })
			
			  this.swipers = res.message
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			async loadmore(){
				if(this.loadText!=="上拉加载更多"){
					return;
				}
				//模拟加载
				this.loadText = "加载中......";
				this.pageIndex++;
				const query = {
					page:this.pageIndex
				}
				 
				
				const { data: goodsList } = await uni.$http.post('/goods/listAllGoods', query)
				
				console.log(goodsList)
				if (goodsList.code !== 200) return uni.$showMsg('查询失败!')
				
				if(goodsList.data.records.length < 10){
					this.loadText = "没有更多了"
				}
				let moreList = []
				for(var i = 0; i<goodsList.data.records.length;i++){
					const good = {
						goodsId:goodsList.data.records[i].goodsId,
					
						cover:"http://139.196.157.116:9000/"+goodsList.data.records[i].imageUrls.split("-")[0],
						
						desc:goodsList.data.records[i].goodsDetail,
						price:goodsList.data.records[i].price
					}
					
					moreList.push(good);

				}
				
				this.commonList = [...this.commonList,...moreList];
				if(goodsList.data.records.length < 10){
					this.loadText = "没有更多了"
				}else{
					this.loadText = "上拉加载更多";
				}
				
			}
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
	.search-box{
		position: sticky;
		
		top: 0;
		
		z-index: 999;
	}
	
</style>

