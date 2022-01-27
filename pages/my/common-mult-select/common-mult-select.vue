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
		
		
		<view v-if="type === 'city'">
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item :title="city.name" v-for="(city,idx) in list" :key="idx">
					<view class="content">
						<block v-for="(item,index) in city.children" :key="index">
							<free-mult-item :item="item" :index="index" @toggle="toggle"></free-mult-item>
						</block>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		<view class="bg-white" v-else>
			<block v-for="(item,index) in list" :key="index">
				<free-mult-item :item="item" :index="index" @toggle="toggle"></free-mult-item>
			</block>
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
	
	import $H from '@/common/lib/request.js'
	export default {
		data() {
			return {
				type:'',
				list: [],
				choice: [],
				city: '',
				page: 1,
				keyword: ''
			}
		},
		methods: {
			getHosp(){
				//获取医院信息
				$H.post('/com/hospital',{
					keyword: this.keyword,
					city: this.city,
					is_all: 0,
					page: this.page
				}).then(res => {
					console.log(res)
					if(res.code === 1){
						this.list = res.data
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getDepart(){
				// 获取科室列表
				$H.post('/com/department').then(res => {
					console.log(res)
					if(res.code === 1){
						this.list = res.data.list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getSym(){
				// 获取疾病类型
				$H.post('/com/get_disease').then(res => {
					console.log(res)
					if(res.code === 1){
						this.list = res.data.list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					console.log(res)
					if(res.code === 1){
						this.list = res.data.list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
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
			if(this.type === 'hospital'){
				this.getHosp()
			}else if(this.type === 'depart'){
				this.getDepart()
			}else if(this.type === 'symptom'){
				this.getSym()
			}else{
				this.getCity()
			}
		}
	}
</script>

<style>

</style>
