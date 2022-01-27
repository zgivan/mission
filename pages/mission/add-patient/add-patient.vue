<template>
	<view class="page">
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="info">
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="info.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" required name="sex">
					<uni-data-checkbox v-model="info.sex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="身份证" required name="idcard">
					<uni-easyinput type="idcard" v-model="info.idcard" placeholder="请输入身份证" />
				</uni-forms-item>
				<uni-forms-item label="年龄" required name="age">
					<uni-easyinput type="number" v-model="info.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" required name="phone">
					<uni-easyinput type="number" v-model="info.phone" placeholder="请输入联系电话" />
				</uni-forms-item>
				<uni-forms-item label="身高" name="height">
					<uni-easyinput type="number" v-model="info.height" placeholder="请输入身高(cm)" />
				</uni-forms-item>
				<uni-forms-item label="体重" name="weight">
					<uni-easyinput type="number" v-model="info.weight" placeholder="请输入体重(kg)" />
				</uni-forms-item>
				<uni-forms-item label="确诊症状" name="symptom">
					<uni-easyinput disabled v-model="info.symptom" placeholder="请输入确诊症状" />
				</uni-forms-item>
				<template v-if="!isBase">
					<uni-forms-item label="所在城市" required :name="!isBase?'city':''">
						<uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="dataTree" v-model="info.city"
							@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="备注" name="introduction">
						<uni-easyinput type="textarea" v-model="info.introduction" placeholder="请输入备注" />
					</uni-forms-item>
					<view class="example-body">
						<uni-file-picker limit="50" title="最多选择50张图片"></uni-file-picker>
					</view>
				</template>
			</uni-forms>
			<view class="p-3">
				<view class="main-bg-color text-white font flex align-center justify-center rounded-circle" style="height: 80rpx;" @click="submit('valiForm')">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBase: false,
				dataTree: [{
					text: "广东",
					value: "1-0",
					children: [{
						text: "广州",
						value: "1-1",
						children: [{
							text: "白云",
							value: "1-1-1"
						}]
					},
					{
						text: "东城",
						value: "1-2"
					}]
				},
				{
					text: "天津",
					value: "2-0",
					children: [{
						text: "2.1班",
						value: "2-1"
					},
					{
						text: "2.2班",
						value: "2-2"
					}]
				},
				{
					text: "河北",
					value: "3-0",
					disable: true
				}],
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
					name: {
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
					idcard: {
						rules: [{
							required: true,
							errorMessage: '身份证不能为空'
						}, {
							format: 'idcard',
							errorMessage: '身份证格式错误'
						}]
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
					phone: {
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
					}
				},
				info: {
					name: '',
					age: '',
					introduction: '',
					idcard: '',
					sex: '',
					phone:'',
					height: '',
					weight: '',
					symptom: '高血压',
					city: '',
				}
			}
		},
		methods: {
			submit(ref) {
				console.log(this.$refs[ref])
				this.$refs[ref].validate().then(res => {
					console.log('success', this.valiFormData);
					uni.showToast({
						title: `校验通过`
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
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {}
		},
		components: {
		}
	}
</script>

<style>

</style>
