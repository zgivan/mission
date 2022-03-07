<template>
	<view>
		<view>
			<view class="bg-white w-100">
				<block v-for="(city,idx) in list" :key="idx" v-if="city.children">
					<view class="flex align-center border-bottom border-light-secondary px-3" style="height: 96rpx;" @click="changeP(idx)">
						<view class="font common-text-dark flex-1">{{city.name}}</view>
						<text class="iconfont icon-xiangxia font-sm common-text-light"></text>
					</view>
					<block v-for="(item,index) in city.children" :key="index" v-if="showArr.indexOf(idx)>-1">
						<view class="bg-white">
							<free-mult-item :item="item" :index="index" :idx="idx" @toggle="toggle"></free-mult-item>
						</view>
					</block>
				</block>
				<block v-for="(item,index) in list" :key="index" v-if="!item.children">
					<view class="bg-white">
						<free-mult-item :item="item" :index="index" :idx="index" @toggle="toggle"></free-mult-item>
					</view>
				</block>
			</view>
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
				cids: []  ,//选中的id串，
				cnames: [],  //选中的中文串
				showArr: []
			}
		},
		methods: {
			getCitys(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						let ret = res.data.list
						ret.map(item => {
							if(item.children){
								item.children.map(v=>{
									if(this.cids.indexOf(v.id) > -1){
										v.checked = true
									}else{
										v.checked = false
									}
								})
							}else{
								if(this.cids.indexOf(item.id) > -1){
									item.checked = true
								}else{
									item.checked = false
								}
							}
						})
						this.list = ret
						this.$forceUpdate()
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
				if(arr[idx].children){
					let child = arr[idx]
					let arr1 = child.children
					let c = arr1[index].checked
					arr1[index].checked = !c
					if(!c){
						console.log(arr1[index].id)
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
				
				let data = {
					cids: this.cids.join(','),
					cnames: this.cnames.join(',')
				}
				
				this.$eventHub.$emit('setIds',data);
				uni.navigateBack({})
			},
			changeP(index){
				let num = this.showArr.indexOf(index)
				if(num > -1){
					this.showArr.splice(num,1)
				}else{
					this.showArr.push(index)
				}
			}
		},
		components:{
			freeSearchSelect,
			freeMultItem
		},
		onLoad(option) {
			console.log(option)
			
			this.cids = option.ids === '' ? [] : option.ids.split(',')
			this.cnames = option.names === '' ? [] : option.names.split(',')
			
			this.cids = this.cids.map(v => {return parseInt(v)})
			
			this.getCitys()
			uni.setNavigationBarTitle({
				title: '选择服务城市'
			})
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
