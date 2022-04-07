<template>
	<view class="py-2 px-3 border-bottom border-light-secondary bg-white" @click="toDetail">
		<view style="line-height: 2;"><text class="d-inline-block px-2 bg-warning text-white font-sm mr-2" v-if="type === 0 && item.is_top === 1">置顶</text><text class="font font-weight-bold">{{item.name}}</text></view>
		<view :class="type === 2?'border-bottom border-top border-light-secondary mt-1 py-3':''">
			<view class="font-sm mt-1" v-if="type === 2 || type === 3"><text class="text-light-muted">登记编号：</text>{{item.code}}</view>
			<view class="font-sm mt-1" v-if="type === 2 || type === 3"><text class="text-light-muted">实验分期：</text>{{item.stage}}</view>
			<view class="font-sm mt-1" v-if="type !== 3"><text class="text-light-muted">药物名称：</text>{{item.drug_name}}</view>
			<view class="font-sm mt-1"><text class="text-light-muted">药物类型：</text>{{item.medicine_name}}</view>
			<view class="font-sm mt-1"><text class="text-light-muted">申办机构：</text>{{item.institution}}</view>
			<view class="font-sm mt-1"><text class="text-light-muted">适应症：</text>{{item.symptom_name}}</view>
			<view class="font-sm mt-1" v-if="type !== 3"><text class="text-light-muted">招募人数：</text>{{item.recruit_number}}</view>		
			<view class="font-sm mt-1" v-if="type !== 0 && type !== 3"><text class="text-light-muted">截止日期：</text>{{item.end_time}}</view>
			<view class="font-sm mt-1" v-if="type === 4"><text class="text-light-muted">招募时间：</text>内容一详情</view>
			<view class="flex justify-between mt-1" :class="type===1?'mt-4':''">
				<view class="font-sm font-weight-bold" v-if="type!==3">
					<text class="text-muted">积分：</text><text class="text-warning">{{item.integral}}</text>
				</view>
				<view class="font-sm text-white" v-if="type === 0 || type === 4">
					<navigator class="d-inline-block px-2 py-1 sec-bg-color rounded" url="/pages/mission/patient-manage/patient-manage" v-if="item.is_join">推荐患者</navigator>
					<view class="d-inline-block px-2 py-1 main-bg-color rounded" v-else @click.stop="join">领取任务</view>
				</view>
			</view>
		</view>
		<view v-if="type === 1">
			<view class="border-top border-bottom mt-4 py-3 flex align-center border-light-secondary">
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold">0</text>
					<text class="font-sm mt-1">缺资料人数</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold">0</text>
					<text class="font-sm mt-1">筛查人数</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold">0</text>
					<text class="font-sm mt-1">入组人数</text>
				</view>
				<view class="flex flex-column flex-1 align-center">
					<text class="font-lg font-weight-bold">0</text>
					<text class="font-sm mt-1">排除人数</text>
				</view>
			</view>
			<view class="flex align-center justify-center pt-4 pb-3">
				<navigator class="main-bg-color text-white font-sm py-1 px-2 rounded" :url="'/pages/mission/patient-manage/patient-manage?id='+item.task_id">管理患者名单</navigator>
			</view>
		</view>
		<view v-if="type===2">
			<view class="py-3 border-bottom border-light-secondary text-muted font-sm" style="line-height: 1.8;">
				<block v-for="(item,index) in description" :key="index">
					<view>{{item}}</view>
				</block>
			</view>
			<veiw class="font-sm flex border-bottom border-light-secondary">
				<view class="flex-1 text-center text-dark py-2" :class="currSub===0?'main-border-color border-bottom main-text-color':''" @click="changeTab(0)">治疗方案</view>
				<view class="flex-1 text-center text-dark py-2" :class="currSub===1?'main-border-color border-bottom main-text-color':''" @click="changeTab(1)">初筛要点</view>
				<view class="flex-1 text-center text-dark py-2" :class="currSub===2?'main-border-color border-bottom main-text-color':''" @click="changeTab(2)">入排标准</view>
				<view class="flex-1 text-center text-dark py-2" :class="currSub===3?'main-border-color border-bottom main-text-color':''" @click="changeTab(3)">研究中心</view>
				<view class="flex-1 text-center text-dark py-2" :class="currSub===4?'main-border-color border-bottom main-text-color':''" @click="changeTab(4)">患者权益</view>
			</veiw>
			<view class="py-3 text-muted font-sm" v-if="currSub===0" style="line-height: 1.8;">
				<block v-for="(item,index) in plan" :key="index">
					<view>{{item}}</view>
				</block>
			</view>
			<view class="py-3 text-muted font-sm" v-if="currSub===1" style="line-height: 1.8;">
				<block v-for="(item,index) in keypoints" :key="index">
					<view>{{item}}</view>
				</block>
			</view>
			<view class="py-3 text-muted font-sm" v-if="currSub===2" style="line-height: 1.8;">
				<block v-for="(item,index) in standard" :key="index">
					<view>{{item}}</view>
				</block>
			</view>
			<view class="py-3" v-if="currSub===3">
				<block v-for="(obj ,index) in item.research_list" :key="index">
					<view class="mb-2 content-bg-color font-sm rounded px-2 py-1 common-text-muted flex flex-column">
						<view>{{obj.name}}</view>
						<view>{{obj.address}}</view>
					</view>
				</block>
			</view>
			<view class="py-3 text-muted font-sm" v-if="currSub===4" style="line-height: 1.8;">
				<block v-for="(item,index) in legalright" :key="index">
					<view>{{item}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/lib/richText.js'
	export default {
		props:{
			item: {
				type: Object
			},
			type:{
				type: Number,
				default: 0  //0-任务列表；1-工作列表；2-详情；3-患者管理；4-收藏列表
			}
		},
		data() {
			return {
				currSub: 0
			};
		},
		methods:{
			toDetail(){
				if(this.type === 0 || this.type === 1 || this.type === 4){
					this.$emit('detail',this.item.key||this.item.task_id)
				}
			},
			changeTab(index){
				this.currSub = index;
			},
			join(){
				this.$emit('join',this.item.key)
			},
			format(val){
				return htmlParser.format(val)
			}
		},
		computed:{
			description(){
				if(this.item.description){
					return this.item.description.split('|||')
				}else{
					return []
				}
			},
			plan(){
				if(this.item.plan){
					return this.item.plan.split('|||')
				}else{
					return []
				}
			},
			keypoints(){
				if(this.item.keypoints){
					return this.item.keypoints.split('|||')
				}else{
					return []
				}
			},
			standard(){
				if(this.item.standard){
					return this.item.standard.split('|||')
				}else{
					return []
				}
			},
			legalright(){
				if(this.item.legalright){
					return this.item.legalright.split('|||')
				}else{
					return []
				}
			}
		}
	}
</script>

<style>
rich-text{
	font-size: 24rpx;
}
</style>
