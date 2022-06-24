<template>
	<view >
		<view class="item-masonry m-2 bg-white">
			
		
		
	<view class="p-2 d-flex a-center border-bottom bg-white">
		<textarea v-model="formData.goodsDetail" style="height: 120upx;" class="px-1 font-md flex-1" type="text" value=""
		 placeholder="详细描述您想出售的宝贝,如名称,品牌,尺码,几成新,转手原因等" placeholder-style="color:#cccccc"/>
		 
	</view>
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<image src= "/static/images/classify.png"
				style="width: 30upx;height: 30upx;"
				mode="widthFix"
			></image>
			<view class="font-md text-secondary mr-1 flex-shrink">
				分类
			</view>
			<uni-data-select
			class = "flex-1"
			style="width: 20upx;"
			  v-model="formData.classify"
			  :localdata="range"
			  :clear="false"
			></uni-data-select>
			<view class="flex-1" style="color: red;">
				注:选择合适分类有利于有需求的人更好的找到商品哟
			</view>
		</view>
		
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<image src= "/static/images/price.png"
				style="width: 30upx;height: 30upx;"
				mode="widthFix"
			></image>
			<view class="font-md text-secondary mr-1 flex-shrink">
				价格
			</view>
			<input v-model="formData.price" class="px-1 font-md flex-1" placeholder="输入宝贝价格" placeholder-style="color:#cccccc" type="text" value="">
		</view>
		
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<image src= "/static/images/school.png"
				style="width: 30upx;height: 30upx;"
				mode="widthFix"
			></image>
			<view class="font-md text-secondary mr-1 flex-shrink">
				校区
			</view>
				<uni-section title="单选" type="line" class="m-2">
						<view class="uni-px-5 uni-pb-5">
							<uni-data-checkbox v-model="formData.campus" :localdata="campus"></uni-data-checkbox>
						</view>
					</uni-section
			<input class="px-1 font-md flex-1" placeholder="输入您所在校区" placeholder-style="color:#cccccc" type="text" value="">
		</view>
		
		<view class=" p-2 d-flex a-center border-bottom bg-white">
			<image src= "/static/images/wechat.png"
				style="width: 30upx;height: 30upx;"
				mode="widthFix"
			></image>
			<view class="font-md text-secondary mr-1 flex-shrink">
				微信
			</view>
			<input v-model="formData.weixin" class="px-1 font-md flex-1" placeholder="输入您的微信号(选填,方便买家联系)" placeholder-style="color:#cccccc" type="text" value="">
		</view>
		
		<view class=" p-2 d-flex a-center border-bottom bg-white">
			<image src= "/static/images/phone.png"
				style="width: 30upx;height: 30upx;"
				mode="widthFix"
			></image>
			<view class="font-md text-secondary mr-1 flex-shrink">
				电话
			</view>
			
			<input v-model="formData.phone" class="px-1 font-md flex-1" type="text" placeholder="输入您的手机号(选填,方便买家联系)" placeholder-style="color:#cccccc" value="">
		</view>
	
		
		</view>
		<view class="item-masonry m-2 bg-white">
			<uni-section title="只选择图片" type="line">
						<view class="example-body">
							<view class="d-flex flex-row a-center">
								<image src= "/static/images/pic.png"
								style="width: 30upx;height: 30upx;"
								mode="widthFix"
							></image>
								<view class="">
									添加宝贝照片,最多五张,拍照时尽量让宝贝在图片中央
								</view>
							</view>
							<uni-file-picker ref="files" :auto-upload="false" v-model="imageValue" 
	fileMediatype="image" @select="select"  @success="success" @delete="deleteImage"  @progress="doUpload"  limit="5"></uni-file-picker>
						</view>
			</uni-section>
			<button @click="submitForm" type="default" style="color: white;background-color: purple;width: 490upx; border: radius 1ch;" >发布</button>
		</view>
		
		
	</view>
</template>

