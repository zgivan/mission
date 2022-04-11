<template>
	<view class="page">
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="info">
				<view class="py-1 px-2 font-sm sec-bg-color text-white d-inline-block" v-if="edit === 0">从我的患者中选择</view>
				<uni-forms-item label="姓名" required name="fullname">
					<uni-easyinput :disabled="!canEdit" v-model="info.fullname" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" required name="sex">
					<uni-data-checkbox :disabled="!canEdit" v-model="info.sex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="身份证" required name="idnumber">
					<uni-easyinput :disabled="!canEdit" type="idcard" v-model="info.idnumber" @blur="getAge" placeholder="请输入身份证" />
				</uni-forms-item>
				<uni-forms-item label="年龄" required name="age">
					<uni-easyinput :disabled="!canEdit" type="number" v-model="info.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" required name="mobile">
					<uni-easyinput :disabled="!canEdit" type="number" v-model="info.mobile" placeholder="请输入联系电话" />
				</uni-forms-item>
				<uni-forms-item label="身高" name="height">
					<uni-easyinput type="number" v-model="info.height" placeholder="请输入身高(cm)" />
				</uni-forms-item>
				<uni-forms-item label="体重" name="weight">
					<uni-easyinput type="number" v-model="info.weight" placeholder="请输入体重(kg)" />
				</uni-forms-item>
				<uni-forms-item label="确诊症状" name="symptom">
					<uni-easyinput disabled v-model="symptomName" placeholder="请输入确诊症状" />
				</uni-forms-item>
				<uni-forms-item label="所在城市" required :name="!isBase?'city':''">
					<view class="font-sm" style="float: right;height: 72rpx;line-height: 72rpx;" :style="cityName === '' || edit === 1 ? 'color:#ccc;':'color:#333;'" @click="openPopup">{{cityName == ''? '请选择所在地区': cityName}}</view>
					<!-- <uni-easyinput disabled v-model="cityName" placeholder="请选择所在地区"/> -->
					<!-- <uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="citys" v-model="info.city" @nodeclick="onnodeclick">
					</uni-data-picker> -->
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
					<uni-easyinput type="textarea" v-model="info.remarks" placeholder="请输入备注" />
				</uni-forms-item>
				<view class="flex px-3 py-2 align-center justify-between content-bg-color font-sm common-text-light">
					<text>最多选择{{maxCount}}张图片</text>
					<text>{{resultImgs.length}}/{{maxCount}}</text>
				</view>
				<view class="flex flex-wrap align-center pb-1 px-1 py-2" style="box-sizing: border-box;">
					<block v-for="(item,index) in resultImgs" :key="index">
						<view class="px-1 mb-2" style="width: 25%;" @longtap="delImg(index)">
							<view class="img-bar flex align-center justify-center">
								<image :src="item" mode="widthFix" class="img-bar-image"></image>
							</view>
						</view>
					</block>
					<view class="px-1 mb-2" style="width: 25%;" @click="chooseImage" v-if="resultImgs.length < maxCount">
						<view class="img-bar">
							<view class="w-100 h-100 content-bg-color flex align-center justify-center flex-column position-absolute top-0 left-0">
								<text class="iconfont icon-icon_zj common-text-light font-lg"></text>
								<text class="font-sm common-min-mt common-text-light">添加照片</text>
							</view>
						</view>
					</view>
				</view>
			</uni-forms>
			<view class="p-3 flex align-center" @click="choice">
				<choice-icon @click="choice" :selected="selected"></choice-icon> <text class="ml-2 font-sm text-danger">病例信息已获得患者知情同意</text>
			</view>
			<common-fixed-line :h="120"></common-fixed-line>
			<view class="bg-white position-fixed fixed-bottom" style="height: 120rpx; z-index: 1;">
				<view class="p-3">
					<view class="main-bg-color text-white font flex align-center justify-center rounded-circle" style="height: 80rpx;" @click="submit('valiForm')">提交</view>
				</view>
			</view>
		</view>
		
		<!-- 取消订单原因选择 -->
		<uni-popup ref="spopup" background-color="#fff" @change="" hasRadius radius="border-top-left-radius: 24rpx;border-top-right-radius: 24rpx;overflow:hidden;">
			<view class="popup-content">
				<common-region 
					:region="citys"
					:p="info.province"
					:pName="pName"
					:c="info.city"
					:cName="cName"
					:hasThree="false"
					@sc="selectC"
					@sp="selectP"
					@close="closePopup"
				></common-region>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	import $T from '@/common/lib/tool.js'
	import upload from '@/common/mixins/upload.js'
	import choiceIcon from '@/components/use-components/choice-icon.vue'
	import commonRegion from '@/components/use-components/common-region.vue'
	export default {
		mixins: [upload],
		data() {
			return {
				edit: 0,
				selected: false,
				isBase: false,
				citys: [],
				info: {
					name: '张三',
					sex: 0
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				rules: {
					fullname: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					sex: {
						rules: [{
							required: true,
							errorMessage: '请选择性别'
						}]
					},
					idnumber: {
						rules: [{
							required: true,
							errorMessage: '身份证不能为空'
						}
						, {
							format: 'idcard',
							errorMessage: '身份证格式错误'
						}
						]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					},
					mobile: {
						rules: [{
							required: true,
							errorMessage: '联系电话不能为空'
						}, {
							format: 'phone',
							errorMessage: '电话号码输入有误'
						}]
					},
					city: {
						rules: [{
							required: true,
							errorMessage: '请选择城市'
						}]
					},
					imageCount: 50
				},
				info: {
					id: 0,
					fullname: '',
					age: '',
					remarks: '',
					idnumber: '',
					sex: '',
					mobile:'',
					height: '',
					weight: '',
					symptom: 0,
					province: 0,
					city: 0,
					album: '',
					task_id: 0
				},
				symptomName: '有意愿参加任意临床项目',
				pName: '请选择',
				cName: '请选择'
			}
		},
		computed:{
			cityName(){
				if(this.pName === '请选择' || this.cName === '请选择'){
					return ''
				}else{
					return this.pName + '-' + this.cName
				}
			},
			canEdit(){
				if(this.edit === 1){
					return false
				}else{
					return true
				}
			}
		},
		methods: {
			getAge(){
				this.info.age = $T.getAge(this.info.idnumber)
			},
			selectP(item){
				this.info.province = item.id
				this.pName = item.text
				this.info.city = 0
				this.cName = '请选择'
			},
			selectC(item){
				this.info.city = item.id
				this.cName = item.text
				this.$refs['spopup'].close()
			},
			openPopup(){
				if(this.edit === 1) return
				this.$refs['spopup'].open('bottom')
			},
			closePopup(){
				this.$refs['spopup'].close()
			},
			choice(){
				this.selected = !this.selected
			},
			submit(ref) {
				this.info.album = JSON.stringify(this.resultImgs)
				
				console.log(this.info.album)
				this.$refs[ref].validate().then(result => {
					// 验证成功插入数据
					if(!this.selected){
						uni.showToast({
							title: '需勾选患者知情同意',
							icon: 'none'
						})
						return
					}
					$H.post('/patient/add',this.info,{
						header:{
							Authorization: uni.getStorageSync('auth')
						}
					}).then(res => {
						if(res.code === 1){
							uni.showToast({
								title:res.msg
							})
							setTimeout(() =>{
								uni.navigateBack({
									delta: -1
								})
							},500)
						}else{
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}
					})
				}).catch(err => {
					console.log('err', err);
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'none'
					});
				})
			},
			onnodeclick(e) {
				console.log(e);
				if(e.level === 0){
					this.info.province = e.id
					this.info.city = ''
				}
				if(e.level === 1){
					this.info.city = e.id
				}
			},
			getCity(){
				// 获取城市信息
				$H.post('/com/get_region').then(res => {
					if(res.code === 1){
						this.citys = res.data.list
						if(this.info.id>0){
							this.getInfo()
						}
					}else{
						uni.showToast({
							msg: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getInfo(){
				// 获取已经病人信息
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				$H.post('/patient/patient-info',{
					id: this.info.id
				},{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					if(res.code === 1){
						this.info = res.data
						this.symptomName = res.data.symptom_val
						this.pName = res.data.province_val
						this.cName = res.data.city_val
						// this.info.album = JSON.stringify(this.resultImgs)
						this.resultImgs = this.info.album ? JSON.parse(this.info.album) : []
					}else{
						this.info = {}
					}
				})
			},
			delImg(index){
				let _this = this
				uni.showModal({
					content: '是否移除该图片',
					cancelText: '取消',
					confirmText: '确定',
					success() {
						_this.resultImgs.splice(index,1)
					}
				})
			}
		},
		components: {
			choiceIcon,
			commonRegion
		},
		onLoad(opt) {
			// 这里接收项目ID和症状id
			this.getCity()
			if(opt.id){
				console.log(opt)
				this.info.task_id = parseInt(opt.id)
				this.info.symptom = opt.sym
				this.symptomName = opt.symName
			}
			
			if(opt.cid){
				this.info.id = parseInt(opt.cid)
				this.edit = 1
			}
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabBar/index/index?pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>
.img-bar{
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	border-radius: 8rpx;
	overflow: hidden;
	position: relative;
}
.img-bar-image{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
</style>
