var brBrandSliderInit;
(function ($){ 
    brBrandSliderInit = function () {
        let slidesToScroll = parseInt( bdBrandSlider.slider_slides_scroll );
        if ( typeof slidesToScroll === 'undefined' || slidesToScroll.length == 0 ) slidesToScroll = 1;

        function brBrandInitSliderElement($this, $data) {
            let slidesToShow = parseInt( $data['slides_to_show'] );
            if( slidesToShow < 1 ) {
                slidesToShow = 1;
            }
            let thisSlidesToScroll = slidesToScroll;
            if( thisSlidesToScroll > slidesToShow ) {
                thisSlidesToScroll = slidesToShow;
            }
            $this.slick({
                prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
                autoplay: bdBrandSlider.slider_autoplay.length ? true : false,
                autoplaySpeed: bdBrandSlider.slider_autoplay_speed,
                speed: bdBrandSlider.slider_change_speed,
                infinite: bdBrandSlider.slider_infinite.length ? true : false,
                slidesToShow: slidesToShow,
                slidesToScroll: thisSlidesToScroll,
                arrows: bdBrandSlider.slider_arrows.length ? true : false,
                pauseOnFocus: bdBrandSlider.slider_stop_focus.length ? true : false,
                pauseOnHover: bdBrandSlider.slider_stop_focus.length ? true : false,
                fade: bdBrandSlider.slider_mode == 'slide' ? false : true,
                cssEase: bdBrandSlider.slider_ease,
                dots: bdBrandSlider.slider_dots.length ? true : false,
            });
        }

        $('.br_slick_slider:not(".slick-slider")').each( function() {
            brBrandInitSliderElement($(this), $(this).data());
        });

        $('.br_product_list_slider .products:not(".slick-slider")').each( function() {
            brBrandInitSliderElement($(this), $(this).parents('.br_product_list_slider').first().data());
        });
    }
    $(document).ready( brBrandSliderInit );
    $( document ).on( "ajaxComplete", brBrandSliderInit );
    document.addEventListener("br_update_et_pb_brands_products_list", brBrandSliderInit);
})(jQuery);
