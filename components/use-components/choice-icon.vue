<template>
	<text 
		@click.stop="onClick"
		class="flex align-center justify-center iconfont rounded-circle text-white font-small icon-gouxuan" 
		:class="selected ? 'main-bg-color' : 'border border-light-secondary'"
		style="width: 30rpx;height: 30rpx;box-sizing: border-box;"></text>
</template>

<script>
	export default {
		props: {
			selected: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			onClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
	
</style>
