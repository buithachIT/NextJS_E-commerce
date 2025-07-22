<?php

class ET_Builder_Module_brands_list_2 extends ET_Builder_Module {

	public $slug       = 'et_pb_brands_list_2';
	public $vb_support = 'on';

	protected $module_credits = array(
		'module_uri' => '',
		'author'     => '',
		'author_uri' => '',
	);
    function init() {
        $this->name       = __( 'Brands List', 'brands-for-woocommerce' );
		$this->folder_name = 'et_pb_berocket_modules';
		$this->main_css_element = '%%order_class%%';

        $this->fields_defaults = array(
            'use_name'              => array('on'),
            'img_display'           => array( 'on', 'add_default_setting' ),
            'img_display'           => array('on', 'add_default_setting'),
            'img_width'             => array('100', 'add_default_setting'),
            'img_width_units'       => array('%', 'add_default_setting'),
            'img_height'            => array('100', 'add_default_setting'),
            'img_height_units'      => array('%', 'add_default_setting'),
            'img_fit'               => array('cover', 'add_default_setting'),
            'img_align'             => array('none', 'add_default_setting'),
            'orderby'               => array('title', 'add_default_setting'),
            'order'                 => array('asc', 'add_default_setting'),
            'count'                 => array('on', 'add_default_setting'),
            'hide_empty'            => array('on', 'add_default_setting'),
            'out_of_stock'          => array('on', 'add_default_setting'),
            'featured_first'        => array('on', 'add_default_setting'),
            'slider'                => array('on', 'add_default_setting'),
            'show_all'              => array('on', 'add_default_setting'),
            'category_only'         => array('on', 'add_default_setting'),
            'hierarchy'             => array('all', 'add_default_setting'),
            'brl-brands_include'    => array('', 'add_default_setting'),
            'per_row'               => array('3', 'add_default_setting'),
            'brands_number'         => array('All', 'add_default_setting'),
            'padding'               => array('3', 'add_default_setting'),
            'margin'                => array('3', 'add_default_setting'),
            'border_width'          => array('', 'add_default_setting'),
            'border_color'          => array('', 'add_default_setting'),
        );
		$this->advanced_fields = array(
			'fonts'           => array(
				'brand_title'   => array(
					'label'        => et_builder_i18n( 'Brand Title' ),
					'css'          => array(
						'main'      => "{$this->main_css_element} .brand_info a span",
						'important' => 'plugin_only',
					),
				),
			),
			'margin_padding' => array(
				'css' => array(
					'padding'   => "{$this->main_css_element} .br_widget_brand_element_slider",
					'margin'    => "{$this->main_css_element} .br_widget_brand_element_slider",
					'important' => 'all',
				),
			),
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
			'max_width'     => false,
		);
    }

