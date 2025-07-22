<?php

class brbrand_deprecated_shortcodes_divi_addon {
    public static $settings_name = 'br-product_brand-options', $taxonomy_name = 'berocket_brand';
    private $cache_key = 'br_brands_cache_', $cache_time = 60*60*24, $cache_list = 'br_brands_cache_list';
    function __construct() {
        add_shortcode( 'brands_product_thumbnail', array( $this, 'brands_product_thumbnail' ) );
        add_shortcode( 'brands_info', array( $this, 'brands_info_shortcode' ) );
        add_shortcode( 'product_brands_info', array( $this, 'product_brands_info_shortcode' ) );
        add_shortcode( 'brands_products', array( $this, 'products_shortcode' ) );
        add_shortcode( 'brands_list', array( $this, 'brands_list_shortcode' ) );
        add_shortcode( 'brands_catalog', array( $this, 'brands_catalog_shortcode' ) );
        add_shortcode( 'brands_by_name', array( $this, 'brands_catalog_shortcode' ) ); // for older versions
        add_filter('brbrands_section_shortcodes_explanation_list', array($this, 'shortcodes_explanation'));
    }
    public function brands_product_thumbnail($atts = array()) {
        ob_start();
        $this->description_post($atts);
        $return = ob_get_clean();
        return apply_filters('shortcode_brands_product_thumbnail_return', $return, $atts);
    }
    public function brands_info_shortcode( $atts = array() ) {
        if ( empty( $atts ) || empty( $atts['brand_id'] )
            || empty( $atts = $this->show_brand_attributes( $atts ) ) ) return;
        ob_start();
        the_widget( 'berocket_product_brand_description_widget', $atts );
        $return = ob_get_clean();
        return apply_filters( 'brands_info_shortcode_return', $return, $atts );
    }
    
    public function product_brands_info_shortcode($atts = array()) {
        if ( empty( $atts ) || empty( $atts = $this->show_brand_attributes( $atts ) ) ) return;

        ob_start();
        if ( !empty( $atts['product_id'] ) && empty( $atts['product'] ) ) {
            $atts['product'] = $atts['product_id'];
        }
        the_widget( 'berocket_product_brands_info_widget', $atts );
        $return = ob_get_clean();
        return apply_filters('shortcode_product_brands_info_return', $return, $atts);
    }
    public function products_shortcode($atts = array()) {
        if ( !is_array( $atts ) ) $atts = array();
        if ( empty( $atts['brands'] ) ) {
            if( !empty( $atts['brand_id'] ) ) {
                $atts['brands'] = $atts['brand_id'];
                $atts['brand_field'] = 'id';
            } else if( !empty( $atts['brand_slug'] ) ) {
                $atts['brands'] = $atts['brand_slug'];
                $atts['brand_field'] = 'slug';
            }
        }
        if ( empty( $atts['brands'] ) ) return;
        $atts['brands'] = explode( ',', $atts['brands'] );
        $atts['cache_key'] = $this->get_cache_key();
        ob_start();
        the_widget( 'berocket_product_list_widget', $atts );
        $return = ob_get_clean();

        return apply_filters('brands_products_shortcode_return', $return, $atts);
    }
    public function brands_list_shortcode($atts = array()) {
        if ( !is_array( $atts ) ) $atts = array();
        if ( !empty( $atts['padding'] ) ) $atts['padding'] = intval( $atts['padding'] );
        $atts['cache_key'] = $this->get_cache_key();
        if ( empty( $atts['slider'] ) ) $atts['slider'] = 0;
        if ( empty( $atts['featured_first'] ) ) $atts['featured_first'] = 0;
        ob_start();
        the_widget( 'berocket_product_brand_widget', $atts);
        $return = ob_get_clean();
        return apply_filters('brands_list_shortcode_return', $return, $atts);
    }
    public function brands_catalog_shortcode( $atts = array() ) {
        if ( !is_array( $atts ) ) $atts = array();
        if ( !empty( $atts['position'] ) ) {
            $positions = array(
                1 => 'left',
                2 => 'right',
                3 => 'above',
            );
            if ( $atts['position'] == 4 ) {
                $atts['show_all'] = 1;
                $atts['img_align'] = 'left';
            } else if ( is_numeric( $atts['position'] ) ) {
                $atts['show_all'] = 0;
                $atts['img_align'] = $positions[$atts['position']];
            }
        }

        if ( empty( $atts['use_name'] ) ) $atts['use_name'] = 0;
        if ( empty( $atts['img'] ) ) $atts['img'] = 0;
        if ( $atts['use_name'] === 0 && $atts['img'] === 0 ) $atts['use_name'] = 1;

        $atts['cache_key'] = $this->get_cache_key();
        ob_start();
        the_widget( 'berocket_alphabet_brand_widget', $atts );
        $return = ob_get_clean();
        return apply_filters('brands_by_name_shortcode_return', $return, $atts);
    }
    public function description_post($atts = array()) {
        $atts = shortcode_atts( array(
			'post_id'   => '',
			'width'     => '35%',
			'height'    => '',
			'position'  => 'right',
            'image'     => '1',
			'url'       => '',
		), $atts );
        if( empty($atts['post_id']) ) {
            $atts['post_id'] = get_the_ID();
            if( empty($atts['post_id']) ) {
                return;
            }
        }
        $terms = get_the_terms( $atts['post_id'], self::$taxonomy_name );
        if( empty($terms) ) {
            return;
        }
        if( ! empty($terms) && is_array($terms) ) {
            foreach($terms as $term) {
                $image 	= get_term_meta( $term->term_id, 'brand_image_url', true );
                if( ! empty($atts['url']) ) {
                    echo '<a href="' . get_term_link( (int)$term->term_id ) . '">';
                }
                if( ! empty($image) && ! empty($atts['image']) ) {
                    echo '<img class="berocket_brand_post_image" src="', $image, '" alt="', $term->name, '" style="',
                    (empty($atts['width']) ? '' : 'width:'.$atts['width'].';'),
                    (empty($atts['height']) ? '' : 'height:'.$atts['height'].';'),
                    (empty($atts['position']) ? '' : 'float:'.$atts['position'].';'),
                    '">';
                } else {
                    echo '<span class="berocket_brand_post_image_name" style="display: block;', 
                    (empty($atts['width']) ? '' : 'width:'.$atts['width'].';'),
                    (empty($atts['height']) ? '' : 'height:'.$atts['height'].';'),
                    (empty($atts['position']) ? '' : 'float:'.$atts['position'].';'),
                    '">', @ $term->name, '</span>';
                }
                if( ! empty($atts['url']) ) {
                    echo '</a>';
                }
            }
        }
    }

