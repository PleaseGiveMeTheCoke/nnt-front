<template>
	<view>
		 <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login"  @click="getUserInfo">一键登录</button>
    <text class="tips-text">登录后即可发布商品</text>
  </view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				code:0
			};
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			})
		},
		methods:{
			
			async getUserInfo() {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
				this.$data.code = res.code;
				uni.getUserInfo({
					success: (infoRes) => {
						if (infoRes.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
						console.log(infoRes)
						this.getToken(infoRes)
					}
				})
				
			},
			async getToken(info) {
			  
			 
			
			  // 准备参数
			  const query = {
			    code: this.$data.code,    
			    rawData: info.rawData,
				signature: info.signature
			  }
			
			  const { data: loginResult } = await uni.$http.post('/user/wxlogin', query)
			  console.log(loginResult)
			  if (loginResult.code !== 200) return uni.$showMsg('登录失败！')
				
			  // 直接把 token 保存到 vuex 中
			  const user = {
				  token:loginResult.data.token,
				  user_id:loginResult.data.userId,
				  user_info:info.userInfo
			  }
			  console.log(info.userInfo)
			  this.$store.dispatch('login',user)
			  
	
			  
			},
		}
	}
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: purple;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
