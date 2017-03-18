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
