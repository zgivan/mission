<template>
	<view class="page">
		<free-search-select :skipId="skipId" @search="search"></free-search-select>
		<!-- 自定义资讯组件 -->
		<view class="top-warp">
			<me-tabs v-model="tabIndex" tabs-fixed :tabs="cates" @change="changeTab" :height="70" :tab-width="130"></me-tabs>
		</view>
		
		<common-fixed-line :h="70"></common-fixed-line>
		<!-- <me-tabs v-model="tabIndex" :tabs="scrollList" @change="changeTab" :tab-width="130"></me-tabs> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="px-3" v-for="(item,index) in list" :key="index">
				<free-news-list :item="item"></free-news-list>
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
	import $H from '@/common/lib/request.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				list: [],
				keyword: '',
				cates: [],
				tabIndex: 0,
				cate_id: 0
			}
		},
		methods: {
			upCallback(page){
				this.getList(page)
			},
			refreshLists(){
				this.list = []
				this.mescroll.resetUpScroll()
			},
			search(val){
				this.keyword = val
				// 刷新页面
				this.refreshLists()
			},
			getList(page){
				uni.showLoading({
					title:'加载中...',
					mask: true
				})
				$H.post('/news/list',{
					keyword: this.keyword,
					page: page.num,
					size: page.size,
					cate_id: this.cate_id
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code === 1){
						this.mescroll.endSuccess(res.data.list.length)
						if(page.num === 1){
							this.list = res.data.list
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}else{
						if(page.num === 1){
							this.list = []
						}
						uni.showToast({
							title: res.msg
						})
					}
				})
			},
			getCate(){
				let obj = {id:0,name:'全部'}
				this.cates.push(obj)
				$H.post('/category/getlist').then(res => {
					if(res.code === 1){
						this.cates = this.cates.concat(res.data.list)
					}
				})
			},
			changeTab(index){
				this.tabIndex = index
				this.cate_id = this.cates[index].id
				this.refreshLists()
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
		onLoad(opt){
			if(opt.pid){
				uni.setStorageSync('pid',opt.pid)
			}
			this.getCate()
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabbar/news/news?pid='+uni.getStorageSync('uid')
			}
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
