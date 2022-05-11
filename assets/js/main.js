(function (win, $) {
	
	// header scroll
	var headerScroll = function() {
		var header = $("#header");
		$(window).scroll(function() {    
			var headerScroll = $(window).scrollTop();
			if (headerScroll >= 50) {
				header.addClass("header--active");
			} else {
			  header.removeClass("header--active");
			}
		}).scroll();
		// var handleHeader = function () {
		// 	if ($(window).scrollTop() >= 50) {
		// 		header.addClass("header--active");
		// 	} else {
		// 	  header.removeClass("header--active");
		// 	}
		// }
		// handleHeader();
	}
	
	// slide key-visual
	var slideKeyVisual = function() {
		new Swiper(".kv__swiper", {
			effect: "fade",
			loop: true,
			speed: 1000,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
		});
	}

	//scroll section about
	var scrollAbout  =  function() {
		$('.kv-scroll-donw').click(function(e) {
			e.preventDefault();
			var aboutSection = $(this).attr("href");
			$('html, body').stop().animate({
				scrollTop: $(aboutSection).offset().top
			}, 400, function() {
					location.hash = aboutSection;
			});
		})
	}

	var handleNavigationMo = function() {
		var burger = $('.burger');
			navArea = $('.nav-area');
			closeNav = $('.btn-close')
		burger.click(function(e) {
			e.preventDefault();
			navArea.toggleClass('nav-area--active');
			$('body').addClass('no-scroll');
		})
		closeNav.click(function(e) {
			e.preventDefault();
			navArea.toggleClass('nav-area--active');
			$('body').removeClass('no-scroll');
		})
	}
	// handle scroll menu - section
	var scrollSections = function() {
		var lastId,
			topMenu = $('.gnb__list'),
			topMenuHeight = topMenu.outerHeight(),
			menuItems = topMenu.find(".gnb__link"),
		scrollItems = menuItems.map(function() {
			var itemSection = $($(this).attr("href"));
			if (itemSection.length) { return itemSection; }
		})
		menuItems.click(function(e) {
			var nameSection = $(this).attr("href"),
				offsetTopSection = nameSection === "#" ? 0 : $(nameSection).offset().top-topMenuHeight+1;
			$('html, body').stop().animate({ 
				scrollTop: offsetTopSection
			}, 400, function() {
				location.hash = nameSection;
			});
			e.preventDefault();
		})
		// Bind to scroll
		$(window).scroll(function(){
			// Get container scroll position
			var fromTop = $(this).scrollTop()+topMenuHeight;
			
			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
					return this;
				});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			
			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
				.parent().removeClass("gnb__item--active")
				.end().filter("[href='#"+id+"']").parent().addClass("gnb__item--active");
			}                   
		});
	}

	// tab about
	var tabSectionAbout = function() {
		$('ul.tab-about li').click(function(e){
			var tab_id = $(this).find('a').attr('href');
			$('ul.tab-about li').removeClass('tab-about--active');
			$('.tab-content').removeClass('tab-about--active');
		
			$(this).addClass('tab-about--active');
			e.preventDefault();
			$(tab_id).addClass('tab-about--active');
			return false;
		})
	}

	// slide history
	var slideHistory = function() {
		var slideHistoryCount,
			historyCount;
		var swiperHistory = new Swiper ('.history-swiper', {
			slidesPerView: 'auto',
			slidesPerGroup: 3,
			spaceBetween: 24,
			loop: false,
			touchMoveStopPropagation: true,
			observer: true,
			observeParents: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1024: {
					slidesPerGroup: 1,
					spaceBetween: 12,
				},
			},
			// run when click tab about
			 
			on: {
				init: function() {
					handleHistoryCount();
				},
				beforeResize: function () {
					handleHistoryCount();
				},
				slideChange: function () {
					handleHistoryCurrent(this.activeIndex);
				}
				
			}
		}); 
		// total item
		swiperHistory.on('reachEnd', function() {
			if($(window).width() < 1025) { 
				swiperHistory.snapGrid = swiperHistory.slidesGrid.slice(0);
			}
		})
		function handleHistoryCount() {
			if($(window).width() < 1025) {
				slideHistoryCount = $('.history-swiper__list .history-swiper__item').length;
			} else {
				slideHistoryCount = Math.ceil(($('.history-swiper__list .history-swiper__item').length) / 3);
			}
			$('.swiper-counter .total').html(slideHistoryCount);
		}
		function handleHistoryCurrent (index) {
			if($(window).width() < 1025) {
				historyCount = index + 1;
			} else {
				historyCount = Math.ceil((index) / 3 + 1);
			}
			$('.swiper-counter .current').html(historyCount);
		}
	}

	// slide Game
	var slideGame = function() {
		var swiperGame = new Swiper('.game-swiper', {
			speed: 1200,
			spaceBetween: 24,
			observer: true,
			observeParents: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					spaceBetween: 0,
				},
			},
		})
		var swiperGameTotal = $('.game__list .game__item').length;
		$('.swiper-game-counter .total').html(swiperGameTotal);
		swiperGame.on('slideChange', function () {
			var swiperGameCount = this.activeIndex + 1;
			$('.swiper-game-counter .current').html(swiperGameCount);
		});
	}

	// filter careers
	var filterCareers = function() {
		$('.filter-career__link').on('click', function(e) {
			e.preventDefault();
			var $itemCareers = $(this).attr('data-item');
			var filterCareerItems = $('.filter-career__item');
			var careerItemList =  $( '.filterable[data-item=' + $itemCareers + ']' )
			var careerEmpty = $('.career-empty');
			if (filterCareerItems.hasClass('filter-career__active')) {
				filterCareerItems.removeClass('filter-career__active')
			} 
			$(this).parent().addClass('filter-career__active')
			if( $itemCareers == 'all') {
				$('.filterable').removeClass('is-hidden');
				careerEmpty.removeClass('career-show');
				$('.career-list').removeClass('is-hidden');
			} else  {
				if (careerItemList.length > 0) {
					$('.filterable').addClass('is-hidden');
					careerItemList.removeClass('is-hidden');
					careerEmpty.removeClass('career-show');
					$('.career-list').removeClass('is-hidden');
				} else {
					// $('.filterable').removeClass('is-hidden');
					$('.filterable').addClass('is-hidden');
					careerEmpty.addClass('career-show');
					$('.career-list').addClass('is-hidden');
				}
			}
		})
	}

	// slide office view
	var slideOfficeView = function() {
		new Swiper('.officeview-swiper', {
			speed: 1000,
			slidesPerView: 1,
			spaceBetween: 24,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}

	// slide new
	var slideNews = function() {
		new Swiper('.new-swiper', {
			slidesPerView: 'auto',
			slidesPerGroup: 3,
			spaceBetween: 24,
			loop: false,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1024: {
					slidesPerGroup: 1,
					spaceBetween: 12,
				},
			},
		})
	}

	// popup officeview
	var slidePopupOfficeView = function() {
		new Swiper('.popup-officeview-swiper', {
			effect: 'fade',
			loop: false,
			speed: 1000,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}

	// handlePopupOfficeView
	var handlePopupOfficeView = function() {
		$('.officeview__item .officeview__img').click(function() {
			$('body').addClass('no-scroll');
			$('.popup-officeview').addClass('popup--active')
			$('.dimmed').addClass('dimmed--active')
		})
		$('.btn-close-popup').click(function () {
			$('body').removeClass('no-scroll');
			$('.popup-officeview').removeClass('popup--active')
			$('.dimmed').removeClass('dimmed--active')
		})
		$('.dimmed').click(function () {
			$('body').removeClass('no-scroll');
			$('.popup-officeview').removeClass('popup--active')
			$('.dimmed').removeClass('dimmed--active')
		})
	}

	// handlePopupNew
	var handlePopupNew = function() {
		$('.new__slide .new__item').click(function() {
			$('body').addClass('no-scroll');
			$('.popup-new').addClass('popup--active')
			$('.dimmed').addClass('dimmed--active')
			$( window ).resize(function() {
				scrollBarNew();
			});
			scrollBarNew();
		})
		$('.btn-close-popup').click(function () {
			$('body').removeClass('no-scroll');
			$('.popup-new').removeClass('popup--active')
			$('.dimmed').removeClass('dimmed--active')
		})
		$('.dimmed').click(function () {
			$('body').removeClass('no-scroll');
			$('.popup-new').removeClass('popup--active')
			$('.dimmed').removeClass('dimmed--active')
		})
	}
	// scroll to top
	var scrollToTop = function() {
		$(window).scroll(function() {
			if($(this).scrollTop() > 100) {
				$(".scroll-to-top").fadeIn(400);
			} else {
				$(".scroll-to-top").fadeOut(400);
			}
		})
		$('.scroll-to-top').click(function() {
			$('html, body').animate({scrollTop: '0px'}, 800)
		})
	}

	// scrollbar section new
	var scrollBarNew = function() {
		var $scrollable = $('.scrollable');
		var $scrollbar  = $('.scrollbar');
		$scrollable.outerHeight(true);
		var H   = $scrollable.outerHeight(true);
		var sH  = $scrollable[0].scrollHeight;
		var  sbH = H*H/sH;
		$('.scrollbar').height(sbH);
		$scrollable.on("scroll", function(){
			$scrollbar.css({top: $scrollable.scrollTop()/H*sbH });
		});
		
	}

	// call func
	$(win).on('load', function() {
		headerScroll();
		slideKeyVisual();
		scrollAbout();
		handleNavigationMo();
		scrollSections();
		tabSectionAbout();
		slideHistory();
		slideGame();
		filterCareers();
		slideOfficeView();
		slideNews();
		slidePopupOfficeView();
		scrollToTop();
		handlePopupNew();
		handlePopupOfficeView();
	})
})(window, window.jQuery)
