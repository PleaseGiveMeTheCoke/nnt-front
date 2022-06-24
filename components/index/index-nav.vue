<template>
	<!-- <view class="row j-center m-2"> -->
	<view class="m-2 row item-masonry">
		

		<block v-for="(item,index) in resdata" :key="index">
			<view class="span-4 d-flex flex-column j-center a-center py-1"
			@tap="event(index, item.text)">
				<image :src="item.src"
				style="width: 60upx;height: 60upx;"
				mode="widthFix"></image>
				<text class="font-sm">{{item.text}}</text>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Array
		},
		methods:{
			event(index, item){
				if(index === 0){
					// 这里从后端读取数据，按时间逆序排序
					console.log('准备施展跳转大法')
					uni.navigateTo({
						url:'/pages/index/goods_order_byDate/goods_order_byDate'
					})
				}
				else if(index === 9){
					uni.$showmsg('该功能暂不支持')
				}
				else{
					console.log("点击了图标")
					uni.navigateTo({
						url:'/pages/index/myclassify/myclassify?index=' + index + '&item=' + item
					})
				}
			}
		}
	}
</script>

<style lang="scss">
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
</style>