<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<free-search-select hasTab  @search="search">
			<template name="tab">
				<free-popup-tab :status="status" :date="yymm" @click="toggle" @change="changeTime"></free-popup-tab>
			</template>
		</free-search-select>
		
		<!-- 带数据列表单选底部弹层 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">				
				<free-single-select :list="list" :val="val" @change="bindChange" @comf="comform"></free-single-select>
			</view>
		</uni-popup>
		
		<!-- 病患列表 -->
		<view v-for="(item,index) in patients" :key="index">
			<free-patient-item :item="item"></free-patient-item>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeSingleSelect from '@/components/use-components/free-single-select.vue'
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import freePatientItem from '@/components/use-components/free-patient-item.vue'
	import freePopupTab from '@/components/use-components/free-popup-tab.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				yymm: '月份',
				status: '全部',
				val:[0],
				list: [
					{
						name: '全部',
						id: -1
					},{
						name: '缺资料',
						id: 0
					},{
						name: '正在初筛',
						id: 1
					},{
						name: '初筛成功',
						id: 2
					},{
						name: '复审通过',
						id: 3
					},{
						name: '签署知情成功',
						id: 4
					},{
						name: '筛选失败',
						id: 5
					}
				],
				visible: false,
				type: 'bottom',
				patients:[],
				keyword: '',
				stype: -1   // -1全部 状态0 缺资料1 正在初筛2 初筛成功3 复审通过4 签署知情成功5 筛选失败
			}
		},
		methods: {
			changeTab(index){
				this.tCurr = index;
			},
			changeTime(e){
				this.yymm = e.target.value
				this.refreshLists()
			},
			bindChange(e){
				var val = e.target.value
				this.stype = this.list[val].id
				this.status = this.list[val].name
				this.refreshLists()
			},
			comform(e){
				this.visible = false
				this.$refs.popup.close('bottom')
			},
			search(val){
				this.keyword = val
				this.refreshLists()
			},
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(this.type)
			},
			refreshLists(){
				this.patients = []
				this.mescroll.resetUpScroll()
			},
			upCallback(page){
				this.getList(page)
			},
			getList(page){
				console.log(this.stype)
				// 获取我的患者列表
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/member/mypatient',{
					page: page.num,
					size: page.size,
					time: this.yymm === '月份' ? '' : this.yymm,
					status: this.stype,
					keyword: this.keyword
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res=>{
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.patients = res.data.list
						}else{
							this.patients = this.patients.concat(res.data.list)
						}
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if(page.num === 1){
							this.patients = []
						}
					}
				})
			}
		},
		components: {
			freeSearchSelect,
			freeSingleSelect,
			freePatientItem,
			freePopupTab
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
