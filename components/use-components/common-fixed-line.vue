<template>
	<view :style="'width:100%;height:'+h+'rpx'"></view>
</template>
<!-- 公共组件主要做fixed浮动层的填充，可全局调用 -->
<script>
	export default {
		props: {
			h: {
				type:Number,
				default: 0
			}
		}
	}
</script>

<style>
</style>
