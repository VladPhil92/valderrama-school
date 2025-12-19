<?php
/**
 * Gravity Forms Admissions Form Configuration
 * Form ID: 2
 * Multi-step: 5 pages
 */

add_filter( 'gform_progress_bar_color_2', function( $color, $form ) {
    return '#C41E3A';
}, 10, 2 );

add_filter( 'gform_ajax_spinner_url_2', function( $image_src, $form ) {
    return get_stylesheet_directory_uri() . '/assets/images/spinner.gif';
}, 10, 2 );

/**
 * Admissions form confirmation
 */
add_filter( 'gform_confirmation_2', function( $confirmation, $form, $entry, $ajax ) {
    $confirmation = '<div class="confirmation-message">';
    $confirmation .= '<h3>' . __( 'Admissions application received', 'valderrama' ) . '</h3>';
    $confirmation .= '<p>' . __( 'We will contact you within 2-3 business days with next steps.', 'valderrama' ) . '</p>';
    $confirmation .= '</div>';
    return $confirmation;
}, 10, 4 );

/**
 * Pages configuration (for documentation purposes)
 */
function valderrama_admissions_pages_spec() {
    return array(
        array(
            'title' => __( 'Student Information', 'valderrama' ),
            'fields' => array( 'student_name', 'dob', 'nationality', 'language_home', 'grade_applying' )
        ),
        array(
            'title' => __( 'Academic History', 'valderrama' ),
            'fields' => array( 'current_school', 'previous_schools', 'academic_support', 'ib_experience' )
        ),
        array(
            'title' => __( 'Parent/Guardian Information', 'valderrama' ),
            'fields' => array( 'parent1_name', 'parent1_email', 'parent1_phone', 'parent2_name', 'parent2_email', 'parent2_phone' )
        ),
        array(
            'title' => __( 'Supporting Documents', 'valderrama' ),
            'fields' => array( 'transcripts', 'recommendations', 'passport_birth_cert', 'vaccination_record' )
        ),
        array(
            'title' => __( 'Review & Submit', 'valderrama' ),
            'fields' => array( 'terms', 'privacy', 'signature' )
        )
    );
}

/**
 * Notifications and routing
 */
add_filter( 'gform_notification_2', function( $notification, $form, $entry ) {
    // Route to Admissions Office mailbox
    $notification['to'] = get_option( 'admissions_email', 'admissions@valderramainternationalschool.com' );
    $notification['subject'] = '[Valderrama Admissions] New Application - ' . rgar( $entry, '1.3' ) . ' ' . rgar( $entry, '1.6' );
    return $notification;
}, 10, 3 );

?>