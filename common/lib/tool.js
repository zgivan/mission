export default {
	// 获取任意两个之间的随机整数
	rnd(n, m){
		return Math.floor(Math.random()*(m-n+1)+n);
	},
	exchageTime(t,type){  //type  1- yyyy-mm-dd hh:mm:ss 2- yyyy-mm-dd hh:mm 3- yyyy-mm-dd  4- hh-mm-ss 5- hh:mm
		let date = new Date(parseInt(t)*1000)
		let yyyy = date.getFullYear()
		let mm = date.getMonth()+1
		let dd = date.getDate()
		let hh = date.getHours()
		let m = date.getMinutes()
		let ss = date.getSeconds()
		
		if(type === 1){
			return yyyy+'-'+(mm>9?mm:'0'+mm)+'-'+(dd>9?dd:'0'+dd) + ' ' + (hh>9?hh:'0'+hh) +':'+ (m>9?m:'0'+m)  +':'+ (ss>9?ss:'0'+ss)
		}
		if(type === 2){
			return yyyy+'-'+(mm>9?mm:'0'+mm)+'-'+(dd>9?dd:'0'+dd) + ' ' + (hh>9?hh:'0'+hh) +':'+ (m>9?m:'0'+m)
		}
		if(type === 3){
			return yyyy+'-'+(mm>9?mm:'0'+mm)+'-'+(dd>9?dd:'0'+dd)
		}
		if(type === 4){
			return (hh>9?hh:'0'+hh) +':'+ (m>9?m:'0'+m)  +':'+ (ss>9?ss:'0'+ss) 
		}
		if(type === 5){
			return (hh>9?hh:'0'+hh) +':'+ (m>9?m:'0'+m)
		}
	}
}