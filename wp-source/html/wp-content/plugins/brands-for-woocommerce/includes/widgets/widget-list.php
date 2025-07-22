<?php
if ( ! class_exists( 'BeRocket_product_brand_widget' ) ) {
    class BeRocket_product_brand_widget extends BeRocket_Brand_Base_Ordered_Widget {
		public function __construct() {
			parent::__construct(
				"berocket_product_brand_widget",
				__( "WooCommerce Brand List", 'brands-for-woocommerce' ),
				array( "description" =>  __( 'List of brands', 'brands-for-woocommerce' ) )
			);

			$this->defaults += array(
				'per_row'       => 3,
				'brands_number' => '',
				'slider'        => 1,
				'padding'       => 3,
				'margin'        => 3,
				'border_color'  => '#000000',
				'border_width'  => '',
			);

			$BeRocket_product_brand = BeRocket_product_brand::getInstance();
			$options                = $BeRocket_product_brand->get_option();

			$this->form_fields = berocket_insert_to_array( $this->form_fields, 'featured_first',
				array(
					'slider' => array(
						"title" => __( 'Slider', 'brands-for-woocommerce' ),
						'type'  => 'checkbox',
						'class' => 'br_brands_checkbox_block br_brand_hide_more_options',
						'id'    => "slider_hide_depending",
					)
				)
			);

			foreach ( array( 'show_expanded', 'expand_by_click' ) as $key ) {
				$this->form_fields['hierarchy']['options'][ $key ]['class'] = 'slider_hide_depending';
			}

			if ( $options['slider_mode'] == 'slide' ) {
				$this->form_fields += array(
					'per_row' => array(
						"title"      => __( 'Brands per row', 'brands-for-woocommerce' ),
						'type'       => 'number',
						'attributes' => array(
							'min' => 1,
						),
						'class'      => 'width50',
					),
				);
			}

			$this->form_fields += array(
				'brands_number' => array(
					"title"       => __( 'Brands in list', 'brands-for-woocommerce' ),
					'type'        => 'number',
					'class'       => 'width50',
					'placeholder' => __( 'All', 'brands-for-woocommerce' ),
					'min'         => 1,
				),
				'padding'       => array(
					"title" => __( 'Padding, px', 'brands-for-woocommerce' ),
					'type'  => 'number',
					'class' => 'width50',
				),
				'margin'        => array(
					"title" => __( 'Margin, px', 'brands-for-woocommerce' ),
					'type'  => 'number',
					'class' => 'width50',
				),
				'border_width'  => array(
					"title" => __( 'Border width, px', 'brands-for-woocommerce' ),
					'type'  => 'number',
					'class' => 'width50',
				),
				'border_color'  => array(
					"title" => __( 'Border color', 'brands-for-woocommerce' ),
					'type'  => 'color',
					'class' => 'width50 br_brand_colorpalette',
				),
			);
		}

		protected function form_query( $atts ) {
			global $wpdb;
			if ( ! empty( $atts['slider'] ) && $atts['slider'] == 1 ) {
				if ( ! empty( $atts['hierarchy'] ) && in_array( $atts['hierarchy'], array(
						'expanded',
						'by_click'
					) ) ) {
					$atts['hierarchy'] = 'all';
				}
			}
			$query          = parent::form_query( $atts );
			$query['limit'] = empty( $atts['brands_number'] ) ? '' : "LIMIT {$atts['brands_number']}";

			if ( ! empty( $atts['category_only'] ) ) {
				$query = $this->form_query_add_category( $query, $atts );
			}

			return $query;
		}

		protected function filter_for_category( $category, $ordered_terms ) {
			foreach ( $ordered_terms as $index => $term ) {
				if ( strpos( $term->category, $category ) === false ) {
					unset( $ordered_terms[ $index ] );
				}
			}

			return $ordered_terms;
		}

		public function widget( $args, $instance ) {
            if ( isset( $instance['imgw'] ) and (int) $instance['imgw'] > 0 ) {
                $instance['img_width']       = intval($instance['imgw']);
                $instance['img_width_units'] = trim( str_replace( $instance['img_width'], "", $instance['imgw'] ) );

                if ( ! in_array( $instance['img_width_units'], array('em', '%', 'rem') ) ) {
                    $instance['img_width_units'] = 'px';
                }
            }
            if ( isset( $instance['imgh'] ) and (int) $instance['imgh'] > 0 ) {
                $instance['img_height']       = intval($instance['imgh']);
                $instance['img_height_units'] = trim( str_replace( $instance['img_height'], "", $instance['imgh'] ) );

                if ( ! in_array( $instance['img_height_units'], array('em', '%', 'rem') ) ) {
                    $instance['img_height_units'] = 'px';
                }
            }

			$args['template'] = 'list';
			parent::widget( $args, $instance );
		}
	}
}
