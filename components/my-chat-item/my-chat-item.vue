<template>
	<div>
		<!-- 气泡 -->
		<view class=" flex align-start position-relative mb-3"
		:class="!isself ? 'justify-start' : 'justify-end'">
			<!-- 好友 -->
			<template v-if="!isself">
				<my-avatar size="70" :src="item.from_avatar" @click="openUser"></my-avatar>
				
				<uni-icons class="iconfont text-white font-md position-absolute chat-left-icon"  custom-prefix="iconfont" type="icon-zuofanye" color = "#ffffff" size="10"></uni-icons>
			</template>
			
			<view class="flex flex-column">
				
				
				<div class="p-2 rounded" :class="labelClass" style="max-width:500rpx;" :style="labelStyle">
					
					<text class="font-md">{{item.msg}}</text>		
				</div> 
				
				
			</view>
			
			<!-- 本人 -->
			<template v-if="isself">
				<uni-icons class="iconfont text-white font-md position-absolute chat-right-icon"  custom-prefix="iconfont" type="icon-youfanye" color = "#6BEE68" size="10"></uni-icons>
				<my-avatar size="70" :src="item.from_avatar"
				@click="openUser"></my-avatar>
				
			</template>
		</view>
		
		
	
		
		
	</div>
</template>

<script>
	
	
	import $U from '@/common/free-lib/util.js';
	
	export default {
		name:'my-chat-item',
		
		props: {
			item: Object,
			index:Number,
			// 上一条消息的时间戳
			pretime:[Number,String],
			shownickname:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				innerAudioContext:null,
				audioPlaying:false,
				// 默认封面的宽高
				poster:{
					w:100,
					h:100
				}
			}
		},
		computed: {
			
			// 是否是本人
			isself() {
				return this.item.from === $U.getStorage("user_id")
			},
			

			// 气泡的样式
			labelClass(){
			
	
				return this.isself ? 'bg-chat-item mr-3 ' : 'speech-bubble-your bg-white ml-3'
				
			},
			nicknameClass(){
				let c = this.isself ? 'justify-end' : ''
				return c +' '+ this.labelClass
			},
			
		},
		
		
		methods:{
			
			openUser(){
				uni.navigateTo({
					url: '/pages/mail/user-base/user-base?user_id='+this.item.from_id,
				});
			},
			// 打开名片
			openUserBase(){
				uni.navigateTo({
					url: '/pages/mail/user-base/user-base?user_id='+this.item.options.id,
				});
			},
			// 加载封面
			loadPoster(e){
				this.poster.w = e.w
				this.poster.h = e.h
			},
			
			
			
			// 长按事件
			long(e){
				let x = 0
				let y = 0
				// #ifdef APP-PLUS-NVUE
				if (Array.isArray(e.changedTouches) && e.changedTouches.length > 0) {
					x = e.changedTouches[0].screenX
					y = e.changedTouches[0].screenY
				}
				// #endif
				// #ifdef H5
				x = e.changedTouches[0].pageX
				y = e.changedTouches[0].pageY
				// #endif
				// #ifdef MP
				x = e.detail.x
				y = e.detail.y
				// #endif
				this.$emit('long',{
					x,
					y,
					index:this.index
				})
			},
			// 打开视频
			openVideo(){
				uni.navigateTo({
					url: '/pages/chat/video/video?url='+this.item.data,
				});
			}
		}
	}
</script>

<style scoped>
	.chat-left-icon{
		left: 82rpx;
	}
	.chat-right-icon{
		right:82rpx;
	}
	.chat-animate{
		/* #ifndef APP-PLUS-NVUE */
		opacity: 0;
		/* #endif */
	}
	
	

</style>
