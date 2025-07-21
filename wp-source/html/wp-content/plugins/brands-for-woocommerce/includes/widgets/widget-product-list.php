<?php
class BeRocket_product_list_Widget extends BeRocket_Base_Product_List_Widget {
	public function __construct() {
        parent::__construct( 
            "berocket_product_list_widget", 
            __( "WooCommerce Brands Product List", 'brands-for-woocommerce' ),
            array( "description" => __( 'Product list for given brands (by ids or slugs)', 'brands-for-woocommerce' ) ) 
        );
        // $this->template = 'list';

        $this->defaults += array(
            'brands'          => '',
            'brand_field'     => 'name',
            'hide_pagination' => false,
            'hide_labels'     => false,
        );

        $this->form_fields += array(
            'hide_pagination' => array(
                'title' => __( 'Hide pagination', 'brands-for-woocommerce' ),
                'type' => 'checkbox',
                'class' => 'br_brands_checkbox_block'
            ),
            'hide_labels' => array(
                'title' => __( 'Hide <a href="https://berocket.com/product/woocommerce-advanced-product-labels?utm_source=free_plugin&utm_medium=brands" target="_blank" style="color: #7f54b3;" title="BeRocket labels">BeRocket labels</a>', 'brands-for-woocommerce' ),
                'type' => 'checkbox',
                'class' => 'br_brands_checkbox_block'
            ),
            'brands' => array(
                "title"  => __( 'Brand', 'brands-for-woocommerce' ),
                'type'   => 'autocomplete',
                'class'  => 'width100',
            ),
        );
    }

    public function update( $new_instance, $old_instance ) {
        $new_instance['brands'] = empty( $new_instance['brands'] ) ? '' : sanitize_text_field( $new_instance['brands'] );
        parent::update( $new_instance, $old_instance );
        return $new_instance;
    }

    public function widget( $args, $instance ) {
        if ( empty( $instance['brands'] ) ) return;
        $instance = array_merge( $this->defaults, $instance );

        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        //$products = $BeRocket_product_brand->get_from_cache( $instance['cache_key'] );
        $products = [];
        if ( is_string( $products ) ) {
            $products = json_decode( $products );
        }

        if ( empty( $instance['per_page'] ) ) {
            $instance['per_page'] = -1;
        } else {
            $instance['per_page'] = intval($instance['per_page']);
        }

        if ( empty( $instance['slider'] ) ) {
            $instance['paged'] = isset( $_GET[ $instance['cache_key'] ] ) ? (int) $_GET[ $instance['cache_key'] ] : 1; 
        } else {
            $instance['paged'] = false;
            $instance['per_page'] = -1;
        }

        if ( empty( $products ) && empty( $products->products ) ) {
            $brands        = $instance['brands'];
            $ordering_args = WC()->query->get_catalog_ordering_args( $instance['orderby'], $instance['order'] );
            $meta_query    = WC()->query->get_meta_query();
            $field         = empty( $instance['brand_field'] ) ? $this->defaults['brand_field'] : $instance['brand_field'];

            if( ! in_array($instance['orderby'], array('title', 'name', 'date', 'modified', 'rand')) ) {
                $instance['orderby'] = 'title';
            }
            if( ! in_array($instance['order'], array('asc', 'desc')) ) {
                $instance['order'] = 'asc';
            }

            $products = wc_get_products(array(
                'meta_key'   => '_price',
                'status'     => 'publish',
                'limit'      => $instance['per_page'],
                'page'       => intval($instance['paged']),
                'paginate'   => true,
                'return'     => 'ids',
                'orderby'    => $instance['orderby'],
                'order'      => $instance['order'],
                'meta_query' => $meta_query,
                'tax_query'  => array(
                    'relation' => 'AND',
                    array(
                        'taxonomy' => BeRocket_product_brand::$taxonomy_name,
                        'terms'    => $brands,
                        'field'    => $field,
                        'operator' => 'IN',
                    ),
                    array(
                        'taxonomy'  => 'product_visibility',
                        'terms'     => array( 'exclude-from-catalog' ),
                        'field'     => 'name',
                        'operator'  => 'NOT IN',
                    ),
                ),
            ));
            $BeRocket_product_brand->set_to_cache( $instance['cache_key'], json_encode($products) );
        }
        ob_start();
        echo $args['before_widget'];
        if ( !empty( $instance['title'] ) ) echo $args['before_title'], $instance['title'], $args['after_title'];
        brfr_product_loop( $products, $instance );
        echo $args['after_widget'];
        $return = ob_get_clean();

        WC()->query->remove_ordering_args();

        echo $return;
	}
}
