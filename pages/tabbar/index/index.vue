<template>
	<view class="page">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :current="swiperDotIndex" autoplay circular>
					<swiper-item v-for="(item, index) in info" :key="index">
						<view  class="swiper-item">
							<image :src="item.url" style="width: 100%;" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		<view class="mt-2 pb-2 bg-white">
			<uni-search-bar @confirm="search" placeholder="请输入招募项目/研究中心/登记编号/药物名" v-model="searchValue" bgColor="#EEEEEE">
			</uni-search-bar>
			<view class="flex px-3">
				<view class="font-sm flex-1 flex align-center justify-center" @click="toggle()">{{symptom}}</view>
				<view class="font-sm flex-1 flex align-center justify-center">
					<uni-data-picker placeholder="所在地区" popup-title="所在地区" :localdata="citys" :border="false" v-model="info.city"
						@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</view>
				<view class="font-sm flex-1 flex align-center justify-center" @click="changeIntegral">佣金</view>
			</view>
		</view>
		<!-- 自定义列表组件 -->
		<view class="mt-2 bg-white">
			<block v-for="(item,index) in mList" :key="index">
				<free-list :item="item" @detail="toDetail" @join="showJoin"></free-list>
			</block>
		</view>
		
		</mescroll-body>
		<!-- 选择疾病类型 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<free-single-select :list="symList" :val="symIndex" @change="bindChange" @comf="comform"></free-single-select>
			</view>
		</uni-popup>
		
		<!-- 悬浮按钮 -->
		<navigator url="/pages/mission/add-patient/add-patient" class="position-fixed rounded-circle main-bg-color text-white flex align-center justify-center font-lg" style="width:60rpx;height:60rpx;bottom: 30rpx;right: 30rpx;">＋</navigator>
		
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	import freeSingleSelect from '@/components/use-components/free-single-select.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	import $H from '@/common/lib/request.js'
	
	export default {
		mixins: [MescrollMixin],
		components: {
			freeList,
			freeSingleSelect
		},
		data() {
			return {
				symptom: '疾病类型',				//选中的疾病类型
				symList: [],					//疾病类型列表
				symIndex: 0,					//当前选中疾病类型项
				symId: '',							//当前选中疾病类型ID
				mList: [],						//任务列表
				currTab: 0,
				info: [{
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 A'
					},
					{
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 B'
					},
					{
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 C'
					}
				],
				current: 0,
				mode: 'nav',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid',
				},
				swiperDotIndex: 0,
				searchFocus: false,
				type: "bottom",
				citys: [],
				city: '',
				integral: ''
			}
		},
		onLoad() {
			this.getSymptom()
			this.getCity()
		},
		computed:{
			skipId(){
				return 'tab'+this.currTab
			}
		},
		methods: {
			showJoin(id){
				// 询问是否领取任务
				uni.showModal({
					title: '是否领取该任务？',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if(res.confirm){
							//领取任务操作
							this.joinMission(id)
						}
					}
				})
			},
			joinMission(id){
				//领取任务
				uni.showLoading({
					title: '提交中'
				})
				$H.post('/task/jointask',{
					task_id: id
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						uni.showToast({
							title: res.msg
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			onnodeclick(e) {
				if(e.level === 1){
					this.city = e.id
					this.refreshLists()
				}else{
					if(e.value === ''){
						this.city = e.value
						this.refreshLists()
					}
				}
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				
			},
			changeIntegral(){
				this.integral = this.integral === 'DESC' ? 'ASC' : 'DESC'
				this.refreshLists()
			},
			onchange(e) {},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						let obj = {}
						obj.text = '所有城市'
						obj.value = ''
						let list = res.data.list
						list.unshift(obj)
						this.citys = list
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			search(e){
				// 关键字搜索
				this.keyword = e.value
				this.refreshLists()
			},
			changeTab(index){
				this.currTab = index
			},
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
				console.log(e)
			},
			toggle() {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(this.type)
			},
			bindChange(e){
				var val = e.target.value
				this.symIndex = val
				this.symId = this.symList[val].id
				this.symptom = this.symList[val].name
				this.refreshLists()
			},
			comform(){
				this.visible = false
				this.$refs.popup.close('bottom')
			},
			getSymptom(){
				// 获取疾病类型列表
				$H.post('/com/get_disease').then(res => {
					console.log(res)
					if(res.code === 1){
						var obj = {}
						obj.id = ''
						obj.name = '疾病类型'
						var arr = []
						arr.push(obj)
						this.symList = arr.concat(res.data.list)
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			upCallback(page){
				this.getMissions(page)
			},
			refreshLists(){
				this.mList = []
				this.mescroll.resetUpScroll()
			},
			getMissions(page){
				// 读取任务列表
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/task/list',{
					city: this.city,
					symptom: this.symId,
					page: page.num,
					size: page.size,
					// keyword: this.keyword,
					integral: this.integral
				},{
					header: {
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length);  
						console.log(page.num)
						if(page.num === 1){
							console.log(res)
							this.mList = res.data.list
						}else{
							this.mList = this.mList.concat(res.data.list)
						}	
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
						if(page.num === 1){
							this.mList = []
						}
					}
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/mission/mission-detail/mission-detail?id='+id
				});
			}
		}
	}
</script>

<style lang="scss">
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	
	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	.grid-image {
		width: 50rpx;
		height: 50rpx;
	}
	
	.grid-text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
	}

	.swiper-item0 {
		background-color: #cee1fd;
	}

	.swiper-item1 {
		background-color: #b2cef7;
	}

	.swiper-item2 {
		background-color: #cee1fd;
	}

	.image {
		width: 750rpx;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}
	/* #endif */

	@media screen and (min-width: 500px) {
				.uni-swiper-dot-box {
					width: 400px;
					margin: 0 auto;
					margin-top: 8px;
				}

				.image {
					width: 100%;
				}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

</style>
