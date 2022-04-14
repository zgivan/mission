<template>
	<view>
		<free-tab :tList="typeList" hasNum :curr="tCurr" isFixed @click="changeTab()"></free-tab>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mt-1">
				<block v-for="(item,index) in list" :key="index">
					<free-member-item :item="item" :stype="tCurr"></free-member-item>
				</block>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeTab from '@/components/use-components/free-tab.vue'
	import freeMemberItem from '@/components/use-components/free-member-item.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				tCurr: 0,
				typeList: [
					{
						text: '直属代理',
						num: 0
					}, {
						text: '非直属代理',
						num: 0
					}
					// , {
					// 	text: '直属团队',
					// 	num: 0
					// }
				],
				list: []
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index
				this.refreshLists()
			},
			getCount(){
				$H.post('/member/agent-num',{},{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					if(res.code === 1){
						this.typeList = [
							{
								text: '直属代理',
								num: res.data.agent_num
							}, {
								text: '非直属代理',
								num: res.data.or_agent_num
							}
						]
					}
				})
			},
			refreshLists(){
				this.list = []
				this.mescroll.resetUpScroll()
			},
			upCallback(page){
				this.getCount()
				this.getList(page)
			},
			getList(page){
				if(this.tCurr === 0){
					this.getMyAgent(page)
				}else if(this.tCurr === 1){
					this.getMyOrAgent(page)
				}else{
					this.getMyTeam(page)
				}
			},
			getMyAgent(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取我的直属代理
				$H.post('/member/myagent',{
					page: page.num,
					size: page.size
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.list = res.data.list
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.list = []
							this.mescroll.endSuccess(0)
						}
					}
				})
			},
			getMyOrAgent(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取我的直属代理
				$H.post('/member/my-or-agent',{
					page: page.num,
					size: page.size
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.list = res.data.list
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.list = []
							this.mescroll.endSuccess(0)
						}
					}
				})
			},
			getMyTeam(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取我的直属代理
				$H.post('/member/my-team',{
					page: page.num,
					size: page.size
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.list = res.data.list
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.list = []
							this.mescroll.endSuccess(0)
						}
					}
				})
			}
		},
		components: {
			freeTab,
			freeMemberItem
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
