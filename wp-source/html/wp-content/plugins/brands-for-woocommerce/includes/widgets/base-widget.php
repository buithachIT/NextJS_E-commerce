<?php
class BeRocket_Brand_Base_Widget extends WP_Widget {
    protected $defaults, $form_fields, $shortcode_args;

	public function __construct( $widget_name, $widget_title, $args ) {
	    $this->defaults = array(
	        'title'    => '',
	    );

	    $this->form_fields = array(
	        'title' => array(
	        	"title" => __( 'Title:', 'brands-for-woocommerce' ),
	        	'type'  => 'text',
                'class' => 'width100',
	        ),
	    );

        $this->shortcode_args = array();
        parent::__construct( $widget_name, $widget_title, $args );
    }

    protected function set_cache_key( $instance ) {
        if ( !empty( $instance['cache_key'] ) ) return $instance;
        
        $instance['cache_key'] = $this->id . brfr_language_prefix();
        return $instance;
    }

    protected function replace_shortcode_keys( $instance ) {
        foreach ( $this->shortcode_args as $old => $new ) {
            if ( !isset( $instance[ $new ] )  && isset( $instance[ $old ] ) ) {
                $instance[ $new ] = $instance[ $old ];
            }
        }
        return $instance;
    }

    protected function get_size( $side, $atts ) {
        if ( empty( $atts[$side] ) ) return $atts;
        $size = $atts[$side];

        if ( is_numeric( $size ) ) {
            if( ! empty( $atts["{$side}_units"] ) && $atts["{$side}_units"] == '%' ) {
                $atts["{$side}_units"] = '%';
            } else {
                $atts["{$side}_units"] = 'px';
            }
        } else {
            $size_numeric = intval( $size );
            $atts["{$side}_units"] = str_replace( $size_numeric, '', $size );
            $atts[$side] = $size_numeric;
       }
        return $atts;
    }

    // $args = array( 'attributes' => [ options for <select> as array( 'value' => 'title' ); or placeholder, min/max for <input> ] 
    private function form_field_text( $name, $instance, $args = array() ) {
    	$field_id    = $this->get_field_id( $name );
    	$field_name  = $this->get_field_name( $name );
    	$field_value = esc_attr( $instance[$name] );
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";
        $input_class = empty( $args['input_class'] ) ? '' : $args['input_class'];
        $placeholder = empty( $args['placeholder'] ) ? '' : "placeholder='{$args['placeholder']}'";

    	$html = "<input class='widefat $input_class' name='$field_name' type='text' value='$field_value' $placeholder />";

    	if ( empty( $args['title'] ) ) return $html;
    	return "<p class='br_brands_textfield $class' $id><label for='$field_id'>{$args['title']}</label> $html</p>";
    }

    private function form_field_checkbox( $name, $instance, $args = array() ) {
    	$field_id    = $this->get_field_id( $name );
    	$field_name  = $this->get_field_name( $name );
    	$checked     = $instance[$name] ? 'checked' : '';
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";
        $input_class = empty( $args['input_class'] ) ? '' : "class='{$args['input_class']}'";

    	$html = "<input type='checkbox' value='1' $input_class name='$field_name' $checked />";

        if ( empty( $args['title'] ) ) return $html;
        return "<p class='br_brands_checkbox $class' $id>$html <label for='$field_id'>{$args['title']}</label></p>";
    }

    private function form_field_select( $name, $instance, $args = array() ) {
        if ( empty( $args['options'] ) ) return '';

    	$field_id    = $this->get_field_id( $name );
    	$field_name  = $this->get_field_name( $name );
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";
        $input_class = empty( $args['input_class'] ) ? '' : "class='{$args['input_class']}'";
    	$saved_value = $instance[$name];

    	$html = "<select $input_class name='$field_name'>";
        foreach ( $args['options'] as $option_value => $option ) {
            if ( empty( $option['name'] ) ) continue;
            $selected = ( $option_value == $saved_value ) ? 'selected' : '';
            $option_class = empty( $option['class'] ) ? '' : "class='{$option['class']}'";
            $html .= "<option value='$option_value' $option_class $selected>{$option['name']}</option>";
        }
        $html .= '</select>';

        if ( empty( $args['title'] ) ) return $html;
        return "<p class='br_brands_selectbox $class' $id><label for='$field_id'>{$args['title']}</label> $html</p>";
    }

