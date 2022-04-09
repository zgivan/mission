<template>
	<view class="px-2">
		<view class="py-2 common-min-pb text-center font-md font-weight-bold common-text-dark position-relative">选择地区<text @click="closeP" style="top: 20rpx;" class="position-absolute right-0 iconfont icon-guanbi"></text></view>
		<view class="flex align-center">
			<text class="mr-2 px-2 py-1 font-sm common-text-dark" :class="index === 0?'border-bottom main-border-color':''" @click="toggle(0)">{{pName}}</text>
			<text class="mr-2 px-2 py-1 font-sm common-text-dark" :class="index === 1?'border-bottom main-border-color':''" @click="toggle(1)" v-if="p>0">{{cName}}</text>
			<text class="mr-2 px-2 py-1 font-sm common-text-dark" :class="index === 2?'border-bottom main-border-color':''" @click="toggle(2)" v-if="c>0 && hasThree">{{dName}}</text>
		</view>
		<view style="height: 600rpx;">
			<scroll-view scroll-y class="" style="height: 600rpx;" v-if="index === 0">
				<view class="py-1">
					<block v-for="(item,index) in region" :key="index">
						<view class="p-2 font-sm flex align-center justify-between" @click="selectP(item,index)">
							<view>{{item.text}}</view>
							<text v-if="p == item.id" class="iconfont icon-xiangmufangan-baoyang-duigou main-text-color font-md"></text>
						</view>
					</block>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="" style="height: 600rpx;" v-if="index === 1">
				<view>
					<block v-for="(item,index) in citys" :key="index">
						<view class="p-2 font-sm flex align-center justify-between" @click="selectC(item,index)">
							<view>{{item.text}}</view>
							<text v-if="c == item.id" class="iconfont icon-xiangmufangan-baoyang-duigou main-text-color font-md"></text>
						</view>
					</block>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="" style="height: 600rpx;" v-if="index === 2">
				<view>
					<block v-for="(item,index) in areas" :key="index">
						<view class="p-2 font-sm flex align-center justify-between" @click="selectC(item,index)">
							<view>{{item.text}}</view>
							<text v-if="d == item.id" class="iconfont icon-xiangmufangan-baoyang-duigou main-text-color font-md"></text>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			region:{
				type: Array,
				default:() => []
			},
			p:{
				type: [Number,String],
				default: 0
			},
			c:{
				type: [Number,String],
				default: 0
			},
			d:{
				type: [Number,String],
				default: 0
			},
			pName: {
				type: String,
				default: '请选择'
			},
			cName: {
				type: String,
				default: '请选择'
			},
			dName: {
				type: String,
				default: '请选择'
			},
			hasThree: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				index: 0,
				ci: [0,0,0],
				citys:[],
				areas:[]
			}
		},
		mounted() {
			setTimeout(() => {
				this.region.map((p,pindex) => {
					if(p.id == this.p){
						this.ci[0] = pindex
						this.index = 0
						this.citys = p.children
						p.children.map((c,cindex) => {
							if(c.id == this.c){
								this.ci[1] = cindex
								this.index = 1
								this.areas = c.children
								if(this.hasThree){
									c.children.map((d,dindex) => {
										if(d.id == this.d){
											this.ci[2] = dindex
											this.index = 2
										}
									})
								}
							}
						})
					}
				})
			},1000)
		},
		methods:{
			toggle(index){
				this.index = index
			},
			selectP(item,index){
				this.ci = [0,0,0]
				this.ci[0] = index
				this.index = 1
				this.citys = this.region[this.ci[0]].children
				this.$emit('sp',item)
			},
			selectC(item,index){
				this.ci[2] = 0
				this.ci[1] = index
				if(this.hasThree){
					this.index = 2
					this.areas = this.region[this.ci[0]].children[this.ci[1]].children
				}
				this.$emit('sc',item)
			},
			closeP(){
				this.$emit('close')
			}
		}
	}
</script>

<style>
</style>
