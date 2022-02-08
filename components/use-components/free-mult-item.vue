<template>
	<view class="flex align-center px-3 py-2 border-bottom border-light-secondary" @click="toggle">
		<uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#5ed879' : '#C0C0C0'" size="24" />
		<text class="ml-3 font-sm">{{item.name}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			item:{
				type: Object,
				default: {}
			},
			index: {
				type: Number,
				default: 0
			},
			idx: {   //当选项为二维数组的时候使用
				type: [Number,String],
				default: ''
			}
		},
		methods:{
			toggle(){
				this.$emit('toggle',this.index,this.idx)
			}
		}
	}
</script>

<style>
</style>
