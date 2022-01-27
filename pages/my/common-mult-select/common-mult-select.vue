<template>
	<view>
		<free-search-select hasTab v-if="type === 'hospital'">
			<template name="tab">
				<view class="flex align-center justify-center align-stretch border-top border-bottom border-light-secondary" style="height: 70rpx;">
					<text class="font-sm flex align-center">选择所在区域</text>
					<text class="iconfont ml-2 icon-xiajiantou flex align-center"></text>
				</view>
			</template>
		</free-search-select>
		<common-fixed-line h="10" v-if="type==='hospital'"></common-fixed-line>
		<view class="bg-white">
			<block v-for="(item,index) in list" :key="index">
				<free-mult-item :item="item" :index="index" @toggle="toggle"></free-mult-item>
			</block>
		</view>
		
		<view>
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item title="折叠内容" v-for="(i,idx) in 10" :key="idx">
					<view class="content">
						<block v-for="(item,index) in list" :key="index">
							<free-mult-item :item="item" :index="index" @toggle="toggle"></free-mult-item>
						</block>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		<common-fixed-line h="150"></common-fixed-line>
		<view class="px-3 position-fixed fixed-bottom bg-white flex align-center justify-center" style="height: 100rpx;">
			<view class="flex align-center justify-center main-bg-color text-white flex-1" style="height: 70rpx;border-radius: 35rpx;" @click="save">保存</view>
		</view>
	</view>
</template>

<script>
	import freeSearchSelect	from '@/components/use-components/free-search-select.vue'
	import freeMultItem from '@/components/use-components/free-mult-item.vue'
	export default {
		data() {
			return {
				type:'',
				list: [
					{
						id: 1,
						title: '数据1',
						checked: true
					},
					{
						id: 2,
						title: '数据2',
						checked: false
					},
					{
						id: 3,
						title: '数据3',
						checked: false
					},
					{
						id: 4,
						title: '数据4',
						checked: false
					},
					{
						id: 5,
						title: '数据5',
						checked: false
					},
					{
						id:6,
						title: '数据6',
						checked: true
					},
					{
						id: 7,
						title: '数据7',
						checked: false
					},
					{
						id: 8,
						title: '数据8',
						checked: false
					},
					{
						id: 9,
						title: '数据9',
						checked: false
					},
					{
						id: 10,
						title: '数据10',
						checked: false
					},
					{
						id: 11,
						title: '数据11',
						checked: true
					},
					{
						id: 12,
						title: '数据12',
						checked: false
					},
					{
						id: 13,
						title: '数据13',
						checked: false
					},
					{
						id: 14,
						title: '数据14',
						checked: false
					},
					{
						id: 15,
						title: '数据15',
						checked: false
					},
					{
						id: 16,
						title: '数据16',
						checked: true
					}
				]
			}
		},
		methods: {
			toggle(index){
				var l = this.list
				var c = l[index].checked
				l[index].checked = !c
				this.list = l
			},
			save(){
				var selList = this.list.filter((item)=>item.checked === true)   //筛选选中的项
				console.log(selList)
			},
			change(e) {
				console.log(e);
			}
		},
		components:{
			freeSearchSelect,
			freeMultItem
		},
		onLoad(option) {
			this.type = option.type
		}
	}
</script>

<style>

</style>
