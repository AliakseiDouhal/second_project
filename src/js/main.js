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

window.onscroll = function() {
    var header = document.getElementById('header');
    if (window.pageYOffset > 90) {
        header.style.cssText="background-color: white;";
    }
    else {
        header.style.cssText="background-color: rgba(255,255,255,.21);";
    }
};