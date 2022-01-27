<template>
	<view>
		<uni-section title="直接邀请" type="line" :padding="false">
			<view class="flex align-center justify-center" style="height: 200upx;">
				<button open-type="share" class="py-2 main-bg-color text-white flex align-center justify-center rounded font" style="width: 40%;line-height:1.2;" @click="share">邀请下级</button>
			</view>
		</uni-section>
		<uni-section title="下载邀请二维码" type="line" :padding="false">
			<view class="flex align-center justify-center flex-column py-4">
				<image src="/static/logo.png" mode="widthFix" style="width: 40%;"></image>
				<view class="py-2 main-bg-color text-white flex align-center justify-center rounded font mt-3" style="width: 40%;line-height:1.2;" @click="downloadImage">下载</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareText: '邀请你加入百科迈招募',
				image: '/static/logo.png'
			}
		},
		methods: {
			downloadImage() {
				uni.showLoading({
					title:'下载中'
				})
				var self = this
				uni.downloadFile({
					url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: (res) => {
						console.log('downloadFile success, res is', res)
						self.imageSrc = res.tempFilePath;
						uni.hideLoading();
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareText,
				path: '/pages/tabBar/index/index',
				imageUrl:this.image ? this.image : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
			}
		}
	}
</script>

<style>

</style>
