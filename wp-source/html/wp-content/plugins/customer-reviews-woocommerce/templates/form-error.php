<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// jQuery
$cr_wp_scripts = wp_scripts();
$cr_jquery = $cr_wp_scripts->registered['jquery-core'];
$cr_jquery_src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
if ( property_exists( $cr_jquery, 'src' ) && $cr_jquery->src ) {
	$cr_jquery_src = get_site_url( null, $cr_jquery->src );
}

?>
<!DOCTYPE html>
<html <?php CR_Utils::cr_language_attributes(); ?>>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="robots" content="noindex">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title><?php echo esc_html( $cr_form_header . ' - ' . get_option( 'ivole_shop_name', get_bloginfo( 'name', 'display' ) ) ); ?></title>
		<link rel="stylesheet" href="<?php echo $cr_form_css; ?>">
		<script defer src="<?php echo esc_url( $cr_jquery_src ); ?>"></script>
		<script defer src="<?php echo $cr_form_js; ?>"></script>
		<style>
			.cr-form-header, .cr-form-top-line {
				background-color: <?php echo esc_attr( $cr_form_color1 ); ?> !important;
			}
			.cr-form-item-title div, .cr-form-customer-title {
				background-color: <?php echo esc_attr( $cr_form_color1 ); ?> !important;
				color: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
			}
			.cr-form-item-rating-radio .cr-form-item-outer {
				border-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-item-rating-radio .cr-form-item-inner {
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-item-price {
				background-color: <?php echo esc_attr( $cr_form_color1 ); ?> !important;
				color: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
			}
			.cr-form-customer-name-option > span {
				border-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-terms a {
				color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-customer-name-option.cr-form-active-name > span {
				color: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-submit {
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-submit .cr-form-submit-label {
				color: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
			}
			.cr-form-submit .cr-form-submit-loader::after {
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-edit {
				color: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-edit svg path {
				fill: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
			}
			.cr-form-item-media-preview .cr-upload-images-containers .cr-upload-images-delete {
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-item-media-preview .cr-upload-images-containers .cr-upload-images-delete .cr-no-icon {
				fill: <?php echo esc_attr( $cr_form_color2 ); ?> !important;
			}
			.cr-form-item-media-preview .cr-upload-images-containers .cr-upload-images-pbar .cr-upload-images-pbarin {
				background-color: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
			.cr-form-item-media-preview .cr-upload-images-containers .cr-upload-video-thumbnail {
				fill: <?php echo esc_attr( $cr_form_color3 ); ?> !important;
			}
		</style>
	</head>
	<body <?php echo is_rtl() ? 'rightmargin' : 'leftmargin'; ?>="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding:0;">
		<div class="cr-form-wrapper<?php echo is_rtl() ? ' cr-rtl' : ''; ?>" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
			<div class="cr-form-header"></div>
			<div class="cr-form" data-formid="<?php echo esc_attr( $cr_form_id ); ?>">
				<div class="cr-form-top-line"></div>
				<div class="cr-form-content cr-form-body">
					<div class="cr-form-title">
						<?php echo $cr_form_header; ?>
					</div>
					<div class="cr-form-description">
						<div style="max-width: 515px; line-height: 1.6; margin: 0 auto;">
							<?php echo $cr_form_desc; ?>
						</div>
					</div>
