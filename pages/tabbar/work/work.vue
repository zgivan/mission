<template>
	<view class="page">
		<free-search-select :selectList="secList" :hasSelect="true" :currTab="currTab" @changeT="changeTab" :hasSearch="hasSearch"></free-search-select>
		
		<view class="mt-2 bg-white" v-if="currTab < 3">
			<block v-for="(i,index) in 5" :key="index">
				<free-list :type="type"></free-list>
			</block>
		</view>
		
		<view v-for="(item,index) in patients" :key="index" v-else>
			<free-patient-item :item="item"></free-patient-item>
		</view>
	</view>
</template>

<script>
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	import freeList from '@/components/use-components/free-list.vue'
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
				]
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
			},
			toManage(){
				uni.navigateTo({
					url: '/pages/mission/patient-manage/patient-manage'
				});
			}
		},
		components:{
			freeSearchSelect,
			freeList,
			freePatientItem
		}
	}
</script>

<style>

</style>
