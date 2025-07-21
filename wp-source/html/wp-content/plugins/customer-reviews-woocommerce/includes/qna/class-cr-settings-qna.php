<?php

if ( ! defined( 'ABSPATH' ) ) {
		exit;
}

if ( ! class_exists( 'CR_Qna_Settings' ) ):

class CR_Qna_Settings {

		protected $settings_menu;

		/**
		 * @var string The slug of this tab
		 */
		protected $tab;

		/**
		 * @var array The fields for this tab
		 */
		protected $settings;

		public function __construct( $settings_menu ) {
				$this->settings_menu = $settings_menu;
				$this->tab = 'qna';

				add_filter( 'cr_settings_tabs', array( $this, 'register_tab' ) );
				add_action( 'ivole_settings_display_' . $this->tab, array( $this, 'display' ) );
				add_action( 'cr_save_settings_' . $this->tab, array( $this, 'save' ) );
				add_action( 'woocommerce_admin_field_cr_qna_permissions', array( $this, 'display_qna_permissions' ) );
		}

		public function register_tab( $tabs ) {
				$tabs[$this->tab] = __( 'Q & A', 'customer-reviews-woocommerce' );
				return $tabs;
		}

		public function display() {
				$this->init_settings();
				WC_Admin_Settings::output_fields( $this->settings );
		}

		public function save() {
				$this->init_settings();
				//
				$qna_settings = array(
					'qna_perm' => '',
					'login' => ''
				);
				$update_qna_settings = false;
				// Q & A permissions
				if ( ! empty( $_POST ) && isset( $_POST['ivole_qna_permissions'] ) ) {
					$rev_perm = strval( $_POST['ivole_qna_permissions'] );
					$qna_settings['qna_perm'] = $rev_perm;
					$update_qna_settings = true;
				}
				// Login URL
				if ( ! empty( $_POST ) && isset( $_POST['ivole_qna_login_url'] ) ) {
					$login_url = strval( $_POST['ivole_qna_login_url'] );
					$qna_settings['login'] = $login_url;
					$update_qna_settings = true;
				}
				// Q & A checkbox
				if ( ! empty( $_POST ) && isset( $_POST['ivole_qna_checkbox'] ) ) {
					$checkbox = strval( $_POST['ivole_qna_checkbox'] );
					$qna_settings['checkbox'] = $checkbox;
					$update_qna_settings = true;
				}
				// Q & A checkbox text
				if ( ! empty( $_POST ) && isset( $_POST['ivole_qna_checkbox_text'] ) ) {
					$chbx_text = esc_html( strval( $_POST['ivole_qna_checkbox_text'] ) );
					$qna_settings['chbx_text'] = $chbx_text;
					$update_qna_settings = true;
				}
				//
				if ( $update_qna_settings ) {
					$_POST['ivole_qna_settings'] = $qna_settings;
				}
				//
				WC_Admin_Settings::save_fields( $this->settings );
		}

