<?php
function brfr_adjust_brightness($hexCode, $adjustPercent) {
    $hexCode = ltrim($hexCode, '#');

    if (strlen($hexCode) == 3) {
        $hexCode = $hexCode[0] . $hexCode[0] . $hexCode[1] . $hexCode[1] . $hexCode[2] . $hexCode[2];
    }

    $hexCode = array_map('hexdec', str_split($hexCode, 2));
    foreach ($hexCode as & $color) {
        $adjustableLimit = $adjustPercent < 0 ? $color : 255 - $color;
        $adjustAmount = ceil($adjustableLimit * $adjustPercent);
        $color = str_pad(dechex($color + $adjustAmount), 2, '0', STR_PAD_LEFT);
    }

    return '#' . implode($hexCode);
}

/*
args = array(
    'name' => string
    'label' => string
    'align_options' => array
    'defaults' => array
    'class' => string, optional
    'extra' => string, optional
    'tr_class' => string, optional
)
*/
function brfr_image_options( $args ) {
    $args = array_merge( array( 'class' => '', 'extra' => '', 'tr_class' => '' ), $args );
    $image_name = $args['name'];
    $defaults = $args['defaults'];
    return array(
        "label" => $args['label'],
        "tr_class" => "br_nowrap_label br_image_options {$args['tr_class']}",
        "items" => array(
            "{$image_name}_display" => array(
                "label_be_for" => __('Display', 'brands-for-woocommerce'),
                "type"         => "checkbox",
                "name"         => "{$image_name}_display",
                "extra"        => " id='br_brand_{$image_name}_display'",
                "class"        => "{$args['class']} br_brands_display_options",
                "extra"        => " {$args['extra']}",
                "value"        => 1,
            ),
            "{$image_name}_width" => array(
                "label_be_for" => __('Width', 'brands-for-woocommerce'),
                "type"         => "number",
                "class"        => "br_brand_number",
                "name"         => "{$image_name}_width",
                "value"        => $defaults["{$image_name}_width"],
            ),
            brfr_select_units( "{$image_name}_width", $defaults["{$image_name}_width_units"] ),
            "{$image_name}_height" => array(
                "label_be_for" => __('Height', 'brands-for-woocommerce'),
                "type"         => "number",
                "class"        => "br_brand_number",
                "name"         => "{$image_name}_height",
                "value"        => $defaults["{$image_name}_height"],
            ),
            brfr_select_units( "{$image_name}_height", $defaults["{$image_name}_height_units"] ),
            "{$image_name}_fit" => array(
                "label_be_for" => __('Fit', 'brands-for-woocommerce'),
                "type"         => "selectbox",
                "name"         => "{$image_name}_fit",
                "value"        => $defaults["{$image_name}_fit"],
                "options"      => array(
                    array("value" => "cover",   "text" => __( 'Cover', 'brands-for-woocommerce' )),
                    array("value" => "contain", "text" => __( 'Contain', 'brands-for-woocommerce' )),
                    array("value" => "fill",    "text" => __( 'Fill', 'brands-for-woocommerce' )),
                    array("value" => "none",    "text" => __( 'None', 'brands-for-woocommerce' )),
                ),
            ),
            "{$image_name}_align" => array(
                "label_be_for" => __('Align', 'brands-for-woocommerce'),
                "type"         => "selectbox",
                "name"         => "{$image_name}_align",
                "value"        => $defaults["{$image_name}_align"],
                "options"      => $args['align_options'],
            ),
        ),
    );
}

function brfr_select_units( $property, $default = 'px', $class = '', $extra = '' ) {
    $property_units = "{$property}_units";

    return array(
        "type"    => "selectbox",
        "options" => array(
            array( 'value' => 'px', 'text' => 'px' ),
            array( 'value' => '%', 'text' => '%' ),
        ),
        "extra" => " $extra",
        "name"  => $property_units,
        "class" => "br_brands_units $class",
        "value" => $default,
    );
}

function brfr_add_slider_script( $options, $class ) {
    if ( !wp_script_is( 'berocket_slick' ) ) {
        wp_enqueue_script( 'berocket_slick' );
    }
    if ( !wp_script_is( 'br_brands_slider' ) ) {
        $options_ready = array();
        $options_name = array(
            'slider_infinite'       => '1',
            'slider_autoplay'       => '1',
            'slider_autoplay_speed' => '5000',
            'slider_change_speed'   => '1000',
            'slider_arrows'         => '1',
            'slider_stop_focus'     => '1',
            'slider_mode'           => 'slide',
            'slider_ease'           => 'linear',
            'slider_dots'           => '',
            'slider_slides_scroll'  => '3',
            'slides_to_show'        => '',
        );
        foreach($options_name as $option_name => $default_val) {
            $options_ready[$option_name] = ( isset($options[$option_name]) ? $options[$option_name] : $default_val );
        }
        wp_enqueue_script( 'br_brands_slider' );
        wp_localize_script( 'br_brands_slider', 'bdBrandSlider', $options_ready );
    }
    if ( !wp_style_is( 'berocket_slick' ) ) {
        wp_enqueue_style( 'berocket_slick' );
    }
    if ( !wp_style_is( 'font-awesome' ) ) {
        wp_enqueue_style( 'font-awesome' );
    }

    $dots_color = $options['slider_dots_color'];
    $dots_darker_color = brfr_adjust_brightness( $dots_color, -0.5 );
    $dots_shadow_color = brfr_adjust_brightness( $dots_color, -0.8 );
    return "$class .slick-dots li.slick-active {
            background: linear-gradient($dots_color, $dots_darker_color);
            background: -webkit-gradient(linear, left top, left bottom, from($dots_color), to($dots_darker_color));
            background: -o-linear-gradient($dots_color, $dots_darker_color);
            box-shadow: inset 0 0 1px 1px $dots_shadow_color;
            -webkit-box-shadow: inset 0 0 1px 1px $dots_shadow_color;
        }";

}

