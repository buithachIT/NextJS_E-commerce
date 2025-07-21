<?php
class BeRocket_Base_Product_List_Widget extends BeRocket_Brand_Base_Widget {
	public function __construct( $widget_name, $widget_title, $args ) {
        parent::__construct( $widget_name, $widget_title, $args );

        $this->defaults += array(
            'columns'     => '4',
            'orderby'     => 'title',
            'order'       => 'asc',
            'slider'      => '',
            'hide_brands' => '',
            'per_page'    => '',
            'cache_key'   => '',
        );

        $this->form_fields += array(
            'per_page' => array(
                "title" => __( 'Per page:', 'brands-for-woocommerce' ),
                'type'  => 'number',
                'class' => 'width50 nobasis',
                'min'   => 1,
                'placeholder' => __( 'All', 'brands-for-woocommerce' ),
            ),
            'columns' => array(
                "title" => __( 'Columns:', 'brands-for-woocommerce' ),
                'type'  => 'number',
                'class' => 'width50 nobasis',
                'min'   => 1,
            ),
            'orderby' => array(
                "title" => __( 'Order by:', 'brands-for-woocommerce' ),
                'type'  => 'select',
                'class'   => 'br_brands_orderby',
                'options' => array(
                    "title"    => array( 'name' => __( 'Product title', 'brands-for-woocommerce' ) ),
                    'name'     => array( 'name' => __( 'Product name', 'brands-for-woocommerce' ) ),
                    'date'     => array( 'name' => __( 'Date of creation', 'brands-for-woocommerce' ) ),
                    'modified' => array( 'name' => __( 'Last modified date', 'brands-for-woocommerce' ) ),
                    'rand'     => array( 'name' => __( 'Random', 'brands-for-woocommerce' ) ),
                ),
            ),
            'order' => array(
                "title" => __( '&nbsp;', 'brands-for-woocommerce' ),
                'type'  => 'select',
                'class'   => 'br_brands_order',
                'options' => array(
                    'asc'  => array( 'name' => __( 'Asc', 'brands-for-woocommerce' ) ),
                    'desc' => array( 'name' => __( 'Desc', 'brands-for-woocommerce' ) ),
                ),
            ),
            'slider' => array(
                "title" => __( 'Slider', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
            'hide_brands' => array(
                "title" => __( 'Hide brands', 'brands-for-woocommerce' ),
                'type'  => 'checkbox',
                'class' => 'br_brands_checkbox_block',
            ),
        );
    }
}
