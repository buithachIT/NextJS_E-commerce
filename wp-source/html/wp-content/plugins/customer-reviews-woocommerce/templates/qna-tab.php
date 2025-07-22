<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$cr_nonce = wp_create_nonce( "cr_qna" );

$current_user = wp_get_current_user();
$user_name = '';
$user_email = '';
if( $current_user instanceof WP_User ) {
	$user_email = $current_user->user_email;
	$user_name = $current_user->user_firstname . ' ' . $current_user->user_lastname;
	if ( empty( trim( $user_name ) ) ) $user_name = '';
}
if( $attributes ) {
	$json_attributes = wc_esc_json( wp_json_encode( $attributes ) );
} else {
	$json_attributes = '';
}
?>
<div id="cr_qna" class="cr-qna-block" data-attributes="<?php echo $json_attributes; ?>" data-nonce="<?php echo $cr_nonce; ?>">
	<h2><?php _e( 'Q & A', 'customer-reviews-woocommerce' ); ?></h2>
	<div class="cr-qna-new-q-form">
		<div class="cr-review-form-nav">
			<div class="cr-nav-left">
				<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.9607 19.2506L11.0396 13.3295L16.9607 7.40833" stroke="#0E252C" stroke-miterlimit="10"/>
				</svg>
				<span>
					<?php _e( 'Ask a question', 'customer-reviews-woocommerce' ); ?>
				</span>
			</div>
			<div class="cr-nav-right">
				<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.61914 8.62009L19.381 19.3799M8.61914 19.3799L19.381 8.62009" stroke="#0E252C" stroke-miterlimit="10" stroke-linejoin="round"/>
				</svg>
			</div>
		</div>
		<?php if ( 'registered' === $cr_qna_permissions && ! is_user_logged_in() ) : ?>
			<div class="cr-review-form-not-logged-in">
				<span>
					<?php _e( 'You must be logged in to ask a question', 'customer-reviews-woocommerce' ); ?>
				</span>
				<?php
					if ( $cr_qna_login ) {
						$cr_qna_login = add_query_arg( 'redirect_to', urlencode( apply_filters( 'the_permalink', get_the_permalink(), $cr_post_id ) ), $cr_qna_login );
					} else {
						$cr_qna_login = wp_login_url( apply_filters( 'the_permalink', get_the_permalink(), $cr_post_id ) );
					}
				?>
				<a class="cr-review-form-continue" href="<?php echo esc_url( $cr_qna_login ); ?>" rel="nofollow"><?php _e( 'Log In', 'customer-reviews-woocommerce' ); ?></a>
			</div>
		<?php elseif ( 'anybody' === $cr_qna_permissions || ( 'registered' === $cr_qna_permissions && is_user_logged_in() ) ) : ?>
			<div class="cr-review-form-item">
				<img src="<?php echo esc_url( $cr_item_pic ); ?>" alt="<?php echo esc_attr( $cr_item_name ); ?>"/>
				<span><?php echo esc_html( $cr_item_name ); ?></span>
				<input type="hidden" value="<?php echo esc_attr( $cr_post_id ); ?>" class="cr-review-form-item-id" />
			</div>
			<div class="cr-review-form-comment">
				<div class="cr-review-form-lbl">
					<?php _e( 'Your question', 'customer-reviews-woocommerce' ); ?>
				</div>
				<textarea rows="5" name="cr_review_form_comment_txt" class="cr-review-form-comment-txt" placeholder="<?php _e( 'Start your question with \'What\', \'How\', \'Why\', etc.', 'customer-reviews-woocommerce' ); ?>"></textarea>
				<div class="cr-review-form-field-error">
					<?php _e( '* Question is required', 'customer-reviews-woocommerce' ); ?>
				</div>
			</div>
			<div class="cr-review-form-ne">
				<div class="cr-review-form-name">
					<div class="cr-review-form-lbl">
						<?php _e( 'Name', 'customer-reviews-woocommerce' ); ?>
					</div>
					<input type="text" name="cr_review_form_name" class="cr-review-form-txt" autocomplete="name" placeholder="<?php esc_attr_e( 'Your name', 'customer-reviews-woocommerce' ); ?>" value="<?php echo esc_attr( $user_name ); ?>" data-defval="<?php echo esc_attr( $user_name ); ?>"></input>
					<div class="cr-review-form-field-error">
						<?php _e( '* Name is required', 'customer-reviews-woocommerce' ); ?>
					</div>
				</div>
				<div class="cr-review-form-email">
					<div class="cr-review-form-lbl">
						<?php _e( 'Email', 'customer-reviews-woocommerce' ); ?>
					</div>
					<input type="email" name="cr_review_form_email" class="cr-review-form-txt" autocomplete="email" placeholder="<?php esc_attr_e( 'Your email', 'customer-reviews-woocommerce' ); ?>" value="<?php echo esc_attr( $user_email ); ?>" data-defval="<?php echo esc_attr( $user_email ); ?>"></input>
					<div class="cr-review-form-field-error">
						<?php _e( '* Email is required', 'customer-reviews-woocommerce' ); ?>
					</div>
				</div>
			</div>
			<?php if ( $cr_qna_checkbox ) : ?>
				<div class="cr-review-form-terms">
					<label>
						<input type="checkbox" class="cr-review-form-checkbox" name="cr_review_form_checkbox" />
						<span><?php echo $cr_qna_checkbox_text; ?></span>
					</label>
					<div class="cr-review-form-field-error">
						<?php _e( '* Please tick the checkbox to proceed', 'customer-reviews-woocommerce' ); ?>
					</div>
				</div>
			<?php endif; ?>
			<?php if ( 0 < strlen( $cr_recaptcha ) ) : ?>
				<div class="cr-captcha-terms">
					<?php echo sprintf( esc_html( __( 'This site is protected by reCAPTCHA and the Google %1$sPrivacy Policy%2$s and %3$sTerms of Service%4$s apply.', 'customer-reviews-woocommerce' ) ), '<a href="https://policies.google.com/privacy" rel="noopener noreferrer nofollow" target="_blank">', '</a>', '<a href="https://policies.google.com/terms" rel="noopener noreferrer nofollow" target="_blank">', '</a>' ); ?>
				</div>
			<?php endif; ?>
			<div class="cr-review-form-buttons">
				<button type="button" class="cr-review-form-submit" data-crcptcha="<?php echo $cr_recaptcha; ?>">
					<span><?php _e( 'Submit', 'customer-reviews-woocommerce' ); ?></span>
					<img src="<?php echo CR_Utils::cr_get_plugin_dir_url() . 'img/spinner-dots.svg'; ?>" alt="Loading" />
				</button>
				<button type="button" class="cr-review-form-cancel">
					<?php _e( 'Cancel', 'customer-reviews-woocommerce' ); ?>
				</button>
			</div>
			<div class="cr-review-form-result">
				<span></span>
				<button type="button" class="cr-review-form-continue" aria-label="<?php echo esc_attr__( 'Continue', 'customer-reviews-woocommerce' ); ?>"></button>
			</div>
		<?php endif; ?>
	</div>
	<div class="cr-qna-search-block">
		<div class="cr-ajax-qna-search">
			<svg width='1em' height='1em' viewBox='0 0 16 16' class='cr-qna-search-icon' fill='#18B394' xmlns='http://www.w3.org/2000/svg'>
				<path fill-rule='evenodd' d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'/><path fill-rule='evenodd' d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'/>
			</svg>
			<input name="cr_qna_input_text_search" class="cr-input-text" type="text" placeholder="<?php echo __( 'Search answers', 'customer-reviews-woocommerce' ); ?>">
			<span class="cr-clear-input">
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="#18B394" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
				</svg>
			</span>
		</div>
		<?php if ( in_array( $cr_qna_permissions, ['registered', 'anybody'] ) ) : ?>
			<button type="button" class="cr-qna-ask-button">
				<?php _e( 'Ask a question', 'customer-reviews-woocommerce' ); ?>
			</button>
		<?php endif; ?>
	</div>
	<div class="cr-qna-list-block">
		<?php if( isset( $qna ) && is_array( $qna ) && 0 < count( $qna ) ) : ?>
			<div class="cr-qna-list-block-inner">
				<?php
					echo CR_Qna::display_qna_list(
						$qna,
						array(
							'recaptcha' => $cr_recaptcha,
							'permissions' => $cr_qna_permissions,
							'login' => $cr_qna_login,
							'permalink' => get_the_permalink(),
							'post_id' => $cr_post_id,
							'checkbox' => $cr_qna_checkbox,
							'chbx_text' => $cr_qna_checkbox_text
						)
					);
				?>
			</div>
			<button id="cr-show-more-q-id" type="button" class="cr-show-more-que" data-product="<?php echo $cr_post_id; ?>" data-permalink="<?php echo esc_attr( get_the_permalink() ); ?>" data-page="0"<?php if( count( $qna ) >= $total_qna ) echo ' style="display:none"'; ?>>
				<?php echo __( 'Show more', 'customer-reviews-woocommerce' ); ?>
			</button>
			<span id="cr-show-more-q-spinner" style="display:none;"></span>
			<p class="cr-search-no-qna" style="display:none"><?php esc_html_e( 'Sorry, no questions were found', 'customer-reviews-woocommerce' );?></p>
		<?php
		else:
		?>
		<div class="cr-qna-list-empty"><?php _e( 'There are no questions yet', 'customer-reviews-woocommerce' ); ?></div>
		<?php
		endif;
		?>
	</div>
</div>
