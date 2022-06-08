<template>
	<view class="" hover-class="bg-light">
		
		<block v-for="(item,index) in list" :key="index">
			<view class="flex  align-stretch" @click="onClick(item)">
				<view class="flex align-center justify-center position-relative"  style="width: 145rpx;">
					<my-avatar :src = "item.avatar" size="92"></my-avatar>
					<text v-if="item.noreadnum!=0" class="bg-danger text-white rounded-circle font-sm position-absolute" style="padding-left: 20rpx; 
					padding-right: 20rpx;padding-bottom: 6rpx;padding-top: 6rpx; right: 15rpx;top: 15rpx;">{{item.noreadnum}}</text>
				</view>
				
				<view class="flex flex-column border-bottom border-light-secondary flex-1 py-3 pr-3">
					<view class="flex a-center j-sb">
						<text class="font-md">{{item.name}}</text>
						<text class="font-sm text-light-muted">{{item.update_time|formatTime}}</text>
					</view>
					<text class="font text-ellipsis text-light-muted">{{item.data}}</text>
				</view>
				
			</view>
		</block>
	</view>
	
	
</template>

<script>
	import $Time from "@/common/free-lib/time.js"
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		filters:{
			formatTime(value){
				return $Time.gettime(value);
			}
		},
		computed:{
			...mapState({
				list:state=>state.user.chatList,
				chat:state=>state.user.chat
			}),
		},
		methods: {
			onClick(item){
				console.log(item) 
				uni.navigateTo({
					url: '/pages/chat/chat/chat?params='+JSON.stringify({
						id:item.id,
						name:item.name,
						avatar:item.avatar
							
					}),
				});
				this.chat.readChatItem(item.id)
			
			}
		}
	}
</script>

<style>

</style>
