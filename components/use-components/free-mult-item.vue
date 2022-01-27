<template>
	<view class="flex align-center px-3 py-2 border-bottom border-light-secondary" @click="toggle">
		<uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#5ed879' : '#C0C0C0'" size="24" />
		<text class="ml-3 font-sm">{{item.title}}</text>
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
			}
		},
		methods:{
			toggle(){
				this.$emit('toggle',this.index)
			}
		}
	}
</script>

<style>
</style>
