(function($){
	function showImgs(){
		console.log($(this).parents('.mainImages'))
	}
	$('#imagesStream').initImagesStream([{
		source:"img/dog.jpg",
		style:{
			position:'top',
			size:50
		}
	},{
		source:"img/dog.jpg",
		style:{
			position:'middle',
			size:30
		}
	},{
		source:"img/dog.jpg",
		style:{
			position:'bottom',
			size:20
		}
	},{
		source:"img/dog.jpg",
		style:{
			position:'top',
			size:100
		}
	},{
		source:"img/dog.jpg",
		style:{
			position:'middle',
			size:10
		}
	},{
		source:"img/dog.jpg",
		style:{
			position:'bottom',
			size:20
		}
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	},{
		source:"img/dog.jpg"
	}])
//	$('#imagesStream .box').on('click',function(){
//		alert('1')
//	})
	var imgs = $('#imagesStream .box')
	$('body').on('click',"#imagesStream .box",function(){
		alert('1')
	})
	console.log(imgs)
//	imgs.each(function(inedx,el){
//		console.log(el)
//		initHammer({
//			dom:el
//		})
//	})
	var basicPosition = []
	imgs.each(function(index,el){
		console.log(el)
		initHammer({
			dom:el
		})
	})
	imgStream(60000)
	function imgStream(speed){
		$('#imagesStream').animate({'left':'-500vw'},speed,"linear",function(){
			$('#imagesStream').animate({'left':'0'},speed,"linear",function(){
				imgStream(speed)
			})
		})
	}
	
//	var i = new Hammer()
	console.log(Hammer)
	$('.showBox').initTimeLine([{
		name:'1937',
		mainImg:"img/dog.jpg"
	},{
		name:'1938',
		mainImg:"img/dog.jpg"
	},{
		name:'1939',
		mainImg:"img/dog.jpg"
	},{
		name:'1940',
		mainImg:"img/dog.jpg"
	},{
		name:'1941',
		mainImg:"img/dog.jpg"
	},{
		name:'1942',
		mainImg:"img/dog.jpg"
	}])
	$('body').on('touchstart','.item .footer img',function(e){
		var _this = this
		console.log(this)
		if($(this).parents('.item').hasClass('active')){
			$(this).find('.item').removeClass('active')
			$(this).parents('.item').find('.mainImages').animate({height:0},500)
			$(this).attr('src','img/point.png')
			$(this).parents('.item').removeClass('active')
			return
		}
		$(this).attr('src','img/select.png')
		$(this).parents('.item').addClass('active')
		$(this).parents('.footer').siblings('.mainImages').animate({height:'50vh'},500)
//		$(this).parents('.item').siblings().find('.mainImages').animate({height:0},500)
//		$(this).parents('.item').siblings().find('.footer').find('img').attr('src','img/point.png')
	})
//	return
	console.log('init')
	$('#clear').on('click',function(){
		$('#log').html('')
	})

	
	function initHammer (args){
		console.log(args)
		var dom = args.dom
		var options = {}
		var handlePanStart = function(){
	//		确定初始位置
			var left = $(dom).css('left')
			var l = left.search('px')
			left = Number(left.substring(0,l))
			var top = $(dom).css('top')
			var t = top.search('px')
			top = Number(top.substring(0,t))
			basicPosition = [{
				left:left,
				top:top
			}]
		}
		var handlePan = function(e){
			console.log(e)
	//		$('#log').log('pan')
			$(dom).css({'left':basicPosition[0].left+e.deltaX+'px','top':basicPosition[0].top+e.deltaY+'px'})
		}
		var handlePinch = function(e){
	//		console.log(e)
			if(e.type == "pinchstart"){
				$('#log').log('pinchstart')
				//TODO 注意  transform只能有一条属性
				var transform = dom.style.transform
				transform = transform.replace(/\(/,"")
				transform = transform.replace(/\)/,"")
				transform = transform.substring(5)
				$('#log').log(transform)
	         	basicPosition[0].scaleCount = transform || 1
	//       	$('#log').log(basicPosition[0].scaleCount)
	       	}
			console.log(dom.style.transform.scale)
			$('#log').log(basicPosition[0].scaleCount)
	        $(dom).css('transform','scale('+basicPosition[0].scaleCount * e.scale+')');
	//      $(dom).css('transform',"scale(" + (e.scale)+ ")")
		}
		var mc = new Hammer(dom, options);
		mc.get('pinch').set({enable:true})
	//	mc.get('swipe').set({})
	//	mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
	//	mc.add( new Hammer.Pinch({direction: Hammer.DIRECTION_ALL}));
		mc.on('panstart',handlePanStart);
		mc.on("pan", handlePan);
		mc.on('pinchstart pinch',handlePinch);
	}

//	var dom = document.getElementsByClassName('curr')[0]
	
})(jQuery)
