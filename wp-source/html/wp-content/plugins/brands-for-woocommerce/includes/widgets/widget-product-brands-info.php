<?php
class BeRocket_Product_Brands_Info_Widget extends BeRocket_Base_Brand_Description_Widget {
	public function __construct() {
        parent::__construct( 
            "berocket_product_brands_info_widget", 
            __( "WooCommerce Product Brand Info", 'brands-for-woocommerce' ),
            array( "description" => __( 'Brand info for single product', 'brands-for-woocommerce' ) ) 
        );

        $this->defaults += array(
            'product'  => false,
            'featured' => '',
            'limit'    => 1,
        );

        $this->form_fields = berocket_insert_to_array( $this->form_fields, 'title',
            array( 'product' => 
                array(
                    "title"  => __( 'Product', 'brands-for-woocommerce' ),
                    'type'   => 'autocomplete',
                    'class'  => 'width100',
                    'callback' => 'br_get_products',
                ),
                'featured' => array(
                    "title" => __( 'Featured only', 'brands-for-woocommerce' ),
                    'type'  => 'checkbox',
                    'class' => 'br_brands_checkbox_block',
                ),
                'limit' => array(
                    "title" => __( 'Show (leave empty for all)', 'brands-for-woocommerce' ),
                    'type'  => 'number',
                    'class' => 'width50',
                ), 
            )
        );
    }

    public function widget( $args, $instance ) {
        if( !empty( $instance ) && is_array( $instance ) ) {
            $instance = array_merge( $this->defaults, $instance );
        } else {
            $instance = $this->defaults;
        }

        if( empty( $instance['product'] ) ) {
            global $wp_query;
            if ( empty( $wp_query->queried_object->ID ) ) return;
            $instance['product'] = $wp_query->queried_object->ID;
        } 

        $products = explode(',', $instance['product']);
        $products_id = array();
        foreach($products as $product) {
            if ( is_numeric( $product ) ) {
                if( get_post_type(intval($product)) == 'product' ) {
                    $products_id[] = $product;
                }
            } else {
                $product_obj = get_page_by_title( sanitize_text_field($product), OBJECT, 'product' );
                if( ! empty($product_obj) ) {
                    $products_id[] = $product_obj->ID;
                }
            }
        }
        if ( empty( count($products_id) > 0 ) ) return;

        $meta_args = empty( $instance['featured'] ) ? array() : 
            array(
                array(
                   'key'   => 'br_brand_featured',
                   'value' => 1,
                )
            );

        $get_terms_args = array(
            'hide_empty' => false,
            'meta_query' => $meta_args,
            'orderby'  => 'id',
            'order'    => 'DESC',
        );
        if ( !empty( $instance['limit'] ) ) {
            $get_terms_args['number'] = intval($instance['limit']);
        }
        if( empty($get_terms_args['number']) ) {
            $get_terms_args['number'] = 100;
        }
        $get_terms_args['number'] = intval($get_terms_args['number']);

        $terms_filtered = array();
        foreach($products_id as $product_id) {
            $terms = wp_get_post_terms( $product_id, BeRocket_product_brand::$taxonomy_name, $get_terms_args );
            if( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
                foreach($terms as $term) {
                    $terms_filtered[$term->term_id] = $term;
                    if( count($terms_filtered) >= $get_terms_args['number'] ) {
                        break;
                    }
                }
                if( count($terms_filtered) >= $get_terms_args['number'] ) {
                    break;
                }
            }
        }

        if( empty( $terms_filtered ) || count($terms_filtered) == 0 ) {
            return;
        }
        
        $related_products_options = array(
            'columns',
            'orderby',
            'order',
            'slider',
            'hide_brands',
            'per_page',
            'cache_key',
        );
        foreach ( $related_products_options as $option ) {
            $instance["related_products_$option"] = sanitize_text_field($instance[$option]);
        }

        foreach ( $terms_filtered as $term ) {
            self::description( $term, $instance );
        }
	}

    public function description( $term, $instance ) {
        if ( ! $term ) {
            return;
        }

        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        $options = $BeRocket_product_brand->get_option();
        $options = array_merge($options, $instance);
        if ( empty( $options['link_text'] ) ) $options['link_text'] = $this->defaults['link_text'];
        $options['link_text'] = sanitize_text_field($options['link_text']);

        set_query_var( 'options', $options );
        set_query_var( 'brand_term', $term );
        set_query_var( 'brand_banner', get_term_meta( $term->term_id, 'brand_banner_url', true ) );
        set_query_var( 'brand_thumbnail', get_term_meta( $term->term_id, 'brand_image_url', true ) );
        set_query_var( 'brand_url', get_term_meta( $term->term_id, 'br_brand_url', true ) );
        set_query_var( 'tooltip', BeRocket_product_brand::get_tooltip( $term->term_id ) );

        $BeRocket_product_brand->br_get_template_part( 'description' );

        remove_action( 'woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10 );
        remove_action( 'woocommerce_archive_description', 'woocommerce_product_archive_description', 10 );
    }
}

