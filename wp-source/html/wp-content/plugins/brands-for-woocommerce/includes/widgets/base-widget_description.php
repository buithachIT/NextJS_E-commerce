<?php
class BeRocket_Base_Brand_Description_Widget extends BeRocket_Base_Product_List_Widget {
	public function __construct( $widget_name, $widget_title, $args ) {
        parent::__construct( $widget_name, $widget_title, $args );

        $this->defaults += array(
            'display_title'            => '',
            'display_categories'       => '',
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
        );

        $title = array( 'title' => $this->form_fields['title'] );
        $related = $this->form_fields;
        unset( $related['title'] );
        foreach ( $related as $key => $value ) {
            $related[$key]['class'] .= ' related_products_display_depending';
        }

        $this->form_fields = $title + array(
            'display_title' => array(
                "title" => __( 'Display brand title', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block br_brands_first_checkbox',
            ),
            'display_description' => array(
                "title" => __( 'Display description', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
            'display_categories' => array(
                "title" => __( 'Display categories', 'brands-for-woocommerce' ),
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
        );
    }

    public function widget( $args, $instance ) {
        $instance = $this->get_size( 'thumbnail_width', $instance );
        $instance = $this->get_size( 'thumbnail_height', $instance );
        $instance = $this->get_size( 'banner_width', $instance );
        $instance = $this->get_size( 'banner_height', $instance );

        if ( is_tax( BeRocket_product_brand::$taxonomy_name ) || empty( $instance['terms'] ) ) {
            return;
        }
        
        $instance['display_title'] = apply_filters( 'widget_title', empty($instance['display_title']) ? '' : sanitize_text_field($instance['display_title']), $instance );
        $instance = wp_parse_args( (array) $instance, $this->defaults );

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
        set_query_var( 'brand_terms', $instance['terms'] );
        $args['template'] = 'description';
        parent::widget( $args, $instance );
	}
}

