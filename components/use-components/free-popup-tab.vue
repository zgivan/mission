<template>
	<view class="flex align-center border-top border-light-secondary align-stretch font-sm text-muted">
		<view class="flex-1 bg-white flex align-center justify-center" style="height: 70rpx;" @click="toggle()">{{status}}<text class="iconfont ml-1 icon-xiajiantou font-sm"></text></view>
		<view class="flex-1 bg-white flex align-center justify-center">
			<picker mode="date" fields="month" :value="date" @change="changeTime">
				<view>{{date}}<text class="iconfont icon-xiajiantou font-sm ml-1"></text></view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			status: {
				type: String,
				default: ''
			},
			date:{
				type: String,
				default: ''
			}
		},
		methods:{
			toggle(){
				this.$emit('click')
			},
			changeTime(e){
				this.$emit('change',e)
			}
		}
	}
</script>

<style>
</style>
