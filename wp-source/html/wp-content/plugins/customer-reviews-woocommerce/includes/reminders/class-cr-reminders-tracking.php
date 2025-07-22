<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'CR_Reminders_Tracking' ) ) :

	class CR_Reminders_Tracking {

		public static function get_tracking_stats() {
			check_ajax_referer( 'reminders', 'nonce', true );
			$return_extId = array();
			if (
				isset( $_POST['orderIds'] ) &&
				is_array( $_POST['orderIds'] ) &&
				0 < count( $_POST['orderIds'] )
			) {
				$orderIds = array_unique( $_POST['orderIds'] );
				$orderIds = array_filter( $orderIds );

				if ( 0 < count( $orderIds ) ) {
					$licenseKey = get_option( 'ivole_license_key', '' );
					if ( $licenseKey ) {
						$data = array(
							'shopDomain' => Ivole_Email::get_blogurl(),
							'licenseKey' => $licenseKey,
							'shopOrderIds' => $orderIds
						);
						$api_url = 'https://api.cusrev.com/v2/track-reminders';
						$data_string = json_encode($data);
						$ch = curl_init();
						curl_setopt( $ch, CURLOPT_URL, $api_url );
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
						curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
						curl_setopt( $ch, CURLOPT_HTTPHEADER, array(
							'Content-Type: application/json',
							'Content-Length: ' . strlen( $data_string ) )
						);
						$result = curl_exec( $ch );
						$httpcode = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
						if ( 200 === $httpcode ) {
							$result = json_decode( $result );
							if ( is_array( $result ) && 0 < count( $result ) ) {
								$log_entries = array();
								// iterate through each order object in the API response
								foreach ( $result as $order ) {
									// get all events for an order
									$extIds = array();
									if (
										property_exists( $order, 'shopOrderId' ) &&
										property_exists( $order, 'tracking' ) &&
										is_array( $order->tracking )
									) {
										foreach ( $order->tracking as $tracking_event ) {
											if ( ! isset( $extIds[$tracking_event->extId] ) ) {
												$extIds[$tracking_event->extId] = (object) array(
													'status' => $tracking_event->status,
													'timestamp' => $tracking_event->timestamp
												);
											} elseif ( self::is_later_status( $extIds[$tracking_event->extId]->status, $tracking_event->status ) ) {
												$extIds[$tracking_event->extId]->status = $tracking_event->status;
												$extIds[$tracking_event->extId]->timestamp = $tracking_event->timestamp;
											}
										}
									}
									// if there are events, prepare them for saving to the log table
									if ( 0 < count( $extIds ) ) {
										$log_entries = array_merge( $log_entries, $extIds );
									}
								}
								// if there are any records to be saved to the log table, save them
								if ( 0 < count( $log_entries ) ) {
									$reminders_log = new CR_Reminders_Log();
									foreach ( $log_entries as $extId => $log_entry ) {
										$update_ui = false;
										if ( 'rmd_opened' === $log_entry->status ) {
											$update_ui = $reminders_log->email_opened( $extId, $log_entry->timestamp / 1000 );
										} elseif( 'frm_opened' === $log_entry->status ) {
											$update_ui = $reminders_log->form_opened( $extId, $log_entry->timestamp / 1000 );
										}
										if ( $update_ui ) {
											$return_extId[] = array(
												'extId' => $extId,
												'status' => CR_Reminders_Log::get_status_description( $log_entry->status )
											);
										}
									}
								}
							}
						}
					}
				}
			}
			wp_send_json( $return_extId );
		}

		public static function is_later_status( $current_st, $new_st ) {
			switch ( $new_st ) {
				case 'rmd_opened':
					if ( in_array( $current_st, array( 'rmd_sent' ) ) ) {
						return true;
					}
					break;
				case 'frm_opened':
					if ( in_array( $current_st, array( 'rmd_sent', 'rmd_opened' ) ) ) {
						return true;
					}
					break;
				default:
					break;
			}
			return false;
		}

	}

endif;
