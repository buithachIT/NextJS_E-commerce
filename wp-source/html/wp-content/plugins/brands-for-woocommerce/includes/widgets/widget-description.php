<?php
class BeRocket_product_brand_description_Widget extends BeRocket_Base_Product_List_Widget {
	public function __construct() {
        parent::__construct( 
            "berocket_product_brand_description_widget", 
            __( "WooCommerce Product Brands Description", 'brands-for-woocommerce' ),
            array( "description" => "" ) 
        );

        $this->defaults += array(
            'brand_id'                 => '',
            'display_title'            => '',
            'display_description'      => '',
            'banner_display'           => '',
            'banner_width'             => 100,
            'banner_width_units'       => '%',
            'banner_height'            => '',
            'banner_height_units'      => 'px',
            'banner_fit'               => 'cover',
            'banner_align'             => 'center',
            'thumbnail_display'        => '',
            'thumbnail_width'          => 100,
            'thumbnail_width_units'    => '%',
            'thumbnail_height'         => '',
            'thumbnail_height_units'   => 'px',
            'thumbnail_fit'            => 'cover',
            'thumbnail_align'          => 'none',
            'related_products_display' => '',
            'display_link'             => '',
            'featured'                 => '',
        );

        // $related_keys = array_diff( array_keys( $this->form_fields ), array( 'title' ) );
        $title = array( 'title' => $this->form_fields['title'] );
        $related = $this->form_fields;
        unset( $related['title'] );
        foreach ( $related as $key => $value ) {
            $related[$key]['class'] .= ' related_products_display_depending';
        }

        $this->form_fields = $title + array(
            'brand_id' => array(
                "title"  => __( 'Brand', 'brands-for-woocommerce' ),
                'type'   => 'autocomplete',
                'class'  => 'width100',
                // 'walker' => 'Br_Walker_Brand_Selectlist',
            ),
            'display_title' => array(
                "title" => __( 'Display brand title', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
            'display_description' => array(
                "title" => __( 'Display brand description', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
            'thumbnail' => array(
                "title" => __( 'Thumbnail:', 'brands-for-woocommerce' ),
                'type'  => 'image',
                'class' => 'width100',
                'align_options' => array(
                    "left"  => array( 'name' => __( 'Left to text', 'brands-for-woocommerce' ) ),
                    "right" => array( 'name' => __( 'Right to text', 'brands-for-woocommerce' ) ),
                    "none"  => array( 'name' => __( 'None', 'brands-for-woocommerce' ) ),
                )
            ),
            'banner' => array(
                "title" => __( 'Banner:', 'brands-for-woocommerce' ),
                'type'  => 'image',
                'class' => 'width100',
                'align_options' => array(
                    "left"   => array( 'name' => __( 'Left', 'brands-for-woocommerce' ) ),
                    "right"  => array( 'name' => __( 'Right', 'brands-for-woocommerce' ) ),
                    "center" => array( 'name' => __( 'Center', 'brands-for-woocommerce' ) ),
                )
            ),
            'related_products' => array(
                "title" => __( 'Related products', 'brands-for-woocommerce' ),
                'type'  => 'fieldset',
                'items' => array(
                    'related_products_display' => array(
                        "title" => __( 'Display', 'brands-for-woocommerce' ),
                        'type'  => 'checkbox',
                        'class' => 'width100 br_brand_show_more_options',
                        'id' => "related_products_display_depending",
                    )
                ) + $related,
            ),
            'display_link' => array(
                "title" => __( 'Display external link', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
            'featured' => array(
                "title" => __( 'Display last created featured brand', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
        );

        $this->shortcode_args = array(
            'display_thumbnail' => 'thumbnail_display',
            'width'             => 'thumbnail_width',
            'align'             => 'thumbnail_align',
        );
    }

    public function update( $new_instance, $old_instance ) {
        $instance = parent::update( $new_instance, $old_instance );
        return $instance;
    }

    public function widget( $args, $instance ) {
        $instance = $this->replace_shortcode_keys( $instance );
        $instance = $this->get_size( 'thumbnail_width', $instance );
        $instance = $this->get_size( 'thumbnail_height', $instance );
        $instance = $this->get_size( 'banner_width', $instance );
        $instance = $this->get_size( 'banner_height', $instance );

        $instance['display_title'] = apply_filters( 'widget_title', empty($instance['display_title']) ? '' : sanitize_text_field($instance['display_title']), $instance );
        $instance = wp_parse_args( (array) $instance, $this->defaults );

        if ( !empty( $instance['featured'] ) ) {
            $terms = get_terms(
                array(
                    'hide_empty' => false, // also retrieve terms which are not used yet
                    'meta_query' => array(
                        array(
                           'key'   => 'br_brand_featured',
                           'value' => 1,
                        )
                    ),
                    'number'   => 1,
                    'orderby'  => 'id',
                    'order'    => 'DESC',
                    'taxonomy' => BeRocket_product_brand::$taxonomy_name,
                )
            );
            if ( empty( $terms ) ) return;
            $term = $terms[0];
        } else {
            $term = empty( $instance['brand_id'] ) ? (
                    empty( $instance['id'] ) ?
                    get_term_by( 'slug', get_query_var( 'term' ), BeRocket_product_brand::$taxonomy_name ) :
                    get_term_by( 'id', intval($instance['id']), BeRocket_product_brand::$taxonomy_name )
                ) : get_term_by( 'name', sanitize_text_field($instance['brand_id']), BeRocket_product_brand::$taxonomy_name );
        }

        if( empty($term) ) {
            return;
        }
        $image 	= get_term_meta( $term->term_id, 'brand_image_url', true );

        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        $options = $BeRocket_product_brand->get_option();
        $instance['link_text'] = empty( $options['link_text'] ) ? '' : sanitize_text_field($options['link_text']);
        $instance['link_open_in_new_tab'] = empty( $options['link_open_in_new_tab'] ) ? '' : $options['link_open_in_new_tab'];

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

        set_query_var( 'options', $instance );
        set_query_var( 'brand_term', $term );
        set_query_var( 'tooltip', BeRocket_product_brand::get_tooltip( $term->term_id ) );
        $args['template'] = 'description';
        parent::widget( $args, $instance );
	}

    protected function replace_shortcode_keys( $instance ) {
        $instance = parent::replace_shortcode_keys( $instance );
        $instance = $this->get_size( 'thumbnailw', $instance );
        return $instance;
    }

}

