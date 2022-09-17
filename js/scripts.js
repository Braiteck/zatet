$(function(){
	$('.menu ul.level1').flexMenu({
		linkText: '<div class="icon"><div class="icon_more"></div></div>ЕЩЕ',
		linkTitle: ''
	})


	// Слайдер на главной
	$('.main_slider .slider').owlCarousel({
		loop: true,
	    margin: 20,
	    dots: true,
	    nav: true,
	    navSpeed: 750,
	    dotsSpeed: 750,
	    smartSpeed: 750,
	    autoplaySpeed: 750,
	    items: 1,
	    autoplay: true,
		autoplayTimeout: 5000
	})


	// Всплывающие окна
	$('.modal_link').click(function(e){
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).attr('href'),
			type : 'inline',
			opts : {
				speed: 300,
				autoFocus : false,
				i18n : {
					'en' : {
						CLOSE : 'Закрыть'
					}
				}
			}
		})
	})

	$('.fancy_img').fancybox({
		transitionEffect : 'slide'
	})


	// Закрытие всплывашки
	$('.modal .modal_close').click(function(e){
		e.preventDefault()

		$.fancybox.close()
	})


	// Отправка форм
	$('.form').submit(function(e){
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : '#success_modal',
			type : 'inline',
			opts : {
				speed: 300,
				autoFocus : false,
				i18n : {
					'en' : {
						CLOSE : 'Закрыть'
					}
				}
			}
		})
	})


	// Маска ввода телефона
	$('input[type=tel]').mask('+7 (999) 999-99-99')


	// Кастомный select
	$('.search select, .sorting select, .form select, .lk .card_info select').selectbox({
		effect: "fade",
		onOpen: function(data){

			if( $(this).next().find('.scroll li').size() > 8 ) {
				// Кастомный скроллинг
				$(this).next().find('.sbOptions .scroll').slimScroll({
			        height: '192px',
			        position: 'right',
				    railVisible: true,
				    alwaysVisible: true,
				    color: '#8f8f8f',
			    	size: '3px',
			    	distance: '0',
			    	railColor: '#dbdbdb',
			    	railOpacity: 1
			    })
			}
		}
	})


	// Товар в Избравнное
	$('.product .favorite .link, .product_info .favorite .link').click(function(e){
		e.preventDefault()

		var self = $(this)

		if( self.hasClass('active') ){
			self.removeClass('active')
			self.parent().find('.success').hide()
			self.parent().find('.success_del').fadeIn(300)
		}else{
			self.addClass('active')
			self.parent().find('.success').hide()
			self.parent().find('.success_add').fadeIn(300)
		}

		clearTimeout( timer )
		var timer = setTimeout(function(){
			self.parent().find('.success').fadeOut(200)
		}, 4000)
	})


	// Товар в корзину
	$('.product .buy .link, .product_info .buy .link').click(function(e){
		e.preventDefault()

		var self = $(this)

		if( self.hasClass('active') ){
			self.parent().find('.success').hide()
			self.removeClass('active').text('В КОРЗИНУ')
		}else{
			self.addClass('active').text('В КОРЗИНЕ')
			self.parent().find('.success').hide()
			self.parent().find('.success_buy').fadeIn(300)
		}

		clearTimeout( timer )
		var timer = setTimeout(function(){
			self.parent().find('.success').fadeOut(200)
		}, 4000)
	})


	// Товар в сравнение
	$('.product .compare .link, .product_info .compare .link').click(function(e){
		e.preventDefault()

		var self = $(this)

		if( self.hasClass('active') ){
			self.removeClass('active').find('span').text('В сравнение')
			self.parent().find('.success').hide()
			self.parent().find('.success_del').fadeIn(300)
		}else{
			self.addClass('active').find('span').text('В сравнении')
			self.parent().find('.success').hide()
			self.parent().find('.success_add').fadeIn(300)
		}

		clearTimeout( timer )
		var timer = setTimeout(function(){
			self.parent().find('.success').fadeOut(200)
		}, 4000)
	})


	// Бренды
	$('.brands_block .slider').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    margin: 20,
	    responsive : {
	    	1250 : {
		        items: 6
		    },
		    1024 : {
		        items: 5
		    },
		    768 : {
		        items: 4
		    },
		    480 : {
		        items: 3
		    },
		    0 : {
		        items: 2
		    }
		}
	})


	// Подписка
	$('.subscribe form').submit(function(e){
		e.preventDefault()

		$(this).next().fadeIn()

		clearTimeout( timer )
		var timer = setTimeout(function(){
			$('.subscribe .success').fadeOut(300)
		}, 4000)
	})


	// Фильтр
	$('aside .filter .item .name').click(function(e){
		e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active').next().slideUp()
		} else{
			$(this).addClass('active').next().slideDown()
		}
	})


	$("#price_range").ionRangeSlider({
        type     : 'double',
        min      : 0,
        max      : 25000,
        from     : 1500,
        to       : 12500,
        step     : 10,
        onChange : function (data) {
            $('.filter .price input.ot').val( number_format(data.from, 0, ',', ' ') )
            $('.filter .price input.do').val( number_format(data.to, 0, ',', ' ') )
        }
    })

    $('.filter .price .input').keyup(function() {
        var slider = $("#price_range").data("ionRangeSlider")

        slider.update({
            type     : 'double',
            min      : 0,
        	max      : 25000,
            from     : parseInt( $('.filter .price input.ot').val().replace(/\s+/g, '') ),
            to       : parseInt( $('.filter .price input.do').val().replace(/\s+/g, '') ),
            step     : 10,
            onChange : function (data) {
                $('.filter .price input.ot').val( number_format(data.from, 0, ',', ' ') )
                $('.filter .price input.do').val( number_format(data.to, 0, ',', ' ') )
            }
        })
    })


    $('.filter .reset_btn').click(function(){
		var slider = $("#price_range").data("ionRangeSlider")

		slider.update({
		    type     : 'double',
	        min      : 0,
	        max      : 25000,
	        from     : 1500,
	        to       : 12500,
	        step     : 10,
	        onChange : function (data) {
	            $('.filter .price input.ot').val( number_format(data.from, 0, ',', ' ') )
	            $('.filter .price input.do').val( number_format(data.to, 0, ',', ' ') )
	        }
		})
	})


	$('.filter .label_data').each(function(){
		if( $(this).find('.line').size() > 6 ) {
			// Кастомный скроллинг
			$(this).find('.scroll').slimScroll({
		        height: '158px',
		        position: 'right',
			    railVisible: true,
			    alwaysVisible: true,
			    color: '#8f8f8f',
		    	size: '3px',
		    	distance: '0',
		    	railColor: '#dbdbdb',
		    	railOpacity: 1
		    })
		}
	})


	// Фильтр магазинов
	$('.shops_list .filter .item .name').click(function(e){
		e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active').next().slideUp()
		} else{
			$(this).addClass('active').next().slideDown()
		}
	})


	$('.shops_list .filter .item_wrap').each(function(){
		if( $(window).width() < 480 ) {
			if( $(this).index() == 0 && $(this).find('.line').size() > 12 ) {
				// Кастомный скроллинг
				$(this).find('.scroll').slimScroll({
			        height: '158px',
			        position: 'right',
				    railVisible: true,
				    alwaysVisible: true,
				    color: '#8f8f8f',
			    	size: '3px',
			    	distance: '0',
			    	railColor: '#dbdbdb',
			    	railOpacity: 1
			    })
			}

			if( $(this).index() > 0 && $(this).find('.line').size() > 5 ) {
				// Кастомный скроллинг
				$(this).find('.scroll').slimScroll({
			        height: '158px',
			        position: 'right',
				    railVisible: true,
				    alwaysVisible: true,
				    color: '#8f8f8f',
			    	size: '3px',
			    	distance: '0',
			    	railColor: '#dbdbdb',
			    	railOpacity: 1
			    })
			}
		} else {
			if( $(this).find('.line').size() > 5 ) {
				// Кастомный скроллинг
				$(this).find('.scroll').slimScroll({
			        height: '158px',
			        position: 'right',
				    railVisible: true,
				    alwaysVisible: true,
				    color: '#8f8f8f',
			    	size: '3px',
			    	distance: '0',
			    	railColor: '#dbdbdb',
			    	railOpacity: 1
			    })
			}
		}
	})


	$('.shops_list .list .shop .features .spoler_link').click(function(e){
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').text('Показать все').prev().fadeOut()
		} else {
			$(this).addClass('active').text('Свернуть').prev().fadeIn()
		}
	})


	// Изменение количества товара
	$('.amount .minus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val())
	    var minimum = parseInt(input.attr('data-minimum'))

	    if(inputVal > minimum){
	    	input.val(inputVal-1)
	    }
	})

	$('.amount .plus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val())
	    var maximum = parseInt(input.attr('data-maximum'))

	    if(inputVal < maximum){
	    	input.val(inputVal-(-1))
	    }
	})


	// Табы
	$('.tabs_container').each(function(){
	    $(this).find('.tab_content:first').show()
	})

	$('.tabs li').click(function() {
	    var parentBox = $(this).parents('.tabs_container')

	    $(parentBox).find('.tabs li').removeClass('active')
	    $(this).addClass('active')
	    $(parentBox).find('.tab_content').hide()

	    var activeTab = $(this).find('a').attr('href')
	    $(activeTab).fadeIn()
	    return false
	})


	// Карточка товара
	$product_info = $('.product_info .images .big .slider').owlCarousel({
		loop: false,
	    margin: 0,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    items: 1,
	    margin: 20,
	    onTranslate: function(event){
	    	$('.product_info .images .thumbs a').removeClass('active')
	    	$('.product_info .images .thumbs a:eq('+ event.item.index +')').addClass('active')
	    }
	})

	$('.product_info .images .thumbs a').click(function(e) {
		e.preventDefault()

		$('.product_info .images .thumbs a').removeClass('active')
		$(this).addClass('active')

	    $product_info.trigger('to.owl.carousel', $(this).attr('data-slide-index'))
	})


	// Все характеристики
	$('.product_info .data .features .all a').click(function(e){
		e.preventDefault()

	    var selected = '#product_tab2'

	    $('.product_info .tabs li').removeClass('active')
	    $('.product_info .tabs li:eq(1)').addClass('active')

	    $('.product_info .tab_content').hide()
	    $(selected).fadeIn()

	    $.scrollTo(selected, 1000, { offset: -80 })
	})


	// Опции товара
	$('.product_info .data .options label').click(function(){
		$(this).parents('.item').find('.title .checked').text( $(this).attr('data-value') )
	})


	// Личный кабинет
	$('.lk .edit_personal').click(function(e){
	    e.preventDefault()
	    var parent = $(this).parents('.personal')

	    parent.find('.links div').show()
	    $(this).parent().hide()
	    parent.find('.personal_info').hide()
	    parent.find('.password_form').hide()
	    parent.find('.personal_form').fadeIn()
	})

	$('.lk .edit_password').click(function(e){
	    e.preventDefault()
	    var parent = $(this).parents('.personal')

	    parent.find('.links div').show()
	    $(this).parent().hide()
	    parent.find('.personal_info').hide()
	    parent.find('.personal_form').hide()
	    parent.find('.password_form').fadeIn()
	})

	$('.lk .personal form .cancel_link').click(function(e){
	    e.preventDefault()
	    var parent = $(this).parents('.personal')

	    $(this).parents('form').hide()
	    parent.find('.links div').show()
	    parent.find('.personal_info').fadeIn()
	})

	$('.lk .history .head').click(function(e){
	    e.preventDefault()

	    if( $(this).parents('.item').hasClass('active') ){
	    	$(this).parents('.item').removeClass('active').find('.data').slideUp()
	    }else{
	    	$('.lk .history .data').slideUp()
	    	$('.lk .history .item').removeClass('active')

	    	$(this).parents('.item').addClass('active').find('.data').slideDown()
	    }
	})


	// Магазины
	$('.shops_list .shop .slider').owlCarousel({
		loop: true,
	    margin: 20,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    items: 1
	})


	// Описание магазина
	$('.shop_desc .slider').owlCarousel({
		loop: true,
	    margin: 20,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    items: 1
	})


	// Отзывы магазина
	$('.reviews_block .slider').owlCarousel({
		loop: true,
	    margin: 20,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    items: 1
	})



	// Табы
	$('.products_tabs_container').each(function(){
	    $(this).find('.products_tab_content:first').show()

	    // Товары
		$(this).find('.products_tab_content:first .slider').owlCarousel({
			loop: true,
		    dots: false,
		    nav: true,
		    navSpeed: 500,
		    smartSpeed: 500,
		    autoplaySpeed: 500,
		    responsive : {
		    	1250 : {
			        items: 5,
		    		margin: 10
			    },
			    1024 : {
			        items: 4,
		    		margin: 10
			    },
			    768 : {
			        items: 3,
		    		margin: 10
			    },
			    480 : {
			        items: 2,
		    		margin: 10
			    },
			    0 : {
			        items: 1,
		    		margin: 10
			    }
			},
			onInitialized: function(event){
				productHeight( $(event.target).find('.product'), $(event.target).find('.product').size())
			}
		})
	})

	$('.products_tabs li').click(function() {
	    var parentBox = $(this).parents('.products_tabs_container')

	    $(parentBox).find('.products_tabs li').removeClass('active')
	    $(this).addClass('active')
	    $(parentBox).find('.products_tab_content').hide()

	    var activeTab = $(this).find('a').attr('href')
	    $(activeTab).fadeIn()

	    // Товары
		$(activeTab).find('.slider:not(.owl-loaded)').owlCarousel({
			loop: true,
		    dots: false,
		    nav: true,
		    navSpeed: 500,
		    smartSpeed: 500,
		    autoplaySpeed: 500,
		    responsive : {
		    	1250 : {
			        items: 5,
		    		margin: 10
			    },
			    1024 : {
			        items: 4,
		    		margin: 10
			    },
			    768 : {
			        items: 3,
		    		margin: 10
			    },
			    480 : {
			        items: 2,
		    		margin: 10
			    },
			    0 : {
			        items: 1,
		    		margin: 10
			    }
			},
			onInitialized: function(event){
				productHeight( $(event.target).find('.product'), $(event.target).find('.product').size())
			}
		})

	    return false
	})


	// Товары
	$('.products .slider.carousel').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    smartSpeed: 500,
	    autoplaySpeed: 500,
	    responsive : {
	    	1250 : {
		        items: 5,
	    		margin: 10
		    },
		    1024 : {
		        items: 4,
	    		margin: 10
		    },
		    768 : {
		        items: 3,
	    		margin: 10
		    },
		    480 : {
		        items: 2,
	    		margin: 10
		    },
		    0 : {
		        items: 1,
	    		margin: 10
		    }
		},
		onInitialized: function(event){
			productHeight( $(event.target).find('.product'), $(event.target).find('.product').size())
		}
	})
})


