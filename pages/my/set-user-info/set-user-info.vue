<template>
	<view>
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<view class="px-3">
				<view class="border-bottom border-light-secondary flex align-center" style="height: 96rpx;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">所属公司</text>
					<view class="flex-1 mr-1"><uni-easyinput disabled placeholder="" v-model="company"/></view>
					<view class="d-inline-block py-1 px-2 font-small main-bg-color text-white" v-if="is_edit == 1" @click="showEdit=!showEdit">变更</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center" style="height: 96rpx;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">姓名<text class="red-star">*</text></text>
					<uni-easyinput type="text" class="flex-1" v-model="info.fullname" placeholder="请输入姓名" placeholderStyle="color:#ccc"/>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between" style="height: 96rpx;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">性别<text class="red-star">*</text></text>
					<uni-data-checkbox v-model="info.sex" :localdata="sexs" />
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">服务城市<text class="red-star">*</text></text>
					<view @click="toSelect('city')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{scityName == '' ? '请选择服务城市':scityName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">感兴趣疾病类型</text>
					<view @click="toSelect('symptom')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{diseaseName == '' ? '请选择感兴趣疾病类型':diseaseName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">服务科室</text>
					<view @click="toSelect('depart')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{departName == '' ? '请选择服务科室':departName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">工作医院</text>
					<view @click="toSelect('hospital')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{hospitalName == '' ? '请选择工作医院':hospitalName}}</view>
				</view>
			</view>
			<view class="sec-text-color mt-4 px-3 font-sm">*为必填项，完善个人信息才能领取任务</view>
			<view class="p-3">
				<view class="w-100 flex align-center justify-center main-bg-color text-white button-circle" @click="save">保存</view>
			</view>
		</view>
		
		<view class="position-fixed w-100 h-100 top-0 left-0" style="background-color: rgba(0,0,0,0.5);" v-if="showEdit">
			<view class="position-absolute flex flex-column align-center justify-center bg-white rounded" style="width: 560rpx;height: 360rpx;top: 50%;left: 50%;margin-top: -180rpx;margin-left: -280rpx;">
				<view class="flex justify-around position-relative w-100"><view class="font-md common-text-dark">公司变更</view><text @click="showEdit=!showEdit" class="iconfont icon-guanbi position-absolute font common-text-light" style="top: 0rpx;right: 20rpx;"></text></view>
				<view class="font common-text-dark" style="margin-top: 36rpx;">
					<input v-model="code" type="text" placeholder="请输入公司邀请码" class="text-center"/>
				</view>
				<view class="sec-text-color font-sm">注意:只有一次变更公司的机会</view>
				<view class="main-bg-color flex align-center justify-center text-white" style="margin-top: 50rpx;width: 228rpx;height: 80rpx;border-radius: 40rpx;" @click="changeCompany">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				info:{},
				diseaseName: '请选择疾病类型',
				departName: '请选择服务科室',
				hospitalName: '请选择工作医院',
				scityName: '请选择服务城市',
				type: '',
				tempids: '',
				tempnames: '',
				company:'',
				is_edit: 1,
				code: '',
				showEdit: false
			}
		},
		methods: {
			...mapMutations(['login']),
			toSelect(type){
				this.type = type
				this.tempids = ''
				this.tempnames = ''
				let _this = this;
				this.$eventHub.$on('setIds', function(data) {
					_this.tempids = data.cids
					_this.tempnames = data.cnames		
							//清除监听，不清除会消耗资源
					_this.$eventHub.$off('setIds');
				});
				let ids = ''
				let names = ''
				if(this.type === 'hospital'){
					ids = this.info.hospital
					names = this.hospitalName === '请选择工作医院' ? '' : this.hospitalName
				}else if(this.type === 'depart'){
					ids = ids = this.info.department
					names = this.departName === '请选择服务科室' ? '' : this.departName 
				}else if(this.type === 'symptom'){
					ids = this.info.disease
					names = this.diseaseName === '请选择疾病类型' ? '' : this.diseaseName 
				}else if(this.type === 'city'){
					ids = this.info.service_city
					names = this.scityName === '请选择服务城市' ? '' : this.scityName 
				}
				
				if(this.type === 'city'){
					uni.navigateTo({
						url: '/pages/my/common-mult-select/common-mult-city?ids='+ids+'&names='+names,
					});
				}else if(this.type === 'hospital'){
					uni.navigateTo({
						url: '/pages/my/common-mult-select/common-mult-hospital?ids='+ids+'&names='+names,
					});
				}else{
					uni.navigateTo({
						url: '/pages/my/common-mult-select/common-mult-select?type='+type+'&ids='+ids+'&names='+names,
					});
				}
			},
			getUser(){
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				
				$H.post('/member/getinfo',{},{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					// console.log(res)
					uni.hideLoading()
					if(res.code === 0){
						let info = res.data
						let depm = info.department.length === 0 ? '' : info.department.map(v=>{return v.id}).join(',')
						this.info = {
							fullname: info.fullname,
							sex: info.sex,
							service_city: info.service_city,
							disease: info.disease,
							department: depm,
							hospital: info.hospital
						}
						this.departName = info.department.length === 0 ? '' : info.department.map(v=>{return v.name}).join(',')
						this.hospitalName = info.hospital_var.length === 0  ? '' : info.hospital_var.map(v=>{return v.name}).join(',')
						this.diseaseName = info.disease_var.length === 0 ? '' : info.disease_var.map(v=>{return v.name}).join(',')
						this.scityName = info.service_city_var.length === 0 ? '' : info.service_city_var.map(v=>{return v.name}).join(',')
						this.company = info.company_name
						this.is_edit = info.is_edit
					}
				})
			},
			validate(){
				if(this.info.fullname.trim() === ''){
					return '姓名不能为空'
				}
				if(this.info.sex === ''){
					return '请选择性别'
				}
				if(this.info.service_city === ''){
					return '请选择服务城市'
				}
				// if(this.info.disease === ''){
				// 	return '请选择疾病类型'
				// }
				// if(this.info.department === ''){
				// 	return '请选择服务科室'
				// }
				// if(this.info.hospital === ''){
				// 	return '请选择工作医院'
				// }
				return ''
			},
			save(){
				// 判断必填
				let msg = this.validate()
				if(msg !== ''){
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '保存中...',
					mask: true
				})
				$H.post('/member/editmemberfield',this.info,{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res=>{
					uni.hideLoading()
					if(res.code === 1){
						uni.showToast({
							title: res.msg
						})
						this.setUser()
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			setUser(){
				// 获取用户信息
				$H.post('/token/user',{},{
					header:{
						Authorization: uni.getStorageSync('auth'),
					},
				}).then(result => {
					if(result.code === 1){
						this.login(result.data)
						setTimeout(() => {
							uni.navigateBack({
								delta:-1
							})
						},400)
					}else{
						uni.showToast({
							msg: result.msg,
							icon: 'none'
						})
					}
				})
			},			
			changeCompany(){
				uni.showLoading({
					title: '变更中...',
					mask: true
				})
				$H.post('/member/edit-company',{
					code: this.code
				},{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res=>{
					uni.hideLoading()
					if(res.code === 1){
						uni.showToast({
							title: res.msg
						})
						setTimeout(() => {
							this.getUser()
							this.showEdit = false
						},800)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		onShow() {
			if(this.type === 'hospital'){
				this.info.hospital = this.tempids
				this.hospitalName = this.tempids == '' ? '请选择工作医院' : this.tempnames
			}else if(this.type === 'depart'){
				this.info.department = this.tempids
				this.departName =  this.tempids == '' ? '请选择服务科室' : this.tempnames
			}else if(this.type === 'symptom'){
				this.info.disease = this.tempids
				this.diseaseName =  this.tempids == '' ? '请选择疾病类型' : this.tempnames
			}else if(this.type === 'city'){
				this.info.service_city = this.tempids
				this.scityName =  this.tempids == '' ? '请选择服务城市' : this.tempnames
			}
		},
		onLoad() {
			this.getUser()
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
