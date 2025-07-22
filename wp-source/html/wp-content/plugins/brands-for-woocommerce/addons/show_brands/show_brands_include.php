<?php
class BeRocket_brands_show_brands_class {
    private $defaults;

    function __construct() {
        $this->defaults = array(
            'shop_display_brand'         => 1,
            'shop_display_position'      => 'after_image',
            'shop_display_as_link'       => 1,
            'shop_image_display'         => 1,
            'shop_image_width'           => '64',
            'shop_image_width_units'     => 'px',
            'shop_image_height'          => '',
            'shop_image_height_units'    => 'px',
            'shop_image_fit'             => 'cover',
            'shop_image_align'           => 'none',
            'shop_image_css'             => '',
            'shop_name_display'          => 1,
            'shop_name_css'              => '',
            'product_display_brand'      => 1,
            'product_display_position'   => 'after_image',
            'product_display_as_link'    => 1,
            'product_image_display'      => 1,
            'product_image_width'        => '64',
            'product_image_width_units'  => 'px',
            'product_image_height'       => '',
            'product_image_height_units' => 'px',
            'product_image_fit'          => 'cover',
            'product_image_align'        => 'none',
            'product_image_css'          => '',
            'product_name_display'       => 1,
            'product_name_css'           => '',
        );

        add_action ( 'init', array( $this, 'addon_init' ) );
    }

    public function addon_init() {
        $this->brand_icon_display();
        add_filter( 'brfr_tabs_info_product_brand', array( $this, 'brfr_tabs_info' ) );
        add_filter( 'brfr_data_product_brand', array( $this, 'brfr_data' ) );
        add_filter( 'br_brands_options_to_update', array($this, 'options_to_update'), 90 );
        add_filter( 'br_brands_update_version', array($this, 'update_version'), 90, 2 );
    }

    public function options_to_update( $options ) {
        $options['3.6']['update_options'] += array(
            'shop_what_to_display_image' => 'shop_image_display',
            'shop_display_image_css' => 'shop_image_css',
            'shop_what_to_display_text' => 'shop_name_display',
            'shop_display_text_css' => 'shop_name_css',
            'product_what_to_display_image' => 'product_image_display',
            'product_display_image_css' => 'product_image_css',
            'product_what_to_display_text' => 'product_name_display',
            'product_display_text_css' => 'product_name_css',
        );
        $options['3.6']['width_options'] += array(
            'shop_display_image_width' => 'shop_image_width',
            'product_display_image_width' => 'product_image_width',
        );
        return $options;
    }

    public function update_version( $options, $previous ) {
        $default_options = array(
            'product_display_brand' => '1',
            'product_display_position' => 'after_title',
            'product_image_display' => '1',
            'product_image_width' => '35',
            'product_image_width_units' => '%',
        );
        if ( version_compare( $previous, '3.0.1', '<' ) ) {
            foreach ( $default_options as $key => $value ) {
                if ( !isset( $options[$key] ) ) {
                    $options[$key] = $value;
                }
            }
        }
        return $options;
    }

    public function brfr_tabs_info($tabs_info) {
        $tabs_info = berocket_insert_to_array($tabs_info, 'Brand Page', array(
            'Shop Page' => array(
                'icon' => 'cubes',
                'name' => __( 'Shop Page', 'brands-for-woocommerce' ),
            ),
            'Product Page' => array(
                'icon' => 'cube',
                'name' => __( 'Product Page', 'brands-for-woocommerce' ),
            ),
        ));
        return $tabs_info;
    }

