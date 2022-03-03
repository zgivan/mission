<template>
	<navigator class="bg-white mt-2 p-2 flex" :class="isCol?'flex-column':''" :url="'/pages/news/news-detail/news-detail?id='+item.key+'&name='+item.description">
		<view class="flex justify-center align-center rounded overflow-hidden" :style="isCol?'width: 650rpx;height: 250rpx;overflow: hidden;':'width:200rpx;height:200rpx'">
			<image :src="newsItem.thumbnail" class="w-100" :mode="!isCol?'widthFix':''"></image>
		</view>
		<view class="flex flex-column" :class="!isCol?'flex-1 pl-2 justify-between':'pt-2'">
			<view class="font font-weight-bold">{{newsItem.description}}</view>
			<view class="flex align-center font-sm text-light-muted mt-1">
				<view class="flex-1">阅读 {{item.view}}</view>
				<view class="">{{newsItem.create_time}}</view>
			</view>
		</view>
	</navigator>
</template>
<!-- 新闻列表item组件 -->
<script>
	import $T from '@/common/lib/tool.js'
	export default {
		props:{
			isCol: {		//图片和标题分布样式
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: {}
			}
		},
		computed:{
			newsItem(){
				let ni = this.item
				ni.create_time = $T.exchageTime(ni.create_time,1)
				return ni
			}
		}
	}
</script>

<style>
</style>
