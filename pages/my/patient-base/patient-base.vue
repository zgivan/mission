<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<free-search-select  @search="search" hasSelect :selectList="list" :currTab="currTab" @changeT="changeTab">
		</free-search-select>
		
		<!-- 病患列表 -->
		<view v-for="(item,index) in patients" :key="index">
			<base-patient-item :item="item" @back="backPage"></base-patient-item>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeSingleSelect from '@/components/use-components/free-single-select.vue'
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import basePatientItem from '@/components/use-components/base-patient-item.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				list: [{
					text: '全部',
					status: -1,
					num: 0
				},{
					text: '自由',
					status: 0,
					num: 0
				},
				{
					text: '项目中',
					status: 1,
					num: 0
				},
				{
					text: '黑名单',
					status: 2,
					num: 0
				}],
				currTab: 0,
				patients:[],
				keyword: '',
				stype: -1   // -1全部 状态0 缺资料1 正在初筛2 初筛成功3 复审通过4 签署知情成功5 筛选失败
			}
		},
		methods: {
			changeTab(index){
				this.currTab = index;
				this.refreshLists()
			},
			search(val){
				this.keyword = val
				this.refreshLists()
			},
			refreshLists(){
				this.patients = []
				this.mescroll.resetUpScroll()
			},
			upCallback(page){
				this.getList(page)
			},
			getList(page){
				console.log(this.stype)
				// 获取我的患者列表
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/member/mypatient',{
					page: page.num,
					size: page.size,
					time: '',
					status: this.list[this.currTab].status,
					keyword: this.keyword
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res=>{
					uni.hideLoading()
					console.log(res)
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.patients = res.data.list
						}else{
							this.patients = this.patients.concat(res.data.list)
						}
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if(page.num === 1){
							this.patients = []
						}
					}
				})
			},
			backPage(id){
				this.$eventHub.$emit('setpid',id);
				uni.navigateBack()
			}
		},
		components: {
			freeSearchSelect,
			freeSingleSelect,
			basePatientItem
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
