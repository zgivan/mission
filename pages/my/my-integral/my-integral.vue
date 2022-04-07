<template>
	<view>
		<free-tab :hasNum="false" :tList="typeList" :curr="tCurr" @click="changeTab"></free-tab>
		<view v-if="tCurr===0" class="py-3 mt-2 bg-white">
			<view class="flex align-center">
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold main-text-color">{{myinfo.allintegral}}</text>
					<text class="font-sm mt-2">累计积分</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold text-warning">{{myinfo.integral}}</text>
					<text class="font-sm mt-2">可提现积分</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold text-primary">{{myinfo.integral_done}}</text>
					<text class="font-sm mt-2">已提现积分</text>
				</view>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view v-if="tCurr===1">
				<block v-for="(item,index) in list" :key="index">
					<view class="mt-1 bg-white p-2">
						<view class="flex align-center font">
							<text class="flex-1">{{item.content}}</text>
							<text class="font-weight-bold" :class="item.integral > 0 ? 'text-success' : 'text-danger'">{{item.integral}}积分</text>
						</view>
						<view class="font-small mt-2 text-light-muted">{{item.create_time_}}</view>
					</view>
				</block>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeTab from '@/components/use-components/free-tab.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				tCurr: 0,
				typeList: [
					{
						text: '积分'
					}, {
						text: '积分明细'
					}
				],
				myinfo: {},
				list: []
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index
			},
			refreshLists(){
				this.myinfo = {}
				this.list =[]
				this.mescroll.resetUpScroll()
			},
			getMyIntegral(){
				$H.post('/integral/my-integral',{},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					console.log(res)
					if(res.code === 0){
						this.myinfo = res.data
					}
				})
			},
			upCallback(page){
				console.log(uni.getStorageSync('auth'))
				this.getMyIntegral()
				this.getList(page)
			},
			getList(page){
				$H.post('/integral/my-list',{
					page: page.num,
					size: page.size
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					console.log(res)
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.list = res.data.list
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if(page.num === 1){
							this.list = []
						}
					}
				})
			}
		},
		components: {
			freeTab
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabbar/my/my?pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>

</style>
