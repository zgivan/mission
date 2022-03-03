<template>
	<view>
		<view class="p-3 bg-white">
			<view class="common-text-dark font-weight-bold font">{{info.description}}</view>
			<view class="common-text-light font-small mt-1">{{info.create_time}}</view>
			<view class="common-text-light font-small mt-1">阅读量：{{info.view}}</view>
		</view>
		<view class="p-3">
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	import $T from '@/common/lib/tool.js'
	import htmlParser from '@/common/html-parser.js'
	export default {
		data() {
			return {
				id: '',
				info: {},
				htmlNodes: ''
			}
		},
		methods: {
			getInfo(){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/news/details',{
					id: this.id
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						let ni = res.data.info
						ni.create_time = $T.exchageTime(ni.create_time,1)
						this.info = ni
						var htmlString = res.data.info.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						this.htmlNodes = htmlParser(htmlString);
					}else{
						uni.showToast({
							title: res.msg
						})
					}
				})
			}
		},
		onLoad:function(option){
			this.id = option.id
			console.log(this.id)
			uni.setNavigationBarTitle({
				title: option.name
			})
			this.getInfo()
		}
	}
</script>

<style>

</style>
