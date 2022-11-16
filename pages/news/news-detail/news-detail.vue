<template>
	<view>
		<view class="p-3 bg-white">
			<view class="common-text-dark font-weight-bold font">{{info.title}}</view>
			<view class="common-text-light font-small mt-1">{{info.create_time}}</view>
			<view class="common-text-light font-small mt-1">阅读量：{{info.view}}</view>
		</view>
		<view class="p-3 richtext">
			<view v-if="info.video !== ''">
				<video 
					class="w-100"
					id="myVideo" 
					:src="info.video"
					@error="videoErrorCallback"
					controls
				></video>
			</view>
			<rich-text :nodes="htmlNodes" class="mt-2"></rich-text>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	import $T from '@/common/lib/tool.js'
	import htmlParser from '@/common/lib/richText.js'
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
						this.htmlNodes = htmlParser.format(res.data.info.content);
					}else{
						uni.showToast({
							title: res.msg
						})
					}
				})
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		},
		onLoad(opt){
			if(opt.pid){
				uni.setStorageSync('pid',opt.pid)
			}
			this.id = opt.id
			uni.setNavigationBarTitle({
				title: opt.name
			})
			this.getInfo()
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/news/news-detail/news-detail?id='+this.id+'&pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>
	rich-text{
		max-width: 100%;
	}
</style>
