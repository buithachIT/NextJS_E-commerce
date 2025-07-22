<?php

class BREX_BrandExtension extends DiviExtension {
	public $gettext_domain = 'brbrand-my-extension';
	public $name = 'brbrand-extension';
	public $version = '1.0.0';
	public function __construct( $name = 'brbrand-extension', $args = array() ) {
		$this->plugin_dir     = plugin_dir_path( __FILE__ );
		$this->plugin_dir_url = plugin_dir_url( $this->plugin_dir );

		parent::__construct( $name, $args );
        add_action('wp_ajax_brbrand_alphabet_brand', array($this, 'alphabet_brand'));
        add_action('wp_ajax_brbrand_brands_list', array($this, 'brands_list'));
        add_action('wp_ajax_brbrand_brands_products', array($this, 'brands_products'));
        add_action('wp_ajax_brbrand_product_brands_info', array($this, 'product_brands_info'));
        add_action('wp_ajax_brbrands_description', array($this, 'description'));
	}
    public function alphabet_brand() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die();
        }
        $atts = berocket_sanitize_array($_POST);
        $atts = self::convert_on_off($atts);
        the_widget( 'berocket_alphabet_brand_widget', $atts );
        wp_die();
    }
    public function brands_list() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die();
        }
        $atts = berocket_sanitize_array($_POST);
        $atts = self::convert_on_off($atts);
        if( empty($atts['brands_number']) || intval($atts['brands_number']) == 0 || $atts['brands_number'] == 'All' ) {
            $atts['brands_number'] = '';
        } else {
            $atts['brands_number'] = intval($atts['brands_number']);
        }
        the_widget( 'berocket_product_brand_widget', $atts );
        wp_die();
    }
    public function brands_products() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die();
        }
        $atts = berocket_sanitize_array($_POST);
        $atts = self::convert_on_off($atts);
        the_widget( 'berocket_product_list_widget', $atts );
        wp_die();
    }
    public function product_brands_info() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die();
        }
        $atts = berocket_sanitize_array($_POST);
        $atts = self::convert_on_off($atts);
        if( ! empty($atts['product']) ) {
            if( $atts['product'] == 'latest' ) {
                global $wpdb;
                $atts['product'] = $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE post_type = 'product' AND post_status = 'publish' ORDER BY ID DESC LIMIT 1");
            } elseif( $atts['product'] == 'current' ) {
                global $product;
                if( ! empty($product) && is_a($product, 'wc_product') ) {
                    $atts['product'] = $product->get_id();
                }
            }
        }
        $atts['product'] = intval($atts['product']);
        the_widget( 'berocket_product_brands_info_widget', $atts );
        wp_die();
    }
    public function description() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die();
        }
        $atts = berocket_sanitize_array($_POST);
        $atts = self::convert_on_off($atts);
        the_widget( 'berocket_product_brand_description_widget', $atts );
        wp_die();
    }
	public function wp_hook_enqueue_scripts() {
		if ( $this->_debug ) {
			$this->_enqueue_debug_bundles();
		} else {
			$this->_enqueue_bundles();
		}

		if ( et_core_is_fb_enabled() && ! et_builder_bfb_enabled() ) {
            $BeRocket_product_brand = BeRocket_product_brand::getInstance();
            $options = $BeRocket_product_brand->get_option();
			$this->_enqueue_backend_styles();
            brfr_add_slider_script($options, '.br_test');
		}

		// Normalize the extension name to get actual script name. For example from 'divi-custom-modules' to `DiviCustomModules`.
		$extension_name = str_replace( ' ', '', ucwords( str_replace( '-', ' ', $this->name ) ) );

		// Enqueue frontend bundle's data.
		if ( ! empty( $this->_frontend_js_data ) ) {
			wp_localize_script( "{$this->name}-frontend-bundle", "{$extension_name}FrontendData", $this->_frontend_js_data );
		}

		// Enqueue builder bundle's data.
		if ( et_core_is_fb_enabled() && ! empty( $this->_builder_js_data ) ) {
			wp_localize_script( "{$this->name}-builder-bundle", "{$extension_name}BuilderData", $this->_builder_js_data );
		}
	}
    public static function convert_on_off($atts) {
        foreach($atts as &$attr) {
            if( $attr === 'on' || $attr === 'off' ) {
                $attr = ( $attr === 'on' ? TRUE : FALSE );
            }
        }
        foreach($atts as $name => $attr) {
            if( strpos($name, 'brl-') === 0 ) {
                $brands_list = self::get_brands_for_option('term_id');
                $new_name = str_replace('brl-', '', $name);
                $brands = explode(',', $attr);
                $brands_val = array();
                foreach($brands as $brand) {
                    $brands_val[] = $brands_list[$brand];
                }
                $atts[$new_name] = implode(',', $brands_val);
            }
        }
        return $atts;
    }
    public static function get_brands_for_option($field_name = 'name') {
        $params = array( 'hide_empty' => false, 'per_page' => -1, 'taxonomy' => BeRocket_product_brand::$taxonomy_name );
        $brands = get_terms( $params );
        $brands_option = array();
        foreach($brands as $brand) {
            $brands_option[$brand->{$field_name}] = $brand->name;
        }
        return $brands_option;
    }
}

new BREX_BrandExtension;
