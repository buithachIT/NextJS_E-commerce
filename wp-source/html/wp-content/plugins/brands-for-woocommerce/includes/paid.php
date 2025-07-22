<?php
class BeRocket_product_brand_paid extends BeRocket_plugin_variations {
    public $plugin_name = 'product_brand';
    public $version_number = 15;
    function __construct() {
        parent::__construct();
    }
}
new BeRocket_product_brand_paid();
