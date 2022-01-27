<template>
	<view>
		<veiw class="font-sm flex bg-white" :class="[isFixed?'position-fixed fixed-top':'',hasBorderBottom?'border-bottom border-light-secondary':'']">
			<block v-for="(item,index) in tList" :key="index">
				<view class="flex-1 text-center text-dark flex align-center justify-center" style="height: 70rpx;" :class="curr===index?'main-border-color border-bottom main-text-color':''" @click="changeTab(index)">{{item.text}}<text v-if="hasNum">({{item.num?item.num:0}})</text></view>
			</block>
		</veiw>
		<common-fixed-line h="70" v-if="isFixed"></common-fixed-line>
	</view>
</template>
<!-- 自定义tab组件 -->
<script>
	export default {
		props:{
			curr: {
				type: Number,
				default: 0
			},
			tList: {
				type: Array,
				default: []
			},
			hasBorderBottom: {
				type: Boolean,
				default: false
			},
			isFixed: {
				type: Boolean,
				default: false
			},
			hasNum:{
				type: Boolean,
				default: true
			}
		},
		methods: {
			changeTab(index){
				this.$emit('click',index)
			}
		}
	}
</script>

<style>
</style>
