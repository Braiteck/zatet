$(window).load(function(){
	//Сравнение
	var products = $('.compare_products .carousel .product')
	var sizes = new Object()

	products.each(function(){
		$(this).next().find('li').each(function(){
			if(sizes[$(this).index()]){
				if($(this).find('.box').outerHeight() > sizes[$(this).index()]){
					sizes[$(this).index()] = $(this).find('.box').outerHeight()
				}
			}else{
				sizes[$(this).index()] = $(this).find('.box').outerHeight()
			}
		})
	})

	$('.compare_features li').each(function(){
		if(sizes[$(this).index()]){
			if($(this).find('.box').outerHeight() > sizes[$(this).index()]){
				sizes[$(this).index()] = $(this).find('.box').outerHeight()
			}
		}else{
			sizes[$(this).index()] = $(this).find('.box').outerHeight()
		}
	})

	$.each(sizes, function(key, data){
		products.each(function(){
			$(this).next().find('ul li:eq('+ key +') .box').innerHeight(data)
		})

		$('.compare_features ul li:eq('+ key +') .box').innerHeight(data)
	})


	if(products.size() > 4){
		$('.compare_products .carousel > li').width( Math.floor($('.compare_products').width()/4) )
	}

	if(products.size() > 3 && $(window).width() < 1230 && $(window).width() > 767){
		$('.compare_products .carousel > li').width( Math.floor($('.compare_products').width()/3) )
	}

	if(products.size() > 2 && $(window).width() < 768 && $(window).width() > 479){
		$('.compare_products .carousel > li').width( Math.floor($('.compare_products').width()/2) )
	}

	if(products.size() > 1 && $(window).width() < 480){
		$('.compare_products .carousel > li').width( Math.floor($('.compare_products').width()) )
	}

	productHeight( products, products.size())


	if(
		products.size() > 4
		|| ( products.size() > 3 && $(window).width() < 1024 && $(window).width() > 767 )
		|| ( products.size() > 2 && $(window).width() < 768 && $(window).width() > 479 )
		|| ( products.size() > 1 && $(window).width() < 480 )
	){
		$('.compare_products').addClass('active')

		$frame = $('.compare_products .compare_wrap')
		$wrap  = $frame.parent()

		$frame.sly({
			horizontal     : 1,
			itemNav        : 'basic',
			smart          : 1,
			activateMiddle : 1,
			mouseDragging  : 1,
			touchDragging  : 1,
			releaseSwing   : 1,
			startAt        : 0,
			scrollBar      : $wrap.find('.scrollbar'),
			scrollBy       : 1000,
			speed          : 500,
			elasticBounds  : 1,
			dragHandle     : 1,
			dynamicHandle  : 1,
			clickBar       : 1
		})
	}

	$('.compare_features').css('top', $('.compare_products .product_features').position().top-12)
})