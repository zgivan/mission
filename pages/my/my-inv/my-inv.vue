<template>
	<view>
		<uni-section title="直接邀请" type="line" :padding="false">
			<view class="flex align-center justify-center" style="height: 200upx;">
				<button open-type="share"
					class="py-2 main-bg-color text-white flex align-center justify-center rounded font"
					style="width: 40%;line-height:1.2;" @click="share">邀请下级</button>
			</view>
		</uni-section>
		<uni-section title="下载邀请二维码" type="line" :padding="false">
			<view class="flex align-center justify-center flex-column py-4">
				<image :src="image" mode="widthFix" style="width: 40%;"></image>
				<view class="py-2 main-bg-color text-white flex align-center justify-center rounded font mt-3"
					style="width: 40%;line-height:1.2;" @click="downloadImage">下载</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	export default {
		data() {
			return {
				shareText: '邀请你加入百科迈招募',
				image: ''
			}
		},
		methods: {
			downloadImage() {
				uni.showLoading({
					title: '下载中'
				})
				var self = this
				uni.downloadFile({
					url: this.image,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										icon: 'none'
									})
								},
								fail: function() {
									uni.showToast({
										title: '保存失败，请稍后重试',
										icon: 'none'
									})
								}
							})
						}
					},
					fail: (err) => {
						// console.log('downloadFile fail, err is:', err)
					}
				})
			},
			getEwm() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/member/my-qr-code', {}, {
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					uni.hideLoading()
					if (res.code === 1) {
						this.image = res.data.path
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareText,
				path: '/pages/tabbar/index/index?pid='+uni.getStorageSync('uid'),
				imageUrl: this.image
			}
		},
		onLoad() {
			this.getEwm()
		}
	}
</script>

<style>

</style>
