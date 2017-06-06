// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = window.jQuery = require('jquery');
require('owl.carousel');
require('magnific-popup');

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
    var owlCustomer = $('.js-examples-carousel');
    owlCustomer.owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 3
            }
        }
    });

    $('.js-examples-carousel-next').on('click', function() {
        owlCustomer.trigger('next.owl.carousel');
    });
    $('.js-examples-carousel-prew').on('click', function() {
        owlCustomer.trigger('prev.owl.carousel');
    });
    owlCustomer.on('changed.owl.carousel', function(event) {
        $('.js-examples-carousel-number').text(event.item.index - 2);
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
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
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
    $(document).on('ready', function() {
        var canvas = $('.js-canvas-bg')[0];
        if(!$('.js-canvas-bg')[0]) {
            return;
        }
        var parent = $('.js-canvas-bg').parent()[0];
        var ctx = canvas.getContext('2d');
        var cw = canvas.width = parent.offsetWidth;
        var ch = canvas.height = parent.offsetHeight;

        ctx.fillStyle = '#000';
        var linesNum = 16;
        var linesRy = [];
        var requestId = null;

        function randomIntFromInterval(mn, mx) {
            return ~~(Math.random() * (mx - mn + 1) + mn);
        }

        function Line(flag) {
            this.flag = flag;
            this.a = {};
            this.b = {};
            if (flag == 'v') {
                this.a.y = 0;
                this.b.y = ch;
                this.a.x = randomIntFromInterval(0, ch);
                this.b.x = randomIntFromInterval(0, ch);
            }
            else if (flag == 'h') {
                this.a.x = 0;
                this.b.x = cw;
                this.a.y = randomIntFromInterval(0, cw);
                this.b.y = randomIntFromInterval(0, cw);
            }
            this.va = randomIntFromInterval(25, 100) / 100;
            this.vb = randomIntFromInterval(25, 100) / 100;

            this.draw = function() {
                ctx.strokeStyle = '#ccc';
                ctx.beginPath();
                ctx.moveTo(this.a.x, this.a.y);
                ctx.lineTo(this.b.x, this.b.y);
                ctx.stroke();
            };

            this.update = function() {
                if (this.flag == 'v') {
                    this.a.x += this.va;
                    this.b.x += this.vb;
                }
                else if (flag == 'h') {
                    this.a.y += this.va;
                    this.b.y += this.vb;
                }

                this.edges();
            };

            this.edges = function() {
                if (this.flag == 'v') {
                    if (this.a.x < 0 || this.a.x > cw) {
                        this.va *= -1;
                    }
                    if (this.b.x < 0 || this.b.x > cw) {
                        this.vb *= -1;
                    }
                }
                else if (this.flag == 'h') {
                    if (this.a.y < 0 || this.a.y > ch) {
                        this.va *= -1;
                    }
                    if (this.b.y < 0 || this.b.y > ch) {
                        this.vb *= -1;
                    }
                }
            };

        }

        for (var i = 0; i < linesNum; i++) {
            var flag = i % 2 == 0 ? 'h' : 'v';
            var l = new Line(flag);
            linesRy.push(l);
        }


        function markPoint(p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        function Intersect2lines(l1, l2) {
            var p1 = l1.a,
                p2 = l1.b,
                p3 = l2.a,
                p4 = l2.b;
            var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
            var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
            var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
            var x = p1.x + ua * (p2.x - p1.x);
            var y = p1.y + ua * (p2.y - p1.y);
            if (ua > 0 && ub > 0) {
                markPoint({
                    x: x,
                    y: y
                });
            }
        }

        function Draw() {
            requestId = window.requestAnimationFrame(Draw);
            ctx.clearRect(0, 0, cw, ch);

            for (var i = 0; i < linesRy.length; i++) {
                var l = linesRy[i];
                l.draw();
                l.update();
            }
            for (var i = 0; i < linesRy.length; i++) {
                var l = linesRy[i];
                for (var j = i + 1; j < linesRy.length; j++) {
                    var l1 = linesRy[j];
                    Intersect2lines(l, l1);
                }
            }
        }

        function Init() {
            linesRy.length = 0;
            for (var i = 0; i < linesNum; i++) {
                var flag = i % 2 == 0 ? 'h' : 'v';
                var l = new Line(flag);
                linesRy.push(l);
            }

            if (requestId) {
                window.cancelAnimationFrame(requestId);
                requestId = null;
            }

            cw = canvas.width = parent.offsetWidth;
            ch = canvas.height = parent.offsetHeight;

            Draw();
        };

        setTimeout(function() {
            Init();

            addEventListener('resize', Init, false);
        }, 15);
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
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 3
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
    $('.js-seo-text-toggle').on('click', function() {
        $('.ui-catalog-seo__text').toggleClass('ui-catalog-seo__text--opened');
    });
});

$(function() {
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

$(function() {
    $('.js-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        }
    });

    $('.js-zoom').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });
});