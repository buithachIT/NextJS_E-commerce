<?php
function berocket_apl_vc_before_init() {
if( class_exists('WPBakeryShortCode') && function_exists('vc_map') ) {
    class WPBakeryShortCode_brands_by_name extends WPBakeryShortCode {
    }

    vc_map( array(
        'base' => 'brands_by_name',
        'name' => __( 'Brands by Name', 'brands-for-woocommerce' ),
        'class' => '',
        'category' => __( 'BeRocket', 'brands-for-woocommerce' ),
        'icon' => 'icon-heart',
        'params' => array(
            array(
                'type' => 'checkbox',
                'heading' => __( 'Image', 'brands-for-woocommerce' ),
                'param_name' => 'image',
                'value'     => array(__('Display image', 'brands-for-woocommerce') => '1'),
            ),
            array(
                'type' => 'checkbox',
                'heading' => __( 'Name', 'brands-for-woocommerce' ),
                'param_name' => 'text',
                'value'     => array(__('Hide name', 'brands-for-woocommerce') => '0'),
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Maximum image height', 'brands-for-woocommerce' ),
                'param_name' => 'imgh',
                'value'     => '64px',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Maximum image width', 'brands-for-woocommerce' ),
                'param_name' => 'imgw',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Columns', 'brands-for-woocommerce' ),
                'param_name' => 'column',
                'value'     => '2',
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Position', 'brands-for-woocommerce' ),
                'param_name' => 'position',
                'value'     => array(
                    __('Name after image', 'brands-for-woocommerce') => '1',
                    __('Name before image', 'brands-for-woocommerce') => '2',
                    __('Name under image', 'brands-for-woocommerce') => '3',
                ),
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Style', 'brands-for-woocommerce' ),
                'param_name' => 'style',
                'value'     => array(
                    __('Vertical', 'brands-for-woocommerce') => 'vertical',
                    __('Horizontal', 'brands-for-woocommerce') => 'horizontal',
                ),
            ),
        ),
    ) );

    class WPBakeryShortCode_brands_list extends WPBakeryShortCode {
    }

    vc_map( array(
        'base' => 'brands_list',
        'name' => __( 'Brands List', 'brands-for-woocommerce' ),
        'class' => '',
        'category' => __( 'BeRocket', 'brands-for-woocommerce' ),
        'icon' => 'icon-heart',
        'params' => array(
            array(
                'type' => 'textfield',
                'heading' => __( 'Title', 'brands-for-woocommerce' ),
                'param_name' => 'title',
                'value'     => '',
            ),
            array(
                'type' => 'checkbox',
                'heading' => __( 'Image', 'brands-for-woocommerce' ),
                'param_name' => 'use_image',
                'value'     => array(__('Hide image', 'brands-for-woocommerce') => '0'),
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Image height', 'brands-for-woocommerce' ),
                'param_name' => 'imgh',
                'value'     => '64',
            ),
            array(
                'type' => 'checkbox',
                'heading' => __( 'Name', 'brands-for-woocommerce' ),
                'param_name' => 'use_name',
                'value'     => array(__('Display name', 'brands-for-woocommerce') => '1'),
            ),
            array(
                'type' => 'checkbox',
                'heading' => __( 'Show empty', 'brands-for-woocommerce' ),
                'param_name' => 'hide_empty',
                'value'     => array(__('Show brands without products', 'brands-for-woocommerce') => '0'),
            ),
            array(
                'type' => 'checkbox',
                'heading' => __( 'Slider', 'brands-for-woocommerce' ),
                'param_name' => 'slider',
                'value'     => array(__('Display as slider', 'brands-for-woocommerce') => '1'),
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Brands per row', 'brands-for-woocommerce' ),
                'param_name' => 'per_row',
                'value'     => '3',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Number of brands', 'brands-for-woocommerce' ),
                'param_name' => 'count',
                'value'     => '',
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Order By', 'brands-for-woocommerce' ),
                'param_name' => 'orderby',
                'value'     => array(
                    __('Brand name', 'brands-for-woocommerce') => 'name',
                    __('Count of products', 'brands-for-woocommerce') => 'count',
                ),
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Padding around brands', 'brands-for-woocommerce' ),
                'param_name' => 'padding',
                'value'     => '3px',
            ),
            array(
                'type' => 'colorpicker',
                'heading' => __( 'Border color', 'brands-for-woocommerce' ),
                'param_name' => 'border_color',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Border width', 'brands-for-woocommerce' ),
                'param_name' => 'border_width',
                'value'     => '',
            ),
        ),
    ) );

    class WPBakeryShortCode_brands_products extends WPBakeryShortCode {
    }

    vc_map( array(
        'base' => 'brands_products',
        'name' => __( 'Brand Products', 'brands-for-woocommerce' ),
        'class' => '',
        'category' => __( 'BeRocket', 'brands-for-woocommerce' ),
        'icon' => 'icon-heart',
        'params' => array(
            array(
                'type' => 'textfield',
                'heading' => __( 'Brand ID(s)', 'brands-for-woocommerce' ),
                'param_name' => 'brand_id',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Brand slug(s)', 'brands-for-woocommerce' ),
                'param_name' => 'brand_slug',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Columns', 'brands-for-woocommerce' ),
                'param_name' => 'columns',
                'value'     => '4',
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Order By', 'brands-for-woocommerce' ),
                'param_name' => 'orderby',
                'value'     => array(
                    __('Title', 'brands-for-woocommerce') => 'title',
                    __('Post name (post slug)', 'brands-for-woocommerce') => 'name',
                    __('Date', 'brands-for-woocommerce') => 'date',
                    __('Modified date', 'brands-for-woocommerce') => 'modified',
                    __('Random', 'brands-for-woocommerce') => 'rand',
                ),
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Order By', 'brands-for-woocommerce' ),
                'param_name' => 'orderby',
                'value'     => array(
                    __('Descending', 'brands-for-woocommerce') => 'desc',
                    __('Ascending', 'brands-for-woocommerce') => 'asc',
                ),
            ),
        ),
    ) );

    class WPBakeryShortCode_brands_info extends WPBakeryShortCode {
    }

    vc_map( array(
        'base' => 'brands_info',
        'name' => __( 'Brand Info', 'brands-for-woocommerce' ),
        'class' => '',
        'category' => __( 'BeRocket', 'brands-for-woocommerce' ),
        'icon' => 'icon-heart',
        'params' => array(
            array(
                'type' => 'textfield',
                'heading' => __( 'Brand ID(s)', 'brands-for-woocommerce' ),
                'param_name' => 'brand_id',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Brand slug(s)', 'brands-for-woocommerce' ),
                'param_name' => 'brand_slug',
                'value'     => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Columns', 'brands-for-woocommerce' ),
                'param_name' => 'columns',
                'value'     => '4',
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Order By', 'brands-for-woocommerce' ),
                'param_name' => 'orderby',
                'value'     => array(
                    __('Title', 'brands-for-woocommerce') => 'title',
                    __('Post name (post slug)', 'brands-for-woocommerce') => 'name',
                    __('Date', 'brands-for-woocommerce') => 'date',
                    __('Modified date', 'brands-for-woocommerce') => 'modified',
                    __('Random', 'brands-for-woocommerce') => 'rand',
                ),
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Order By', 'brands-for-woocommerce' ),
                'param_name' => 'orderby',
                'value'     => array(
                    __('Descending', 'brands-for-woocommerce') => 'desc',
                    __('Ascending', 'brands-for-woocommerce') => 'asc',
                ),
            ),
        ),
    ) );
}
}
add_action('vc_before_init', 'berocket_apl_vc_before_init');
