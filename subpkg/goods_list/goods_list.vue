<template>
  <view>
	<!--排序筛选组件-->
	<view class="d-flex border-top border-bottom a-center" style="height: 100upx;">
		<uni-section type="line" class="flex-1 a-center j-center pr-1" style="width: 10upx;">
			<uni-data-select
			style="width: 20upx;"
			  v-model="value"
			  :localdata="range"
			  @change="change"
			  :clear="false"
			></uni-data-select>
		</uni-section>
		<view class="flex-1 a-center j-center d-flex">
			<text class="ml-0">{{campus}}</text>
			<image src="/static/images/convert.png"
			style="width: 40upx;height: 40upx;"
			mode="widthFix" @tap="changeCampus()"></image>
		</view>
		<view class="flex-1 a-center j-center d-flex">
			<text class="ml-0">价格</text>
			<view class="d-flex flex-column ml-1">
				<image :src="priceUpImage"
				style="width: 20upx;height: 20upx;"
				mode="widthFix" class="mb-0"@tap="changePriceUp()"></image>
				<image :src="priceDownImage"
				style="width: 20upx;height: 20upx;"
				mode="widthFix" class="mt-0"@tap="changePriceDown()"></image>
			</view>
			
		</view>
	
		
		
	</view>
	  
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		  priceUpImage:"/static/images/up.png",
		  priceDownImage:"/static/images/down.png",
		  priceUpOrDown:"null",
		campus:"仙林校区",
		value: 0,
		range: [
		  { value: 0, text: "所有时间" },
		  { value: 1, text: "7天内" },
		  { value: 2, text: "30天内" },
		],
        // 请求参数对象
        queryObj: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [
			
			
		],
        total: 0,
        // 节流阀
        isloading: false
      };
    },
    onLoad(options) {
		console.log(options.query)
		this.queryObj.query = options.query || ''
	  //TODO
		this.getGoodsList()
    },
    methods: {
		changePriceUp(){
			this.priceUpOrDown = "up"
			this.priceUpImage="/static/images/up1.png"
			this.priceDownImage="/static/images/down.png"
		},
		changePriceDown(){
			this.priceUpOrDown = "down"
			this.priceUpImage="/static/images/up.png"
			this.priceDownImage="/static/images/down1.png"
		},
		changeCampus(){
			if(this.campus==="仙林校区"){
				this.campus = "鼓楼校区"
			}else{
				this.campus="仙林校区"
			}
		},
		//修改发布时间范围
		change(e) {
		    console.log("e:", e);
		},
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
		  console.log(this.queryObj)
        // 打开节流阀
        this.isloading = true
		
        const { data: res } = await uni.$http.post('/goods/getGoodsList	', this.queryObj)
		console.log(res)
        // 关闭节流阀
        this.isloading = false
        cb && cb()
        if (res.code !== 200) return uni.$showMsg()
	
        this.goodsList = [...this.goodsList, ...res.data]
        this.queryObj.pagenum++;
		this.total=res.data.length;
	
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goodsId=' + goods.goodsId
        })
      }
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')

      if (this.isloading) return

     // 让页码值自增+1
       this.queryObj.pagenum++
       this.getGoodsList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      // this.queryObj.pagenum = 1
      // this.total = 0
      // this.isloading = false
      // this.goodsList = []

      // // 重新发起数据请求
      // this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
.text {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
  }

  .uni-px-5 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .uni-pb-5 {
    padding-bottom: 10px;
  }
</style>
