// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = window.jQuery = require('jquery');
require('owl.carousel');


$(function() {
    var owlProject =  $('.js-project-carousel');
    owlProject.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        dots: false
    });

    $('.js-project-carousel-next').on('click', function() {
        owlProject.trigger('next.owl.carousel');
    });
    $('.js-project-carousel-prev').on('click', function() {
        owlProject.trigger('prev.owl.carousel');
    });
    owlProject.on('changed.owl.carousel', function(event) {
        console.log(event.item.index);
        $('.js-project-carousel-number').text(event.item.index - 1);
    })
    console.log('Welcome to Yeogurt!');
});

$(function() {
    var owlCustomer =  $('.js-configuration-carousel');
    owlCustomer.owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30
    });

    $('.js-configuration-carousel-next').on('click', function() {
        owlCustomer.trigger('next.owl.carousel');
    });
    $('.js-configuration-carousel-prew').on('click', function() {
        owlCustomer.trigger('prev.owl.carousel');
    });
    owlCustomer.on('changed.owl.carousel', function(event) {
        console.log(event.item.index);
        $('.js-configuration-carousel-number').text(event.item.index - 2);
    })
    console.log('Welcome to Yeogurt!');
});

$(function() {
    var owlCustomer =  $('.js-customer-reviews-carousel');
    owlCustomer.owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30
    });

    $('.js-customer-reviews-carousel-next').on('click', function() {
        owlCustomer.trigger('next.owl.carousel');
    });
    $('.js-customer-reviews-carousel-prew').on('click', function() {
        owlCustomer.trigger('prev.owl.carousel');
    })
    console.log('Welcome to Yeogurt!');
});

$(function() {
    $('ul.ui-faq li > a').click(function(){
        if(!$(this).hasClass('active')){
            $('ul.ui-faq li > a').removeClass('active').next('div').slideUp();
            $(this).addClass('active');
            $(this).next('div').slideDown(200);
      } else {
          $(this).removeClass('active').next('div').slideUp();	
        }
    });
    console.log('Welcome to Yeogurt!');
});
