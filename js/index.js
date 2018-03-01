(function($){
//	alert($('.showBox').width())
	function showImgs(){
		console.log($(this).parents('.mainImages'))
	}
	$('#imagesStream').initImagesStream([{
		source:"img/back1.jpg",
		style:{
			position:'top',
			size:50
		}
	},{
		source:"img/back2.jpg",
		style:{
			position:'middle',
			size:30
		}
	},{
		source:"img/back3.jpg",
		style:{
			position:'bottom',
			size:20
		}
	},{
		source:"img/back4.jpg",
		style:{
			position:'top',
			size:100
		}
	},{
		source:"img/back5.jpg",
		style:{
			position:'middle',
			size:10
		}
	},{
		source:"img/back6.jpg",
		style:{
			position:'bottom',
			size:20
		}
	},{
		source:"img/back7.jpg"
	},{
		source:"img/back8.jpg"
	},{
		source:"img/back9.jpg"
	},{
		source:"img/back10.jpg"
	},{
		source:"img/back11.jpg"
	}])
//	$('#imagesStream .box').on('click',function(){
//		alert('1')
//	})
	var imgs = $('#imagesStream .box')
	$('body').on('click',"#imagesStream .box",function(){
//		alert('1')
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
	imgStream(30000)
	function imgStream(speed){
		console.log($('#imagesStream').width())
//		alert($('#imagesStream').width())
		var totalWidth = $('#imagesStream').width()
		var viewWidth = $('#background').width()
		$('#imagesStream').animate({'left':viewWidth-totalWidth+'px'},speed,"linear",function(){
			$('#imagesStream').animate({'left':'0'},speed,"linear",function(){
				imgStream(speed)
			})
		})
	}
	
//	var i = new Hammer()
	console.log(Hammer)
	$('.showBox').initTimeLine({
		groupSize:2,
		imgGroup:[{
			name:'1937',
			mainImg:"img/1937.jpg"
		},{
			name:'1938',
			mainImg:"img/1938.jpg"
		},{
			name:'1939',
			mainImg:"img/1939.jpg"
		},{
			name:'1940',
			mainImg:"img/1940.jpg"
		},{
			name:'1941',
			mainImg:"img/1941.jpg"
		},{
			name:'1942',
			type:'lightbox',
			mainImg:"img/1942_0.jpg",
			imgs:[
			"img/1942_0.jpg",
			"img/1942_1.jpg",
			"img/1942_2.jpg",
			"img/1942_3.jpg",
			"img/1942_4.jpg",
			]
		},{
			name:'1943',
			mainImg:"img/1943.jpg"
		},{
			name:'1944',
			mainImg:"img/1944.jpg"
		}]
	},function(){
		$('.imgGroup .item .mainImages ul').each(function(index,el){
			var id = $(this).attr('id')
			$('#'+id).pgwSlideshow({
		    		transitionEffect:'sliding',
		    		autoSlide:true,
		    		displayList:true,
		    		displayControls:false
		    });
		})
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
