$(document).ready(function(){
	// Phone mask
	$("input[name='phone']").mask("+7 999 999 99 99");

	// Form validation
	function validateEmail(email) {
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(String(email).toLowerCase());
	}

	function mail(event, php) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var req = new XMLHttpRequest();
		req.open('POST', php, true);

		req.onerror = function () {
			console.log("Ошибка отправки запроса");
		};

		req.send(new FormData(event.target));
	}

	function checkValid(errs) {
		var isValid = true;

		errs.each(function () {
			if ($(this).is(':visible')) {
				isValid = false;
			}
		});

		return isValid;
	}

	$('.js-form-validate button').on('click', function (e) {
		var that = $(this),
			fields = $(this).parent().find('input').add($(this).parent().find('textarea')),
			form = $(this).parent('form'),
			isValid = checkValid(form.find('.field-error'));

		fields.each(function () {
			var err = $(this).siblings('.field-error');

			if ($(this).prop('required') === true) {
				if ($(this).val().length === 0) {
					err.show().text('Please enter a value.');
					isValid = false;
				} else {
					err.hide().text('');
				}
			}

			if ($(this).attr('type') === "email") {
				if (validateEmail($(this).val()) === false) {
					err.show().text('Please enter a valid email address.');
					isValid = false;
				}
			}
		});

		if (isValid) {
			form.submit(function () {
				mail(event, 'php/mail.php');

				$.fancybox.open({
					src: '#popup-thanks',
					type: 'inline',
					touch: false,
					scrolling: 'no'
				});
			});

			setTimeout(function () {
				form.off('submit');
			}, 100);
		} else {
			e.preventDefault();
		}
	});

	$('.js-form-validate .field').on('focusout keyup change', function () {
		var input = $(this).find('input'),
			err = input.parent().next(),
			val = input.val();

		if (input.attr('type') === "email") {
			if (validateEmail(val) || val.length === 0) {
				err.hide().text('');
			} else {
				err.show().text('Please enter a valid email address.');
			}
		}
	});

	// Header menu
	$('.header__burger').click(function () {
		$('.menu').addClass('open');
		$('body').addClass('body-scroll-lock');
	});

	$('.menu__close').click(function () {
		$('.menu').removeClass('open');
		$('body').removeClass('body-scroll-lock');
	});

	// Anchors
	anchorScroll($('.anchor'));

	function anchorScroll(e) {
		e.click(function () {
			link = $(this).attr('href');
			to = $(link).offset().top;
			$('body, html').animate({
				scrollTop: to
			}, 800);
		});
	}

	// Adaptive table
	$.each($('table tbody tr'), function () {
		var title = $(this).parent('tbody').siblings('thead').find('th');
		$.each($(this).find('td'), function (index) {
			$(this).attr('aria-label', title.eq(index).text());
		});
	});
});
