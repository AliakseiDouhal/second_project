$(".nav-link").click(function(e) {
    var activeLink = $(e.target.parentNode);
    e.preventDefault();
    $(".nav-item").removeClass("active");
    activeLink.addClass("active");
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
});

var slider = new Swiper('.swiper-container', {
    slidesPerView: 6,
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

$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 20,
    gutter: 5,
    horizontalOrder: true




});