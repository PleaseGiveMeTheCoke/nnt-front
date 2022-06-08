<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
		
      <image :src="goods.imageUrls || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.goodsDetail}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.price | tofixed}}</view>
		
		
		<view class="goods-position">
			<image src="../../static/images/position.png" style="width: 60upx;height: 60upx;"
					mode="widthFix"></image>
			{{goods.campus==0?"仙林校区":"鼓楼校区"}}
		</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
		
        // 默认的图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
		display: flex;
		flex-direction: row;
        .goods-price {
          color: #630075;
          font-size: 16px;
        }
		.goods-position {
			display: flex;
			flex-direction: row;
			margin-left: 200upx;
			color: #630075;
			font-size: 16px;
		}
      }
    }
  }
</style>