    private function form_field_number( $name, $instance, $args = array() ) {
    	$field_id    = $this->get_field_id( $name );
    	$field_name  = $this->get_field_name( $name );
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";
        $input_class = empty( $args['input_class'] ) ? '' : $args['input_class'];
        $placeholder = empty( $args['placeholder'] ) ? '' : "placeholder='{$args['placeholder']}'";
        $min = empty( $args['min'] ) ? "min='0'" : "min='{$args['min']}'";
        $max = empty( $args['max'] ) ? '' : "max='{$args['max']}'";

    	$html = "<input type='number' $min $max class='br_brand_number $input_class' value='{$instance[$name]}' name='$field_name' $placeholder />";

        if ( empty( $args['title'] ) ) return $html;
        return "<p class='br_brands_numberbox $class' $id><label for='$field_id'>{$args['title']}</label> $html</p>";
    }

    private function form_field_size( $name, $instance, $args = array() ) {
        $field_id    = $this->get_field_id( $name );
        $field_name  = $this->get_field_name( $name );
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";

    	$html = $this->form_field_number( $name, $instance );
    	$html .= $this->form_field_select( "{$name}_units", $instance, array( 'options' => array( 
            'px' => array( 'name' => 'px' ), 
            '%' => array( 'name' => '%' ), 
        ) ) );

        if ( empty( $args['title'] ) ) return $html;
    	return "<p class='br_brands_sizebox $class' $id><label for='$field_id'>{$args['title']}</label> $html</p>";
	}

    private function form_field_image( $name, $instance, $args = array() ) {
        $title = empty( $args['title'] ) ? '' : $args['title'];
    	$html = "<fieldset class='br_brand_fieldset'><legend>$title</legend>";

    	$html .= $this->form_field_checkbox( "{$name}_display", $instance, array( 
            "title" => __( 'Display', 'brands-for-woocommerce' ),
            'class' => 'width100 br_brand_show_more_options', 
            'id' => "{$name}_display_depending", 
        ) );
    	$html .= $this->form_field_size( "{$name}_width", $instance, array( 
            "title" => __( 'Width', 'brands-for-woocommerce' ),
            'class' => "width50 {$name}_display_depending",
        ) );
    	$html .= $this->form_field_size( "{$name}_height", $instance, array(
            "title" => __( 'Height', 'brands-for-woocommerce' ),
            'class' => "width50 {$name}_display_depending",
        ) );
    	$html .= $this->form_field_select( "{$name}_fit", $instance, array(
            "title" => __( 'Fit', 'brands-for-woocommerce' ),
            'class' => "width50 {$name}_display_depending",
            'options' => array(
                "cover"   => array( 'name' => __( 'Cover', 'brands-for-woocommerce' ) ),
                "contain" => array( 'name' => __( 'Contain', 'brands-for-woocommerce' ) ),
                "fill"    => array( 'name' => __( 'Fill', 'brands-for-woocommerce' ) ),
                "none"    => array( 'name' => __( 'None', 'brands-for-woocommerce' ) ),
            ),
        ) );
        if ( !empty( $args['align_options'] ) ) {            
        	$html .= $this->form_field_select( "{$name}_align", $instance, array(
                "title" => __( 'Align', 'brands-for-woocommerce' ),
                'class' => "width50 {$name}_display_depending",
                'options' => $args['align_options'], 
            ) );
        }
        $html .= "</fieldset>";
    	return $html;
    }

    private function form_field_color( $name, $instance, $args = array() ) {
        $field_id   = $this->get_field_id( $name );
        $field_name = $this->get_field_name( $name );
        $title      = empty( $args['title'] ) ? '' : "<label for='$field_id'>{$args['title']}</label>";
        $class      = empty( $args['class'] ) ? '' : $args['class'];
        $id         = empty( $args['id'] ) ? '' : "id='{$args['id']}'";

        return 
            "<p class='br_brands_colorbox $class' $id>
                $title
                <input class='widefat br_brand_colorpicker' id='$field_id' name='$field_name' type='text' value='" . sanitize_text_field($instance[$name]) . "' data-default-color='#000'/>
            </p>";
    }

