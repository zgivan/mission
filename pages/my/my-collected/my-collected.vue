<template>
	<view class="page">
		<free-search-select></free-search-select>
		<!-- 自定义资讯组件 -->
		<!-- <view class="px-3" v-for="(item,index) in 5" :key="index">
			<free-news-list></free-news-list>
		</view> -->
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
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
			}
		},
		methods: {			
			
		},
		components:{
			freeSearchSelect,
			freeNewsList
		},
		onShareAppMessage() {
			return {
				title: '邀请你加入百科迈招募',
				path: '/pages/tabbar/my/my?pid='+uni.getStorageSync('uid')
			}
		}
	}
</script>

<style>

</style>
