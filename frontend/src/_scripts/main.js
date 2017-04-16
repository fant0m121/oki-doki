// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = window.jQuery = require('jquery');
require('owl.carousel');


$(function() {
    var owlProject = $('.js-project-carousel');
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
        $('.js-project-carousel-number').text(event.item.index - 1);
    });
});

$(function() {
    var owlProject = $('.js-works-carousel');
    owlProject.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        dots: false
    });

    $('.js-works-carousel-next').on('click', function() {
        owlProject.trigger('next.owl.carousel');
    });
    $('.js-works-carousel-prev').on('click', function() {
        owlProject.trigger('prev.owl.carousel');
    });
});

$(function() {
    var owlCustomer = $('.js-configuration-carousel');
    owlCustomer.owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30,
        responsive : {
            0: {
                items: 1
            },
            1200: {
                items: 3
            }
        }
    });

    $('.js-configuration-carousel-next').on('click', function() {
        owlCustomer.trigger('next.owl.carousel');
    });
    $('.js-configuration-carousel-prew').on('click', function() {
        owlCustomer.trigger('prev.owl.carousel');
    });
    owlCustomer.on('changed.owl.carousel', function(event) {
        $('.js-configuration-carousel-number').text(event.item.index - 2);
    });
});

$(function() {
    var owlReviews = $('.js-customer-reviews-carousel');
    owlReviews.owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30,
        responsive : {
            0: {
                items: 2
            },
            1200: {
                items: 4
            }
        }
    });

    $('.js-customer-reviews-carousel-next').on('click', function() {
        owlReviews.trigger('next.owl.carousel');
    });
    $('.js-customer-reviews-carousel-prew').on('click', function() {
        owlReviews.trigger('prev.owl.carousel');
    });
});

$(function() {
    $('.ui-px-overlay').css({height: document.body.clientHeight});
    $('.js-faq-item').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('.js-faq-item').removeClass('active').next('div').slideUp();
            $('.js-faq-item').find('span').text('+');
            $(this).addClass('active').find('span').text('-');
            $(this).next('div').slideDown(200);
        }
        else {
            $(this).removeClass('active').next('div').slideUp();
            $(this).find('span').text('+');
        }
    });
});
