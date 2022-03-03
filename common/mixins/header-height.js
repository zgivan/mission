const HeaderHeight = {
	data(){
		return {
			headerH: 0,
			navH: 0,
			statusH: 0
		}
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				const menuButton = uni.getMenuButtonBoundingClientRect()		// 胶囊
				const navBarPadding = (menuButton.top - res.statusBarHeight) * 2	
				let statusBarHeight = res.statusBarHeight
				let navHeight = menuButton.height + navBarPadding		
				let headerHeight = navHeight + statusBarHeight
				this.statusH = statusBarHeight
				this.navH = navHeight
				this.headerH = headerHeight
			}
		})
	}
}

export default HeaderHeight