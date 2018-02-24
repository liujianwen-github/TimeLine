(function($){
	/**
	 * 初始化时间轴
	 * @param {Object} arg
	 */
	$.fn.initTimeLine = function(args){
		var _this = this
		args.forEach(function(e,i,arr){
			var str = `<div class="item">`+
						`<div class="mainImages">`+
							`<div class="curr" style="transform: scale(1);">`+
								`<img src=${e.mainImg}/>`+
							`</div>`+
							`<div class="line"></div>`+
						`</div>`+
						`<div class="footer">`+
							`<img src="img/point.png"/>`+
							`<p>${e.name}</p>`+
						`</div>`+
					`</div>`
			$(_this).append(str)	
		})
	}
	/**
	 * 初始化图片流
	 * @param {Object} args
	 */
	$.fn.initImagesStream = function(args){
		if(args.length===0||typeof args ==='undefined'){
			console.error('参数错误!')
			return
		}
		var _this = this
		var arrH = []
		args.forEach(function(el,index,arr){
			console.log(el)
			var img = new Image()
			img.src = el.source
			
			var box = $('<div class="box"></div>')
			var pic = $('<div class="pic"></div>')
			pic.append(img)
			box.append(pic)
			console.log(parseInt(Math.random()*20))
			console.log(el.style)
			if(el.style){
				console.log(el.style)
				img.style.width = el.style.size+ 'vh'
				switch (el.style.position){
					case"top":{
						$(box).css('vertical-align','top')
						break;
					}
					case"middle":{
						$(box).css('vertical-align','middle')
						break;
					}
					case"bottom":{
						$(box).css('vertical-align','bottom')
						break;
					}
				}
			}else{
				img.style.width = parseInt(Math.random()*20)+50 + 'vh'
			}
			$(_this).append(box)
		})
	}
	/**
	 * 移动端打印日志
	 * @param {Object} 日志内容
	 */
	$.fn.log = function(e){
		var span = $('<span>'+e+';</span>')
		$(this).append(span)
		return function(){
			$(this).html('')
		}
	}
})(jQuery)
