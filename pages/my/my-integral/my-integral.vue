<template>
	<view>
		<free-tab :hasNum="false" :tList="typeList" :curr="tCurr" @click="changeTab"></free-tab>
		<view v-if="tCurr===0" class="py-3 mt-2 bg-white">
			<view class="flex align-center">
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold main-text-color">0</text>
					<text class="font-sm mt-2">累计积分</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold text-warning">0</text>
					<text class="font-sm mt-2">可提现积分</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold text-primary">0</text>
					<text class="font-sm mt-2">已提现积分</text>
				</view>
			</view>
		</view>
		<view v-if="tCurr===1">
			<view class="mt-1 bg-white p-2">
				<view class="flex align-center font">
					<text class="flex-1">完成任务</text>
					<text class="main-text-color font-weight-bold">+3000积分</text>
				</view>
				<view class="font-small mt-2 text-light-muted">2022-01-13 14:00:00</view>
			</view>
			<view class="mt-1 bg-white p-2">
				<view class="flex align-center font">
					<text class="flex-1">系统提现</text>
					<text class="text-success font-weight-bold">-3000积分</text>
				</view>
				<view class="font-small mt-2 text-light-muted">2022-01-13 14:00:00</view>
			</view>
			<view class="mt-1 bg-white p-2">
				<view class="flex align-center font">
					<text class="flex-1">完成任务</text>
					<text class="main-text-color font-weight-bold">+3000积分</text>
				</view>
				<view class="font-small mt-2 text-light-muted">2022-01-13 14:00:00</view>
			</view>
		</view>
	</view>
</template>

<script>
	import freeTab from '@/components/use-components/free-tab.vue'
	export default {
		data() {
			return {
				tCurr: 0,
				typeList: [
					{
						text: '积分'
					}, {
						text: '积分明细'
					}
				]
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index
			}
		},
		components: {
			freeTab
		}
	}
</script>

<style>

</style>
