<template>
	<view class="card">
		<!-- header -->
		<view class="p-2 border-bottom main-border-color">
			<slot name="title">
				
				<text v-if="showHead" class="font-md font-weight">{{headTitle}}</text>
			</slot>
			
		</view>
		<!-- body -->
		<view>
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix"></image>
			<slot/>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			headTitle:String, 
			bodyCover:String,
			showHead:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
</style>