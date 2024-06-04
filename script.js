document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu and navbar
    let menu = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.navbar');
    menu.addEventListener('click', function() {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Close login form
    document.querySelector('#close-login-form').addEventListener('click', function() {
        document.querySelector('.login-form-container').classList.remove('active');
    });

    // Add active class to header on scroll
    window.addEventListener('scroll', function() {
        let header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    });

    // Add active class to header on page load
    window.addEventListener('load', function() {
        let header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });

    // Add parallax effect to home section
    document.querySelector('.home').addEventListener('mousemove', function(e) {
        document.querySelectorAll('.home-parallax').forEach(elm => {
            let speed = elm.getAttribute('data-speed');
            let x = (window.innerWidth - e.pageX * speed) / 90;
            let y = (window.innerHeight - e.pageY * speed) / 90;
            elm.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Reset parallax effect on home section when mouse leaves
    document.querySelector('.home').addEventListener('mouseleave', function() {
        document.querySelectorAll('.home-parallax').forEach(elm => {
            elm.style.transform = 'translateX(0px) translateY(0px)';
        });
    });

    // Initialize Swiper for laptops slider
    var laptopSwiper = new Swiper(".laptops-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
        },
    });

    // Initialize Swiper for review slider
    var reviewSwiper = new Swiper(".review-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
        },
    });
});
