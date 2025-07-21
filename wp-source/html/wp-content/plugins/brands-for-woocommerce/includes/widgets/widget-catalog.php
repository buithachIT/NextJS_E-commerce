<?php
if ( ! class_exists( 'BeRocket_alphabet_brand_widget' ) ) {
    class BeRocket_alphabet_brand_widget extends BeRocket_Brand_Base_Ordered_Widget {

        public function __construct() {
            parent::__construct(
                "berocket_alphabet_brand_widget",
                __( "WooCommerce Brand Catalog", 'brands-for-woocommerce' ),
                array( "description" => __( 'Brands grouped by name or category', 'brands-for-woocommerce' )  )
            );

            $this->defaults += array(
                'groupby'  => 'alphabet',
                'style'    => 'vertical',
                'show_all' => 1,
                'column'   => 2,
            );

            $this->form_fields = berocket_insert_to_array( $this->form_fields, 'featured_first',
                array( 'show_all' => array(
                    "title" => __( 'Show "All" tab', 'brands-for-woocommerce' ),
                    'type'  => 'checkbox',
                    'class' => 'br_brands_checkbox_block',
                ) )
            );

            $this->form_fields += array(
                'groupby' => array(
                    "title"   => __( 'Group by:', 'brands-for-woocommerce' ),
                    'type'    => 'select',
                    'class'   => 'width100',
                    'options' => array(
                        'alphabet'  => array( 'name' => __( 'Alphabet', 'brands-for-woocommerce' ) ),
                        'category'  => array( 'name' => __( 'Category', 'brands-for-woocommerce' ) ),
                        'none'      => array( 'name' => __( 'None', 'brands-for-woocommerce' ) ),
                    ),
                ),
                'style' => array(
                    "title"   => __( 'Layout:', 'brands-for-woocommerce' ),
                    'type'    => 'select',
                    'class'   => 'width50 nobasis',
                    'options' => array(
                        'vertical'   => array( 'name' => __( 'Vertical', 'brands-for-woocommerce' ) ),
                        'horizontal' => array( 'name' => __( 'Horizontal', 'brands-for-woocommerce' ) ),
                    ),
                ),
                'column' => array(
                    "title" => __( 'Columns:', 'brands-for-woocommerce' ),
                    'type'  => 'number',
                    'class' => 'width50 nobasis',
                    'min'   => 1,
                ),
            );
        }

        private function br_get_brand_by_category( $term ) {
            return empty( $term->category ) ? array( __( 'Uncategorized', 'brands-for-woocommerce' ) ) : unserialize( $term->category );
        }

        private function br_get_brand_by_alphabet( $term ) {
            return array( mb_strtoupper( mb_substr( $term->name, 0, 1 ) ) );
        }

        private function br_get_brand_by_none( $term ) {
            return array( 0 );
        }

        protected function form_query( $atts ) {
            $query = parent::form_query( $atts );
            if ( ( !empty( $atts['groupby'] ) && $atts['groupby'] == 'category' )
                || !empty( $atts['category_only'] ) ) {
                $query = $this->form_query_add_category( $query, $atts );
            }
            return $query;
        }

        protected function sort_terms( $terms, $atts ) {
            if ( empty( $terms ) ) return;
            if ( empty( $atts['groupby'] ) ) $atts['groupby'] = 'alphabet';

            $function = "br_get_brand_by_{$atts['groupby']}";
            if ( !method_exists( $this, $function ) ) {
                $function = 'br_get_brand_by_alphabet';
            }

            $terms = parent::sort_terms( $terms, $atts );
            $sorted_id = array();
            foreach ( $terms as $index => $term ) {
                if ( !empty( $term->parent ) && $term->parent != 0 ) continue;
                $terms[$index] = $this->add_attributes( $term );

                $keys = $this->$function( $term );
                foreach ( $keys as $key ) {
                    $sorted_id[$key][$term->term_id] = $term->term_id;
                }
            }
            unset( $sorted_id['Uncategorized'] );
            ksort( $sorted_id );
            return array( 'sorted_id' => $sorted_id, 'all_terms' => $terms );
        }

        protected function filter_for_category( $category, $ordered_terms ) {

            foreach ( $ordered_terms['all_terms'] as $index => $term ) {
                if ( strpos( $term->category, $category ) === false ) {
                    unset( $ordered_terms['all_terms'][$index] );
                    unset( $ordered_terms['sorted_id'][$term->name[0]][$index] );
                }
            }

            foreach ( $ordered_terms['sorted_id'] as $letter => $content ) {
                if ( empty( $content ) ) {
                    unset( $ordered_terms['sorted_id'][$letter] );
                }
            }

            if ( empty( $ordered_terms['all_terms'] ) ) return array();

            return $ordered_terms;
        }

        public function widget($args, $instance) {
            $args['template'] = 'catalog';
            parent::widget( $args, $instance );
        }
    }
}