		protected function init_settings() {
				$this->settings = array(
						10 => array(
							'title' => __( 'Questions and Answers', 'customer-reviews-woocommerce' ),
							'type'  => 'title',
							'desc'  => __( 'Add a tab with questions and answers to product pages on your website. Let your prospective customers ask questions about products and view questions asked by others. Boost sales by answering the questions and making sure that prospective customers have all the information available to make a purchase decision.', 'customer-reviews-woocommerce' ),
							'id'    => 'ivole_options'
						),
						20 => array(
							'title'   => __( 'Questions and Answers', 'customer-reviews-woocommerce' ),
							'desc'    => sprintf( __( 'Enable this option to display a tab with questions and answers on product pages.', 'customer-reviews-woocommerce' ), '<a href="https://www.cusrev.com" target="_blank" rel="noopener noreferrer">', '</a>' ),
							'id'      => 'ivole_questions_answers',
							'default' => 'no',
							'type'    => 'checkbox'
						),
						30 => array(
							'id'			=> 'ivole_qna_settings',
							'type'		=> 'cr_qna_settings'
						),
						40 => array(
							'title'    => __( 'Q & A Permissions', 'customer-reviews-woocommerce' ),
							'desc'     => __( 'Specify permissions for asking and answering questions using Q & A forms.', 'customer-reviews-woocommerce' ),
							'id'       => 'ivole_qna_permissions',
							'type'     => 'cr_qna_permissions',
							'desc_tip' => true,
							'options'  => array(
								'nobody'  => __( 'Nobody can ask or answer questions', 'customer-reviews-woocommerce' ),
								'registered' => __( 'Users must be registered and logged in', 'customer-reviews-woocommerce' ),
								'anybody' => __( 'Anyone can ask or answer questions', 'customer-reviews-woocommerce' )
							),
							'is_option' => false
						),
						50 => array(
							'title'     => __( 'Login URL', 'customer-reviews-woocommerce' ),
							'type'      => 'text',
							/* translators: keep %1$s and %2$s as is, they will be automatically replaced with a name of a WordPress function and a standard login URL correspondingly */
							'desc'     => sprintf(
								__( 'Customize the URL for the login button on Q & A forms. You can override the default URL returned by the WordPress %1$s function with a custom URL specified in this field. If left blank, the standard URL %2$s will be used.', 'customer-reviews-woocommerce' ),
								'\'wp_login_url\'',
								wp_login_url()
							),
							'default'   => '',
							'id'        => 'ivole_qna_login_url',
							'desc_tip'  => true,
							'is_option' => false
						),
						60 => array(
								'title'   => __( 'reCAPTCHA v3 for Q & A', 'customer-reviews-woocommerce' ),
								'desc'    => __( 'Enable reCAPTCHA v3 to eliminate SPAM questions and answers. You must enter a Site Key and a Secret Key in the fields below, if you want to use reCAPTCHA. You will receive these keys after registration at reCAPTCHA website.', 'customer-reviews-woocommerce' ),
								'id'      => 'ivole_qna_enable_captcha',
								'default' => 'no',
								'type'    => 'checkbox'
						),
						70 => array(
								'title'    => __( 'reCAPTCHA v3 Site Key', 'customer-reviews-woocommerce' ),
								'type'     => 'text',
								'desc'     => __( 'If you would like to use reCAPTCHA v3, insert here the Site Key that you will receive after registration at the reCAPTCHA website.', 'customer-reviews-woocommerce' ),
								'default'  => '',
								'id'       => 'ivole_qna_captcha_site_key',
								'desc_tip' => true
						),
						80 => array(
								'title'    => __( 'reCAPTCHA v3 Secret Key', 'customer-reviews-woocommerce' ),
								'type'     => 'text',
								'desc'     => __( 'If you would like to use reCAPTCHA v3, insert here the Secret Key that you will receive after registration at the reCAPTCHA website.', 'customer-reviews-woocommerce' ),
								'default'  => '',
								'id'       => 'ivole_qna_captcha_secret_key',
								'desc_tip' => true,
								'autoload' => false
						),
						90 => array(
							'title'      => __( 'Terms and Privacy Checkbox', 'customer-reviews-woocommerce' ),
							'type'       => 'checkbox',
							'desc'       => self::get_default_qna_checkbox_text(),
							'default'    => 'no',
							'id'         => 'ivole_qna_checkbox',
							'is_option'  => false
						),
						100 => array(
							'title'      => __( 'Terms and Privacy Checkbox Label', 'customer-reviews-woocommerce' ),
							'type'       => 'cr_text_w_links',
							'desc'       => __( 'Tailor the text to be shown alongside the Terms and Privacy checkbox. Incorporate links directing users to the Terms and Conditions and Privacy Policy pages on your website.', 'customer-reviews-woocommerce' ),
							'default'    => 'I have read and agree to the Terms and Conditions and Privacy Policy.',
							'id'         => 'ivole_qna_checkbox_text',
							'is_option'  => false,
							'desc_tip'   => true
						),
						110 => array(
								'title'   => __( 'Display Count of Answered Questions', 'customer-reviews-woocommerce' ),
								'desc'    => __( 'Enable this option to display the count of answered questions next to the product rating and under the product name.', 'customer-reviews-woocommerce' ),
								'id'      => 'ivole_qna_count',
								'default' => 'no',
								'type'    => 'checkbox'
						),
						120 => array(
								'title'   => __( 'Reply Notifications', 'customer-reviews-woocommerce' ),
								'desc'    => sprintf( __( 'Enable this option to send notifications when somebody replies to a question. The template of notifications can be configured on the <a href="%s">Emails</a> tab.', 'customer-reviews-woocommerce' ), admin_url( 'admin.php?page=cr-reviews-settings&tab=emails' ) ),
								'id'      => 'ivole_qna_email_reply',
								'default' => 'no',
								'type'    => 'checkbox',
								'autoload' => false
						),
						130 => array(
								'type' => 'sectionend',
								'id'   => 'ivole_options'
						)
				);
				$qna_settings = self::get_qna_settings();
				if ( $qna_settings ) {
					$this->settings[50]['value'] = self::get_qna_login( $qna_settings );
					$this->settings[90]['value'] = self::get_qna_checkbox( $qna_settings );
					$this->settings[100]['value'] = self::get_qna_checkbox_text( $qna_settings );
				}
		}

