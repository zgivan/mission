<template>
	<view class="page">
		<free-search-select :selectList="secList" :hasSelect="true" :currTab="currTab" @changeT="changeTab" :hasSearch="hasSearch" @search="search"></free-search-select>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mt-2 bg-white" v-if="currTab < 3">
				<block v-for="(item,index) in list" :key="index">
					<free-list :type="type" :item="item" @detail="toDetail" @join="showJoin"></free-list>
				</block>
			</view>
			
			<view v-for="(item,index) in patients" :key="index" v-else>
				<free-patient-item :item="item"></free-patient-item>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	import freeList from '@/components/use-components/free-list.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				currTab: 1,
				secList: [
					{
						text: '已收藏',
						num: 1
					},
					{
						text: '招募中',
						num: 2
					},
					{
						text: '筛查中',
						num: 0
					},
					{
						text: '入组病例',
						num: 0
					}
				],
				hasSearch: true,
				type: 1,
				patients:[
					{
						name: '张三',
						sex:'男',
						age: 20,
						projectName: '测试项目名',
						createTime: '2022-01-13 09:41:50',
						status: '筛选失败',
						remark: '无意愿参加试验'
					},
					{
						name: '张三',
						sex:'男',
						age: 20,
						projectName: '测试项目名',
						createTime: '2022-01-13 09:41:50',
						status: '筛选失败',						
						remark: '无意愿参加试验'
					}
				],
				list: [],
				keyword:''
			}
		},
		methods: {
			changeTab(index){
				if(index === 1){
					this.type = 1
					this.hasSearch = true
				}else{
					if(index === 0){
						this.type = 4
					}else if(index === 2){
						this.type = 1
					}
					this.hasSearch = false
				}
				this.currTab = index
				this.refreshLists()
			},
			toManage(){
				uni.navigateTo({
					url: '/pages/mission/patient-manage/patient-manage'
				});
			},
			search(e){
				// 关键字搜索
				console.log(e)
				this.keyword = e.value
				this.refreshLists()
			},
			upCallback(page){
				this.getList(page)
			},
			refreshLists(){
				this.list = []
				this.mescroll.resetUpScroll()
			},
			getList(page){
				if(this.currTab === 0){
					this.getCollected(page)
				}else if(this.currTab === 1){
					this.getMyWork(page)
				}
			},
			getCollected(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取收藏列表
				$H.post('/task/mycollection',{
					page: page.num
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					console.log(res)
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
			getMyWork(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取任务列表
				$H.post('/task/mytask',{
					page: page.num,
					keyword: this.keyword
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
			toDetail(id){
				uni.navigateTo({
					url: '/pages/mission/mission-detail/mission-detail?id='+id
				});
			}
		},
		components:{
			freeSearchSelect,
			freeList,
			freePatientItem
		},
		onShow() {
			console.log(uni.getStorageSync('auth'))
			this.refreshLists()
		},
		onLoad(opt){
			if(opt.pid){
				uni.setStorageSync('pid',opt.pid)
			}
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabbar/work/work?pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>

</style>
