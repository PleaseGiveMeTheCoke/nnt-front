<template>
	<view class="">
		
		
		<!-- 聊天内容区域 -->
		<scroll-view scroll-y class=" position-fixed left-0 right-0 px-3" style="background-color: #efefef; bottom: 105rpx;box-sizing: border-box;" :style="chatBodyBottom" :show-scrollbar="false" :scroll-into-view="scrollIntoView" :scroll-with-animation="true">
			
			<!-- 聊天信息列表组件 -->
			<view v-for="(item,index) in msgList" :key="index"
			:id="'chatItem_'+index">
				<my-chat-item :item="item" 
				></my-chat-item>
			</view>
			
		</scroll-view>
		<!-- 底部输入框 -->
		
		<view class="position-fixed left-0 right-0 border-top flex align-center" style="background-color: #F7F7F6;height: 105rpx;"
		:style="'bottom:'+KeyboardHeight+'px;'">
			
			<view class="flex-1">
				
				<textarea fixed class="bg-white rounded p-2 font-md" style="height: 50rpx;max-width: 450rpx;" :adjust-position="false" v-model="text" @focus="mode = 'text'"/>
			</view>
			<view class="flex-shrink">
				<!-- 发送按钮 -->
				<my-button name="发送" 
				@click="send"></my-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import $U from '@/common/free-lib/util.js';
	export default {
		
		data() {
			return {
				scrollIntoView:"",
				msgList:[],
				text:'',
				KeyboardHeight:0,
				navBarHeight:0,
				chatterInfo:{
					id:'',
					name:'',
					avatar:''
				}
			};
		},
		mounted() {
			
			var statusBarHeight = 0
			
			statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
			
			this.navBarHeight = statusBarHeight + uni.upx2px(90)
			
			
			// 监听键盘高度变化
			uni.onKeyboardHeightChange(res => {
			  
			  	this.KeyboardHeight = res.height 
				  if (this.KeyboardHeight > 0) {
					this.pageToBottom()
				  }
			  
			})
			this.pageToBottom()
			
			
		},
		computed: {
			chatBodyBottom(){
				return `bottom:${uni.upx2px(105) + this.KeyboardHeight}px;top:0px;`
			},
			...mapState({
				chat:state=>state.user.chat,
				user:state=>state.user.user
			})
		},
		methods:{
			pageToBottom(){
				
				setTimeout(()=>{
					let lastIndex = this.msgList.length - 1
					this.scrollIntoView = 'chatItem_'+lastIndex
				},300)
			},
			onMessage(message){
				console.log('[聊天页] 监听接收聊天信息',message);
				if(message.from === this.chatterInfo.id){
					this.msgList.push(message)
					return this.pageToBottom()
				}
			},
			// 发送
			send(){
				
				const msg = {
					from_avatar:JSON.parse($U.getStorage("user")).avatarUrl,
					from: $U.getStorage("user_id"),
					to: this.chatterInfo.id,
					msg:this.text
				}
				// 渲染到页面
				let index = this.msgList.length
				this.msgList.push(msg)
				// 监听上传进度
				
				// 发送到服务端
				const msgSend = {
					from_avatar:JSON.parse($U.getStorage('user')).user_info.avatarUrl,
					from_name:JSON.parse($U.getStorage('user')).user_info.nickName,
					from: $U.getStorage("user_id"),
					to: this.chatterInfo.id,
					to_avatar:this.chatterInfo.avatar,
					to_name:this.chatterInfo.name,
					msg:this.text,
					k:'',
					token:$U.getStorage("token")
				}
				this.chat.send(msgSend)
				
				this.text = ''
				
				// 置于底部
				this.pageToBottom()
			},
		},
		onLoad(e){
			console.log("123123")
			console.log(e.params)
			if(e.params){
				this.chatterInfo = JSON.parse(e.params)
				console.log(this.chatterInfo)
				//创建聊天对象 
				this.chat.createChatObject(this.chatterInfo)
				//获取历史记录
				this.msgList = this.chat.getChatDetail()
				//监听接受聊天信息
				uni.$on('onMessage',this.onMessage)	
			}
		},
		destroyed(){ 
			this.chat.destoryChatObject()
			uni.$off('onMessage',()=>{})
		}
		
		
	}
</script>

<style lang="scss">
	
.top-box {
      height: 400rpx;
      background-color: purple;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #FFF;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 16px;
        color: #FFF;
        font-weight: bold;
        margin-top: 10px;
      }
    }
</style>
