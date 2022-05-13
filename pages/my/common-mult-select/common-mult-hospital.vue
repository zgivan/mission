<template>
	<view>
		<free-search-select hasTab @search="search">
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
		<common-fixed-line h="10"></common-fixed-line>
		
		<view class="px-2 pt-2 bg-white mb-2 flex flex-wrap align-center">
			<block v-for="(item,index) in cnames" :key="index">
				<view 
					class="border border-light-secondary pl-3 pr-2 font-small common-text-dark mb-2 flex align-center mr-1" 
					style="height: 50rpx;border-radius: 26rpx;"
				>{{item}}<text class="iconfont icon-guanbi font-sm common-text-muted ml-2 d-inline-block" @click="delSelect(index)"></text></view>
			</block>
		</view>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="bg-white">
			<block v-for="(item,index) in list" :key="index">
				<free-mult-item :item="item" :index="index" @toggle="toggle"></free-mult-item>
			</block>
		</view>
		</mescroll-body>
		<common-fixed-line h="150"></common-fixed-line>
		<view class="px-3 position-fixed fixed-bottom bg-white flex align-center justify-center" style="height: 100rpx;">
			<view class="flex align-center justify-center main-bg-color text-white flex-1" style="height: 70rpx;border-radius: 35rpx;" @click="save">保存</view>
		</view>
	</view>
</template>

<script>
	import freeSearchSelect	from '@/components/use-components/free-search-select.vue'
	import freeMultItem from '@/components/use-components/free-mult-item.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	import $H from '@/common/lib/request.js'
	export default {
		mixins:[MescrollMixin],
		data() {
			return {
				type:'',
				list: [],
				choice: [],
				city: '',
				citys: [],
				keyword: '',
				cids: []  ,//选中的id串，
				cnames: [],  //选中的中文串
				is_all: 1
			}
		},
		methods: {
			getHosp(page){
				//获取医院信息
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/com/hospital',{
					keyword: this.keyword,
					city: this.city,
					is_all: this.is_all,
					page: page.num
				}).then(res => {
					uni.hideLoading()
					// console.log(res)
					if(res.code === 1){
						let list = res.data
						list.map(v=>{
							// console.log('check:'+this.cids.indexOf(v.id))
							if(this.cids.indexOf(parseInt(v.id)) > -1){
								v.checked = true
							}else{
								v.checked =false
							}
						})
						
						this.mescroll.endSuccess(res.data.length)
						if(page.num === 1){
							this.list = list
						}else{
							this.list = this.list.concat(list)
						}
						this.$forceUpdate()
					}else{
						if(page.num === 1){
							this.list =[]
							this.mescroll.endSuccess(0)
						}
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
				
				if(!c){
					this.cids.push(this.list[index].id)
					this.cnames.push(this.list[index].name)
				}else{
					this.cids.splice(this.cids.indexOf(this.list[index].id),1)
					this.cnames.splice(this.cnames.indexOf(this.list[index].name),1)
				}
				this.$forceUpdate()
			},
			save(){
				let data = {
					cids: this.cids.join(','),
					cnames: this.cnames.join(',')
				}
				this.$eventHub.$emit('setIds',data);
				uni.navigateBack({})
			},
			search(val){
				this.keyword = val;
				this.refreshLists()
			},
			onnodeclick(e) {
				this.city = e.text
				if(e.level === 1){
					this.is_all = 0
					this.refreshLists()
				}
			},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						// console.log(res)
						this.citys = res.data.list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			refreshLists(){
				this.list = []
				this.mescroll.resetUpScroll()
			},
			upCallback(page){
				this.getHosp(page)
			},
			delSelect(index){
				// console.log(index)
				
				this.list.map(v=>{
					if(v.id == this.cids[index]){
						v.checked = false
					}
				})
				this.cids.splice(index,1)				this.cnames.splice(index,1)
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
			// console.log(this.cids)
			// console.log(this.cnames)
			
			uni.setNavigationBarTitle({
				title: '选择工作医院'
			})
			this.getCity()
			
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
