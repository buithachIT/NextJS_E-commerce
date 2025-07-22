(function ($){
    $(document).on('click', '.berocket_brand_name_letters .button', function(event) {
        event.preventDefault();
        let self = $(this);
        let id_to_show = self.data('href');
        let brands_list = self.closest('.berocket_brand_list');
        let all_brands = brands_list.find('.br_brand_letter_block');

        if( id_to_show == '#all' ) {
            all_brands.show();
        } else {
            all_brands.hide();
            brands_list.find(id_to_show).show();
        }
    }); 
    $('.berocket_brand_name_letters .button:first-of-type').trigger('click');
})(jQuery);
