$(document).ready(function(){
		// var countDownDate = new Date($('.counter-wrap').data('date')).getTime();
		// setInterval(function() {

		// 	// Get today's date and time
		// 	var now = new Date().getTime();

		// 	// Find the distance between now and the count down date
		// 	var distance = countDownDate - now;

		// 	// Time calculations for days, hours, minutes and seconds
		// 	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		// 	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		// 	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		// 	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// 	$('.counter-item.days .num').html(days);
		// 	$('.counter-item.hours .num').html(hours);
		// 	$('.counter-item.minutes .num').html(minutes);		
		// }, 1000);
    // $('[data-fancybox="gallery"]').fancybox();

	// $('.menu a').on('click', function (e) {
    //     e.preventDefault();
        
    //     var selector = $(this).attr('href'); /* #about - строка */
    //     var h = $(selector); /* jquery-элемент заголовка */
        
    //     $('html, body').animate({
    //         scrollTop: h.offset().top - 70
    //     }, 400);
        
        
    // });

	//TABS

	// $('.brain_btns>.br_btn').on('click', function(){
	// 	$('.brain_btns>.br_btn.active').removeClass('active');
	// 	$('.descr_content.active').removeClass('active');
	// 	var current_tab = $(this).attr('data-tab');
	// 	$(this).addClass('active');
	// 	$('.descr_content[data-tab='+current_tab+']').addClass('active');
	// })
	// var hamburger = $(".hamburger");
	// var body = $('body');
	// hamburger.on('click', function(){
	// 	hamburger.find('.hamburger').toggleClass("is-active");
	// 	body.toggleClass('menu-open');
	// 	$('.mob-menu').fadeToggle();
	// })

	// $('.slider').on('initialized.owl.carousel', function(event) {

	// });

	// $('.carousel').owlCarousel({
	// 	items: 4,
	// 	nav: true
	// });

	// $('.modal').on('click', function(){
	// 	var modal_type = $(this).data('modal');
	// 	$('.overlay').fadeIn();
	// 	$('div.modal.'+modal_type).fadeIn();
	// })
	// $('.overlay, .close, .mob-menu a').on('click', function(){
	// 	$('.overlay').fadeOut();
	// 	$('.mob-menu').fadeToggle();
	// 	body.toggleClass('menu-open');
	// })

	// $('form input').on('click', function(){
	// 	$(this).removeClass('error');
	// })

	// $('form button[type="submit"]').on('click', function(){
	// 	var inputs = $(this).parents('form').find('input[required]');
	// 	inputs.each(function(){
	// 		if($(this).is(':invalid')){
	// 			$(this).parent().addClass('invalid');
	// 		}
	// 	})
	// })

})