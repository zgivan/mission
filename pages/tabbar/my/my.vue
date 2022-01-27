<template>
	<view class="">
		<view class="bg-white py-5 px-4 flex align-center">
			<view class="rounded position-relative flex align-center justify-center" style="width: 70rpx;height: 70rpx;">
				<image src="/static/user.png" mode="widthFix" class="w-100"></image>
				<text class="position-absolute main-bg-color text-white px-1 flex align-center justify-center" style="right: -10rpx;top: 0;height: 24rpx;border-radius: 20rpx;font-size: 16rpx;">代理</text>
			</view>
			<!-- <view class="flex-1 flex align-center">
				<view class="flex-1 ml-2 flex align-start font-small flex-column">
					<view class="text-light-muted">张三 | 13416155164</view>
					<view class="main-text-color mt-1">所属公司：017广州子公司</view>
					<view class="text-light-muted mt-1">邀请码：7L63Z3</view>
				</view>
				<view class="main-bg-color font-small text-white px-2 py-1" @click="toEditInfo">完善资料</view>
			</view> -->
			<view class="flex-1">
				<view class="main-bg-color font-sm text-white px-5 py-1 ml-5 d-inline-block" @click="getUserInfo()">登录</view>
			</view>
		</view>
		<uni-section title="个人管理" type="line" :padding="false">
			<uni-list>
				<uni-list-item show-extra-icon showArrow extra-icon="icon-tianjiahaoyou" title="邀请好友" to="/pages/my/my-inv/my-inv" />
				<uni-list-item show-extra-icon showArrow extra-icon="icon-tuandui" title="团队成员" to="/pages/my/my-team/my-team"/>
				<uni-list-item show-extra-icon showArrow extra-icon="icon-gerenxinxi1" title="团队患者" to="/pages/my/team-patient/team-patient" />
				<uni-list-item show-extra-icon showArrow extra-icon="icon-gerenzhongxin-gerenxinxi" title="我的患者" to="/pages/my/my-patient/my-patient"/>
				<uni-list-item show-extra-icon showArrow extra-icon="icon-jifen" title="我的积分" to="/pages/my/my-integral/my-integral"/>
				<uni-list-item show-extra-icon showArrow extra-icon="icon-shoucangxiao" title="我的收藏" to="/pages/my/my-collected/my-collected"/>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onClick(p){
				console.log(p)
			// 	uni.navigateTo({
			// 		url: '/page/my/'+p+'/'+p,
			// 	});
			},
			toEditInfo(){
				uni.navigateTo({
					url: '/pages/my/set-user-info/set-user-info'
				});
			},
			getUserInfo(){
				// if(this.userid !==0) return
				uni.getUserProfile({
					desc:'登录',
					success:(res)=>{
						console.log(res)
						this.getCode(res.encryptedData,res.iv)
					}
				})
			},
			getCode(encryptedData,iv){
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res.code)
						$H.post('/user/code',{
							code: res.code
						}).then(result => {
							console.log(result);
							$H.post('/user/wxlogin',{
								encryptedData: encryptedData,
								iv: iv,
								openid: result.data.openid,
								sessionKey: result.data.session_key
							}).then(ret => {
								console.log('ret:'+ret)
								// this.login(ret.data)
							}).catch(e =>{})
						}).catch(e =>{})
					},
				})
			},
		}
	}
</script>

<style>

</style>
