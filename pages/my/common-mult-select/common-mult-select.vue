<template>
	<view>
		<free-search-select hasTab v-if="type === 'hospital'" @search="search">
			<template name="tab">
				<view class="flex align-center justify-center align-stretch border-top border-bottom border-light-secondary" style="height: 70rpx;">
					<view class="font-sm flex align-center">
						<uni-data-picker placeholder="选择所在地区" popup-title="选择所在地区" :localdata="citys" v-model="city"
							@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</view>
					<!-- <text class="iconfont ml-2 icon-xiajiantou flex align-center"></text> -->
				</view>
			</template>
		</free-search-select>
		<common-fixed-line h="10" v-if="type==='hospital'"></common-fixed-line>
		
		<view v-if="type === 'city'">
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item :title="city.name" v-for="(city,idx) in list" :key="idx">
					<view class="content">
						<block v-for="(item,index) in city.children" :key="index">
							<free-mult-item :item="item" :index="index" :idx="idx" @toggle="toggle"></free-mult-item>
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
				console.log(this.city)
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
						var list = res.data.list
						// list.map(item=>{
						// 	item.checked = false
						// })
						this.list = list
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
						var list = res.data.list
						// list.map(item=>{
						// 	item.checked = false
						// })
						this.list = list
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
						console.log(this.list)
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			toggle(index,idx){
				var arr = this.list
				if(this.type === 'city'){  //城市二级
					let child = arr[idx]
					let arr1 = child.children
					let c = arr1[index].checked
					arr1[index].checked = !c
					
					if(!c){
						this.cids.push(arr1[index].id)
						this.cnames.push(arr1[index].name)
					}else{
						this.cids.splice(this.cids.indexOf(arr1[index].id),1)
						this.cnames.splice(this.cnames.indexOf(arr1[index].name),1)
					}
				}else{
					let c = arr[index].checked
					arr[index].checked = !c
					
					if(!c){
						this.cids.push(arr[index].id)
						this.cnames.push(arr[index].name)
					}else{
						this.cids.splice(this.cids.indexOf(arr[index].id),1)
						this.cnames.splice(this.cnames.indexOf(arr[index].name),1)
					}
				}
				this.list = arr
				this.$forceUpdate()
			},
			save(){
				console.log(this.cids)
				console.log(this.cnames)
				// let arr = []   //筛选选中的项
				// let selList = []
				// if(this.type === 'city'){
					
				// }else{
				// 	selList = this.list.filter((item)=>item.checked === true)
				// 	arr = selList.map(item => {
				// 		return item.id
				// 	})
				// }
			},
			change(e) {
				console.log(e);
			},
			search(val){
				this.keyword = val;
				this.getHosp()
			},
			onnodeclick(e) {
				// console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log(e);
				this.city = e.text
				if(e.level == 1){
					console.log(e.level)
					this.getHosp()
				}
			},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						let cc = []
						let obj = {}
						res.data.list.map((item) => {
							obj = item
							obj['text'] = item['name']
							obj['value'] = item['id']
							delete obj['name']
							delete obj['id']
							this.$nextTick(function(){
								let obj1 = {}
								let arr = []
								item.children.map((ch) => {
									obj1 = ch
									obj1['text'] = ch['name']
									obj1['value'] = ch['id']
									delete obj1['name']
									delete obj1['id']
									arr.push(obj1)
								})
								obj['children'] = arr
							})
							cc.push(obj)
						})
						this.citys = cc
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
				this.getCity()
				uni.setNavigationBarTitle({
					title: '选择服务城市'
				})
			}
		}
	}
</script>

<style>

</style>
