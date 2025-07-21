<?php

class ET_Builder_Module_brands_products_list extends ET_Builder_Module {

	public $slug       = 'et_pb_brands_products_list';
	public $vb_support = 'on';

	protected $module_credits = array(
		'module_uri' => '',
		'author'     => '',
		'author_uri' => '',
	);
    function init() {
        $this->name       = __( 'Brands Products', 'brands-for-woocommerce' );
		$this->folder_name = 'et_pb_berocket_modules';
		$this->main_css_element = '%%order_class%%';

        $this->fields_defaults = array(
            'per_page'          => array('', 'add_default_setting'),
            'columns'           => array('4', 'add_default_setting'),
            'orderby'           => array('title', 'add_default_setting'),
            'order'             => array('asc', 'add_default_setting'),
            'slider'            => array('', 'add_default_setting'),
            'hide_brands'       => array('', 'add_default_setting'),
            'hide_pagination'   => array('', 'add_default_setting'),
            'hide_labels'       => array('', 'add_default_setting'),
            'brands'            => array('', 'add_default_setting'),
        );
		$this->advanced_fields = array(
			'fonts'         => false,
			'link_options'  => false,
			'visibility'    => false,
			'text'          => false,
			'transform'     => false,
			'animation'     => false,
			'background'    => false,
			'borders'       => false,
			'box_shadow'    => false,
			'button'        => false,
			'filters'       => false,
			'margin_padding'=> false,
			'max_width'     => false,
		);
    }

    function get_fields() {
        $brands = BREX_BrandExtension::get_brands_for_option();
        $brands = array_merge(array('' => 'Current Brand(work only on brand archive page)'), $brands);
        $fields = array(
            'brands' => array(
                "label"           => esc_html__( 'Brand', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => $brands,
            ),
            'per_page' => array(
                "label"             => esc_html__( 'Per page', 'brands-for-woocommerce' ),
                'type'              => 'number',
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
            'slider' => array(
                "label"             => esc_html__( 'Slider', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'hide_brands' => array(
                "label"             => esc_html__( 'Hide brands', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'hide_pagination' => array(
                "label"             => esc_html__( 'Hide pagination', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'hide_labels' => array(
                "label"             => esc_html__( 'Hide BeRocket labels', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
        );

        return $fields;
    }

    function render( $atts, $content = null, $function_name = '' ) {
        $atts = BREX_BrandExtension::convert_on_off($atts);
        ob_start();
        the_widget( 'berocket_product_list_widget', $atts );
        return ob_get_clean();
    }
}

new ET_Builder_Module_brands_products_list;
