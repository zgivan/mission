export default {
	data(){
		return {
			resultImgs: [],
			imgCount: 0,		// 实际选择数量
			maxCount: 50,   // 此参数根据页面实际情况修改
		}
	},
	methods:{
		chooseImage(c=9){  // count- 选择的数量限制，最大为9
			let canCount = this.imageCount - this.imgCount
			let count = canCount >= c ? c : canCount    // 判断爱能选择几张图
			uni.chooseImage({
				count: count,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册或者拍照选择,默认二者都有
				success: (res) => {
					console.log(res)
				}
			})
		},
		uploadFile(paths){
			// const uploadTask = 
			uni.showLoading({
				title: '图片上传中',
				mask: true
			})
			for(let i=0;i<paths.length;i++){
				uni.uploadFile({
					url: 'http://api.hzcg.com.cn/api/images/upload',
					filePath: paths[i],
					name: 'uploadfile',
					header:{
						Authorization: uni.getStorageSync('auth')
					},
					success: (ret) => {
						if(i === paths.length-1){
							uni.hideLoading()
						}
						if(ret.statusCode === 200){
							let res = JSON.parse(ret.data)
							if(res.code === 1){
								this.imgCount++ 
								this.resultImgs.push(res.data) 
							}else{
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err)
					}
				})
			}
			
			
			// uploadTask.onProgressUpdate((res) => {
			// 	console.log('上传进度' + res.progress);
			// 	console.log('已经上传的数据长度' + res.totalBytesSent);
			// 	console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

			// 	// 测试条件，取消上传任务。
			// 	if (res.progress > 50) {
			// 		uploadTask.abort();
			// 	}
			// });
		}
	}
}