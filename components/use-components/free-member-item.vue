<template>
	<view class="p-3 position-relative mb-1 bg-white">
		<view class="font font-weight-bold">{{item.name|| item.fullname ? item.name||item.fullname:'未完善信息'}}</view>
		<view class="mt-2 font-sm">电话号码：{{item.phone}}</view>
		<view class="mt-2 font-sm">注册时间：{{item.createTime||item.create_time_val}}</view>
		<view class="position-absolute right-0 top-0 font-sm sec-bg-color text-white py-1 px-2">{{item.level_name || item.level}}</view>
	</view>
</template>
<!-- 成员列表组件 -->
<script>
	export default {
		props:{
			item: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
</style>
