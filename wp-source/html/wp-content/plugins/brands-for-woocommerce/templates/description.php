<?php
echo "<div class='brand_description_block'>";
	if ( !empty( $options['display_title'] ) ) {
		echo "<h2>{$brand_term->name}</h2>";
	}

	if ( !empty( $options['banner_display'] ) && !empty( $brand_banner = get_term_meta( $brand_term->term_id, 'brand_banner_url', true ) ) ) {
		$banner_width  = empty( $options['banner_width'] ) ? '' : "width:{$options['banner_width']}{$options['banner_width_units']};";
		$banner_height = empty( $options['banner_height'] ) ? '' : "height:{$options['banner_height']}{$options['banner_height_units']};";
		$banner_fit	   = empty( $options['banner_fit'] ) ? '' : "object-fit:{$options['banner_fit']};";
		$banner_align  = empty( $options['banner_align'] ) ? ''
			: ( $options['banner_align'] == 'center' ? 'margin-left: auto; margin-right: auto;'
			: "float:{$options['banner_align']};" );

	    echo "<img class='br_brand_image br_brand_banner' src='$brand_banner' alt='{$brand_term->name}' style='$banner_width $banner_height $banner_align $banner_fit'>";
	}

	if ( !empty( $options['display_categories'] ) 
		&& !empty( $categories = get_term_meta( $brand_term->term_id, 'br_brand_category', true ) ) ) {
	    echo "<div class='br_brand_info_categories'><span>" . __( 'Categories', 'brands-for-woocommerce' ) . ": </span><ul>"; 
	    foreach ( $categories as $category_name ) { 
	        $category = get_term_by( 'name', $category_name, 'product_cat' );
	        $category_url = get_category_link( $category );
	        echo "<li><a href='$category_url'>$category_name</a></li>";
	    }
	    echo "</ul></div>";
	}

	echo '<div class="berocket_brand_description">';

	if ( !empty( $options['thumbnail_display'] ) 
		&& !empty( $brand_thumbnail = get_term_meta( $brand_term->term_id, 'brand_image_url', true ) ) ) {

		$thumbnail_width  = empty( $options['thumbnail_width'] ) ? '' 
			: "width:{$options['thumbnail_width']}{$options['thumbnail_width_units']};";
		$thumbnail_height = empty( $options['thumbnail_height'] ) ? '' 
			: "height:{$options['thumbnail_height']}{$options['thumbnail_height_units']};";
		$thumbnail_fit	  = empty( $options['thumbnail_fit'] ) ? '' : "object-fit:{$options['thumbnail_fit']};";
		$thumbnail_align  = empty( $options['thumbnail_align'] ) ? '' : "float:{$options['thumbnail_align']};";

	    $tooltip = BeRocket_product_brand::get_tooltip( $brand_term->term_id );
	    echo "<img class='br_brand_image br_brand_thumbnail {$tooltip['class']}' src='$brand_thumbnail' alt='{$brand_term->name}' style='$thumbnail_width $thumbnail_height $thumbnail_align $thumbnail_fit' {$tooltip['data']} />";
	}

	if( !empty( $options['display_description'] ) ) {
	    echo '<div class="text">'. do_shortcode( term_description( $brand_term ) ).'</div>';
	}

	if( !empty( $options['display_link'] ) && !empty( $brand_url = get_term_meta( $brand_term->term_id, 'br_brand_url', true ) ) ) {
		$target = empty( $options['link_open_in_new_tab'] ) ? '' : "target='_blank'";
	    echo "<a class='br_brand_link' $target href=$brand_url>{$options['link_text']}</a>";
	}

	if( !empty( $options['related_products_display'] ) 
		&& !empty( $related_products = get_term_meta( $brand_term->term_id, 'br_brand_related', true ) ) ) {
		
		echo '<h4>' . __( 'Related products', 'brands-for-woocommerce' ) . '</h4>';
		$get_argument = 'br_brands_related';

	    if ( empty( $options['related_products_slider'] ) ) {
			$per_page = empty( $options['related_products_per_page'] ) ? -1 : $options['related_products_per_page'];
	    	$paged = isset( $_GET[ $get_argument ] ) ? (int) $_GET[ $get_argument ] : 1; 
	    } else {
	        $paged = false;
	        $per_page = -1;
	    }

		$products = wc_get_products(array(
	        'status'   => 'publish',
	        'limit'    => $per_page,
	        'page'     => $paged,
	        'paginate' => true,
	        'return'   => 'ids',
	        'orderby'  => $options['related_products_orderby'],
	        'order'    => $options['related_products_order'],
	        'include'  => $related_products,
	    ));

		brfr_product_loop( $products, array(
			'columns'     => $options['related_products_columns'],
			'cache_key'   => $get_argument,
			'slider' 	  => $options['related_products_slider'],
			'hide_brands' => $options['related_products_hide_brands'],
			'paged' 	  => $paged,
		) );
	}
	echo '</div>';
echo "</div>";
