<template>
	<!-- <view class="row j-center m-2"> -->
	<view class="m-2 row item-masonry">
		

		<block v-for="(item,index) in resdata" :key="index">
			<view class="span-4 d-flex flex-column j-center a-center py-1"
			@tap="event(item)">
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
			event(item){
				console.log("点击了图标")
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