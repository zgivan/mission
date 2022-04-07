<template>
	<view>
		<free-list type="3" :item="info"></free-list>
		<!-- 患者分类tab -->
		<view class="mt-1">
			<free-tab :tList="pType" :curr="pCurr" @click="changeTab"></free-tab>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<!-- 病患列表 -->
			<view v-for="(item,index) in patients" :key="index">
				<free-patient-item :item="item"></free-patient-item>
			</view>
		</mescroll-body>
		<common-fixed-line h="70"></common-fixed-line>
		<view class="position-fixed fixed-bottom bg-white flex align-center align-stretch font" style="height: 80rpx;">
			<navigator class="main-bg-color text-white flex-1 flex align-center justify-center" :url="'/pages/mission/add-patient/add-patient?id='+info.id+'&sym='+info.symptom+'&symName='+info.symptom_name">添加患者资料</navigator>
			<view class="flex-1 text-muted flex align-center justify-center" @click="closeMission">关闭任务</view>
		</view>
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	import freeTab from '@/components/use-components/free-tab.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				pCurr: 0,
				pType:[],
				patients:[],
				id: 0,
				info:{}
			}
		},
		methods: {
			changeTab(index){
				this.pCurr = index
				this.refreshLists()
			},
			getDetail(){
				console.log(this.id)
				uni.showLoading({
					title:'加载中...',
					mask: true
				})
				$H.post('/task/details',{
					id: this.id
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
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
			closeMission(){
				let _this = this
				uni.showModal({
					title: '是否关闭此任务？',
					success(res) {
						if(res.confirm){
							uni.showLoading({
								title:'操作中...',
								mask: true
							})
							$H.post('/task/close-task',{
								task_id: _this.id
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
									setTimeout(() => {
										uni.navigateBack({
											delta: -1
										})
									},800)
								}else{
									uni.showToast({
										title: res.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
			getPcount(){
				// 获取任务的各状态病人数
				$H.post('/patient/task-patient-list-num',{
					task_id: this.id
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					if(res.code === 1){
						this.pType = [{
							text: '缺资料',
							num: res.data.lack_num
						},
						{
							text: '筛查',
							num: res.data.screening_num
						},
						{
							text: '入组',
							num: res.data.success_num
						},
						{
							text: '排除',
							num: res.data.fail_num
						}]
					}
				})
			},
			upCallback(page){
				this.getPatients(page)
			},
			refreshLists(){
				this.patients = []
				this.mescroll.resetUpScroll()
			},
			getPatients(page){
				this.getPcount()
				uni.showLoading({
					title:'操作中...',
					mask: true
				})
				$H.post('/patient/task-patient-list',{
					task_id: this.id,
					page: page.num,
					size: page.size,
					status: this.status
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.patients = res.data.list
						}else{
							this.patients = this.patients.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.patients = []
						this.mescroll.endSuccess(0)
						}
					}
				})
			}
		},
		computed:{
			status(){
				if(this.pCurr === 0){
					return '1'
				}else if(this.pCurr === 1){
					return '0'
				}else if(this.pCurr === 2){
					return '4'
				}else if(this.pCurr === 3){
					return '5'
				}
			}
		},
		components:{
			freeList,
			freeTab,
			freePatientItem
		},
		onLoad(opt) {
			this.id = opt.id
			this.getDetail()
			this.getPcount()
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabBar/index/index?pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>

</style>
