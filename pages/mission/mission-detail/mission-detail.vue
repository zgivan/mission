<template>
	<view>
		<free-list :type="2" :item="info"></free-list>
		<common-fixed-line :h="80"></common-fixed-line>
		<view class="flex align-stretch position-fixed fixed-bottom align-stretch bg-white" style="height: 80rpx;">
			<view class="flex align-center flex-1 text-dark">
				<button open-type="contact" class="flex-1 flex flex-column align-center justify-center p-0 m-0 bg-white" style="line-height: 1em;border-color: #fff!important">
					<text class="iconfont icon-kefu"></text>
					<text class="font-small">客服</text>
				</button>
				<button open-type="share" class="flex-1 flex flex-column align-center justify-center p-0 m-0 bg-white" style="line-height: 1em;border-color: #fff!important">
					<text class="iconfont icon-fenxiang_o"></text>
					<text class="font-small">分享</text>
				</button>
				<view class="flex-1 flex flex-column align-center justify-center" :class="info.collection == 1 ? 'sec-text-color' : ''" @click="collect">
					<text class="iconfont icon-shoucangxiao"></text>
					<text class="font-small">收藏</text>
				</view>
			</view>
			<view class="flex flex-1 align-center justify-center font-sm main-bg-color text-white" @click="getMission" v-if="info.is_join == 0">领取任务</view>
			<navigator class="flex flex-1 align-center justify-center font-sm sec-bg-color text-white" :url="'/pages/mission/add-patient/add-patient?id='+info.id+'&sym='+info.symptom+'&symName='+info.symptom_name" v-else>推荐患者</navigator>
		</view>
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	import { mapState, mapMutations } from 'vuex'
	import $H from '@/common/lib/request.js'
	export default {
		data() {
			return {
				id: '',
				info: {}
			}
		},
		onLoad:function(option){
			if(option.pid){
				uni.setStorageSync('pid',option.pid)
			}
			this.id = option.id
			console.log(this.id)
			this.getDetail()
		},
		computed:{
			...mapState({
				userid: state => state.login.userid,
				userinfo: state => state.login.userinfo,
				loginStatus: state => state.login.loginStatus
			})
		},
		methods: {
			getDetail(){
				$H.post('/task/details',{
					id: this.id
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
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
			},
			getMission(){
				if(!uni.getStorageSync('auth')){
					uni.showToast({
						title: '授权登录后才能进行此操作',
						icon: 'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					},800)
					return
				}
				// 领取任务
				$H.post('/task/jointask',{
					task_id: this.info.id
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					console.log(res)
					if(res.code === 1){
						uni.showToast({
							msg: '领取成功'
						})
						this.getDetail()
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			collect(){
				if(!uni.getStorageSync('auth')){
					uni.showToast({
						title: '授权登录后才能进行此操作',
						icon: 'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					},800)
					return
				}
				uni.showLoading({
					title:'操作中...',
					mask: true
				})
				$H.post('/task/collection',{
					task_id: this.info.id
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						uni.showToast({
							title: res.msg
						})
						this.getDetail()
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		components:{
			freeList
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/mission/mission-detail/mission-detail?id='+this.id+'&pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>
	button::after{
		border: none;
	}
</style>