    private function form_field_taxonomyselect( $name, $instance, $args = array() ) {
        if ( empty( $args['walker'] ) ) return '';

        $field_id   = $this->get_field_id( $name );
        $field_name = $this->get_field_name( $name );
        $title      = empty( $args['title'] ) ? '' : "<label for='$field_id'>{$args['title']}</label>";
        $class      = empty( $args['class'] ) ? '' : $args['class'];
        $id         = empty( $args['id'] ) ? '' : "id='{$args['id']}'";

        $brands = empty( $instance[$name] ) ? array() : array_map( function($v) { 
            $term = get_term_by( 'term_id', $v, BeRocket_product_brand::$taxonomy_name ); return $term->term_id; }, 
                unserialize( $instance[$name] ) );

        return "<p class='br_brand_product_categories_container $class' $id>$title
            <ul class='br_brand_product_categories $class'>"
                . wp_terms_checklist( 0, array( 
                    'taxonomy'      => BeRocket_product_brand::$taxonomy_name, 
                    'walker'        => new $args['walker'],
                    'selected_cats' => $brands,
                    'checked_ontop' => false,
                    'echo'          => false, 
                ) ) . '</ul></p>';
    }

    private function form_field_autocomplete( $name, $instance, $args = array() ) {
        $field_id    = $this->get_field_id( $name );
        $field_name  = $this->get_field_name( $name );
        $field_value = esc_attr( $instance[$name] );
        $title       = empty( $args['title'] ) ? '' : "<label for='$field_id'>{$args['title']}</label>";
        $callback    = empty( $args['callback'] ) ? 'br_get_brands' : $args['callback'];
        $multiselect = empty( $args['multiselect'] ) ? '' : "data-multiselect='multiselect'";
        $class       = empty( $args['class'] ) ? '' : $args['class'];
        $id          = empty( $args['id'] ) ? '' : "id='{$args['id']}'";
        $input_class = empty( $args['input_class'] ) ? '' : $args['input_class'];
        $placeholder = empty( $args['placeholder'] ) ? '' : "placeholder='{$args['placeholder']}'";
        $nonce       = wp_create_nonce('br_brands_autocomplete');

        // $selected_brands = empty( $instance[$name] ) ? array() : array_map( function($v) { 
        //     $term = get_term_by( 'term_id', $v, BeRocket_product_brand::$taxonomy_name ); return $term->term_id; }, 
        //         unserialize( $instance[$name] ) );

        return 
            "<p class='ui-widget br_brand_autocomplete_container $class' $id>
                $title
                <span class='br_crosssign'>
                    <span class='br_crosssign_stem1'></span>
                    <span class='br_crosssign_stem2'></span>
                </span>

                <input class='widefat $input_class br_brand_autocomplete' data-nonce='{$nonce}' data-callback='$callback' $multiselect
                    name='$field_name' type='text' value='$field_value' $placeholder />
            </p>";
    }

    private function form_field_fieldset( $name, $instance, $args = array() ) {
        if ( empty( $args['items'] ) ) return;
        $title = empty( $args['title'] ) ? '' : $args['title'];
        $this->render_form_fields( 
            "<fieldset class='br_brand_fieldset'><legend>$title</legend>", "</fieldset>", $args['items'], $instance );
    }

    private function render_form_fields( $before, $after, $fields_array, $instance ) {
        echo $before;
        foreach ( $fields_array as $name => $fields ) {
            $function = "form_field_{$fields['type']}";
            // $options = empty( $fields['attributes'] ) ? array() : $fields['attributes'];
            echo $this->$function( $name, $instance, $fields );
        }
        echo $after;
    }

	public function form($instance) {
        $instance = $this->replace_shortcode_keys( $instance );
        $instance = wp_parse_args( (array)$instance, $this->defaults );

        $this->render_form_fields( "<div class='br_brand_widget_oprions'>", "</div>", $this->form_fields, $instance );
	}

	public function update( $new_instance, $old_instance ) {
		// $instance = $old_instance;
        foreach ( array_keys( $this->defaults ) as $name ) {
    		$instance[$name] = empty( $new_instance[$name] ) ? '' : strip_tags( $new_instance[$name] );
        }
		return $instance;
	}

    public function widget( $args, $instance ) {
        if ( empty( $args['template'] ) ) return;

        ob_start();
        $BeRocket_product_brand = BeRocket_product_brand::getInstance();
        $BeRocket_product_brand->br_get_template_part( $args['template'] );
        $content = ob_get_clean();
        if( $content ) {
            echo $args['before_widget'];
            if ( !empty( $instance['title'] ) ) echo $args['before_title'], sanitize_text_field($instance['title']), $args['after_title'];
            echo $content;
            echo $args['after_widget'];
        }
    }

}

