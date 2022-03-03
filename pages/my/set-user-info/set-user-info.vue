<template>
	<view>
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<view class="px-3">
				<view class="border-bottom border-light-secondary flex align-center" style="height: 96rpx;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">所属公司</text>
					<view class="flex-1 mr-1"><uni-easyinput disabled placeholder="" v-model="info.company"/></view>
					<view class="d-inline-block py-1 px-2 font-small main-bg-color text-white">变更</view>
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
					<view @click="toSelect('city')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{scityName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">感兴趣疾病类型<text class="red-star">*</text></text>
					<view @click="toSelect('symptom')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{diseaseName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">服务科室<text class="red-star">*</text></text>
					<view @click="toSelect('depart')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{departName}}</view>
				</view>
				<view class="border-bottom border-light-secondary flex align-center justify-between py-1" style="min-height: 96rpx;box-sizing: border-box;">
					<text class="font-sm common-text-light common-pr" style="width: 152rpx;">工作医院<text class="red-star">*</text></text>
					<view @click="toSelect('hospital')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end">{{hospitalName}}</view>
				</view>
			</view>
			<view class="sec-text-color mt-4 px-3 font-sm"><text class="main-text-color">*</text>为必填项，完善个人信息才能领取任务</view>
			<view class="p-3">
				<view class="w-100 flex align-center justify-center main-bg-color text-white button-circle">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				info:{
					company: '广州子公司',
					fullname: '张三',
					sex: 0,
					service_city:'',   // 服务城市
					disease:'',				 // 感兴趣疾病类型
					department: '',    // 科室
					hospital: ''		   // 医院
				},
				diseaseName: '请选择疾病类型',
				departName: '请选择服务科室',
				hospitalName: '请选择工作医院',
				scityName: '请选择服务城市',
				type: '',
				tempids: '',
				tempnames: ''
			}
		},
		methods: {
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			toSelect(type){
				this.type = type
				this.tempids = ''
				this.tempnames = ''
				let _this = this;
				this.$eventHub.$on('setIds', function(data) {
					_this.tempids = data.cids;
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
				uni.navigateTo({
					url: '/pages/my/common-mult-select/common-mult-select?type='+type+'&ids='+ids+'&names='+names,
				});
			}
		},
		onShow() {
			if(this.type === 'hospital'){
				this.info.hospital = this.tempids
				this.hospitalName = this.tempnames
			}else if(this.type === 'depart'){
				this.info.department = this.tempids
				this.departName = this.tempnames
			}else if(this.type === 'symptom'){
				this.info.disease = this.tempids
				this.diseaseName = this.tempnames
			}else if(this.type === 'city'){
				this.info.service_city = this.tempids
				this.scityName = this.tempnames
			}
		}
	}
</script>

<style>

</style>
