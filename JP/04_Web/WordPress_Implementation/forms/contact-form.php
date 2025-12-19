<?php
/**
 * Gravity Forms Contact Form Configuration
 * Form ID: 1
 */

add_action( 'gform_pre_render_1', 'valderrama_pre_render_contact_form' );
add_action( 'gform_validation_1', 'valderrama_contact_form_validation' );
add_filter( 'gform_confirmation_1', 'valderrama_contact_form_confirmation', 10, 4 );

/**
 * Form field configuration
 */
function valderrama_contact_form_fields() {
    return array(
        array(
            'id' => 1,
            'type' => 'name',
            'label' => __( 'Full Name', 'valderrama' ),
            'name' => 'fullname',
            'isRequired' => true,
            'nameFormat' => 'extended',
            'inputs' => array(
                array(
                    'id' => 1.3,
                    'label' => __( 'First Name', 'valderrama' ),
                    'name' => 'firstname'
                ),
                array(
                    'id' => 1.6,
                    'label' => __( 'Last Name', 'valderrama' ),
                    'name' => 'lastname'
                )
            )
        ),
        array(
            'id' => 2,
            'type' => 'email',
            'label' => __( 'Email Address', 'valderrama' ),
            'name' => 'email',
            'isRequired' => true,
            'placeholder' => 'your.name@example.com'
        ),
        array(
            'id' => 3,
            'type' => 'phone',
            'label' => __( 'Phone Number', 'valderrama' ),
            'name' => 'phone',
            'isRequired' => false,
            'placeholder' => '+57 XXX XXX XXXX'
        ),
        array(
            'id' => 4,
            'type' => 'select',
            'label' => __( 'I am a', 'valderrama' ),
            'name' => 'personType',
            'isRequired' => true,
            'choices' => array(
                array(
                    'text' => __( 'Parent', 'valderrama' ),
                    'value' => 'parent'
                ),
                array(
                    'text' => __( 'Student', 'valderrama' ),
                    'value' => 'student'
                ),
                array(
                    'text' => __( 'Prospective Parent', 'valderrama' ),
                    'value' => 'prospective_parent'
                ),
                array(
                    'text' => __( 'Other', 'valderrama' ),
                    'value' => 'other'
                )
            )
        ),
        array(
            'id' => 5,
            'type' => 'select',
            'label' => __( 'Inquiry Type', 'valderrama' ),
            'name' => 'inquiryType',
            'isRequired' => true,
            'choices' => array(
                array(
                    'text' => __( 'General Information', 'valderrama' ),
                    'value' => 'general'
                ),
                array(
                    'text' => __( 'Admissions', 'valderrama' ),
                    'value' => 'admissions'
                ),
                array(
                    'text' => __( 'Tuition & Fees', 'valderrama' ),
                    'value' => 'fees'
                ),
                array(
                    'text' => __( 'Employment', 'valderrama' ),
                    'value' => 'employment'
                ),
                array(
                    'text' => __( 'Other', 'valderrama' ),
                    'value' => 'other'
                )
            )
        ),
        array(
            'id' => 6,
            'type' => 'textarea',
            'label' => __( 'Message', 'valderrama' ),
            'name' => 'message',
            'isRequired' => true,
            'placeholder' => __( 'Please tell us how we can help...', 'valderrama' )
        )
    );
}

/**
 * Pre-render function to customize the form
 */
function valderrama_pre_render_contact_form( $form ) {
    // Add custom CSS classes to form
    $form['cssClass'] = 'valderrama-contact-form';
    
    // Customize submit button
    foreach ( $form['fields'] as &$field ) {
        if ( $field->type == 'submit' ) {
            $field->cssClass = 'btn btn-primary';
            $field->text = __( 'Send Message', 'valderrama' );
        }
    }
    
    return $form;
}

/**
 * Custom validation
 */
function valderrama_contact_form_validation( $validation_result ) {
    $form = $validation_result['form'];
    
    // Example: Custom validation for phone number if provided
    $phone_field = GFAPI::get_field( $form, 3 );
    $phone_value = rgpost( 'input_3' );
    
    if ( ! empty( $phone_value ) && ! preg_match( '/^[\+]?[0-9\s\(\)\-]+$/', $phone_value ) ) {
        $validation_result['is_valid'] = false;
        $phone_field->failed_validation = true;
        $phone_field->validation_message = __( 'Please enter a valid phone number', 'valderrama' );
    }
    
    return $validation_result;
}

/**
 * Custom confirmation message
 */
function valderrama_contact_form_confirmation( $confirmation, $form, $entry, $ajax ) {
    // Get inquiry type for personalized response
    $inquiry_type = rgar( $entry, '5' );
    
    $confirmation = '<div class="confirmation-message">';
    $confirmation .= '<h3>' . __( 'Thank you for your inquiry!', 'valderrama' ) . '</h3>';
    $confirmation .= '<p>' . __( 'We have received your message and will respond within 1-2 business days.', 'valderrama' ) . '</p>';
    
    // Add specific messaging based on inquiry type
    switch( $inquiry_type ) {
        case 'admissions':
            $confirmation .= '<p>' . __( 'For immediate assistance with admissions, please call our office at +57 5 XXX XXXX.', 'valderrama' ) . '</p>';
            break;
        case 'fees':
            $confirmation .= '<p>' . __( 'You can find detailed tuition information on our Admissions page or by visiting our financial office.', 'valderrama' ) . '</p>';
            break;
        case 'employment':
            $confirmation .= '<p>' . __( 'We will review your inquiry and contact you if suitable positions are available.', 'valderrama' ) . '</p>';
            break;
    }
    
    $confirmation .= '<p>' . __( 'If your matter is urgent, please call our offices directly.', 'valderrama' ) . '</p>';
    $confirmation .= '</div>';
    
    return $confirmation;
}

/**
 * Gravity Forms notification setup
 */
add_action( 'gform_notification', 'valderrama_contact_form_notification', 10, 3 );
function valderrama_contact_form_notification( $notification, $form, $entry ) {
    if ( $form['id'] != 1 ) {
        return $notification;
    }
    
    // Customize email subject based on inquiry type
    $inquiry_type = rgar( $entry, '5' );
    $person_type = rgar( $entry, '4' );
    
    $notification['subject'] = '[Valderrama School] Contact Form: ' . $inquiry_type . ' - ' . $person_type;
    
    // Create custom email body
    $name = rgar( $entry, '1.3' ) . ' ' . rgar( $entry, '1.6' );
    $email = rgar( $entry, '2' );
    $phone = rgar( $entry, '3' );
    $message = rgar( $entry, '6' );
    
    $notification['message'] = "New inquiry from Valderrama International School website:\n\n";
    $notification['message'] .= "Name: $name\n";
    $notification['message'] .= "Email: $email\n";
    
    if ( ! empty( $phone ) ) {
        $notification['message'] .= "Phone: $phone\n";
    }
    
    $notification['message'] .= "I am a: $person_type\n";
    $notification['message'] .= "Inquiry Type: $inquiry_type\n";
    $notification['message'] .= "Message:\n$message\n\n";
    $notification['message'] .= "Date: " . date( 'Y-m-d H:i:s' );
    
    return $notification;
}

?>