<template>
	<view>
		<view class="px-3 py-2 border-bottom border-light-secondary flex align-center justify-end">
			<view class="d-inline-block font main-text-color pl-5" @click="comform">确定</view>
		</view>
		<picker-view style="height: 400rpx;" indicator-style="height: 80rpx;" :value="val" @change="bindChange">
			<picker-view-column>
				<view class="flex align-center justify-center font" v-for="(item,index) in list" :key="index">{{item.status}}({{item.num}})</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>
<!-- 自定义的单选组件  配合popup使用 -->
<script>
	export default {
		props: {
			list: {	//选项列表
				type: Array,
				default: []
			},
			val: {	//选中项
				type: Array,
				default: []
			}
		},
		methods:{
			comform(){
				this.$emit('comf')
			},
			bindChange(e){
				this.$emit('change',e)
			}
		}
	}
</script>

<style>
</style>
