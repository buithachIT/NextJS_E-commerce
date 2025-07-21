<?php 
$widget_number = $atts['cache_key'];
error_log($atts['per_row']);
$per_row = empty( $atts['per_row'] ) ? 3 : intval( $atts['per_row'] ); 
if( $per_row < 1 ) {
    $per_row = 1;
}

echo '<style>';
$slider_class = $slider_data = '';
if ( !empty( $atts['slider'] ) && $atts['slider'] == 1 ) {
    $slider_class = 'br_slick_slider';
    $BeRocket_product_brand = BeRocket_product_brand::getInstance();
    $options = $BeRocket_product_brand->get_option();
    $slider_data = $slider_data . ' data-slides_to_show="'.intval($per_row).'"';
    echo brfr_add_slider_script( $options, '.brcs_slider_brands' );
    $list_style = 'slider';
} else {
    $brand_width = 100 / $per_row . '%';
    if ( !empty( $atts['margin'] ) ) {
        $brand_margin = $atts['margin'] * 2;
        $brand_width = "calc($brand_width - {$brand_margin}px)";
    }
    echo ".br_brand_$widget_number .br_widget_brand_element_slider {
            width: $brand_width;
        }
        .widget_berocket_product_brand_widget .brcs_slider_brands_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .widget_berocket_product_brand_widget .brcs_slider_brands_container .brand_slider_image a{
            display: block;
            text-align: center;
        }
        .widget_berocket_product_brand_widget .brcs_slider_brands_container .brand_slider_image a img{
            margin: 0 auto;
        }";
    $list_style = 'list';
}

$border_style = !empty( $atts['border_color'] ) && !empty( (int)$atts['border_width'] )
    ? "border: " . ( (int) $atts['border_width'] ) . "px solid {$atts['border_color']} !important;" : '';
$padding = empty( $atts['padding'] ) ? '' : "padding: {$atts['padding']}px;";
$margin  = empty( $atts['margin'] ) ? '' : "margin: {$atts['margin']}px;";
$hierarchy_class = empty( $atts['hierarchy'] ) ? '' : "br_brands_hierarchy_{$atts['hierarchy']}";

echo ".br_brand_$widget_number .br_widget_brand_element_slider {
        box-sizing: border-box;
        $padding
        $margin
        $border_style
    }";
echo '</style>';

echo "<div class='brcs_slider_brands brcs_slider_brands_container br_brand_$widget_number $slider_class $hierarchy_class' data-columns='$per_row'$slider_data>";

$img_align  = $atts['img_align'];

$height = empty( $atts['img_height'] ) ? '' : "height:{$atts['img_height']}{$atts['img_height_units']};";
$width  = empty( $atts['img_width'] ) ? '' : "width:{$atts['img_width']}{$atts['img_width_units']};";
$fit    = $atts['img_fit'] == 'none' ? '' : "object-fit:{$atts['img_fit']};";

$align = $line_height = '';
$display_span = 'display: block;';
if ( $img_align == 'left' || $img_align == 'right' ) {
    $align = "float:$img_align;";
    $line_height = empty( $atts['img_height'] ) ? '' : "line-height: {$atts['img_height']}{$atts['img_height_units']};";
    $display_span = 'display: inline-block;';
}

if( isset( $ordered_terms['all_terms'] ) ) $ordered_terms = $ordered_terms['all_terms'];

foreach ( $ordered_terms as $id => $term ) {
    if ( !empty( $term->parent ) && $term->parent != 0 ) continue;

    $count = !empty( $atts['count'] ) ? " <span class='br_brand_count'>({$term->count_posts})</span>" : '';
    $brand_link = $term->link;
    if( is_wp_error( $brand_link ) ) {
        echo '<div id="message" class="error"><p>' . $brand_link->get_error_message() . '</p></div>';
        $brand_link = '#error_link';
    }

    $brand_name = $atts['use_name'] ? "<span style='$line_height $display_span'>{$term->name}$count</span>" : '';
    $brand_image = ( !empty( $atts['img_display'] ) && !empty( $term->image ) ) ? "<img src='{$term->image}' alt='{$term->name}'  style='$width $height $fit $align' />" : '';

    $has_children = brfr_add_children_arrow( $term );
    echo "<div class='br_widget_brand_element_slider $list_style {$term->tooltip['class']} {$has_children['class']}' {$term->tooltip['data']}>
            <div class='brand_info brand_slider_image'>
                <a href='$brand_link'>";
    if ( $img_align == 'under' ) {
        echo "$brand_name $brand_image";
    } else {
        echo "$brand_image $brand_name";
    }
    echo "</a>{$has_children['arrow']}</div>";

    if ( !empty( $term->children ) ) BeRocket_Brand_Base_Ordered_Widget::show_children( $ordered_terms, $term );

    echo '</div>';
}    

echo '</div>';
