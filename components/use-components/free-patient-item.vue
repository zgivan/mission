<template>
	<view class="p-3 position-relative mt-1 bg-white">
		<view class="font font-weight-bold"><text>{{item.name}}</text><text>{{item.sex}}</text><text>{{item.age}}</text></view>
		<view class="mt-2 font-sm">匹配项目：{{item.projectName}}</view>
		<view class="mt-2 font-sm">报名时间：{{item.createTime}}</view>
		<view class="mt-2 font-sm">审核批复：<text class="sec-text-color">{{item.remark}}</text></view>
		<view class="position-absolute right-0 top-0 font-sm sec-bg-color text-white py-1 px-2">{{item.status}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
</style>