    public function brfr_data($data) {
        $align_options = array(
            array("value" => "none",  "text" => __( 'none', 'brands-for-woocommerce' )),
            array("value" => "left",  "text" => __( 'Left', 'brands-for-woocommerce' )),
            array("value" => "right", "text" => __( 'Right', 'brands-for-woocommerce' )),
            array("value" => "above", "text" => __( 'Above text', 'brands-for-woocommerce' )),
            array("value" => "under", "text" => __( 'Under text', 'brands-for-woocommerce' )),
        );

        $data = berocket_insert_to_array($data, 'Brand Page', array(
            'Shop Page' => array(
                'shop_display_brand' => array(
                    "type"     => "checkbox",
                    "label"    => __('Display Brand', 'brands-for-woocommerce'),
                    "class"    => "shop_display_brand",
                    "name"     => "shop_display_brand",
                    "value"    => $this->defaults['shop_display_brand'],
                ),
                'shop_display_position' => array(
                    "type"     => "selectbox",
                    "label"    => __('Brand Position', 'brands-for-woocommerce'),
                    "name"     => "shop_display_position",
                    "tr_class" => "shop_display_brand_enabled",
                    "options"  => array(
                        array("value" => "before_all", "text" => __( 'Before all', 'brands-for-woocommerce' )),
                        array("value" => "after_image", "text" => __( 'After Image', 'brands-for-woocommerce' )),
                        array("value" => "in_title_before", "text" => __( 'In the title line, before the title', 'brands-for-woocommerce' )),
                        array("value" => "in_title_after", "text" => __( 'In the title line, after the title', 'brands-for-woocommerce' )),
                        array("value" => "after_title", "text" => __( 'After Title', 'brands-for-woocommerce' )),
                        array("value" => "after_price", "text" => __( 'After Price', 'brands-for-woocommerce' )),
                        array("value" => "after_add_to_cart", "text" => __( 'After Add to cart button', 'brands-for-woocommerce' )),
                    ),
                    "value"    => $this->defaults['shop_display_position'],
                ),
                'shop_display_as_link' => array(
                    "type"     => "checkbox",
                    "label"    => __('Display As Link', 'brands-for-woocommerce'),
                    "tr_class" => "shop_display_brand_enabled",
                    "name"     => "shop_display_as_link",
                    "value"    => $this->defaults['shop_display_as_link'],
                ),
                'shop_image' => brfr_image_options( array( 
                    'name' => 'shop_image', 
                    "label" => __('Image', 'brands-for-woocommerce'), 
                    'defaults' => $this->defaults, 
                    'align_options' => $align_options,
                    'class' => 'br_brand_display_options', 
                    'extra' => " data-option_class='.br_shop_image_css'", 
                    'tr_class' => 'shop_display_brand_enabled' ) 
                ),
                'shop_image_css' => array(
                    "type"     => "textarea",
                    "tr_class" => "shop_display_brand_enabled br_shop_image_css",
                    "label"    => __('Image custom CSS', 'brands-for-woocommerce'),
                    "name"     => "shop_image_css",
                    "value"    => $this->defaults['shop_image_css'],
                ),
                'shop_name_display' => array(
                    "label"    => __('Name', 'brands-for-woocommerce'),
                    "label_be_for" => __('Display', 'brands-for-woocommerce'),
                    "type"     => "checkbox",
                    "tr_class" => "shop_display_brand_enabled",
                    'class'    => 'br_brand_display_options', 
                    'extra'    => "data-option_class='.br_shop_name_css'",
                    "name"     => "shop_name_display",
                    "value"    => $this->defaults['shop_name_display'],
                ),
                'shop_name_css' => array(
                    "type"     => "textarea",
                    "tr_class" => "shop_display_brand_enabled br_shop_name_css",
                    "label"    => __('Name custom CSS', 'brands-for-woocommerce'),
                    "name"     => "shop_name_css",
                    "value"    => $this->defaults['shop_name_css'],
                ),
            ),
            'Product Page' => array(
                'product_display_brand' => array(
                    "type"     => "checkbox",
                    "class"    => "product_display_brand",
                    "label"    => __('Display Brand', 'brands-for-woocommerce'),
                    "name"     => "product_display_brand",
                    "value"    => $this->defaults['product_display_brand'],
                ),
                'product_display_position' => array(
                    "type"     => "selectbox",
                    "tr_class" => "product_display_brand_enabled",
                    "label"    => __('Brand Position', 'brands-for-woocommerce'),
                    "name"     => "product_display_position",
                    "options"  => array(
                        array("value" => "before_all", "text" => __( 'Before all', 'brands-for-woocommerce' )),
                        array("value" => "after_image", "text" => __( 'After Image', 'brands-for-woocommerce' )),
                        array("value" => "after_title", "text" => __( 'After Title', 'brands-for-woocommerce' )),
                        array("value" => "in_title_before", "text" => __( 'In the title line, before the title', 'brands-for-woocommerce' )),
                        array("value" => "in_title_after", "text" => __( 'In the title line, after the title', 'brands-for-woocommerce' )),
                        array("value" => "after_price", "text" => __( 'After Price', 'brands-for-woocommerce' )),
                        array("value" => "after_add_to_cart", "text" => __( 'After Add to cart button', 'brands-for-woocommerce' )),
                        array("value" => "brands_tab", "text" => __( 'On the "Brands" tab', 'brands-for-woocommerce' )),
                        array("value" => "taxonomies_list", "text" => __( 'After "Categories" and "Tags"', 'brands-for-woocommerce' )),
                    ),
                    "value"    => $this->defaults['product_display_position'],
                ),
                'product_display_as_link' => array(
                    "type"     => "checkbox",
                    "label"    => __('Display As Link', 'brands-for-woocommerce'),
                    "tr_class" => "product_display_brand_enabled",
                    "name"     => "product_display_as_link",
                    "value"    => $this->defaults['product_display_as_link'],
                ),
                'product_image' => brfr_image_options( array( 
                    'name' => 'product_image', 
                    "label" => __('Image', 'brands-for-woocommerce'), 
                    'defaults' => $this->defaults, 
                    'align_options' => $align_options,
                    'class' => 'br_brand_display_options', 
                    'extra' => " data-option_class='.br_product_image_css'", 
                    'tr_class' => 'product_display_brand_enabled' ) 
                ),
                'product_image_css' => array(
                    "type"     => "textarea",
                    "label"    => __('Image custom CSS', 'brands-for-woocommerce'),
                    "tr_class" => "product_display_brand_enabled br_product_image_css",
                    "name"     => "product_image_css",
                    "value"    => $this->defaults['product_image_css'],
                ),
                'product_name_display' => array(
                    "label"    => __('Name', 'brands-for-woocommerce'),
                    "label_be_for" => __('Display', 'brands-for-woocommerce'),
                    "type"     => "checkbox",
                    "tr_class" => "product_display_brand_enabled",
                    'class'    => 'br_brand_display_options', 
                    'extra'    => "data-option_class='.br_product_name_css'",
                    "name"     => "product_name_display",
                    "value"    => $this->defaults['product_name_display'],
                ),
                'product_name_css' => array(
                    "type"     => "textarea",
                    "label"    => __('Name custom CSS', 'brands-for-woocommerce'),
                    "tr_class" => "product_display_brand_enabled br_product_name_css",
                    "name"     => "product_name_css",
                    "value"    => $this->defaults['product_name_css'],
                ),
            ),
        ));
        return $data;
    }
    public function brand_icon_display($action = 'add_action') {
        $options = $this->get_option();
        $hooks = array();
        $shop_display_brand = array(
            'before_all' => array(
                'woocommerce_before_shop_loop_item' => 5,
                'lgv_advanced_before' => 38,
            ),
            'after_image' => array(
                'woocommerce_before_shop_loop_item_title' => 20,
                'lgv_advanced_after_img' => 38,
            ),
            'after_title' => array(
                'woocommerce_shop_loop_item_title' => 38,
                'lgv_advanced_before_description' => 38,
            ),
            'after_price' => array(
                'woocommerce_after_shop_loop_item_title' => 38,
                'lgv_advanced_after_price' => 38,
            ),
            'after_add_to_cart' => array(
                'woocommerce_after_shop_loop_item' => 38,
                'lgv_advanced_after_price' => 38,
            ),
        );
        $product_display_brand = array(
            'before_all' => array(
                'woocommerce_before_single_product' => 10,
            ),
            'after_image' => array(
                'woocommerce_before_single_product_summary' => 30,
            ),
            'after_title' => array(
                'woocommerce_single_product_summary' => 7,
            ),
            'after_price' => array(
                'woocommerce_single_product_summary' => 15,
            ),
            'after_add_to_cart' => array(
                'woocommerce_single_product_summary' => 33,
            ),
        );

        if( !empty( $options['shop_display_brand'] ) && !empty( $options['shop_display_position'] ) ) {
            switch ( $options['shop_display_position'] ) {
                case 'in_title_after':
                case 'in_title_before':
                    remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title' );
                    add_action( 'woocommerce_shop_loop_item_title', array( $this, "shop_brand_{$options['shop_display_position']}" ) );
                    break;

                default:
                    $hooks['display_shop_post_brands'] = $shop_display_brand[$options['shop_display_position']];
                    break;
            }
        }
        
        if ( !empty( $options['product_display_brand'] ) && !empty( $options['product_display_position'] ) ) {
            switch ( $options['product_display_position'] ) {
                case 'brands_tab':
                    add_filter( 'woocommerce_product_tabs', array( $this, 'brands_product_tab' ) );
                    break;

                case 'taxonomies_list':
                    add_action( 'woocommerce_product_meta_end', array( $this, 'brands_product_meta_end' ) );
                    break;

                case 'in_title_after':
                case 'in_title_before':
                    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
                    add_action( 'woocommerce_single_product_summary', 
                        array( $this, "product_brand_{$options['product_display_position']}" ), 5 );
                    break;

                default:
                    $hooks['display_product_post_brands'] = $product_display_brand[$options['product_display_position']];
                    break;
            }
       }

        if ( !empty( $hooks ) ) {
            foreach ( $hooks as $function => $hook_data ) {
                foreach ( $hook_data as $hook => $hook_priority ) {
                    $action( $hook, array( $this, $function ), $hook_priority );
                }
            }            
        }
    }

