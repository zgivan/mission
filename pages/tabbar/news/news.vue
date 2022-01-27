<template>
	<view class="page">
		<free-search-select :currTab="tabIndex" :scrollList="scrollList"
			:skipId="skipId" @changeT="changeTab">
		</free-search-select>
		<!-- 自定义资讯组件 -->
		<view class="top-warp">
			<!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
			<me-tabs v-model="tabIndex" :tabs="scrollList" @change="changeTab" :tab-width="130"></me-tabs>
		</view>
		<common-fixed-line h="66" />
		<!-- <me-tabs v-model="tabIndex" :tabs="scrollList" @change="changeTab" :tab-width="130"></me-tabs> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="px-3" v-for="(item,index) in 10" :key="index">
				<free-news-list></free-news-list>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import freeSearchSelect from '@/components/use-components/free-search-select.vue'
	import freeNewsList from '@/components/use-components/free-news-list.vue'
	import freeLoadMore from '@/components/use-components/free-load-more.vue'
	import meTabs from '@/components/me-tabs/me-tabs.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				scrollList: [{
						id: 0,
						name: '所有类型'
					},
					{
						id: 1,
						name: '知识科普'
					},
					{
						id: 2,
						name: '渠道发展'
					},
					{
						id: 3,
						name: '结算相关'
					},
					{
						id: 4,
						name: '项目培训'
					},
					{
						id: 5,
						name: '患者沟通'
					},
					{
						id: 6,
						name: '平台操作'
					},
					{
						id: 7,
						name: '规范管理'
					},
					{
						id: 8,
						name: '首页轮播图'
					}
				],
				tabIndex: 0,
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			},
			upCallback(page){
				setTimeout(() => {
					this.mescroll.endSuccess();
				},2000)				
				
				// 此处处理获得列表数据
				
				// apiGoods(page.num, page.size).then(res=>{
				// 	console.log(res)
				// 	this.mescroll.endSuccess(res.list.length);
				// 	//设置列表数据
				// 	if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
				// 	this.goods=this.goods.concat(res.list); //追加新数据
				// }).catch(()=>{
				// 	this.mescroll.endErr();
				// })
			}
		},
		computed: {
			skipId() {
				return 'tab' + this.tabIndex
			}
		},
		components: {
			freeSearchSelect,
			freeNewsList,
			freeLoadMore,
			meTabs
		},
		onLoad() {
		}
	}
</script>

<style>
	.text {
		margin: 16rpx 0;
		width: 100%;
		background-color: #fff;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #555;
		border-radius: 8rpx;
	}
	.top-warp{
		z-index: 9990;
		position: fixed;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		height: 66upx;
		background-color: white;
		margin-top: -4rpx;
	}
</style>
