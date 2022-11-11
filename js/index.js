(function() {

	function Slider(option) {
		this.wrap = option.wrap; //调用slider的元素
		this.imgList = option.imgList; //图片列表
		this.imgNum = this.imgList.length; //图片的长度
		this.width = option.width || $(this.wrap).width(); //图片的宽
		this.height = option.height || $(this.wrap).height(); //图片的高
		this.isAuto = option.isAuto || true; //是否自动轮播
		this.moveTime = option.moveTime; //轮播的时间
		this.direction = option.direction || 'right'; //轮播的方向
		this.btnWidth = option.btnWidth; //按钮的宽
		this.btnHeight = option.btnHeight; //按钮的高
		this.spanWidth = option.spanWidth; //span的宽
		this.spanHeight = option.spanHeight; //span的高
		this.spanColor = option.spanColor; //span按钮的背景颜色
		this.activeSpanColor = option.activeSpanColor; //选中span的颜色
		this.btnBackgroundColor = option.btnBackgroundColor; //按钮的背景颜色
		this.spanRadius = option.spanRadius; //按钮的圆角程度
		this.spanMargin = option.spanMargin; //span之间的距离
		this.flag = false;
		this.nowIndex = 0;
		this.createDom();
		this.initStyle();
		this.bindEvent();
		if (this.isAuto) {
			this.autoMove()
		}
	}

	Slider.prototype.createDom = function() {
		var oUl = $('<ul class="imgList"></ul>');
		var Spot = $('<div class="spot"></div>')
		this.imgList.forEach(function(item) {
			var oLi = ('<li><a href=" ' + item.a + ' "><img src=" ' + item.img + ' "></a></li>');
			oUl.append(oLi);
			var span = ('<span></span>');
			Spot.append(span);
		});
		var leftBtn = $('<div class="left-btn">&lt</div>');
		var rightBtn = $('<div class="right-btn">&gt</div>');
		this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
	}

	Slider.prototype.initStyle = function() {
		$('*', this.wrap).css({
			margin: 0,
			padding: 0,
			listStyle: 'none',
		});
		$(this.wrap).css({
			overflow: 'hidden',
			position: 'relative',
		})
		$('.imgList', this.wrap).css({
			width: this.width,
			height: this.height,
			position: 'relative',
		});
		$('.imgList li', this.wrap).css({
			width: this.width,
			height: this.height,
			position: 'absolute',
			left: 0,
			top: 0,
			display: 'none',
		}).eq(this.nowIndex).css({
			display: 'block',
		})
		$('.imgList li a, .imgList li a img', this.wrap).css({
			display: 'inline-block',
			width: this.width,
			height: this.height,
		});
		$('.left-btn, .right-btn', this.wrap).css({
			width: this.btnWidth,
			height: this.btnHeight,
			backgroundColor: this.btnBackgroundColor,
			color: '#fff',
			textAlign: 'center',
			lineHeight: this.btnHeight + 'px',
			position: 'absolute',
			top: '50%',
			marginTop: -this.btnHeight / 2,
			cursor: 'pointer',
		});
		$('.right-btn', this.wrap).css({
			right: 0,
		});
		$('.spot', this.wrap).css({
			height: this.spanHeight + (this.spanMargin * 2),
			position: 'absolute',
			left: '50%',
			marginLeft: -this.imgNum * (this.spanWidth + (this.spanMargin) * 2) / 2,
			bottom: "10%",
		})
		$('.spot span', this.wrap).css({
			display: 'inline-block',
			width: this.spanWidth,
			height: this.spanHeight,
			margin: this.spanMargin,
			backgroundColor: this.spanColor,
			borderRadius: this.spanRadius,
			cursor: 'pointer',
		}).eq(this.nowIndex).css({
			backgroundColor: this.activeSpanColor,
		})
	}

	Slider.prototype.bindEvent = function() {
		var self = this;
		$('.left-btn', this.wrap).click(function() {
			self.move('prev');
		});
		$('.right-btn', this.wrap).click(function() {
			self.move('next');
		});
		$('.spot span').click(function(e) {
			self.move($(this).index())
		});
		$(this.wrap).mouseenter(function() {
			clearInterval(self.time);
		}).mouseleave(function() {
			self.autoMove()
		})
	}

	Slider.prototype.move = function(dir) {
		if (this.flag) {
			return false;
		}
		this.flag = true;
		switch (dir) {
			case 'prev':
				if (this.nowIndex === 0) {
					this.nowIndex = this.imgNum - 1;
				} else {
					this.nowIndex--;
				}
				break;
			case 'next':
				if (this.nowIndex === this.imgNum - 1) {
					this.nowIndex = 0;
				} else {
					this.nowIndex++;
				}
				break;
			default:
				this.nowIndex = dir;
				break;
		}
		var self = this;
		$('.imgList li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function() {
			self.flag = false;
		});
		$('.spot  span', this.wrap).css({
			backgroundColor: this.spanColor,
		}).eq(this.nowIndex % this.imgNum).css({
			backgroundColor: this.activeSpanColor,
		})
	}

	Slider.prototype.autoMove = function() {
		var self = this;
		this.time = setInterval(function() {
			if (this.direction == 'left') {
				$('.left-btn', this.wrap).trigger('click');
			} else {
				$('.right-btn', this.wrap).trigger('click');
			}
		}, self.moveTime)
	}

	$.fn.extend({
		slider: function(option) {
			option.wrap = this;
			new Slider(option);
		}
	})
}())
$(function() {
	var scorgao = $("body").height()
	console.log(scorgao);
	$(".demo").css("height", "100vh")
	$(".navigation li a").eq(0).css('color', '#fde9bc')
	// $(".MenuBtn").click(function() {
	// 	$('.border').addClass('trX')
	// 	$(".line1").css("transform", "translateY(4px) rotate(225deg)")
	// 	$(".line2").css({
	// 		width: '100px',
	// 		opacity: '0',
	// 		transform: 'translateX(100px)'
	// 	})
	// 	$(".line3").css({
	// 		transform: "translateY(-10px) rotate(-225deg)",
	// 		width: '32px'
	// 	})
	// })
	var num = 0;
	$(".MenuBtn").click(function() {
		num++;
		if (num % 2 == 1) {
			$(".line1").css("transform", "translateY(4px) rotate(225deg)")
			$(".line2").css({
				width: '100px',
				opacity: '0',
				transform: 'translateX(100px)'
			})
			$(".line3").css({
				transform: "translateY(-10px) rotate(-225deg)",
				width: '32px'
			})
			$('.border').css('transform', 'translateX(180px)')
			$('.MenuBtn span').css('background', '#fff')
		} else {
			$(".line1").css("transform", "translateY(0px) rotate(0)")
			$(".line2").css({
				width: '12px',
				opacity: '1',
				transform: 'translateX(0)'
			})
			$(".line3").css({
				transform: "translateY(0px) rotate(0)",
				width: '22px'
			})
			$('.border').css('transform', 'translateX(0)')
		}
		$(window).scroll(function() {
			if ($(window).scrollTop() >= 200) {
				$('.MenuBtn span').css('background', '#333')
			}
		})
	})
	if ($('.border').css('transform', 'translateX(180px)')) {
		$(".line1").css("transform", "translateY(4px) rotate(225deg)")
		$(".line2").css({
			width: '100px',
			opacity: '0',
			transform: 'translateX(100px)'
		})
		$(".line3").css({
			transform: "translateY(-10px) rotate(-225deg)",
			width: '32px'
		})
	} else {
		$(".line1").css("transform", "translateY(0px) rotate(0)")
		$(".line2").css({
			width: '12px',
			opacity: '1',
			transform: 'translateX(0)'
		})
		$(".line3").css({
			transform: "translateY(0px) rotate(0)",
			width: '22px'
		})
	}
})
$(function() {
	var hei = $(window).height()
	$(window).scroll(function() {
		if ($(window).scrollTop() >= 200) {
			$('.MenuBtn span').css('background', '#333')
		} else {
			$('.MenuBtn span').css('background', '#fff')
		}
	})
})
$(function() {
	$(window).scroll(function() {
		var guntop = $(window).scrollTop()
		if (guntop > 919) {
			$('.ig_b').addClass('none')
			$('.ig_h').addClass('block').removeClass('none')
		} else {
			$('.ig_b').addClass('block').removeClass('none')
			$('.ig_h').addClass('none')
		}
		if (guntop > 100) {
			$('.border').css('transform', 'translateX(180px)')
		} else {
			$('.border').css('transform', 'translateX(0px)')
		}
	})
	$('.data_end_end span').remove(function() {
		$('.er').css('display', 'none')
		$('.er1').css('display', 'block')
	})
	// var tuhei = $('.swiper-slide img').width();
	// console.log(tuhei);
	// $('.swiper-slide img').css('height',tuhei*1.066024759284732)
	// $('swiper-slide').css('height',tuhei*1.066024759284732)

})
$(function() {
	var zbox = {};
	zbox.mt = document.getElementById("mtk");
	zbox.btn = document.getElementById("btn");
	zbox.closeBtn = document.getElementById("closeBtn");
	zbox.show = function() {
		console.log(this.mt);
		this.mt.style.display = "block";
	}
	zbox.close = function() {
		this.mt.style.display = "none";
	}
	zbox.outsideClick = function() {
		var mt = this.mt;
		window.onclick = function(event) {
			if (event.target == mt) {
				mt.style.display = "none";
			}
		}
	}
	zbox.init = function() {
		var that = this;
		this.btn.onclick = function() {
			that.show();
		}
		this.closeBtn.onclick = function() {
			that.close();
		}
		this.outsideClick();
	}
	zbox.init();

})();
