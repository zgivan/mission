<template>
	<view>
		<view class="example bg-white">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="info">
				<uni-forms-item label="所属公司" name="symptom">
					<view class="flex align-center">
						<view class="flex-1 mr-1"><uni-easyinput disabled placeholder="" v-model="info.company"/></view>
						<view class="d-inline-block py-1 px-2 font-small main-bg-color text-white">变更</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="info.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" required name="sex">
					<uni-data-checkbox v-model="info.sex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="服务城市" required name="name">
					<view @click="toSelect('city')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end" style="height: 72rpx;">请选择服务城市</view>
				</uni-forms-item>
				<uni-forms-item label="感兴趣疾病类型" required name="name">
					<view @click="toSelect('symptom')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end" style="height: 72rpx;">请选择疾病类型</view>
					<!-- <uni-easyinput disabled v-model="info.name" placeholder="请选择服务城市" /> -->
				</uni-forms-item>
				<uni-forms-item label="服务科室" required name="name">
					<view @click="toSelect('depart')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end" style="height: 72rpx;">请选择服务科室</view>
				</uni-forms-item>
				
				<uni-forms-item label="工作医院" name="name">
					<view @click="toSelect('hospital')" class="flex-1 font-sm flex align-center ml-2 text-muted justify-end" style="height: 72rpx;">请选择工作医院</view>
				</uni-forms-item>
			</uni-forms>
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
					name: '张三',
					sex: 0
				}
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
				uni.navigateTo({
					url: '/pages/my/common-mult-select/common-mult-select?type='+type,
				});
			}
		}
	}
</script>

<style>

</style>
