(function ($){
    function br_brands_regenerate_tooltip() {
        tippy('.br_brand_tippy', {
            content(reference) {
                const title = reference.getAttribute('data-tippy');
                return title;
            }
        });
    }

    $(document).ready( br_brands_regenerate_tooltip );
    $(document).on('berocket_ajax_products_loaded berocket_ajax_products_infinite_loaded', br_brands_regenerate_tooltip);

    $(document).on('click', '.br_brands_hierarchy_by_click .br_brand_children_arrow', function(e) {
        $(this).toggleClass('open').closest('.br_brand_has_children').find('.br_brands_children').first().slideToggle();
        e.stopPropagation();
    });
})(jQuery);
