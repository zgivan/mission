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
	},
	countDown(deadline,type){  // 倒计时
		const now = Math.ceil(new Date().getDate()/1000)
		const dead = deadline
		if(dead > now){
			const t = dead - now
			return t
		}else{
			return '时间已过'
		}
	},
	getAge(identityCard) {
	    var len = (identityCard + "").length;
	    if (len == 0) {
	        return 0;
	    } else {
	        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
	        {
	            return 0;
	        }
	    }
	    var strBirthday = "";
	    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
	    {
	        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
	    }
	    if (len == 15) {
	        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
	    }
	    //时间字符串里，必须是“/”
	    var birthDate = new Date(strBirthday);
	    var nowDateTime = new Date();
	    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
	    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
	    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	},
	getBirthdayFromIdCard(idCard) {  
		var birthday = "";  
		if(idCard != null && idCard != ""){  
				if(idCard.length == 15){  
						birthday = "19"+idCard.substr(6,6);  
				} else if(idCard.length == 18){  
						birthday = idCard.substr(6,8);  
				}  
			
				birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
		}
		return birthday;  
	}
}