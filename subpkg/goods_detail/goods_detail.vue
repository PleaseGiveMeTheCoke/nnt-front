<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
		    <image :src="item.pics_big" @click="preview(i)"></image>
		  </swiper-item>
		</swiper> -->
		<!-- 用户信息区域 -->
		<view class="d-flex flex-row">
			<view class="d-flex m-1 a-center">
			  <image :src="user_info.avatar" class="avatar a-center"></image>
			  <view class="flex-column p-2 a-center ">
			  	<view class="font-weight font-md">{{user_info.name}}</view>
			  	<view class="font-weight-100 font-sm"> 2022-5-16 发布于 {{goods_info.goods_campus}}</view>
			  </view>
			  
			</view>
		
		</view>
		
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
		  <!-- 商品价格 -->
		  <view class="d-flex">
			  <view class="mr-0 price0">
			  	￥
			  </view>
			  <view class="ml-0 price">
			  	{{goods_info.goods_price}}
			  </view>
			  <!-- 校区 -->
		</view>
		
		  <!-- 商品信息主体区域 -->
		  <view class="d-flex flex-column goods-info-body">
		    <!-- 商品的名字 -->
		    <!-- <view class="goods-name font-big">{{goods_info.goods_name}}</view> -->
		    <!-- <view class="goods-name font-big">{{goods_info.goods_name}}</view> -->
		    <!-- 收藏 -->
		    <!-- <view class="favi">
		      <uni-icons type="star" size="18" color="gray"></uni-icons>
		      <text>收藏</text>
		    </view> -->
			<view class="font-md">{{goods_info.goods_desc}}
			  
			</view>
		  </view>
		  
		  
		</view>
		<view class="mr-2 ml-2 mb-0"  v-for="(item, index) in goods_info.images" :key="index">
			<image style="border-radius: 15upx; margin-bottom: 0px;" :src="'http://139.196.157.116:9000/'+item" mode="widthFix"></image>
		</view>
		
		<!-- 商品导航组件区域 -->
		<view class="goods_nav">
		  <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				user_info:{
					avatar:'',
					name:'',
					user_id:-1,
				},
				goods_info:{
					goods_campus:"仙林校区",
					goods_classify:-1,
					goods_desc:'',
					goods_id:-1,
					images:[],
					goods_name:"计算机系统基础计算机系统基础计算机系统基础计算机系统基础计算机系统基础计算机系统基础计算机系统基础计算机系统基础",
					goods_phone:'',
					goods_price:100,
					goods_userId:-1,
					goods_weixin:''
				},
				options: [{
				  icon: 'chatbubble',
				  text: '联系卖家',
				  infoBackgroundColor: '#007aff',
				  infoColor: "red"
				}, {
				  icon: 'hand-down',
				  text: '举报',
				  info: 0
				},{
				  icon: 'star',
				  text: '收藏',
				  info: 0
				}],
				buttonGroup: [{
				    text: '卖家微信',
				    backgroundColor: '#ff0000',
				    color: '#fff'
				  },
				  {
				    text: '卖家电话',
				    backgroundColor: '#ffa200',
				    color: '#fff'
				  }
				]
			};
		},
		onLoad: function (options) {
			
			const goodsId = options.goodsId;
		    this.getGoodsDetail(goodsId);
		},

		methods:{
			async getGoodsDetail(goodsId) {
				
			  const { data: res } = await uni.$http.get('/goods/detail', { goodsId })
			  if (res.code !== 200) return uni.$showMsg()
				console.log(res)
			  
				if(res.data.campus == 0){
					this.goods_info.goods_campus = '仙林校区'
				}else if(res.data.campus == 1){
					this.goods_info.goods_campus = '鼓楼校区'
				}
				this.goods_info.goods_classify = res.data.classify
				this.goods_info.goods_id = res.data.goodsId
				this.goods_info.images= res.data.imageUrls.split("-")
				
				this.goods_info.goods_phone= res.data.phone
				this.goods_info.goods_weixin= res.data.weixin
				this.goods_info.goods_price= res.data.price
				this.goods_info.goods_userId= res.data.userId
				this.goods_info.goods_desc= res.data.goodsDetail
				this.getUserDetail(this.goods_info.goods_userId)
			},
			async getUserDetail(userId){
				const { data: res } = await uni.$http.get('/user/detail', { userId })
				if (res.code !== 200) return uni.$showMsg()
				console.log(res)
				this.user_info.avatar = res.data.avatarUrl
				this.user_info.name = res.data.nickname
				this.user_info.user_id = res.data.openId
			},
			preview(i) {
			  uni.previewImage({
			    current: i,
			    urls: this.goods_info.pics.map(x => x.pics_big)
			  })
			},
			onClick(e){
				if(e.index==0){
					uni.navigateTo({
						url: '../../pages/chat/chat/chat?params='+JSON.stringify({
							id:this.user_info.user_id,
							name:this.user_info.name ? this.user_info.name : '',
							avatar:this.user_info.avatar
						})
					});
				}
			}
		},
		
	}
</script>
<style lang="scss">
	.price0 {
	    color: #ff0000;
	    font-size: 32rpx;
	    line-height: 32rpx;
	    font-weight: bold;
	    padding-top: 22rpx;
		
	    .listtitle2son {
	        font-size: 32rpx;
	    }
	}
	.price {
	    color: #ff0000;
	    font-size: 60rpx;
	    line-height: 32rpx;
	    font-weight: bold;
	    padding-top: 22rpx;
		margin-bottom: 10px;
	    .listtitle2son {
	        font-size: 32rpx;
	    }
	}
	.avatar {
	  width: 90upx;
	  height: 90upx;
	  border-radius: 45px;
	  border: 2px solid #FFF;
	  
	}
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;
	
    

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
		  margin-bottom: 10px;
        font-size: 30px;
        margin-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
		display: flex;
		align-items: center;
		flex-direction: row;
		font-size: 15px;
		color: #630075;
		margin: 10px 0;
    }
  }

  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .goods-detail-container {
    padding-bottom: 50px;
  }
</style>