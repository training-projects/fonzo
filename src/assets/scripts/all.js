$(document).ready(function(){
	$('.menu-icon').on('click', function(){
		$('.header-menu').toggle(function(){
			$('.header-menu').toggleClass('header-menu-mobile');
		});
	});
});