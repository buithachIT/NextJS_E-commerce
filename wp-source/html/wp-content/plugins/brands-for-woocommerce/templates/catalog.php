<?php
$random_class = "berocket_letter_block_{$atts['cache_key']}";
$additional_class = " {$atts['style']} ";

if ( !wp_script_is( 'br_brands_catalog' ) ) {
    wp_enqueue_script( 'br_brands_catalog' );
}

$img_align  = $atts['img_align'];
// $show_name  = !empty( $atts['use_name'] );
$show_count = !empty( $atts['count'] );
// $show_image = !empty( $atts['img'] );
$is_grouped = $atts['groupby'] != 'none';

// if ( empty( $atts['img_height'] ) ) {
//     $height = $line_height = '';    
// } else {
//     $height = "height:{$atts['img_height']}{$atts['img_height_units']};";
//     $line_height = ( $img_align == 'left' || $img_align == 'right' ) ? "line-height: {$atts['img_height']}{$atts['img_height_units']}" : '';
// }

$width  = empty( $atts['img_width'] ) ? '' : "width:{$atts['img_width']}{$atts['img_width_units']};";
$fit    = $atts['img_fit'] == 'none' ? '' : "object-fit:{$atts['img_fit']};";
$hierarchy_class = empty( $atts['hierarchy'] ) ? '' : "br_brands_hierarchy_{$atts['hierarchy']}";

// $align  = ( $img_align == 'left' || $img_align == 'right' ) ? "float:$img_align;" : '';
$sorted_id = $ordered_terms['sorted_id'];
$all_terms = $ordered_terms['all_terms'];

echo "<div class='berocket_brand_list $hierarchy_class'>";

$keys = array_keys( $sorted_id );
if ( $is_grouped ) {
    echo "<div class='berocket_brand_name_letters $additional_class'>";
    if( !empty( $atts['show_all'] ) && count( $keys ) > 1 ) {
        echo '<a data-href="#all" class="button">', __('All', 'brands-for-woocommerce'), '</a>';
    }

    foreach ( $keys as $index => $key ) {
        // data-href, not href - for Divi theme
        echo "<a data-href='#{$random_class}_$index' class='button'>$key</a>";
    }
    echo '</div>';
}

echo "<div class='berocket_letter_blocks $random_class'>";
foreach ( $keys as $index => $key ) {
    echo "<div id='{$random_class}_$index' class='br_brand_letter_block $additional_class'>";

    if ( $is_grouped ) {
        echo "<h3>$key</h3>";
    }
    foreach ( $sorted_id[$key] as $term_id ) {
        if ( empty( $all_terms[$term_id] ) ) continue;
        $term = $all_terms[$term_id];
        if ( !empty( $term->parent ) && $term->parent != 0 ) continue;
        // if ( !empty( $category ) && strpos( $term->category, $category ) === false ) continue;
        $count = $show_count ? " <span class='br_brand_count'>({$term->count_posts})</span>" : '';
        $brand_link = $term->link;
        if( is_wp_error( $brand_link ) ) {
            echo '<div id="message" class="error"><p>' . $brand_link->get_error_message() . '</p></div>';
            $brand_link = '#error_link';
        }
        $has_children = brfr_add_children_arrow( $term );
        echo 
            "<div class='br_brand_letter_element {$has_children['class']} $additional_class {$term->tooltip['class']}' {$term->tooltip['data']}>
                <div class='brand_info'><a href='{$brand_link}'>";

        // $brand_name = empty( $atts['use_name'] ) ? '' : "<span class='br_brand_name' style='$line_height'> {$term->name}$count</span>";
        $brand_name = empty( $atts['use_name'] ) ? '' : "<span class='br_brand_name'> {$term->name}$count</span>";
        $brand_image = '';
        if ( !empty( $atts['img_display'] ) && !empty( $term->image ) ) {
            $height = empty( $atts['img_height'] ) ? '' : "height:{$atts['img_height']}{$atts['img_height_units']};";
            // $brand_image = "<img src='{$term->image}' class='align_$img_align' alt='{$term->name}' style='$width $height $fit $align' />";
            $brand_image = "<img src='{$term->image}' class='align_$img_align' alt='{$term->name}' style='$width $height $fit' />";
        }

        if ( $img_align == 'under' || $img_align == 'right' ) {
            echo "$brand_name $brand_image";
        } else {
            echo "$brand_image $brand_name";
        }
        echo "</a>{$has_children['arrow']}</div>";
        if ( !empty( $term->children ) ) BeRocket_Brand_Base_Ordered_Widget::show_children( $all_terms, $term );
        echo "</div>";
    }
    echo '</div>';
}
echo '</div></div>';
$width = 100 / $atts['column'];
echo 
    "<style>
        .$random_class .br_brand_letter_block.horizontal {
            width: $width%;
            float: left;
        }
        .$random_class .br_brand_letter_element.vertical {
            width: $width%;
            float: left;
        }
        .$random_class .br_brand_letter_block.horizontal:nth-child({$atts['column']}n + 1) {
            clear: both;
        }
    </style>";
