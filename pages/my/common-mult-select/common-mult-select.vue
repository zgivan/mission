<template>
	<view>
		<view class="bg-white">
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
				citys: [],
				page: 1,
				keyword: '',
				cids: []  ,//选中的id串，
				cnames: [],  //选中的中文串
			}
		},
		methods: {
			getDepart(){
				// 获取科室列表
				$H.post('/com/department').then(res => {
					console.log(res)
					if(res.code === 1){
						let ret = res.data.list
						this.$nextTick(function(){
							ret.map(v=>{
								if(this.cids.indexOf(v.id) > -1){
									v.checked = true
								}else{
									v.checked = false
								}
							})
							console.log(ret)
							this.list = ret
							this.$forceUpdate()
						})
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
						let ret = res.data.list
						this.$nextTick(function(){
							ret.map(v=>{
								if(this.cids.indexOf(v.id) > -1){
									v.checked = true
								}else{
									v.checked = false
								}
							})
							console.log(ret)
							this.list = ret
							this.$forceUpdate()
						})
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			toggle(index){
				var arr = this.list
				let c = arr[index].checked
				arr[index].checked = !c
				this.list = arr
				this.$forceUpdate()
			},
			save(){
				// console.log(this.cids);
				// console.log(this.cnames);return;
				let ids = []
				let names = []
				this.cids = this.list.map(v=>{
					if(v.checked){
						ids.push(v.id)
						names.push(v.name)
					}
				})
				
				this.cids = ids
				this.cnames = names
				
				let data = {
					cids: this.cids.join(','),
					cnames: this.cnames.join(',')
				}
				this.$eventHub.$emit('setIds',data);
				uni.navigateBack({})
			}
		},
		components:{
			freeSearchSelect,
			freeMultItem
		},
		onLoad(option) {
			this.type = option.type
			
			this.cids = option.ids === '' ? [] : option.ids.split(',')
			this.cnames = option.names === '' ? [] : option.names.split(',')
			
			this.cids = this.cids.map(v => {return parseInt(v)})
			console.log(this.cids)
			console.log(this.cnames)
			if(this.type === 'depart'){
				this.getDepart()
				uni.setNavigationBarTitle({
					title: '选择服务科室'
				})
			}else if(this.type === 'symptom'){
				this.getSym()
				uni.setNavigationBarTitle({
					title: '选择感兴趣疾病类型'
				})
			}
		},
		onUnload() {
			let data = {
				cids: this.cids.join(','),
				cnames: this.cnames.join(',')
			}
			this.$eventHub.$emit('setIds',data);
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
