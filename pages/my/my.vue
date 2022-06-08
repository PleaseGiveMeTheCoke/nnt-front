<template>
	<view class="my-container ">
		<!-- <view class="position-relative d-flex a-center " style="height: 320rpx;">
			<image src="/static/images/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			
			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image src="/static/images/demo/demo6.jpg" style="height: 145rpx; width: 145rpx;
				 border: 5rpx solid;" class="rounded-circle border-light ml-4"></image>
				 <view class="ml-2 font-md text-white">
				 	测试昵称	
				 </view>
			</view>
		
		</view> -->
		<my-login v-if="!user.token"></my-login>
		<my-userinfo v-else></my-userinfo>
		
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			})
		},
		
	}
</script>

<style>
page,
  .my-container {
    height: 100%;
  }
</style>
