<?php
/**
 * Gravity Forms Scholarship Application Configuration
 * Form ID: 3
 */

add_filter( 'gform_notification_3', function( $notification, $form, $entry ) {
    // Route to Scholarship Committee
    $notification['to'] = get_option( 'scholarship_email', 'scholarship@valderramainternationalschool.com' );
    $notification['subject'] = '[Valderrama Scholarships] New Application - ' . rgar( $entry, '1.3' ) . ' ' . rgar( $entry, '1.6' );
    $notification['message'] = 'Family Name: ' . rgar( $entry, '1.3' ) . ' ' . rgar( $entry, '1.6' ) . "\n";
    $notification['message'] .= 'Scholarship Type Requested: ' . rgar( $entry, '4' ) . "\n";
    $notification['message'] .= 'Income Range: ' . rgar( $entry, '5' ) . "\n";
    $notification['message'] .= 'Date Received: ' . date( 'Y-m-d H:i:s' );
    return $notification;
}, 10, 3 );

?>