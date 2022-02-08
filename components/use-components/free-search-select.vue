<template>
	<view>
		<view class="bg-white" :class="isFixed?'position-fixed fixed-top':''">
			<uni-search-bar v-if="hasSearch" @confirm="search" :focus="searchFocus" placeholder="请输入关键字" v-model="searchValue" @blur="blur" @focus="focus" @input="input"  bgColor="#EEEEEE"
				@cancel="cancel" @clear="clear">
			</uni-search-bar>
			<view class="flex align-center px-2" v-if="hasSelect">
				<block v-for="(item,index) in selectList" :key="index">
					<view class="font-sm flex-1 text-center flex align-center justify-center" style="height: 70rpx;" :class="currTab===index?'border-bottom main-border-color main-text-color font-weight-bold':''" @click="changeTab(index)">{{item.text}}({{item.num}})</view>
				</block>
			</view>
			<!-- 自定义头部选项卡 -->
			<!-- scroll-into-view 要跳转到的选项id -->
			<view v-if="hasScrollTab" class="px-2">
				<scroll-view scroll-x="true" class="scroll-row" scroll-left="100" :scroll-into-view="skipId">
					<block v-for="(item,index) in scrollList">
						<view class="scroll-row-item mr-2 font-sm" style="height:70rpx;line-height: 70rpx;" :id="'tab'+item.id" :class="currTab===item.id?'border-bottom main-border-color main-text-color':''" @click="changeTab(item.id)">{{item.text}}</view>
					</block>
				</scroll-view>
			</view>
			<!-- 自定义插槽，多项下拉选择tab -->
			<slot is="tab" v-if="hasTab"></slot>
		</view>
		<view :style="'width:100%;height:'+lineHeight"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isFixed: {   //是否页面固定头部
				type: Boolean,
				default: true
			},
			hasSearch: {  //是否有搜索框
				type: Boolean,
				default: true
			},
			hasSelect: {	//是否有不可移动的tab选择
				type: Boolean,
				default: false
			},
			selectList: {		//tab选择列表
				type: Array,
				default: []
			},
			currTab: {	// tab当前选中项
				type: Number,
				default: 0
			},
			hasScrollTab:{	//横向滚动tab
				type: Boolean,
				default: false
			},
			scrollList: {		// 横向滚动tab的列表
				type: Array,
				default: []
			},
			skipId: {		//自动对焦选中tab项
				type: String,
				default: ''
			},
			hasTab:{		//是否添加自定义tab插槽
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				searchValue: ''
			}
		},
		computed:{
			lineHeight(){
				let h = 0
				if(this.isFixed){
					if(this.hasSearch){
						h += 112
					}
					if(this.hasTab){
						h += 70
					}
					if(this.hasScrollTab){
						h += 70
					}
					if(this.hasSelect){
						h += 70
					}
				}				
				// #ifdef H5
				h = h - 90
				// #endif
				return h + 'rpx'
			}
		},
		methods:{
			changeTab(index) {
				this.$emit('changeT',index)
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
				this.$emit('search',this.searchValue)
			},
			input(res) {
				console.log('----input:', res)
			}
		}
	}
</script>

<style>
</style>
