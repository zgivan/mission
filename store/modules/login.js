export default {
	state:{
		userinfo:false,
		userid: 0,
		loginStatus:false
	},
	mutations:{
		// 初始化数据
		initUser(state){
			let userinfo = uni.getStorageSync('userinfo')
			if (userinfo) {
				userinfo = JSON.parse(userinfo)
				
				state.userinfo = userinfo
				state.userid = userinfo.id
				state.loginStatus = true
			}
		},
		// 登录
		login(state,userinfo){
			state.userinfo = userinfo
			state.userid = userinfo.id
			state.loginStatus = true
			uni.setStorageSync('userinfo',JSON.stringify(userinfo))
		},
		// 退出
		logout(state){
			state.userinfo = false
			state.userid = 0
			state.loginStatus = false
			uni.removeStorageSync('userinfo')
			uni.removeStorageSync('auth')
		}
	},
	actions:{
		
	}
}