    public function shop_brand_in_title_after() {
        $title = get_the_title();
        $brands = $this->display_post_brands( 'shop' );
        echo "<h2 class='woocommerce-loop-product__title'>
            <span class='product-title'>$title</span>
            <span class='brands_in_title'>$brands</span>
        </h2>";
    }

    public function shop_brand_in_title_before() {
        $title = get_the_title();
        $brands = $this->display_post_brands( 'shop' );
        echo "<h2 class='woocommerce-loop-product__title'>
            <span class='brands_in_title'>$brands</span>
            <span class='product-title'>$title</span>
        </h2>";
    }

    public function product_brand_in_title_after() {
        $brands = $this->display_post_brands( 'product' );
        the_title( '<h1><span class="product-title">', "</span><span class='brands_in_title'>$brands</span></h1>" );
    }

    public function product_brand_in_title_before() {
        $brands = $this->display_post_brands( 'product' );
        the_title( "<h1><span class='brands_in_title'>$brands</span><span class='product-title'>", '</span></h1>' );
    }

    private function display_post_brands( $page_type ) {
        $options = $this->get_option();
        $post_id = get_the_ID();
        $terms = get_the_terms( $post_id, BeRocket_product_brand::$taxonomy_name );
        if( empty($terms) ) {
            return;
        }
        if( empty( $terms ) || !is_array( $terms ) ) echo '';
        $html = '';
        foreach ( $terms as $term ) {
            $image_url  = get_term_meta( $term->term_id, 'brand_image_url', true );
            $tooltip = BeRocket_product_brand::get_tooltip( $term->term_id );

            $align = '';
            $img_width = '';
            if ( !empty( $options["{$page_type}_image_align"] ) ) {
                if ( in_array( $options["{$page_type}_image_align"], array( 'under', 'above' ) ) ) {
                    $align = 'display: block !important;';
                    $img_width = 'width: 100%;';
                } else if ( in_array( $options["{$page_type}_image_align"], array( 'left', 'right' ) ) ) {
                    $align = "float:{$options["{$page_type}_image_align"]};";
                    $img_width = 'width: 50%;';
                }
            } 

            $image = '';
            $width = '';
            if ( !empty( $options["{$page_type}_image_display"] ) && !empty( $image_url ) ) {
                $width  = empty( $options["{$page_type}_image_width"] ) ? '' : "width:{$options["{$page_type}_image_width"]}{$options["{$page_type}_image_width_units"]};";
                $height = empty( $options["{$page_type}_image_height"] ) ? '' : "height:{$options["{$page_type}_image_height"]}{$options["{$page_type}_image_height_units"]};";
                $fit    = empty( $options["{$page_type}_image_fit"] ) ? '' : "object-fit: {$options["{$page_type}_image_fit"]};";
                $style  = empty( $options["{$page_type}_image_css"] ) ? '' : $options["{$page_type}_image_css"];
                
                $image .= "<img class='berocket_brand_post_image {$tooltip['class']}' src='$image_url' {$tooltip['data']} alt='{$term->name}' style='$img_width $height $fit $width $style' />";
            }

            $name = '';
            if( ! empty($options["{$page_type}_name_display"]) ) {
                $style = empty( $options["{$page_type}_name_css"] ) ? $align : "$align {$options["{$page_type}_name_css"]}";
                $name .= "<span class='berocket_brand_post_image_name {$tooltip['class']}' {$tooltip['data']} style='$style'>{$term->name}</span>";
            }

            if ( !empty( $options["{$page_type}_image_align"] ) && $options["{$page_type}_image_align"] == 'under' ) {
                $brand_html = "$name $image";
            } else {
                $brand_html = "$image $name";
            }

            if( !empty( $options["{$page_type}_display_as_link"] ) ) {
                $term_link = get_term_link( (int)$term->term_id );
                if ( is_a( $term_link, 'WP_Error' ) ) {
                    BeRocket_error_notices::add_plugin_error(19, 'Get term link WP Error', array(
                        'term'      => $term,
                        'term_link' => $term_link,
                        'post_id'   => $post_id
                    ));
                } else {
                    $brand_html = "<a href='$term_link'>$brand_html</a>";
                }
            }
            $html .= "<div class='br_brand_{$page_type}_container' style='$width'>$brand_html</div>";

        }
        return $html;
    }

    public function brands_product_tab( $tabs ) {
        $tabs['brands'] = array(
            'title'     => __( 'Brands', 'woocommerce' ),
            'priority'  => 50,
            'callback'  => array( $this, 'brand_product_tab_content' ),
        );
        return $tabs;
    }

    public function brands_product_meta_end() {
        global $product;

        $term_ids = wp_get_post_terms( $product->get_id(), BeRocket_product_brand::$taxonomy_name, array('fields' => 'ids') );

        if ( empty( $term_ids ) ) return;

        echo get_the_term_list( $product->get_id(), BeRocket_product_brand::$taxonomy_name, 
            '<span class="posted_in">' . _n( 'Brand:', 'Brands:', count( $term_ids ), 'brands-for-woocommerce' ) . ' ', ', ', '</span>' );
    }

    public function brand_product_tab_content()  {
        echo $this->display_post_brands( 'product' );
    }

    public function display_shop_post_brands() {
        echo $this->display_post_brands( 'shop' );
    }
    public function display_product_post_brands() {
        echo $this->display_post_brands( 'product' );
    }
    public function get_option() {
        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        return $BeRocket_product_brand->get_option();
    }
}
new BeRocket_brands_show_brands_class(); 
