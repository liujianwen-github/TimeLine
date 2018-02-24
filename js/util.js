(function($){
	/**
	 * 初始化时间轴
	 * @param {Object} arg
	 */
	$.fn.initTimeLine = function(args){
		var _this = this
		var size = 0
		var group = $('<div class="imgGroup"  style="width:'+(args.groupSize/args.imgGroup.length)*100+'vw"></div>')
		var showBox = `<div class="mainImages">`+
							`<div class="curr" style="transform: scale(1);">`+
								`<img src=""/>`+
							`</div>`+
							`<div class="line"></div>`+
						`</div>`
		args.imgGroup.forEach(function(e,i,arr){
			var str = `<div class="item" style="width:`+100/args.groupSize+`%">`+
						`<div class="line">`
						`<div class="footer">`+
							`<img src="img/point.png"/>`+
							`<p>${e.name}</p>`+
						`</div>`+
					`</div>`
			$(group).append(str)	
			size++
			console.log(size)
			if(size===args.groupSize){
				$(group).prepend(showBox)
				$(_this).append(group)
				group = $('<div class="imgGroup"  style="width:'+(args.groupSize/args.imgGroup.length)*100+'vw"></div>')
				size = 0
				console.log('clear')
			}
		})
		$('body').on('touchstart','.item .footer img',function(e){
			var _this = this
	//		console.log(this)
			if($(this).parents('.item').hasClass('active')){
				$(this).find('.item').removeClass('active')
				$(this).parents('.imgGroup').find('.mainImages').animate({height:0},500)
				$(this).attr('src','img/point.png')
				$(this).parents('.item').removeClass('active')
				return
			}
			$(this).attr('src','img/select.png')
			$(this).parents('.item').addClass('active')
			$(this).parents('.imgGroup').find('.mainImages').animate({height:'50vh'},500)
	//		$(this).parents('.item').siblings().find('.mainImages').animate({height:0},500)
	//		$(this).parents('.item').siblings().find('.footer').find('img').attr('src','img/point.png')
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
