<template>
	<view class="page">
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="info">
				<uni-forms-item label="姓名" required name="fullname">
					<uni-easyinput v-model="info.fullname" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" required name="sex">
					<uni-data-checkbox v-model="info.sex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="身份证" required name="idnumber">
					<uni-easyinput type="idcard" v-model="info.idnumber" placeholder="请输入身份证" />
				</uni-forms-item>
				<uni-forms-item label="年龄" required name="age">
					<uni-easyinput type="number" v-model="info.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" required name="mobile">
					<uni-easyinput type="number" v-model="info.mobile" placeholder="请输入联系电话" />
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
					<uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="citys" v-model="info.city" @nodeclick="onnodeclick">
					</uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
					<uni-easyinput type="textarea" v-model="info.remarks" placeholder="请输入备注" />
				</uni-forms-item>
				<view class="example-body">
					<uni-file-picker :limit="maxCount" :title="'最多选择'+maxCount+'张图片'" file-mediatype="image" @select="select"></uni-file-picker>
				</view>
			</uni-forms>
			<view class="p-3 flex align-center" @click="choice">
				<choice-icon @click="choice" :selected="selected"></choice-icon> <text class="ml-2 font-sm text-danger">病例信息已获得患者知情同意</text>
			</view>
			<common-fixed-line :h="120"></common-fixed-line>
			<view class="bg-white position-fixed fixed-bottom" style="height: 120rpx;">
				<view class="p-3">
					<view class="main-bg-color text-white font flex align-center justify-center rounded-circle" style="height: 80rpx;" @click="submit('valiForm')">提交</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $H from '@/common/lib/request.js'
	import upload from '@/common/mixins/upload.js'
	import choiceIcon from '@/components/use-components/choice-icon.vue'
	export default {
		mixins: [upload],
		data() {
			return {
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
					fullname: '',
					age: '',
					remarks: '',
					idnumber: '',
					sex: '',
					mobile:'',
					height: '',
					weight: '',
					symptom: 0,
					province: '',
					city: '',
					album: '',
					task_id: 0
				},
				symptomName: '有意愿参加任意临床项目',
			}
		},
		methods: {
			select(res){
				this.uploadFile(res.tempFilePaths)
			},
			choice(){
				this.selected = !this.selected
			},
			submit(ref) {
				this.info.album = JSON.stringify(this.resultImgs)
				
				// console.log(this.$refs[ref])
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
				$H.post('',{},{
					header:{
						Authorization: uni.getStorageSync('auth')
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code === 1){
						this.info = res.data
					}else{
						this.info = {}
					}
				})
			}
		},
		components: {
			choiceIcon
		},
		onLoad(opt) {
			// 这里接收项目ID和症状id
			if(opt.id){
				console.log(opt)
				this.info.task_id = opt.id
				this.info.symptom = opt.sym
				this.symptomName = opt.symName
			}
			
			this.getCity()
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

</style>
