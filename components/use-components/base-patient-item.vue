<template>
	<view class="p-3 position-relative mt-1 bg-white" @click="toDetail">
		<view class="font font-weight-bold"><text>{{item.fullname}}</text><text class="ml-1">{{item.sex === 0 ? '男' : '女'}}</text><text class="ml-1">{{item.age}}</text></view>
		<view class="mt-2 font-sm">身高：{{item.height}}cm | 体重：{{item.weight}}kg</view>
		<view class="mt-2 font-sm">所在城市：{{item.province_name+'-'+item.city_name}}</view>
		<view class="position-absolute right-0 top-0 font-sm sec-bg-color text-white py-1 px-2">{{status}}</view>
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
			toDetail(){
				if(this.isChoice){
					this.$emit('back',this.item.id)
				}else{
					uni.navigateTo({
						url:'/pages/mission/add-patient-base/add-patient-base?mpid='+this.item.id
					})
				}
			}
		},
		computed:{
			status(){
				switch(this.item.status){
					case 0: return '自由';break;
					case 1: return '项目中';break;
					case 2: return '黑名单';break;
				}
			}
		}
	}
</script>

<style>
</style>
