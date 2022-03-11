<template>
	<view>
		<free-search-select :hasSearch="false" hasSelect hasTab :selectList="typeList" :currTab="tCurr" @changeT="changeTab">
			<template name="tab">
				<free-popup-tab :status="status" :date="yymm" @click="toggle" @change="changeTime"></free-popup-tab>
			</template>
		</free-search-select>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<!-- 病患列表 -->
			<view v-for="(item,index) in patients" :key="index">
				<free-patient-item :item="item"></free-patient-item>
			</view>
		</mescroll-body>
		<!-- 带数据列表单选底部弹层 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">				
				<free-single-select :list="list" :val="val" @change="bindChange" @comf="comform"></free-single-select>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import freeSingleSelect from '@/components/use-components/free-single-select.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	import freePopupTab from '@/components/use-components/free-popup-tab.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				yymm: '月份',
				status: '状态1',
				val:[0],
				list: [{
					id:1,
					name: '状态1',
					num: 0
				},{
					id:2,
					name: '状态2',
					num: 0
				},{
					id:3,
					name: '状态3',
					num: 0
				},{
					id:4,
					name: '状态4',
					num: 0
				},{
					id:5,
					name: '状态5',
					num: 0
				},{
					id:6,
					name: '状态6',
					num: 0
				}],
				tCurr: 0,
				typeList: [
					{
						text: '直属代理患者',
						num: 1
					}, {
						text: '非直属代理患者',
						num: 0
					}
				],
				type: 'bottom',
				patients:[]
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index;
				this.refreshLists()
			},
			refreshLists(){
				this.patients = []
				this.mescroll.resetUpScroll()
			},
			upCallback(page){
				this.getList(page)
			},
			getList(page){
				if(this.tCurr === 0){
					this.getMyTeamPatient(page)
				}else{
					this.getMyTeamOrPatient(page)
				}
			},
			getMyTeamPatient(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取我的直属代理
				$H.post('/member/my-team-patient',{
					page: page.num,
					size: page.size
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.patients = res.data.list
						}else{
							this.patients = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.patients = []
							this.mescroll.endSuccess(0)
						}
					}
				})
			},
			getMyTeamOrPatient(page){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 获取我的直属代理
				$H.post('/member/my-team-or-patient',{
					page: page.num,
					size: page.size
				},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.patients = res.data.list
						}else{
							this.patients = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.patients = []
							this.mescroll.endSuccess(0)
						}
					}
				})
			},
			bindChange(e){
				var val = e.target.value
				this.status = this.list[val].name
			},
			comform(){
				this.visible = false
				this.$refs.popup.close('bottom')
			},
			changeTime(e){
				this.yymm = e.target.value
			},
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(this.type)
			}
		},
		components: {
			freeSearchSelect,
			freeSingleSelect,
			freePopupTab,
			freePatientItem
		}
	}
</script>

<style>

</style>
