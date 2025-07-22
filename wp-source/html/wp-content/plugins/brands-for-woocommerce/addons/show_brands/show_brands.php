<?php
class BeRocket_brands_show_brands_addon extends BeRocket_framework_addon_lib {
    public $addon_file = __FILE__;
    public $plugin_name = 'product_brand';
    public $php_file_name   = 'show_brands_include';
    function get_addon_data() {
        $data = parent::get_addon_data();
        return array_merge($data, array(
            "addon_name"    => __( 'Show Brands', 'brands-for-woocommerce' ),
            "tooltip"       => __( 'Display brands text and image on shop page and product page', 'brands-for-woocommerce' ),
        ));
    }
}
new BeRocket_brands_show_brands_addon();
