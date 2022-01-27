<template>
	<view class="bg-white mt-2 p-2 flex" :class="isCol?'flex-column':''">
		<view class="flex justify-center align-center" :style="isCol?'width: 650rpx;height: 250rpx;overflow: hidden;':'width:200rpx'">
			<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg" class="w-100" :mode="!isCol?'widthFix':''"></image>
		</view>
		<view class="flex flex-column" :class="!isCol?'flex-1 pl-2 justify-between':'pt-2'">
			<view class="font font-weight-bold">资讯标资讯标题资讯标题资讯标题资讯标题题</view>
			<view class="flex align-center font-sm text-light-muted mt-1">
				<view class="flex-1">阅读 50</view>
				<view class="">2022-01-10 10:30</view>
			</view>
		</view>
	</view>
</template>
<!-- 新闻列表item组件 -->
<script>
	export default {
		props:{
			isCol: {		//图片和标题分布样式
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
</style>