function brfr_product_loop( $products, $atts ) {

    if ( empty( $products ) || empty( $products->products ) ) {
        do_action('woocommerce_no_products_found');
        return;
    }

    $loop_name = 'product_cat';
    $columns = empty( $atts['columns'] ) ? 3 : absint( $atts['columns'] );

    $slider_class = $slider_data = '';
    if ( empty( $atts['slider'] ) ) {

        // wc_set_loop_prop('current_page', $atts['paged']);
        // wc_set_loop_prop('is_paginated', wc_string_to_bool(true));
        // wc_set_loop_prop('page_template', get_page_template_slug());
        // wc_set_loop_prop('per_page', $atts['per_page']);
        wc_set_loop_prop('total', $products->total);
        $old_columns = wc_get_loop_prop('columns');
        wc_set_loop_prop('columns', $columns);
        // wc_set_loop_prop('total_pages', $products->max_num_pages);

        $woocommerce_loop['columns'] = $columns;
        $woocommerce_loop['name']    = $loop_name;

        $product_width = 100 / $columns - 5;
        echo 
            "<style>
                .br-brands-product-list.columns-$columns ul.products li.product {
                    width: {$product_width}%;
                }
            </style>";
    } else {
        $slider_class = 'br_product_list_slider';
        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        $options = $BeRocket_product_brand->get_option();
        $slider_data = $slider_data . ' data-slides_to_show="'.intval($columns).'"';
        echo '<style>' . brfr_add_slider_script( $options, ".$slider_class" ) . '</style>';
        echo '<script>if( typeof(brBrandSliderInit) != "undefined" ) brBrandSliderInit();</script>';
    }

    $hide_brands = empty( $atts['hide_brands'] ) ? '' : 'br_brands_hide_brands';
    echo 
        "<div class='brcs_slider_brands_container' data-columns='$columns'>
            <div class='woocommerce br-brands-product-list columns-$columns $slider_class $hide_brands'{$slider_data}>";

    if ( ! empty( $atts['hide_labels'] ) ) {
        add_filter('berocket_apl_set_label_prevent', function () { return true; });
    }
    if ( empty( $atts['slider'] ) && empty( $atts['hide_pagination'] ) ) {
        echo '<nav class="woocommerce-pagination">' . paginate_links(
                apply_filters(
                    'woocommerce_pagination_args',
                    array( // WPCS: XSS ok.
                        'format' => "?".($atts['cache_key']?$atts['cache_key']:'page')."=%#%",
                        'current' => $atts['paged'],
                        'total' => $products->max_num_pages,
                        'prev_text' => is_rtl() ? '&rarr;' : '&larr;',
                        'next_text' => is_rtl() ? '&larr;' : '&rarr;',
                        'type' => 'list',
                    )
                )
            ) . '</nav>';
    }

    global $post;
    $_post = $post;
    
    woocommerce_product_loop_start();
    foreach ( $products->products as $product ) {
        $post = get_post($product);
        setup_postdata( $post );
        wc_get_template_part( 'content', 'product' );
    }
    wp_reset_postdata();
    if ( !empty( $old_columns ) ) wc_set_loop_prop('columns', $old_columns);
    woocommerce_product_loop_end();

    $post = $_post;

    if ( ! empty( $atts['hide_labels'] ) ) {
        remove_filter('berocket_apl_set_label_prevent', function () { return true; });
    }

    echo "</div></div>";
}

function brfr_language_prefix() {
    $language = '';
    if( function_exists( 'qtranxf_getLanguage' ) ) {
        $language = qtranxf_getLanguage();
    }
    if( defined('ICL_LANGUAGE_CODE') ) {
        $language = ICL_LANGUAGE_CODE;
    }
    if( ! empty($language) ) {
        $language = "_{$language}";
    }
    return $language;
}

function brfr_add_children_arrow( $term ) {
    return empty( $term->children ) ? 
        array( 'class' => '', 'arrow' => '' ) : 
        array( 'class' => 'br_brand_has_children', 'arrow' => '<i class="fas fa-chevron-down br_brand_children_arrow"></i>' );
}
