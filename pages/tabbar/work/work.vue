<template>
	<view class="page">
		<free-search-select :selectList="secList" :hasSelect="true" :currTab="currTab" @changeT="changeTab" :hasSearch="hasSearch"></free-search-select>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mt-2 bg-white" v-if="currTab < 3">
				<block v-for="(item,index) in list" :key="index">
					<free-list :type="type" :item="item"></free-list>
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
	
	import $H from '@/common/lib/request.js'
	export default {
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
				page: 1
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
						this.getCollected()
					}else if(index === 2){
						this.type = 1
					}
					this.hasSearch = false
				}
				this.currTab = index
			},
			toManage(){
				uni.navigateTo({
					url: '/pages/mission/patient-manage/patient-manage'
				});
			},
			getCollected(){
				// 获取收藏列表
				$H.post('/task/mycollection',{
					city: '',
					symptom: this.symId
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					if(res.code === 1){
						this.list = res.data.list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		components:{
			freeSearchSelect,
			freeList,
			freePatientItem
		},
		onShow() {
			this.getCollected()
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
