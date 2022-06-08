<template>
	<view class="my-search-container" @click="searchBoxHandler">
		<view class="my-search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">二手书 二手球拍</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				console.log("123123");
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	background-color: #630075;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box{
		height: 36px;
		background-color: #FFFFFF;
		border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			color: #CCCCCC;
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>