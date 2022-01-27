<template>
	<view>
		<free-list type="3"></free-list>
		<!-- 患者分类tab -->
		<view class="mt-2">
			<free-tab :tList="pType" :curr="pCurr" @click="changeTab"></free-tab>
		</view>
		<!-- 病患列表 -->
		<view v-for="(item,index) in patients" :key="index">
			<free-patient-item :item="item"></free-patient-item>
		</view>
		<common-fixed-line h="70"></common-fixed-line>
		<view class="position-fixed fixed-bottom bg-white flex align-center align-stretch font" style="height: 70rpx;">
			<view class="main-bg-color text-white flex-1 flex align-center justify-center">添加患者资料</view>
			<view class="flex-1 text-muted flex align-center justify-center">关闭任务</view>
		</view>
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	import freeTab from '@/components/use-components/free-tab.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	export default {
		data() {
			return {
				pCurr: 0,
				pType:[{
					text: '缺资料',
					num: 0
				},
				{
					text: '筛查',
					num: 0
				},
				{
					text: '入组',
					num: 1
				},
				{
					text: '排除',
					num: 0
				}],
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
				this.pCurr = index
			}
		},
		components:{
			freeList,
			freeTab,
			freePatientItem
		}
	}
</script>

<style>

</style>
