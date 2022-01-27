<template>
	<view>
		<free-tab :tList="typeList" hasNum :curr="tCurr" isFixed @click="changeTab()"></free-tab>
		<view class="mt-1">
			<block v-for="(item,index) in list" :key="index">
				<free-member-item :item="item"></free-member-item>
			</block>
		</view>
	</view>
</template>

<script>
	import freeTab from '@/components/use-components/free-tab.vue'
	import freeMemberItem from '@/components/use-components/free-member-item.vue'
	export default {
		data() {
			return {
				tCurr: 0,
				typeList: [
					{
						text: '直属代理',
						num: 1
					}, {
						text: '非直属代理',
						num: 0
					}, {
						text: '直属团队',
						num: 0
					}
				],
				list: [{
					id: 1,
					name: '张三',
					phone: '13416199315',
					createTime: '2022-01-10 10:24:15',
					level: '高级代理'
				},{
					id: 1,
					name: '张三',
					phone: '13416199315',
					createTime: '2022-01-10 10:24:15',
					level: '高级代理'
				},{
					id: 1,
					name: '',
					phone: '13416199315',
					createTime: '2022-01-10 10:24:15',
					level: '高级代理'
				},{
					id: 1,
					name: '',
					phone: '13416199315',
					createTime: '2022-01-10 10:24:15',
					level: '高级代理'
				}
				]
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index
			}
		},
		components: {
			freeTab,
			freeMemberItem
		}
	}
</script>

<style>

</style>