$(window).load(function(){
	// Выравнивание элементов в статьях
	setProductHeight()
})


$(window).resize(function(){
	// Выравнивание элементов в статьях
	setProductHeight()
})


function setProductHeight(){
	$('.products .grid .product .name').height('auto')

	if( $(window).width() > 1229 ) {
		$('.products .grid').each(function(){
			productHeight( $(this).find('.product'), $(this).attr('data-in-line'))
		})
	}

	if( $(window).width() > 1023 && $(window).width() < 1230 ) {
		$('.products .grid').each(function(){
			productHeight( $(this).find('.product'), $(this).attr('data-in-line1229'))
		})
	}

	if( $(window).width() > 767 && $(window).width() < 1024 ) {
		$('.products .grid').each(function(){
			productHeight( $(this).find('.product'), $(this).attr('data-in-line1023'))
		})
	}

	if( $(window).width() > 479 && $(window).width() < 768 ) {
		$('.products .grid').each(function(){
			productHeight( $(this).find('.product'), $(this).attr('data-in-line767'))
		})
	}

	if( $(window).width() < 480 ) {
		$('.products .grid').each(function(){
			productHeight( $(this).find('.product'), $(this).attr('data-in-line479'))
		})
	}
}


function productHeight(selector, step){
	var start = 0
	var finish = step

	var products = selector

	for( var i = 0; i < products.length; i++ ){
		var obj = products.slice(start, finish).find('.name')

		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}


function setHeight(className){
    var maxheight = 0
    $(className).each(function() {
        if($(this).innerHeight() > maxheight) {
        	maxheight = $(this).innerHeight()
        }
    })
    $(className).innerHeight(maxheight)
}


// Форматирование чисел
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

  var n          = !isFinite(+number) ? 0 : +number,
  	  prec       = !isFinite(+decimals) ? 0 : Math.abs(decimals),
  	  sep        = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
  	  dec        = (typeof dec_point === 'undefined') ? '.' : dec_point,
  	  s          = '',
  	  toFixedFix = function(n, prec) {
      	var k = Math.pow(10, prec);
      	return '' + (Math.round(n * k) / k).toFixed(prec);
      };

  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
}