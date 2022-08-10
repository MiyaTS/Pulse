/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.svg"></img> </button>',
        nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.svg"></img> </button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  autoplay: true,
                  arrows: false
                }
            }
        ]
    });
  }); */

    //slider

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
        navPosition: 'bottom',
        autoHeight: true
    });

    document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
    }); 

    $(document).ready(function(){

        //tabs

        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
            $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

        function toggleSlide(item){
            $(item).each(function(i){
                $(this).on('click', function(e){
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                })
            })
        };

        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back');

        //modal

        $('[data-modal=consultation]').on('click', function(){
            $('.overlay, #consultation').fadeIn('slow');
        });
        $('.modal__close').on('click', function(){
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        });

        $('.button_mini').each(function(i){
            $(this).on('click', function(){
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('slow');
            })
        });

        //validation

        function validateForms(form){
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 3
                    },
                    phone : "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: "Пожайлуста, введите свое имя",
                    phone: "Пожайлуста, введите свой номер телефона",
                    email: {
                      required: "Пожайлуста, введите свой email",
                      email: "Ваш email должен быть в формате name@domain.com"
                    }
                  }
            });
        }

        validateForms('#consultation form');
        validateForms('#consultation-form');
        validateForms('#order form');

        //masked input

        $('input[name=phone]').mask("+(380) 999-999-999");

        //sending data from form to the server (ajax technology)

        $('form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
                $('form').trigger('reset');
            });
            return false;
        });

        // pageup

        $(window).scroll(function() {
            if ($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            }else{
                $('.pageup').fadeOut();
            }
        });

        // smooth scroll

        $("a[href^='#']").click(function(){
            const _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });

        //wow.js

        new WOW().init();
    
    }); 