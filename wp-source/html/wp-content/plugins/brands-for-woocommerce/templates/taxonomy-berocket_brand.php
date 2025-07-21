<?php
if( function_exists('wc_get_template') ) {
    wc_get_template( 'archive-product.php' );
} else {
    woocommerce_get_template( 'archive-product.php' );
}
