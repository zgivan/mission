<template>
	<view>
		<free-search-select hasTab v-if="type === 'hospital'" @search="search">
			<template name="tab">
				<view class="flex align-center justify-center align-stretch border-top border-bottom border-light-secondary" style="height: 70rpx;">
					<view class="font-sm flex align-center">
						<uni-data-picker placeholder="选择所在地区" popup-title="选择所在地区" :localdata="citys" v-model="city"
							@nodeclick="onnodeclick" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</view>
					<!-- <text class="iconfont ml-2 icon-xiajiantou flex align-center"></text> -->
				</view>
			</template>
		</free-search-select>
		<common-fixed-line h="10" v-if="type==='hospital'"></common-fixed-line>
		
		<view v-if="type === 'city'">
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item :title="city.name" v-for="(city,idx) in list" :key="idx" v-if="city.children">
					<view class="content">
						<block v-for="(item,index) in city.children" :key="index">
							<free-mult-item :item="item" :index="index" :idx="idx" @toggle="toggle"></free-mult-item>
						</block>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<block v-for="(item,index) in list" :key="index" v-if="!item.children">
				<view class="bg-white">
					<free-mult-item :item="item" :index="index" :idx="index" @toggle="toggle"></free-mult-item>
				</view>
			</block>
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
				citys: [],
				page: 1,
				keyword: '',
				cids: []  ,//选中的id串，
				cnames: [],  //选中的中文串
			}
		},
		methods: {
			getHosp(){
				//获取医院信息
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/com/hospital',{
					keyword: this.keyword,
					city: this.city,
					is_all: 0,
					page: this.page
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code === 1){
						this.list = res.data
						this.list.map(v=>{
							console.log('check:'+this.cids.indexOf(v.id))
							if(this.cids.indexOf(parseInt(v.id)) > -1){
								v.checked = true
							}else{
								v.checked =false
							}
						})
						console.log(this.list)
						this.$forceUpdate()
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
			getCitys(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						console.log(res.data.list)
						let ret = res.data.list
						// this.$nextTick(function(){
							// for(let i = 0;i<ret.length;i++){
							// 	for(let j=0;j<ret[i].children.length;j++){
							// 		if(this.cids.indexOf(ret[i].children[j].id) > -1){
							// 			ret[i].children[j].checked = true
							// 		}
							// 	}
							// }
							// ret.map(item=>{
							// 	if(item.children){
							// 		item.children.map(v=>{
							// 			if(this.cids.indexOf(v.id.toString()) > -1){
							// 				console.log('选中的：'+v.name)
							// 				v.checked = true
							// 			}else{
							// 				v.checked = false
							// 			}
							// 		})
							// 	}else{
							// 		if(this.cids.indexOf(item.id.toString()) > -1){
							// 			console.log('选中的：'+item.name)
							// 			item.checked = true
							// 		}else{
							// 			item.checked = false
							// 		}
							// 	}
							// })
							
							// ret.map(v => {
							// 	for(let i=0;i<v.children.legnth;i++){
							// 		if(this.cids.indexOf(v.children[i].id) > -1){
							// 			v.children[i].checked = true
							// 		}
							// 	}
							// })
							// console.log(ret)
							this.list = ret
							this.$forceUpdate()
						// })
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
			},
			change(e) {
				console.log(e);
			},
			search(val){
				this.keyword = val;
				this.getHosp()
			},
			onnodeclick(e) {
				this.city = e.text
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				this.getHosp()
			},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						console.log(res)
						this.citys = res.data.list
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
			freeMultItem
		},
		onLoad(option) {
			this.type = option.type
			
			this.cids = option.ids === '' ? [] : option.ids.split(',')
			this.cnames = option.names === '' ? [] : option.names.split(',')
			
			this.cids = this.cids.map(v => {return parseInt(v)})
			console.log(this.cids)
			console.log(this.cnames)
			if(this.type === 'hospital'){
				this.getHosp()
				this.getCity()
				uni.setNavigationBarTitle({
					title: '选择工作医院'
				})
			}else if(this.type === 'depart'){
				this.getDepart()
				uni.setNavigationBarTitle({
					title: '选择服务科室'
				})
			}else if(this.type === 'symptom'){
				this.getSym()
				uni.setNavigationBarTitle({
					title: '选择感兴趣疾病类型'
				})
			}else{
				this.getCitys()
				uni.setNavigationBarTitle({
					title: '选择服务城市'
				})
			}
		},
		onUnload() {
			let data = {
				cids: this.cids.join(','),
				cnames: this.cnames.join(',')
			}
			this.$eventHub.$emit('setIds',data);
		}
	}
</script>

<style>

</style>
