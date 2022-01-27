<template>
	<view class="page">
		<!-- <uni-card padding="0" spacing="0" margin="0"> -->
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :current="swiperDotIndex" autoplay circular>
					<swiper-item v-for="(item, index) in info" :key="index">
						<view  class="swiper-item">
							<image :src="item.url" style="width: 100%;" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		<!-- </uni-card> -->
		<view class="mt-2 pb-2 bg-white">
			<!-- <uni-card padding="0" spacing="0" margin="0"> -->
				<uni-search-bar @confirm="search" :focus="searchFocus" placeholder="请输入招募项目/研究中心/登记编号/药物名" v-model="searchValue" @blur="blur" @focus="focus" @input="input"  bgColor="#EEEEEE"
					@cancel="cancel" @clear="clear">
				</uni-search-bar>
				<view class="flex px-3 justify-around">
					<view class="font-sm" @click="toggle()">疾病类型</view>
					<view class="font-sm">所在城市</view>
					<view class="font-sm">佣金</view>
				</view>
			<!-- </uni-card> -->
		</view>
		<!-- <view class="mt-3">
			<uni-card padding="0" spacing="0" margin="0">
			</uni-card>
		</view> -->
		
		<!-- 自定义列表组件 -->
		<view class="mt-2 bg-white">
			<block v-for="(i,index) in 6" :key="index">
				<free-list></free-list>
			</block>
		</view>
		
		<!-- 普通弹层 -->
		<view>
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view style="max-height: 400rpx;overflow-y: auto;" class="w-100">
						<uni-row>
							<uni-col :span="12" v-for="(item,index) in list" :key="index">
								<view class="text-center pt-2">{{item.text}}</view>
							</uni-col>
						</uni-row>
					</view>
					<view class="flex justify-around py-2">
						<view class="font d-inline-block bg-white border rounded px-2 py-1">重置</view>
						<view class="font d-inline-block main-bg-color border rounded px-2 py-1 text-white">确定</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<!-- 悬浮按钮 -->
		<navigator url="/pages/mission/add-patient/add-patient" class="position-fixed rounded-circle main-bg-color text-white flex align-center justify-center font-lg" style="width:60rpx;height:60rpx;bottom: 30rpx;right: 30rpx;">＋</navigator>
		
		<!-- 自定义资讯组件 -->
		<view class="mt-3">
			
		</view>
		<!-- 自定义头部选项卡 -->
		<!-- scroll-into-view 要跳转到的选项id -->
		<!-- <scroll-view scroll-x="true" class="scroll-row" scroll-left="100" :scroll-into-view="skipId">
			<block v-for="(i,index) in 12">
				<view class="scroll-row-item mr-2 font" :id="'tab'+i" :class="currTab===i?'border-bottom main-border-color main-text-color':''" @click="changeTab(i)">选项{{i+1}}</view>
			</block>
		</scroll-view> -->
		
		<!-- grid宫格排版 -->
	<!-- 	<uni-section title="矩形宫格（3列）" type="line" :padding="false">
			<uni-grid :column="5" :show-border="false" :square="false" :highlight="false" @change="change">
				<uni-grid-item v-for="(item, index) in gridList" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="grid-image" mode="aspectFill" />
						<text class="grid-text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section> -->
		
		<!-- 列表形式组件 -->
		<!-- <uni-section title="显示图标或图片" type="line" :padding="false">
			<uni-list>
				<uni-list-item show-extra-icon showArrow :extra-icon="extraIcon" title="列表左侧带扩展图标" />
			</uni-list>
		</uni-section> -->
	</view>
</template>

<script>
	import freeList from '@/components/use-components/free-list.vue'
	export default {
		components: {
			freeList
		},
		data() {
			return {
				currTab: 0,
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				gridList: [{
						url: '/static/c1.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 10'
					}
				],
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
				list: [
					{
						text: 'Grid 1'
					},
					{
						text: 'Grid 2'
					},
					{
						text: 'Grid 3'
					},
					{
						text: 'Grid 4'
					},
					{
						text: 'Grid 5'
					},
					{
						text: 'Grid 3'
					},
					{
						text: 'Grid 4'
					},
					{
						text: 'Grid 5'
					},
					{
						text: 'Grid 3'
					},
					{
						text: 'Grid 4'
					},
					{
						text: 'Grid 5'
					},
					{
						text: 'Grid 3'
					},
					{
						text: 'Grid 4'
					},
					{
						text: 'Grid 5'
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
				type: "bottom"
			}
		},
		onLoad() {},
		computed:{
			skipId(){
				return 'tab'+this.currTab
			}
		},
		methods: {
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
