<template>
	<view>
		<free-list :type="2" :item="info"></free-list>
		<view class="flex align-center position-fixed fixed-bottom align-stretch bg-white" style="height: 70rpx;">
			<view class="flex align-center flex-1 text-dark">
				<view class="flex-1 flex flex-column align-center justify-center">
					<text class="iconfont icon-kefu"></text>
					<text class="font-small">客服</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center">
					<text class="iconfont icon-fenxiang_o"></text>
					<text class="font-small">分享</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center">
					<text class="iconfont icon-shoucangxiao"></text>
					<text class="font-small">收藏</text>
				</view>
			</view>
			<view class="flex flex-1 align-center justify-center font-sm main-bg-color text-white">领取任务</view>
			<view class="flex flex-1 align-center justify-center font-sm sec-bg-color text-white">推荐患者</view>
		</view>
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	
	import $H from '@/common/lib/request.js'
	export default {
		data() {
			return {
				id: '',
				info: {}
			}
		},
		onLoad:function(option){
			this.id = option.id
			console.log(this.id)
			this.getDetail()
		},
		methods: {
			getDetail(){
				$H.post('/task/details',{
					id: this.id
				}).then(res => {
					if(res.code === 1){
						console.log(res)
						this.info = res.data.info
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		components:{
			freeList
		}
	}
</script>

<style>

</style>