    function get_fields() {
        $fields = array(
            'use_name' => array(
                "label"             => esc_html__( 'Display text', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'img_display' => array(
                "label"             => esc_html__( 'Display image', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'img_width' => array(
                "label"             => esc_html__( 'Image Width', 'brands-for-woocommerce' ),
                'type'              => 'number',
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'img_width_units' => array(
                "label"           => esc_html__( 'Image Width Units', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'px' => esc_html__( 'px', 'brands-for-woocommerce' ),
                    '%'  => esc_html__( '%', 'brands-for-woocommerce' ),
                ),
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'img_height' => array(
                "label"             => esc_html__( 'Image Height', 'brands-for-woocommerce' ),
                'type'              => 'number',
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'img_height_units' => array(
                "label"           => esc_html__( 'Image Height Units', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'px' => esc_html__( 'px', 'brands-for-woocommerce' ),
                    '%'  => esc_html__( '%', 'brands-for-woocommerce' ),
                ),
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'img_fit' => array(
                "label"           => esc_html__( 'Image Fit', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'cover'     => esc_html__( 'Cover', 'brands-for-woocommerce' ),
                    'contain'   => esc_html__( 'Contain', 'brands-for-woocommerce' ),
                    'fill'      => esc_html__( 'Fill', 'brands-for-woocommerce' ),
                    'none'      => esc_html__( 'None', 'brands-for-woocommerce' ),
                ),
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'img_align' => array(
                "label"           => esc_html__( 'Image Align', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'left'      => esc_html__( 'Left to text', 'brands-for-woocommerce' ),
                    'right'     => esc_html__( 'Right to text', 'brands-for-woocommerce' ),
                    'none'      => esc_html__( 'None', 'brands-for-woocommerce' ),
                ),
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'orderby' => array(
                "label"           => esc_html__( 'Related products Order by', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'title'     => esc_html__( 'Title', 'brands-for-woocommerce' ),
                    'name'      => esc_html__( 'Product name', 'brands-for-woocommerce' ),
                    'date'      => esc_html__( 'Date of creation', 'brands-for-woocommerce' ),
                    'modified'  => esc_html__( 'Last modified date', 'brands-for-woocommerce' ),
                    'rand'      => esc_html__( 'Random', 'brands-for-woocommerce' ),
                ),
            ),
            'order' => array(
                "label"           => esc_html__( 'Related products Order', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'asc'       => esc_html__( 'Asc', 'brands-for-woocommerce' ),
                    'desc'      => esc_html__( 'Desc', 'brands-for-woocommerce' ),
                ),
            ),
            'count' => array(
                "label"             => esc_html__( 'Show number of products', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'hide_empty' => array(
                "label"             => esc_html__( 'Hide brands with no products', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'out_of_stock' => array(
                "label"             => esc_html__( 'Hide brands with products out of stock', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'featured_first' => array(
                "label"             => esc_html__( 'Featured first', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
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
            'category_only' => array(
                "label"             => esc_html__( 'Only brands of this category (on category page)', 'brands-for-woocommerce' ),
                'type'              => 'yes_no_button',
                'options'           => array(
                    'off' => esc_html__( "No", 'et_builder' ),
                    'on'  => esc_html__( 'Yes', 'et_builder' ),
                ),
            ),
            'hierarchy' => array(
                "label"           => esc_html__( 'Show brands hierarchy', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'top'       => esc_html__( 'Only top level', 'brands-for-woocommerce' ),
                    'children'  => esc_html__( 'Only children (without hierarchy)', 'brands-for-woocommerce' ),
                    'expand'    => esc_html__( 'Show full hierarchy', 'brands-for-woocommerce' ),
                    'by_click'  => esc_html__( 'Expand by click', 'brands-for-woocommerce' ),
                    'all'       => esc_html__( 'All brands without hierarchy', 'brands-for-woocommerce' ),
                ),
            ),
            'brl-brands_include' => array(
                "label"           => esc_html__( 'Show only selected brand(s)', 'brands-for-woocommerce' ),
                'type'             => 'categories',
                'renderer_options' => array(
                    'use_terms'    => true,
                    'term_name'    => BeRocket_product_brand::$taxonomy_name,
                ),
            ),
            'per_row' => array(
                "label"           => esc_html__( 'Brands per row', 'brands-for-woocommerce' ),
                'type'            => 'number',
            ),
            'brands_number' => array(
                "label"           => esc_html__( 'Brands in list', 'brands-for-woocommerce' ),
                'type'            => 'number',
            ),
            'padding' => array(
                "label"           => esc_html__( 'Padding, px', 'brands-for-woocommerce' ),
                'type'            => 'number',
            ),
            'margin' => array(
                "label"           => esc_html__( 'Margin, px', 'brands-for-woocommerce' ),
                'type'            => 'number',
            ),
            'border_width' => array(
                "label"           => esc_html__( 'Border width, px', 'brands-for-woocommerce' ),
                'type'            => 'number',
            ),
            'border_color' => array(
                "label"           => esc_html__( 'Border color', 'brands-for-woocommerce' ),
                'type'            => 'color-alpha',
            ),
        );

        return $fields;
    }

    function render( $atts, $content = null, $function_name = '' ) {
        $atts = BREX_BrandExtension::convert_on_off($atts);
        if( empty($atts['brands_number']) || intval($atts['brands_number']) == 0 || $atts['brands_number'] == 'All' ) {
            $atts['brands_number'] = '';
        } else {
            $atts['brands_number'] = intval($atts['brands_number']);
        }
        ob_start();
        the_widget( 'berocket_product_brand_widget', $atts );
        return ob_get_clean();
    }
}

new ET_Builder_Module_brands_list_2;
