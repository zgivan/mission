<template>
	<view class="p-3 position-relative mt-1 bg-white" @click="toDetail(item.id||item.key)">
		<view class="font font-weight-bold"><text>{{item.fullname}}</text><text class="ml-1">{{item.sex === 0 ? '男' : '女'}}</text><text class="ml-1">{{item.age}}</text></view>
		<view class="mt-2 font-sm">匹配项目：{{item.task_name}}</view>
		<view class="mt-2 font-sm">报名时间：{{item.create_time_val}}</view>
		<view class="mt-2 font-sm">审核批复：<text class="sec-text-color">{{item.remarks||item.check_info.content}}</text></view>
		<view class="position-absolute right-0 top-0 font-sm sec-bg-color text-white py-1 px-2">{{item.status_val}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			stype: {
				type: Number,
				default: 0
			},
			isChoice:{
				type: Boolean,
				default: false
			}
		},
		methods: {
			toDetail(id){
				if(this.isChoice){
					this.$emit('back',id)
				}else{
					uni.navigateTo({
						url:'/pages/mission/add-patient/add-patient?cid='+id+'&stype='+this.stype
					})
				}
			}
		}
	}
</script>

<style>
</style>
