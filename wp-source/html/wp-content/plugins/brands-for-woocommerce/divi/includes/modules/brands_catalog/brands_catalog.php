<?php

class ET_Builder_Module_br_brand_catalog extends ET_Builder_Module {

	public $slug       = 'et_pb_brbrand_alphabet_brand';
	public $vb_support = 'on';

	protected $module_credits = array(
		'module_uri' => '',
		'author'     => '',
		'author_uri' => '',
	);
    function init() {
        $this->name       = __( 'Brand Catalog', 'brands-for-woocommerce' );
		$this->folder_name = 'et_pb_berocket_modules';
		$this->main_css_element = '%%order_class%%';

        $this->fields_defaults = array(
            'use_name'              => array('on'),
            'img_display'           => array( 'on', 'add_default_setting' ),
            'img_display'           => array('on', 'add_default_setting'),
            'img_width'             => array('', 'add_default_setting'),
            'img_width_units'       => array('%', 'add_default_setting'),
            'img_height'            => array('64', 'add_default_setting'),
            'img_height_units'      => array('px', 'add_default_setting'),
            'img_fit'               => array('cover', 'add_default_setting'),
            'img_align'             => array('above', 'add_default_setting'),
            'orderby'               => array('name', 'add_default_setting'),
            'order'                 => array('asc', 'add_default_setting'),
            'count'                 => array('on', 'add_default_setting'),
            'hide_empty'            => array('on', 'add_default_setting'),
            'out_of_stock'          => array('on', 'add_default_setting'),
            'featured_first'        => array('on', 'add_default_setting'),
            'show_all'              => array('on', 'add_default_setting'),
            'category_only'         => array('on', 'add_default_setting'),
            'hierarchy'             => array('all', 'add_default_setting'),
            'brl-brands_include'    => array('', 'add_default_setting'),
            'groupby'               => array('alphabet', 'add_default_setting'),
            'style'                 => array('vertical', 'add_default_setting'),
            'column'                => array('2'),
        );
		$this->advanced_fields = array(
			'fonts'           => array(
				'top_links'   => array(
					'label'        => et_builder_i18n( 'Top Links' ),
					'css'          => array(
						'main'      => "{$this->main_css_element} .berocket_brand_name_letters a",
						'important' => 'plugin_only',
					),
				),
				'letter_header'   => array(
					'label'        => et_builder_i18n( 'Letter Header' ),
					'css'          => array(
						'main'      => "{$this->main_css_element} .br_brand_letter_block h3",
						'important' => 'plugin_only',
					),
				),
				'brand_title'   => array(
					'label'        => et_builder_i18n( 'Brand Title' ),
					'css'          => array(
						'main'      => "{$this->main_css_element} .br_brand_name",
						'important' => 'plugin_only',
					),
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
			'margin_padding'=> false,
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
                    'above'      => esc_html__( 'Above name', 'brands-for-woocommerce' ),
                    'left'      => esc_html__( 'Left to name', 'brands-for-woocommerce' ),
                    'right'     => esc_html__( 'Right to name', 'brands-for-woocommerce' ),
                    'under'      => esc_html__( 'Under name', 'brands-for-woocommerce' ),
                ),
                'show_if'           => array(
                    'img_display' => 'on',
                )
            ),
            'orderby' => array(
                "label"           => esc_html__( 'Order by', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'alphabet'     => esc_html__( 'Alphabet', 'brands-for-woocommerce' ),
                    'products'      => esc_html__( 'Number of products', 'brands-for-woocommerce' ),
                    'order'      => esc_html__( 'Order', 'brands-for-woocommerce' ),
                    'random'      => esc_html__( 'Random', 'brands-for-woocommerce' ),
                ),
            ),
            'order' => array(
                "label"           => esc_html__( 'Order', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'asc'       => esc_html__( 'Ascending', 'brands-for-woocommerce' ),
                    'desc'      => esc_html__( 'Descending', 'brands-for-woocommerce' ),
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
            'show_all' => array(
                "label"             => esc_html__( 'Show "All" tab', 'brands-for-woocommerce' ),
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
            'groupby' => array(
                "label"           => esc_html__( 'Group by', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'alphabet'      => esc_html__( 'Alphabet', 'brands-for-woocommerce' ),
                    'category'      => esc_html__( 'Category', 'brands-for-woocommerce' ),
                    'none'          => esc_html__( 'None', 'brands-for-woocommerce' ),
                ),
            ),
            'style' => array(
                "label"           => esc_html__( 'Layout', 'brands-for-woocommerce' ),
                'type'            => 'select',
                'options'         => array(
                    'vertical'      => esc_html__( 'Vertical', 'brands-for-woocommerce' ),
                    'horizontal'    => esc_html__( 'Horizontal', 'brands-for-woocommerce' ),
                ),
            ),
            'column' => array(
                "label"             => esc_html__( 'Columns', 'brands-for-woocommerce' ),
                'type'              => 'number',
            ),
        );

        return $fields;
    }

    function render( $atts, $content = null, $function_name = '' ) {
        $atts = BREX_BrandExtension::convert_on_off($atts);
        ob_start();
        the_widget( 'berocket_alphabet_brand_widget', $atts );
        return ob_get_clean();
    }
}

new ET_Builder_Module_br_brand_catalog;