    private function show_brand_attributes( $atts ) {
        $all_elements = array(
            'name'        => 'display_title',
            'banner'      => 'banner_display',
            'image'       => 'thumbnail_display',
            'description' => 'display_description',
            'categories'  => 'display_categories',
            'link'        => 'display_link',
            'related'     => 'related_products_display',
        );

        if( empty( $atts['type'] ) || $atts['type'] == 'all' ) {
            $show_elements = array_keys( $all_elements );
        } else {
            $all_elements = explode(',', $atts['type']);
            $show_elements = array_keys( $all_elements );
        }

        if( empty( $all_elements ) || !is_array( $all_elements ) || count( $all_elements ) == 0 ) {
            return false;
        }

        foreach ( $show_elements as $element ) {
            $atts[ $all_elements[$element] ] = 1;
        }

        if ( !empty( $atts['image'] ) ) {
            $atts = $this->parse_image_options( $atts, $atts['image'], 'thumbnail' );
        }

        if ( !empty( $atts['banner'] ) ) {
            $atts = $this->parse_image_options( $atts, $atts['banner'], 'banner' );
        }
        return $atts;
    }

    public function parse_image_options( $atts, $image_options, $image_name ) {
        $image_options = explode( ',', $image_options );
        foreach ( $image_options as $option ) {
            $option = explode( ':', $option );
            if( count($option) > 1 ) {
                $atts["{$image_name}_{$option[0]}"] = $option[1];
            }
        }
        return $atts;
    }
    public function shortcodes_explanation($explanation) {
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [brands_list]</strong> - '.__("list of brands", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>title</i> - '.__("title of the brand list", 'brands-for-woocommerce').'</li>
                            <li><i>use_name</i> - '.__("display brand name (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>per_row</i> - '.__("number of columns for brands list (number of brands per slider)", 'brands-for-woocommerce').'</li>
                            <li><i>hide_empty</i> - '.__("hide brands without products (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>out_of_stock</i> - '.__("hide brands with products out of stock (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>brands_number</i> - '.__("maximum number of brands to show", 'brands-for-woocommerce').'</li>
                            <li><i>count</i> - '.__("show quantity of products in brand next to the title", 'brands-for-woocommerce').'</li>
                            <li><i>padding</i> - '.__("padding around image and name in pixels (default is 3)", 'brands-for-woocommerce').'</li>
                            <li><i>border_color</i> - '.__("border color in HEX (#FFFFFF - white, #000000 - black)", 'brands-for-woocommerce').'</li>
                            <li><i>border_width</i> - '.__("border width in pixels", 'brands-for-woocommerce').'</li>
                            <li><i>slider</i> - '.__("output mode: slider (1) or list (0)", 'brands-for-woocommerce').'</li>
                            <li><i>orderby</i> - '.__("sort brands by:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>name</i> - '.__("brand name (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>count</i> - '.__("number of products", 'brands-for-woocommerce').'</li>
                                    <li><i>order</i> - '.__("brand order", 'brands-for-woocommerce').'</li>
                                    <li><i>random</i> - '.__("random order", 'brands-for-woocommerce').'</li>
                                    <li><i>slug</i> - '.__("brand slug", 'brands-for-woocommerce').'</li>
                                    <li><i>description</i> - '.__("brand description", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>order</i> - '.__("sorting order:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>asc</i> - '.__("ascending (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>desc</i> - '.__("descending", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>img</i> - '.__("display brand image (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>imgh</i> - '.__("brand image height in px or % (i.e. 50%, 100px; default is 64px)", 'brands-for-woocommerce').'</li>
                            <li><i>imgw</i> - '.__("brand image width in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                            <li><i>img_fit</i> - '.__("brand image fit:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>cover</i> - '.__("default", 'brands-for-woocommerce').'</li>
                                    <li><i>contain</i></li>
                                    <li><i>fill</i></li>
                                </ul>
                            </li>
                            <li><i>img_align</i> - '.__("brand image align to name:", 'brands-for-woocommerce') . '
                                <ul>
                                    <li><i>left</i> - '.__("image left to name", 'brands-for-woocommerce').'</li>
                                    <li><i>right</i> - '.__("image right to name", 'brands-for-woocommerce').'</li>
                                    <li><i>under</i> - '.__("image under name", 'brands-for-woocommerce').'</li>
                                    <li><i>above</i> - '.__("image above name (default)", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>featured_first</i> - '.__("show featured brands first (0 or 1)", 'brands-for-woocommerce').'</li>
                            <li><i>hierarchy</i> - '.__("brand image align to name:", 'brands-for-woocommerce') . '
                                <ul>
                                    <li><i>top</i> - ' . __( 'Only top level', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>children</i> - ' . __( 'Only children (without hierarchy)', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>expand</i> - ' . __( 'Show full hierarchy', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>by_click</i> - ' . __( 'Expand by click', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>all</i> - ' . __( 'All brands without hierarchy (default)', 'brands-for-woocommerce' ) . '</li>
                                </ul>
                            </li>
                            <li><i>include</i> - '.__("brands to display (id list, i.e. include='45,47,52,61')", 'brands-for-woocommerce').'</li>
                            <li><i>exclude</i> - '.__("brands to exclude from display (i.e. exclude='45,47,52,61')", 'brands-for-woocommerce').'</li>
                        </ul>
                    </li>';
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [brands_catalog]</strong> - '.__("brands grouped by name or category", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>title</i> - '.__("title of the brand catalog", 'brands-for-woocommerce').'</li>
                            <li><i>use_name</i> - '.__("display brand name", 'brands-for-woocommerce').'</li>
                            <li><i>style</i> - '.__("placement of brands:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>vertical</i> - '.__("vertically (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>horizontal</i> - '.__("horizontally", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>column</i> - '.__("number of columns", 'brands-for-woocommerce').'</li>
                            <li><i>hide_empty</i> - '.__("hide brands without products (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>out_of_stock</i> - '.__("hide brands with products out of stock (1 or 0)", 'brands-for-woocommerce').'</li>
                            <li><i>brands_number</i> - '.__("maximum number of brands to show", 'brands-for-woocommerce').'</li>
                            <li><i>count</i> - '.__("show quantity of products in brand next to the title", 'brands-for-woocommerce').'</li>
                            <li><i>groupby</i> - '.__("group brands by:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>alphabet</i> - '.__("brand name (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>category</i> - '.__("brand category", 'brands-for-woocommerce').'</li>
                                    <li><i>none</i> - '.__("no group", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>orderby</i> - '.__("sort brands by:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>name</i> - '.__("brand name (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>count</i> - '.__("number of products", 'brands-for-woocommerce').'</li>
                                    <li><i>order</i> - '.__("brand order", 'brands-for-woocommerce').'</li>
                                    <li><i>random</i> - '.__("random order", 'brands-for-woocommerce').'</li>
                                    <li><i>slug</i> - '.__("brand slug", 'brands-for-woocommerce').'</li>
                                    <li><i>description</i> - '.__("brand description", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>order</i> - '.__("sorting order:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>asc</i> - '.__("ascending (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>desc</i> - '.__("descending", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>img</i> - '.__("display brand image", 'brands-for-woocommerce').'</li>
                            <li><i>imgh</i> - '.__("brand image height, in px or % (i.e. 50%, 100px; default is 64px)", 'brands-for-woocommerce').'</li>
                            <li><i>imgw</i> - '.__("brand image width, in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                            <li><i>img_fit</i> - '.__("brand image fit:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>cover</i> - '.__("default", 'brands-for-woocommerce').'</li>
                                    <li><i>contain</i></li>
                                    <li><i>fill</i></li>
                                </ul>
                            </li>
                            <li><i>img_align</i> - '.__("brand image align to name:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>left</i> - '.__("image left to name", 'brands-for-woocommerce').'</li>
                                    <li><i>right</i> - '.__("image right to name", 'brands-for-woocommerce').'</li>
                                    <li><i>under</i> - '.__("image under name", 'brands-for-woocommerce').'</li>
                                    <li><i>above</i> - '.__("image above name (default)", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>hierarchy</i> - '.__("brand image align to name:", 'brands-for-woocommerce') . '
                                <ul>
                                    <li><i>top</i> - ' . __( 'Only top level', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>children</i> - ' . __( 'Only children (without hierarchy)', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>expand</i> - ' . __( 'Show full hierarchy', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>by_click</i> - ' . __( 'Expand by click', 'brands-for-woocommerce' ) . '</li>
                                    <li><i>all</i> - ' . __( 'All brands without hierarchy (default)', 'brands-for-woocommerce' ) . '</li>
                                </ul>
                            </li>
                            <li><i>featured_first</i> - '.__("show featured brands first (0 or 1)", 'brands-for-woocommerce').'</li>
                            <li><i>include</i> - '.__("brands to display (id list, i.e. include='45,47,52,61')", 'brands-for-woocommerce').'</li>
                            <li><i>exclude</i> - '.__("brands to exclude from display (i.e. exclude='45,47,52,61')", 'brands-for-woocommerce').'</li>
                        </ul>
                    </li>';
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [brands_products]</strong> - '.__("product list for given brands (by ids or slugs)", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>brand_id</i> - '.__("one or more brand ID (example: brand_id='12,34,35')", 'brands-for-woocommerce').'</li>
                            <li><i>brand_slug</i> - '.__("one or more brand slugs (example: brand_slug='brand1,brand2,brand3')", 'brands-for-woocommerce').'</li>
                            <li><b>'.__("Use only one of these options: brand_id or brand_slug", 'brands-for-woocommerce').'</b></li>
                            <li><i>columns</i> - '.__("number of columns for product list (4 by default). May not work with some themes or plugins", 'brands-for-woocommerce').'</li>
                            <li><i>per_page</i> - '.__("number of products per page; if not set, all products are shown", 'brands-for-woocommerce').'</li>
                            <li><i>orderby</i> - '.__("order products by:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>title</i> - '.__("product title (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>name</i> - '.__("product name (post slug)", 'brands-for-woocommerce').'</li>
                                    <li><i>date</i> - '.__("date of creation", 'brands-for-woocommerce').'</li>
                                    <li><i>modified</i> - '.__("last modified date", 'brands-for-woocommerce').'</li>
                                    <li><i>rand</i> - '.__("random order", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>order</i> - '.__("sorting order:", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>asc</i> - '.__("ascending (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>desc</i> - '.__("descending", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>slider</i> - '.__("1 for slider mode", 'brands-for-woocommerce').'
                            <li><i>hide_brands</i> - '.__("1 to hide brands", 'brands-for-woocommerce').'
                        </ul>
                    </li>';
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [brands_info]</strong> - '.__("show information about brand", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>id</i> - '.__("brand ID", 'brands-for-woocommerce').'</l</b>i>' .
                            $this->show_brand_shortcode_attributes()
                            . '<li><i>featured</i> - ' 
                            . __("display last created featured brand (1 or 0)", 'brands-for-woocommerce') 
                            . '; <b>' . __("if featured=1, id is ignored", 'brands-for-woocommerce') . '</b>'
                            . '</li>
                        </ul>
                    </li>';
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [brands_product_thumbnail]</strong> - '.__("brand image for product page", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>post_id</i> - '.__("product id", 'brands-for-woocommerce').'</li>
                            <li><i>width</i> - '.__("image width (default is 35%)", 'brands-for-woocommerce').'</li>
                            <li><i>height</i> - '.__("image height (optionally)", 'brands-for-woocommerce').'</li>
                            <li><i>position</i> - '.__("float style for element (default is right)", 'brands-for-woocommerce').'
                                <ul>
                                    <li><i>right</i> - '.__("right to text (default)", 'brands-for-woocommerce').'</li>
                                    <li><i>left</i> - '.__("left to text", 'brands-for-woocommerce').'</li>
                                </ul>
                            </li>
                            <li><i>image</i> - '.__("display brand image, if available (1 or 0, default is 1)", 'brands-for-woocommerce').'</li>
                            <li><i>url</i> - '.__("display image as link (1 or 0, default is 0)", 'brands-for-woocommerce').'</li>
                        </ul>
                    </li>';
        $explanation[] = '<li>
                        <span class="br_shortcode_title">
                            <strong><i class="fas fa-caret-right"></i>&nbsp;DEPRECATED [product_brands_info]</strong> - '.__("single brand info for single product", 'brands-for-woocommerce').'
                        </span>
                        <ul class="br_shortcode_attributes">
                            <li><i>product_id</i> - '.__("product ID; on single product page can get it automatically", 'brands-for-woocommerce').'</li>' .
                            $this->show_brand_shortcode_attributes()
                            . '<li><i>featured</i> - '
                            . __("display last created featured brand (1 or 0)", 'brands-for-woocommerce') 
                            . '</li>
                        </ul>
                    </li>';
        return $explanation;
    }

    private function show_brand_shortcode_attributes() {
        return 
            '<li><i>type</i> - '.__("what to show (all by default):", 'brands-for-woocommerce').'
                <ul>
                    <li><i>name</i> - '.__("name", 'brands-for-woocommerce').'</li>
                    <li><i>categories</i> - '.__("categories", 'brands-for-woocommerce').'</li>
                    <li><i>banner</i> - '.__("banner", 'brands-for-woocommerce').'</li>
                    <li><i>image</i> - '.__("thumbnail", 'brands-for-woocommerce').'</li>
                    <li><i>description</i> - '.__("description", 'brands-for-woocommerce').'</li>
                    <li><i>link</i> - '.__("external link", 'brands-for-woocommerce').'</li>
                    <li><i>related</i> - '.__("related products", 'brands-for-woocommerce').'</li>
                    <li><i>all</i> - '.__("all brand options", 'brands-for-woocommerce').'</li>
                    <li><b>'.__("You can use multiple brand properties, separated by comma. Example: type='image,name'", 'brands-for-woocommerce').'</b></li>
                </ul>
            </li>
            <li><i>banner</i> - '.__("brand banner options: width, height, fit, align:", 'brands-for-woocommerce') . '
                <ul>
                    <li><i>width</i> - '.__("width in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                    <li><i>height</i> - '.__("height in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                    <li><i>fit</i> - '.__("fit:", 'brands-for-woocommerce').'
                        <ul>
                            <li><i>cover</i> - '.__("default", 'brands-for-woocommerce').'</li>
                            <li><i>contain</i></li>
                            <li><i>fill</i></li>
                            <li><i>none</i></li>
                        </ul>
                    </li>
                    <li><i>align</i> - '.__("align:", 'brands-for-woocommerce') . '
                        <ul>
                            <li><i>left</i> - '.__("left", 'brands-for-woocommerce').'</li>
                            <li><i>right</i> - '.__("right", 'brands-for-woocommerce').'</li>
                            <li><i>center</i> - '.__("center", 'brands-for-woocommerce').'</li>
                        </ul>
                    </li>
                    <li>
                        <b>' . __('Examples:', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('banner="width:50%,height:50px,fit:contain,align:center"', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('banner="width:50%,height:50px"', 'brands-for-woocommerce') . '</b>
                    </li>
                </ul>
            </li>
            <li><i>image</i> - '.__("brand thumbnail options: width, height, fit, align:", 'brands-for-woocommerce').'
                <ul>
                    <li><i>width</i> - '.__("width in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                    <li><i>height</i> - '.__("height in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                    <li><i>fit</i> - '.__("fit:", 'brands-for-woocommerce').'
                        <ul>
                            <li><i>cover</i> - '.__("default", 'brands-for-woocommerce').'</li>
                            <li><i>contain</i></li>
                            <li><i>fill</i></li>
                            <li><i>none</i></li>
                        </ul>
                    </li>
                    <li><i>align</i> - '.__("align:", 'brands-for-woocommerce') . '
                        <ul>
                            <li><i>left</i> - '.__("left to description", 'brands-for-woocommerce').'</li>
                            <li><i>right</i> - '.__("right to description", 'brands-for-woocommerce').'</li>
                            <li><i>none</i> - '.__("no align", 'brands-for-woocommerce').'</li>
                        </ul>
                    </li>
                    <li>
                        <b>' . __('Examples:', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('image="width:50%,height:50px,fit:contain,align:right"', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('image="width:50%,height:50px"', 'brands-for-woocommerce') . '</b>
                    </li>
                </ul>
            </li>
            <li><i>related</i> - '.__("related products options: per_page, columns, orderby, order, slider, hide_brands:", 'brands-for-woocommerce') . '
                <ul>
                    <li><i>per_page</i> - '.__("width in px or % (i.e. 50%, 100px; default is 100%)", 'brands-for-woocommerce').'</li>
                    <li>
                        <b>' . __('Examples:', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('related="width:50%,height:50px,fit:contain,align:right"', 'brands-for-woocommerce') . '</b><br/>
                        <b>' . __('image="width:50%,height:50px"', 'brands-for-woocommerce') . '</b>
                    </li>
                </ul>
            </li>';
    }

    public function get_cache_key() {
        global $berocket_unique_value;
        $berocket_unique_value++;
        $post_id = get_the_ID();
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
        return "{$this->cache_key}_{$post_id}_{$berocket_unique_value}{$language}";
    }
}
global $brbrand_deprecated_shortcodes_addon_inst;
$brbrand_deprecated_shortcodes_addon_inst = new brbrand_deprecated_shortcodes_divi_addon();

function berocket_apl_et_builder_ready() {
    if( class_exists('ET_Builder_Module') ) {
        class ET_Builder_Module_brands_by_name extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brands by Name', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_brands_by_name';
	            $this->vb_support = 'partial';

                $this->fields_defaults = array(
                    'image' => array('off'),
                    'imgh' => array( '64px', 'add_default_setting' ),
                    'text' => array('on', 'add_default_setting'),
                    'column' => array( 2, 'add_default_setting' ),
                    'position' => array( '1' ),
                    'style' => array( 'vertical' ),
                );
            }

            function get_fields() {
                $fields = array(
                    'image' => array(
                        "label"             => esc_html__( 'Display image', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'imgh' => array(
                        "label"             => esc_html__( 'Maximum image height', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'imgw' => array(
                        "label"             => esc_html__( 'Maximum image width', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'text' => array(
                        "label"             => esc_html__( 'Display name', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'column' => array(
                        "label"             => esc_html__( 'Columns', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                    'position' => array(
                        "label"           => esc_html__( 'Position', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            '1' => esc_html__( 'Name after image', 'brands-for-woocommerce' ),
                            '2'  => esc_html__( 'Name before image', 'brands-for-woocommerce' ),
                            '3'  => esc_html__( 'Name under image', 'brands-for-woocommerce' ),
                            '4'  => esc_html__( 'Show only on letter click', 'brands-for-woocommerce' ),
                        ),
                    ),
                    'style' => array(
                        "label"           => esc_html__( 'Style', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            'vertical' => esc_html__( 'Vertical', 'brands-for-woocommerce' ),
                            'horizontal'  => esc_html__( 'Horizontal', 'brands-for-woocommerce' ),
                        ),
                    ),
                    'color' => array(
                        "label"           => esc_html__( 'Color', 'brands-for-woocommerce' ),
                        'type'            => 'color-alpha',
                        'options'         => array(
                            'vertical' => esc_html__( 'Vertical', 'brands-for-woocommerce' ),
                            'horizontal'  => esc_html__( 'Horizontal', 'brands-for-woocommerce' ),
                        ),
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {
                $atts['image'] = ! empty($atts['image']) && $atts['image'] == 'on';
                $atts['text'] = empty($atts['text']) || $atts['text'] == 'on';

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->brands_catalog_shortcode($atts);
            }

            protected function _add_additional_border_fields() {
                parent::_add_additional_border_fields();

                $this->advanced_options["border"]['css'] = array(
                    'main' => array(
                        'border_radii'  => "%%order_class%% .et_pb_image_wrap",
                        'border_styles' => "%%order_class%% .et_pb_image_wrap",
                    )
                );

            }
        }
        new ET_Builder_Module_brands_by_name;
        class ET_Builder_Module_brands_list extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brands List', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_brands_list';
	            $this->vb_support = 'partial';

                $this->fields_defaults = array(
                    'use_image' => array('on', 'add_default_setting'),
                    'imgh' => array( '64px', 'add_default_setting' ),
                    'text' => array('off', 'add_default_setting'),
                    'hide_empty' => array('on', 'add_default_setting'),
                    'slider' => array('off', 'add_default_setting'),
                    'per_row' => array('3', 'add_default_setting'),
                    'count' => array('', 'add_default_setting'),
                    'orderby' => array('name', 'add_default_setting'),
                    'padding' => array('3px', 'add_default_setting'),
                    'border_color' => array('', 'add_default_setting'),
                    'border_width' => array('', 'add_default_setting'),
                );
            }

            function get_fields() {
                $fields = array(
                    'title' => array(
                        "label"             => esc_html__( 'Title', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'use_image' => array(
                        "label"             => esc_html__( 'Display image', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'imgh' => array(
                        "label"             => esc_html__( 'Image height', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'use_name' => array(
                        "label"             => esc_html__( 'Display name', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'hide_empty' => array(
                        "label"             => esc_html__( 'Hide brands without products', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'slider' => array(
                        "label"             => esc_html__( 'Display as slider', 'brands-for-woocommerce' ),
                        'type'              => 'yes_no_button',
                        'options'           => array(
                            'off' => esc_html__( "No", 'et_builder' ),
                            'on'  => esc_html__( 'Yes', 'et_builder' ),
                        ),
                    ),
                    'per_row' => array(
                        "label"             => esc_html__( 'Brands per row', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                    'count' => array(
                        "label"             => esc_html__( 'Number of brands', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                    'orderby' => array(
                        "label"           => esc_html__( 'Order By', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            'name' => esc_html__( 'Brand name', 'brands-for-woocommerce' ),
                            'count'  => esc_html__( 'Count of products', 'brands-for-woocommerce' ),
                        ),
                    ),
                    'padding' => array(
                        "label"             => esc_html__( 'Padding around brands', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'border_color' => array(
                        "label"           => esc_html__( 'Border color', 'brands-for-woocommerce' ),
                        'type'            => 'color-alpha',
                    ),
                    'border_width' => array(
                        "label"             => esc_html__( 'Border width', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {
                $atts['use_image'] = empty($atts['use_image']) || $atts['use_image'] == 'on';
                $atts['use_name'] = ! empty($atts['use_name']) && $atts['use_name'] == 'on';
                $atts['hide_empty'] = empty($atts['hide_empty']) || $atts['hide_empty'] == 'on';
                $atts['slider'] = ! empty($atts['slider']) && $atts['slider'] == 'on';

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->brands_list_shortcode($atts);
            }

            protected function _add_additional_border_fields() {
            }
        }
        new ET_Builder_Module_brands_list;
        class ET_Builder_Module_brands_products extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brands Products', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_brands_products';

                $this->fields_defaults = array(
                    'brand_id' => array('', 'add_default_setting'),
                    'brand_slug' => array('', 'add_default_setting'),
                    'columns' => array( '4', 'add_default_setting' ),
                    'orderby' => array('title', 'add_default_setting'),
                    'order' => array('desc', 'add_default_setting'),
                );
            }

            function get_fields() {
                $fields = array(
                    'brand_id' => array(
                        "label"             => esc_html__( 'brand ID(s)', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'brand_slug' => array(
                        "label"             => esc_html__( 'brand slug(s)', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'columns' => array(
                        "label"             => esc_html__( 'count of columns for product list', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                    'orderby' => array(
                        "label"           => esc_html__( 'Order By', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            'title' => esc_html__( 'Order by title', 'brands-for-woocommerce' ),
                            'name' => esc_html__( 'Order by post name (post slug)', 'brands-for-woocommerce' ),
                            'date' => esc_html__( 'Order by date', 'brands-for-woocommerce' ),
                            'modified' => esc_html__( 'Order by last modified date', 'brands-for-woocommerce' ),
                            'rand' => esc_html__( 'Random order', 'brands-for-woocommerce' ),
                        ),
                    ),
                    'order' => array(
                        "label"           => esc_html__( 'Order Type', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            'asc' => esc_html__( 'ascending', 'brands-for-woocommerce' ),
                            'desc'  => esc_html__( 'descending', 'brands-for-woocommerce' ),
                        ),
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->products_shortcode($atts);
            }

            protected function _add_additional_border_fields() {
            }
        }
        new ET_Builder_Module_brands_products;
        class ET_Builder_Module_product_brands_info extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brand info for product page', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_product_brands_info';

                $this->fields_defaults = array(
                    'type' => array('name,image,description', 'add_default_setting'),
                    'product_id' => array('', 'add_default_setting'),
                );
            }

            function get_fields() {
                $fields = array(
                    'type' => array(
                        "label"             => esc_html__( 'Data type', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'product_id' => array(
                        "label"             => esc_html__( 'Product ID', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->product_brands_info_shortcode($atts);
            }

            protected function _add_additional_border_fields() {
            }
        }
        new ET_Builder_Module_product_brands_info;
        class ET_Builder_Module_brands_info extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brand info', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_brands_info';

                $this->fields_defaults = array(
                    'type' => array('name,image,description', 'add_default_setting'),
                    'id' => array('', 'add_default_setting'),
                );
            }

            function get_fields() {
                $fields = array(
                    'type' => array(
                        "label"             => esc_html__( 'Data type', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'id' => array(
                        "label"             => esc_html__( 'Brand ID', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->brands_info_shortcode($atts);
            }

            protected function _add_additional_border_fields() {
            }
        }
        new ET_Builder_Module_brands_info;
        class ET_Builder_Module_brands_product_thumbnail extends ET_Builder_Module {
            function init() {
                $this->name       = __( 'Brand thumbnail', 'brands-for-woocommerce' ) . '(DEPRECATED)';
                $this->slug       = 'et_pb_brands_product_thumbnail';

                $this->fields_defaults = array(
                    'post_id' => array('', 'add_default_setting'),
                    'width' => array('35%', 'add_default_setting'),
                    'height' => array('', 'add_default_setting'),
                    'position' => array('right', 'add_default_setting'),
                );
            }

            function get_fields() {
                $fields = array(
                    'post_id' => array(
                        "label"             => esc_html__( 'Product ID', 'brands-for-woocommerce' ),
                        'type'              => 'number',
                    ),
                    'width' => array(
                        "label"             => esc_html__( 'Data type', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'height' => array(
                        "label"             => esc_html__( 'Data type', 'brands-for-woocommerce' ),
                        'type'              => 'text',
                    ),
                    'position' => array(
                        "label"           => esc_html__( 'Position', 'brands-for-woocommerce' ),
                        'type'            => 'select',
                        'options'         => array(
                            'none' => esc_html__( 'none', 'brands-for-woocommerce' ),
                            'left' => esc_html__( 'left', 'brands-for-woocommerce' ),
                            'right' => esc_html__( 'right', 'brands-for-woocommerce' ),
                        ),
                    ),
                );

                return $fields;
            }

            function shortcode_callback( $atts, $content = null, $function_name = '' ) {

                global $brbrand_deprecated_shortcodes_addon_inst;
                return $brbrand_deprecated_shortcodes_addon_inst->brands_product_thumbnail($atts);
            }

            protected function _add_additional_border_fields() {
            }
        }
        new ET_Builder_Module_brands_product_thumbnail;
    }
}

add_action('et_builder_modules_loaded', 'berocket_apl_et_builder_ready');
