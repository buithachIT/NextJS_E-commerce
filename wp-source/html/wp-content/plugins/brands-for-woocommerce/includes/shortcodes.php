<?php
class BeRocket_product_brand_shortcode {
    function __construct() {
        add_filter('brbrands_section_shortcodes_explanation_list', array($this, 'shortcodes_explanation'));
        add_shortcode( 'brb_catalog', array( $this, 'catalog_shortcode' ) );
        add_shortcode( 'brb_description', array( $this, 'brand_description' ) );
        add_shortcode( 'brb_brands_list', array( $this, 'brands_list' ) );
        add_shortcode( 'brb_products_list', array( $this, 'products_list' ) );
        add_shortcode( 'brb_prod_binfo', array( $this, 'prod_binfo' ) );
    }
    function catalog_shortcode($atts = array()) {
        if( ! is_array($atts) ) {
            $atts = array();
        }
        $atts = berocket_sanitize_array($atts);
        ob_start();
        the_widget( 'berocket_alphabet_brand_widget', $atts );
        return ob_get_clean();
    }
    function brand_description($atts = array()) {
        if( ! is_array($atts) ) {
            $atts = array();
        }
        $atts = berocket_sanitize_array($atts);
        if( ! empty($atts['brand_id']) ) {
            $atts['id'] = $atts['brand_id'];
            unset($atts['brand_id']);
        }
        ob_start();
        the_widget( 'berocket_product_brand_description_widget', $atts );
        return ob_get_clean();
    }
    function brands_list($atts = array()) {
        if( ! is_array($atts) ) {
            $atts = array();
        }
        $atts = berocket_sanitize_array($atts);
        ob_start();
        the_widget( 'berocket_product_brand_widget', $atts );
        return ob_get_clean();
    }
    function products_list($atts = array()) {
        if( ! is_array($atts) ) {
            $atts = array();
        }
        $atts = berocket_sanitize_array($atts);
        if( empty($atts['brand_field']) ) {
            $atts['brand_field'] = 'term_id';
        }
        ob_start();
        the_widget( 'berocket_product_list_widget', $atts );
        return ob_get_clean();
    }
    function prod_binfo($atts = array()) {
        if( ! is_array($atts) ) {
            $atts = array();
        }
        $atts = berocket_sanitize_array($atts);
        ob_start();
        the_widget( 'berocket_product_brands_info_widget', $atts );
        return ob_get_clean();
    }
    function shortcodes_explanation($explanation) {
        $explanation[] = '<li>
            <span class="br_shortcode_title">
                <strong><i class="fas fa-caret-right"></i>&nbsp;[brb_catalog]</strong> - '.__("Brand Catalog", 'brands-for-woocommerce').'
            </span>
            <ul class="br_shortcode_attributes">
                <li><i>use_name</i> - (1 or 0) '.__("Display text", 'brands-for-woocommerce').'</li>
                <li><i>img_display</i> - (1 or 0) '.__("Display image", 'brands-for-woocommerce').'</li>
                <li><i>img_width</i> - (integer) '.__("Image Width number", 'brands-for-woocommerce').'</li>
                <li><i>img_width_units</i> - '.__("Image Width units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("img_width in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("img_width in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_height</i> - (integer) '.__("Image Height number", 'brands-for-woocommerce').'</li>
                <li><i>img_height_units</i> - '.__("Image Height units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("img_height in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("img_height in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_fit</i> - '.__("Image Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_align</i> - '.__("Image Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>orderby</i> - '.__("Related products Order by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>title</i> - '.__("Title", 'brands-for-woocommerce').'</li>
                        <li><i>name</i> - '.__("Product name", 'brands-for-woocommerce').'</li>
                        <li><i>date</i> - '.__("Date of creation", 'brands-for-woocommerce').'</li>
                        <li><i>modified</i> - '.__("Last modified date", 'brands-for-woocommerce').'</li>
                        <li><i>rand</i> - '.__("Random", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>order</i> - '.__("Related products Order", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>asc</i> - '.__("Ascending", 'brands-for-woocommerce').'</li>
                        <li><i>desc</i> - '.__("Descending", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>count</i> - (1 or 0) '.__("Show number of products", 'brands-for-woocommerce').'</li>
                <li><i>hide_empty</i> - (1 or 0) '.__("Hide brands with no products", 'brands-for-woocommerce').'</li>
                <li><i>out_of_stock</i> - (1 or 0) '.__("Hide brands with products out of stock", 'brands-for-woocommerce').'</li>
                <li><i>featured_first</i> - (1 or 0) '.__("Featured first", 'brands-for-woocommerce').'</li>
                <li><i>show_all</i> - (1 or 0) '.__('Show "All" tab', 'brands-for-woocommerce').'</li>
                <li><i>category_only</i> - (1 or 0) '.__('Only brands of this category (on category page)', 'brands-for-woocommerce').'</li>
                <li><i>hierarchy</i> - '.__("Show brands hierarchy", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>top</i> - '.__("Only top level", 'brands-for-woocommerce').'</li>
                        <li><i>children</i> - '.__("Only children (without hierarchy)", 'brands-for-woocommerce').'</li>
                        <li><i>expand</i> - '.__("Show full hierarchy", 'brands-for-woocommerce').'</li>
                        <li><i>by_click</i> - '.__("Expand by click", 'brands-for-woocommerce').'</li>
                        <li><i>all</i> - '.__("All brands without hierarchy", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>brands_include</i> - (string) '.__('Show only selected brand(s). Use comma separated brand names', 'brands-for-woocommerce').'</li>
                <li><i>groupby</i> - '.__("Group by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>alphabet</i> - '.__("Alphabet", 'brands-for-woocommerce').'</li>
                        <li><i>category</i> - '.__("Category", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>style</i> - '.__("Layout", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>vertical</i> - '.__("Vertical", 'brands-for-woocommerce').'</li>
                        <li><i>horizontal</i> - '.__("Horizontal", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>column</i> - (integer) '.__('Number of columns to display', 'brands-for-woocommerce').'</li>
            </ul>
        </li>';
        $explanation[] = '<li>
            <span class="br_shortcode_title">
                <strong><i class="fas fa-caret-right"></i>&nbsp;[brb_description]</strong> - '.__("Product Brands Description", 'brands-for-woocommerce').'
            </span>
            <ul class="br_shortcode_attributes">
                <li><i>brand_id</i> - (integer) '.__("Single Brand ID", 'brands-for-woocommerce').'</li>
                <li><i>display_title</i> - (1 or 0) '.__("Display brand title", 'brands-for-woocommerce').'</li>
                <li><i>display_description</i> - (1 or 0) '.__("Display brand description", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_display</i> - (1 or 0) '.__("Display Thumbnail", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_width</i> - (integer) '.__("Thumbnail Width number", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_width_units</i> - '.__("Thumbnail Width units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("thumbnail_width in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("thumbnail_width in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>thumbnail_height</i> - (integer) '.__("Thumbnail Height number", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_height_units</i> - '.__("Thumbnail Height units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("thumbnail_height in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("thumbnail_height in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>thumbnail_fit</i> - '.__("Thumbnail Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>thumbnail_align</i> - '.__("Thumbnail Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_display</i> - (1 or 0) '.__("Display Banner", 'brands-for-woocommerce').'</li>
                <li><i>banner_width</i> - (integer) '.__("Banner Width number", 'brands-for-woocommerce').'</li>
                <li><i>banner_width_units</i> - '.__("Banner Width units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("banner_width in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("banner_width in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_height</i> - (integer) '.__("Banner Height number", 'brands-for-woocommerce').'</li>
                <li><i>banner_height_units</i> - '.__("Banner Height units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("banner_height in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("banner_height in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_fit</i> - '.__("Banner Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_align</i> - '.__("Banner Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>related_products_display</i> - (1 or 0) '.__("Display Related products", 'brands-for-woocommerce').'</li>
                <li><i>per_page</i> - (integer) '.__("Related products Per page. Set empty for all products", 'brands-for-woocommerce').'</li>
                <li><i>columns</i> - (integer) '.__("Related products Columns", 'brands-for-woocommerce').'</li>
                <li><i>orderby</i> - '.__("Related products Order by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>title</i> - '.__("Title", 'brands-for-woocommerce').'</li>
                        <li><i>name</i> - '.__("Product name", 'brands-for-woocommerce').'</li>
                        <li><i>date</i> - '.__("Date of creation", 'brands-for-woocommerce').'</li>
                        <li><i>modified</i> - '.__("Last modified date", 'brands-for-woocommerce').'</li>
                        <li><i>rand</i> - '.__("Random", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>order</i> - '.__("Related products Order", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>asc</i> - '.__("Ascending", 'brands-for-woocommerce').'</li>
                        <li><i>desc</i> - '.__("Descending", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>slider</i> - (1 or 0) '.__("Related products Slider", 'brands-for-woocommerce').'</li>
                <li><i>hide_brands</i> - (1 or 0) '.__("Related products Hide Brands", 'brands-for-woocommerce').'</li>
                <li><i>display_link</i> - (1 or 0) '.__("Display external link", 'brands-for-woocommerce').'</li>
                <li><i>featured</i> - (1 or 0) '.__("Display last created featured brand", 'brands-for-woocommerce').'</li>
            </ul>
        </li>';
        $explanation[] = '<li>
            <span class="br_shortcode_title">
                <strong><i class="fas fa-caret-right"></i>&nbsp;[brb_brands_list]</strong> - '.__("Brands List", 'brands-for-woocommerce').'
            </span>
            <ul class="br_shortcode_attributes">
                <li><i>use_name</i> - (1 or 0) '.__("Display text", 'brands-for-woocommerce').'</li>
                <li><i>img_display</i> - (1 or 0) '.__("Display image", 'brands-for-woocommerce').'</li>
                <li><i>img_width</i> - (integer) '.__("Image Width number", 'brands-for-woocommerce').'</li>
                <li><i>img_width_units</i> - '.__("Image Width units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("img_width in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("img_width in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_height</i> - (integer) '.__("Image Height number", 'brands-for-woocommerce').'</li>
                <li><i>img_height_units</i> - '.__("Image Height units", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>px</i> - '.__("img_height in px", 'brands-for-woocommerce').'</li>
                        <li><i>%</i> - '.__("img_height in %", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_fit</i> - '.__("Image Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>img_align</i> - '.__("Image Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>orderby</i> - '.__("Related products Order by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>title</i> - '.__("Title", 'brands-for-woocommerce').'</li>
                        <li><i>name</i> - '.__("Product name", 'brands-for-woocommerce').'</li>
                        <li><i>date</i> - '.__("Date of creation", 'brands-for-woocommerce').'</li>
                        <li><i>modified</i> - '.__("Last modified date", 'brands-for-woocommerce').'</li>
                        <li><i>rand</i> - '.__("Random", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>order</i> - '.__("Related products Order", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>asc</i> - '.__("Ascending", 'brands-for-woocommerce').'</li>
                        <li><i>desc</i> - '.__("Descending", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>count</i> - (1 or 0) '.__("Show number of products", 'brands-for-woocommerce').'</li>
                <li><i>hide_empty</i> - (1 or 0) '.__("Hide brands with no products", 'brands-for-woocommerce').'</li>
                <li><i>out_of_stock</i> - (1 or 0) '.__("Hide brands with products out of stock", 'brands-for-woocommerce').'</li>
                <li><i>featured_first</i> - (1 or 0) '.__("Featured first", 'brands-for-woocommerce').'</li>
                <li><i>slider</i> - (1 or 0) '.__("Slider", 'brands-for-woocommerce').'</li>
                <li><i>category_only</i> - (1 or 0) '.__('Only brands of this category (on category page)', 'brands-for-woocommerce').'</li>
                <li><i>hierarchy</i> - '.__("Show brands hierarchy", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>top</i> - '.__("Only top level", 'brands-for-woocommerce').'</li>
                        <li><i>children</i> - '.__("Only children (without hierarchy)", 'brands-for-woocommerce').'</li>
                        <li><i>expand</i> - '.__("Show full hierarchy", 'brands-for-woocommerce').'</li>
                        <li><i>by_click</i> - '.__("Expand by click", 'brands-for-woocommerce').'</li>
                        <li><i>all</i> - '.__("All brands without hierarchy", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>brands_include</i> - (string) '.__('Show only selected brand(s). Use comma separated brand names', 'brands-for-woocommerce').'</li>
                <li><i>per_row</i> - (integer) '.__('Brands per row', 'brands-for-woocommerce').'</li>
                <li><i>brands_number</i> - (integer) '.__('Brands in list', 'brands-for-woocommerce').'</li>
                <li><i>padding</i> - (integer) '.__('Padding, px', 'brands-for-woocommerce').'</li>
                <li><i>margin</i> - (integer) '.__('Margin, px', 'brands-for-woocommerce').'</li>
                <li><i>border_width</i> - (integer) '.__('Border width, px', 'brands-for-woocommerce').'</li>
                <li><i>border_color</i> - (hex) '.__('Border color, color in hex, example #FF0000', 'brands-for-woocommerce').'</li>
            </ul>
        </li>';
        $explanation[] = '<li>
            <span class="br_shortcode_title">
                <strong><i class="fas fa-caret-right"></i>&nbsp;[brb_products_list]</strong> - '.__("Brands Products", 'brands-for-woocommerce').'
            </span>
            <ul class="br_shortcode_attributes">
                <li><i>per_page</i> - (integer) '.__("Per page", 'brands-for-woocommerce').'</li>
                <li><i>columns</i> - (integer) '.__("count of columns for product list", 'brands-for-woocommerce').'</li>
                <li><i>orderby</i> - '.__("Products Order by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>title</i> - '.__("Title", 'brands-for-woocommerce').'</li>
                        <li><i>name</i> - '.__("Product name", 'brands-for-woocommerce').'</li>
                        <li><i>date</i> - '.__("Date of creation", 'brands-for-woocommerce').'</li>
                        <li><i>modified</i> - '.__("Last modified date", 'brands-for-woocommerce').'</li>
                        <li><i>rand</i> - '.__("Random", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>order</i> - '.__("Products Order", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>asc</i> - '.__("Ascending", 'brands-for-woocommerce').'</li>
                        <li><i>desc</i> - '.__("Descending", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>slider</i> - (1 or 0) '.__("Slider", 'brands-for-woocommerce').'</li>
                <li><i>hide_brands</i> - (1 or 0) '.__("Hide brands", 'brands-for-woocommerce').'</li>
                <li><i>hide_pagination</i> - (1 or 0) '.__("Hide pagination", 'brands-for-woocommerce').'</li>
                <li><i>hide_labels</i> - (1 or 0) '.__("Hide BeRocket labels", 'brands-for-woocommerce').'</li>
                <li><i>brands</i> - (integer) '.__("Brand ID", 'brands-for-woocommerce').'</li>
            </ul>
        </li>';
        $explanation[] = '<li>
            <span class="br_shortcode_title">
                <strong><i class="fas fa-caret-right"></i>&nbsp;[brb_prod_binfo]</strong> - '.__("Product Brand Info", 'brands-for-woocommerce').'
            </span>
            <ul class="br_shortcode_attributes">
                <li><i>product</i> - (integer) '.__("Product ID (on single product page get ID from product page)", 'brands-for-woocommerce').'</li>
                <li><i>limit</i> - (1 or 0) '.__("Show (leave empty for all)", 'brands-for-woocommerce').'</li>
                <li><i>display_title</i> - (1 or 0) '.__("Display brand title", 'brands-for-woocommerce').'</li>
                <li><i>display_description</i> - (1 or 0) '.__("Display brand description", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_display</i> - (1 or 0) '.__("Display Thumbnail", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_width</i> - (integer) '.__("Thumbnail Width", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_width_units</i> - (% or px) '.__("Thumbnail Width Units", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_height</i> - (integer) '.__("Thumbnail Height", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_height_units</i> - (% or px) '.__("Thumbnail Height Units", 'brands-for-woocommerce').'</li>
                <li><i>thumbnail_fit</i> - '.__("Thumbnail Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>thumbnail_align</i> - '.__("Thumbnail Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left to text", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right to text", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_display</i> - (1 or 0) '.__("Display Banner", 'brands-for-woocommerce').'</li>
                <li><i>banner_width</i> - (integer) '.__("Banner Width", 'brands-for-woocommerce').'</li>
                <li><i>banner_width_units</i> - (% or px) '.__("Banner Width Units", 'brands-for-woocommerce').'</li>
                <li><i>banner_height</i> - (integer) '.__("Banner Height", 'brands-for-woocommerce').'</li>
                <li><i>banner_height_units</i> - (% or px) '.__("Banner Height Units", 'brands-for-woocommerce').'</li>
                <li><i>banner_fit</i> - '.__("Banner Fit", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>cover</i> - '.__("Cover", 'brands-for-woocommerce').'</li>
                        <li><i>contain</i> - '.__("Contain", 'brands-for-woocommerce').'</li>
                        <li><i>fill</i> - '.__("Fill", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>banner_align</i> - '.__("Banner Align", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>left</i> - '.__("Left to text", 'brands-for-woocommerce').'</li>
                        <li><i>right</i> - '.__("Right to text", 'brands-for-woocommerce').'</li>
                        <li><i>none</i> - '.__("None", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>related_products_display</i> - (1 or 0) '.__("Display Related products", 'brands-for-woocommerce').'</li>
                <li><i>per_page</i> - (integer) '.__("Related products Per page", 'brands-for-woocommerce').'</li>
                <li><i>columns</i> - (integer) '.__("Related products Columns", 'brands-for-woocommerce').'</li>
                <li><i>orderby</i> - '.__("Related products Order by", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>title</i> - '.__("Title", 'brands-for-woocommerce').'</li>
                        <li><i>name</i> - '.__("Product name", 'brands-for-woocommerce').'</li>
                        <li><i>date</i> - '.__("Date of creation", 'brands-for-woocommerce').'</li>
                        <li><i>modified</i> - '.__("Last modified date", 'brands-for-woocommerce').'</li>
                        <li><i>rand</i> - '.__("Random", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>order</i> - '.__("Related products Order", 'brands-for-woocommerce').'
                    <ul>
                        <li><i>asc</i> - '.__("Asc", 'brands-for-woocommerce').'</li>
                        <li><i>desc</i> - '.__("Desc", 'brands-for-woocommerce').'</li>
                    </ul>
                </li>
                <li><i>slider</i> - (1 or 0) '.__("Related products Slider", 'brands-for-woocommerce').'</li>
                <li><i>hide_brands</i> - (1 or 0) '.__("Related products Hide Brands", 'brands-for-woocommerce').'</li>
                <li><i>display_link</i> - (1 or 0) '.__("Display external link", 'brands-for-woocommerce').'</li>
                <li><i>featured</i> - (1 or 0) '.__("Display last created featured brand", 'brands-for-woocommerce').'</li>
            </ul>
        </li>';
        return $explanation;
    }
}
new BeRocket_product_brand_shortcode();