<script>
	 import { mapState} from 'vuex'
	export default {
		data() {
			return {
				imageValue:[],
				imageInfos:[],
				
				formData:{
					imageValue:[],
					name:'',
					classify:0,
					price:'0',
					campus:0,
					weixin:'',
					phone:'',
					goodsDetail:'',
					token:''
				},
				
				range: [
				  { value: 0, text: "学习用品" },
				  { value: 1, text: "户外用品" },
				  { value: 2, text: "宿舍用品" },
				  { value: 3, text: "服装配饰" },
				  { value: 4, text: "数码用品" },
				  { value: 6, text: "技能服务" },
				  { value: 7, text: "求助帮忙" },
				  { value: 10, text: "其他" },
				],
				
				campus: [{
						text: '仙林校区',
						value: 0
					}, {
						text: '鼓楼校区',
						value: 1
					}]
			}
		},
		computed: {
		  ...mapState('m_user', ['token'])
		},
		methods: {
			doUpload(e){
				console("文件开始上传")
			},
			async submitForm(){
				console.log(this.imageInfos);
				 let that = this
				 uni.showLoading({
				 	title: "商品发布中"
				 });
			
				 const tempFilePaths = this.imageInfos;
				 let len = tempFilePaths.length;
				 for (var i in tempFilePaths) {//多文件
				 	await uni.uploadFile({
				 		url: 'http://localhost:8000/goods/upload', //上传接口
				 		formData:{
				 			"token":that.token
				 		},
				 		filePath: tempFilePaths[i],
				 		name: 'file',
				 		success: (uploadFileRes) => {
				 			console.log(uploadFileRes);
				 			if(JSON.parse(uploadFileRes.data).code==401){
								uni.showToast("授权信息过期，请重新登录!")
								return
							}else if(JSON.parse(uploadFileRes.data).code==400){
								uni.showToast("商品发布失败，请联系管理员!")
								return
							}
							
				 			that.formData.imageValue.push(JSON.parse(uploadFileRes.data).data)
							
							console.log(that.formData.imageValue+"sssss");
							
							
				 		},
				 		fail: () => {
				 			uni.hideLoading();
				 			uni.showToast("图片上传失败，请联系开发！")
				 		},
				 		 complete: async function() {
				 			uni.hideLoading();
							len--;
							if(len == 0){
								uni.hideLoading();
								
								
								that.formData.token = that.token;
								
								const { data: loginResult } = await uni.$http.post('/goods/publish', that.formData);
								console.log(loginResult)
								if (loginResult.code == 400) return uni.$showMsg('商品发布失败！');
								if (loginResult.code == 401) return uni.$showMsg('授权信息过期，请登录');
							}
				 		}
				 	});
				 }
			},
			
			select(e){
				
				 const tempFilePaths = e.tempFilePaths;
				 for (var i in tempFilePaths){
					 this.imageInfos.push(tempFilePaths[i]);
				 }
				
				
			},
			// 上传成功
			success(e){
				
				
				console.log('上传成功')
				console.log(e)
			},
			deleteImage(e){
				console.log(JSON.stringify(e.tempFile.path));
				console.log(JSON.stringify(this.imageInfos[0]));
				var index = 0;
				for(var i = 0; i<this.imageInfos.length;i++){
					if(JSON.stringify(e.tempFile.path) == JSON.stringify(this.imageInfos[i])){
						console.log("find!!!!")
						index = i;
						break;
					}
				}
				this.imageInfos.splice(index,1);
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #eee;
}
.item-masonry {
	    box-sizing: border-box;
	    border-radius: 15rpx;
	    //overflow: hidden;
	    background-color: #fff;
	    break-inside: avoid;
	    /*避免在元素内部插入分页符*/
	    box-sizing: border-box;
	    margin-bottom: 20rpx;
	    box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}
.example-body {
		padding: 10px;
		padding-top: 0;
		color: purple;
	}	
</style>