		public function is_this_tab() {
				return $this->settings_menu->is_this_page() && ( $this->settings_menu->get_current_tab() === $this->tab );
		}

		public static function get_qna_settings() {
			$qna_settings = get_option( 'ivole_qna_settings' );
			if (
				$qna_settings &&
				is_array( $qna_settings )
			) {
				return $qna_settings;
			}
			return false;
		}

		public static function get_qna_permissions() {
			$qna_settings = self::get_qna_settings();
			$permissions = '';
			if ( $qna_settings ) {
				if (
					is_array( $qna_settings ) &&
					isset( $qna_settings['qna_perm'] )
				) {
					$permissions = $qna_settings['qna_perm'];
				}
			}
			if ( ! $permissions ) {
				$permissions = 'registered';
			}
			return $permissions;
		}

		public function display_qna_permissions( $value ) {
			$option_value = self::get_qna_permissions();
			$tooltip_html = CR_Admin::ivole_wc_help_tip( $value['desc'] );
			?>
				<tr valign="top">
					<th scope="row" class="titledesc">
						<label for="<?php echo esc_attr( $value['id'] ); ?>"><?php echo esc_html( $value['title'] ); ?> <?php echo $tooltip_html; // WPCS: XSS ok. ?></label>
					</th>
					<td class="forminp forminp-<?php echo esc_attr( sanitize_title( $value['type'] ) ); ?>">
						<select
							name="<?php echo esc_attr( $value['field_name'] ); ?><?php echo ( 'multiselect' === $value['type'] ) ? '[]' : ''; ?>"
							id="<?php echo esc_attr( $value['id'] ); ?>"
							style="<?php echo esc_attr( $value['css'] ); ?>"
							class="<?php echo esc_attr( $value['class'] ); ?>"
							<?php echo 'multiselect' === $value['type'] ? 'multiple="multiple"' : ''; ?>
							>
							<?php
							foreach ( $value['options'] as $key => $val ) {
								?>
								<option value="<?php echo esc_attr( $key ); ?>"
									<?php

									if ( is_array( $option_value ) ) {
										selected( in_array( (string) $key, $option_value, true ), true );
									} else {
										selected( $option_value, (string) $key );
									}

									?>
								><?php echo esc_html( $val ); ?></option>
								<?php
							}
							?>
						</select>
					</td>
				</tr>
			<?php
		}

		public static function get_qna_login( $qna_settings ) {
			$login = '';
			if ( $qna_settings ) {
				if (
					is_array( $qna_settings ) &&
					isset( $qna_settings['login'] )
				) {
					$login = $qna_settings['login'];
				}
			}
			return $login;
		}

		public static function get_qna_checkbox( $qna_settings ) {
			$checkbox = 'no';
			if ( $qna_settings ) {
				if (
					is_array( $qna_settings ) &&
					isset( $qna_settings['checkbox'] ) &&
					$qna_settings['checkbox']
				) {
					$checkbox = 'yes';
				}
			}
			return $checkbox;
		}

		public static function get_default_qna_checkbox_text() {
			return __( 'Add a checkbox for people to accept your Terms and Conditions, Privacy Policy, and any other legal agreements required in your jurisdiction before asking or answering a question.', 'customer-reviews-woocommerce' );
		}

		public static function get_qna_checkbox_text( $qna_settings ) {
			$checkbox_text = '';
			if ( $qna_settings ) {
				if (
					is_array( $qna_settings ) &&
					isset( $qna_settings['chbx_text'] )
				) {
					$checkbox_text = $qna_settings['chbx_text'];
				} else {
					$checkbox_text = false;
				}
			}
			return $checkbox_text;
		}

}

endif;
