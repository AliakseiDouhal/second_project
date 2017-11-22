$(".nav-link").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
});

var slider = new Swiper('.swiper-container', {
    slidesPerView: 3,
    breakpoints: {
        600:{
            slidesPerView: 3
        }
    }
});