<?php
/**
 * Plugin Name: Valderrama International School Custom Content Types
 * Plugin URI: https://valderramainternationalschool.com
 * Description: Custom post types and taxonomies for Valderrama International School website
 * Author: Valderrama International School Team
 * Version: 1.0.0
 * Text Domain: valderrama
 * Domain Path: /languages
 */

// Prevent direct file access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register custom post types
 */
function valderrama_register_post_types() {
    // Event Post Type
    register_post_type( 'event',
        array(
            'labels'        => array(
                'name'          => __( 'Events', 'valderrama' ),
                'singular_name' => __( 'Event', 'valderrama' ),
            ),
            'public'        => true,
            'has_archive'   => true,
            'menu_icon'     => 'dashicons-calendar-alt',
            'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
            'show_in_ui'    => true,
            'show_in_menu'  => true,
            'menu_position' => 5,
            'rewrite'       => array( 'slug' => 'events' ),
        )
    );
    
    // Gallery Post Type
    register_post_type( 'gallery',
        array(
            'labels'        => array(
                'name'          => __( 'Galleries', 'valderrama' ),
                'singular_name' => __( 'Gallery', 'valderrama' ),
            ),
            'public'        => true,
            'has_archive'   => true,
            'menu_icon'     => 'dashicons-format-gallery',
            'supports'      => array( 'title', 'editor', 'thumbnail', 'revisions' ),
            'show_in_ui'    => true,
            'show_in_menu'  => true,
            'menu_position' => 6,
            'rewrite'       => array( 'slug' => 'gallery' ),
        )
    );
    
    // Program Post Type
    register_post_type( 'program',
        array(
            'labels'        => array(
                'name'          => __( 'Academic Programs', 'valderrama' ),
                'singular_name' => __( 'Program', 'valderrama' ),
            ),
            'public'        => true,
            'has_archive'   => true,
            'menu_icon'     => 'dashicons-book',
            'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
            'hierarchical'  => true,
            'show_in_ui'    => true,
            'show_in_menu'  => true,
            'menu_position' => 7,
            'rewrite'       => array( 'slug' => 'programs' ),
        )
    );
    
    // Staff Post Type
    register_post_type( 'staff',
        array(
            'labels'        => array(
                'name'          => __( 'Staff Members', 'valderrama' ),
                'singular_name' => __( 'Staff Member', 'valderrama' ),
            ),
            'public'        => true,
            'has_archive'   => true,
            'menu_icon'     => 'dashicons-groups',
            'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
            'show_in_ui'    => true,
            'show_in_menu'  => true,
            'menu_position' => 8,
            'rewrite'       => array( 'slug' => 'staff' ),
        )
    );
    
    // Testimonial Post Type
    register_post_type( 'testimonial',
        array(
            'labels'        => array(
                'name'          => __( 'Testimonials', 'valderrama' ),
                'singular_name' => __( 'Testimonial', 'valderrama' ),
            ),
            'public'        => false,
            'show_ui'       => true,
            'menu_icon'     => 'dashicons-format-quote',
            'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
            'menu_position' => 9,
            'capability_type' => 'page',
        )
    );
}
add_action( 'init', 'valderrama_register_post_types' );

/**
 * Register custom taxonomies
 */
function valderrama_register_taxonomies() {
    // Event Categories
    register_taxonomy( 'event_category',
        array( 'event' ),
        array(
            'label'         => __( 'Event Categories', 'valderrama' ),
            'labels'        => array(
                'name'          => __( 'Event Categories', 'valderrama' ),
                'singular_name' => __( 'Event Category', 'valderrama' ),
            ),
            'public'        => true,
            'hierarchical'  => true,
            'show_ui'       => true,
            'show_admin_column' => true,
            'query_var'     => true,
            'rewrite'       => array( 'slug' => 'event-categories' ),
        )
    );
    
    // Gallery Categories
    register_taxonomy( 'gallery_category',
        array( 'gallery' ),
        array(
            'label'         => __( 'Gallery Categories', 'valderrama' ),
            'labels'        => array(
                'name'          => __( 'Gallery Categories', 'valderrama' ),
                'singular_name' => __( 'Gallery Category', 'valderrama' ),
            ),
            'public'        => true,
            'hierarchical'  => true,
            'show_ui'       => true,
            'show_admin_column' => true,
            'query_var'     => true,
            'rewrite'       => array( 'slug' => 'gallery-categories' ),
        )
    );
    
    // Staff Departments
    register_taxonomy( 'department',
        array( 'staff' ),
        array(
            'label'         => __( 'Departments', 'valderrama' ),
            'labels'        => array(
                'name'          => __( 'Departments', 'valderrama' ),
                'singular_name' => __( 'Department', 'valderrama' ),
            ),
            'public'        => true,
            'hierarchical'  => true,
            'show_ui'       => true,
            'show_admin_column' => true,
            'query_var'     => true,
            'rewrite'       => array( 'slug' => 'departments' ),
        )
    );
    
    // Program Levels
    register_taxonomy( 'program_level',
        array( 'program' ),
        array(
            'label'         => __( 'Program Levels', 'valderrama' ),
            'labels'        => array(
                'name'          => __( 'Program Levels', 'valderrama' ),
                'singular_name' => __( 'Program Level', 'valderrama' ),
            ),
            'public'        => true,
            'hierarchical'  => true,
            'show_ui'       => true,
            'show_admin_column' => true,
            'query_var'     => true,
            'rewrite'       => array( 'slug' => 'program-levels' ),
        )
    );
}
add_action( 'init', 'valderrama_register_taxonomies' );

/**
 * Flush rewrite rules on plugin activation
 */
function valderrama_cpt_activation() {
    valderrama_register_post_types();
    valderrama_register_taxonomies();
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'valderrama_cpt_activation' );

/**
 * Create Gravity Forms for enrollment
 */
function valderrama_create_enrollment_forms() {
    // Only create if Gravity Forms is active
    if ( ! class_exists( 'GFForms' ) ) {
        return;
    }

    // Create Enrollment Form (if it doesn't exist)
    $form_title = __( 'Enrollment - Tutoring & Courses', 'valderrama' );
    $existing_form = RGFormsModel::get_form_id( $form_title );
    
    if ( $existing_form ) {
        return; // Form already exists
    }

    $form = array(
        'title' => $form_title,
        'description' => __( 'Enrollment form for tutoring services and courses', 'valderrama' ),
        'labelPlacement' => 'top_label',
        'descriptionPlacement' => 'below',
        'fields' => array(
            array(
                'id' => 1,
                'type' => 'text',
                'label' => __( 'Student Name', 'valderrama' ),
                'isRequired' => true,
                'size' => 'large',
            ),
            array(
                'id' => 2,
                'type' => 'text',
                'label' => __( 'Parent/Guardian Name', 'valderrama' ),
                'isRequired' => true,
                'size' => 'large',
            ),
            array(
                'id' => 3,
                'type' => 'email',
                'label' => __( 'Email', 'valderrama' ),
                'isRequired' => true,
                'size' => 'large',
            ),
            array(
                'id' => 4,
                'type' => 'phone',
                'label' => __( 'Phone Number', 'valderrama' ),
                'isRequired' => true,
                'size' => 'large',
                'phoneFormat' => 'international',
            ),
            array(
                'id' => 5,
                'type' => 'select',
                'label' => __( 'Grade Level', 'valderrama' ),
                'isRequired' => true,
                'choices' => array(
                    array( 'text' => __( 'Elementary School', 'valderrama' ), 'value' => 'elementary' ),
                    array( 'text' => __( 'Middle School', 'valderrama' ), 'value' => 'middle' ),
                    array( 'text' => __( 'High School', 'valderrama' ), 'value' => 'high' ),
                ),
            ),
            array(
                'id' => 6,
                'type' => 'text',
                'label' => __( 'Course/Service Interest', 'valderrama' ),
                'isRequired' => true,
                'size' => 'large',
            ),
            array(
                'id' => 7,
                'type' => 'textarea',
                'label' => __( 'Additional Information', 'valderrama' ),
                'isRequired' => false,
            ),
        ),
        'button' => array(
            'type' => 'text',
            'text' => __( 'Submit Enrollment', 'valderrama' ),
        ),
        'confirmation' => array(
            'id' => 'default_confirmation',
            'isDefault' => true,
            'type' => 'message',
            'message' => __( 'Thank you for your enrollment! We will contact you soon to confirm your registration.', 'valderrama' ),
        ),
        'notifications' => array(
            array(
                'id' => 'admin_notification',
                'isDefault' => true,
                'to' => get_option( 'admin_email' ),
                'name' => __( 'Admin Notification', 'valderrama' ),
                'event' => 'form_submission',
                'toType' => 'email',
                'subject' => __( 'New Enrollment: {Course/Service Interest:6}', 'valderrama' ),
                'message' => __( 'New enrollment submission from {Student Name:1}', 'valderrama' ),
            ),
            array(
                'id' => 'user_notification',
                'isDefault' => false,
                'to' => '{Email:3}',
                'name' => __( 'Student Notification', 'valderrama' ),
                'event' => 'form_submission',
                'toType' => 'email',
                'subject' => __( 'Enrollment Confirmation - Valderrama International School', 'valderrama' ),
                'message' => __( 'Hi {Parent/Guardian Name:2},\n\nWe have received your enrollment request. Our team will contact you shortly to confirm the registration details.\n\nBest regards,\nValderrama International School Team', 'valderrama' ),
            ),
        ),
    );

    // Insert the form
    $form_id = GFForms::create_form( $form );
}
add_action( 'admin_init', 'valderrama_create_enrollment_forms' );

/**
 * Enqueue scripts and localize AJAX data
 */
function valderrama_enqueue_enrollment_scripts() {
    wp_localize_script( 'valderrama-enrollment', 'valderramaAjax', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'nonce' => wp_create_nonce( 'valderrama_enrollment_nonce' ),
    ));
}
add_action( 'wp_enqueue_scripts', 'valderrama_enqueue_enrollment_scripts' );

/**
 * Handle AJAX enrollment submission
 */
function valderrama_handle_enrollment() {
    // Verify nonce
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'valderrama_enrollment_nonce' ) ) {
        wp_send_json_error( __( 'Security verification failed', 'valderrama' ) );
    }

    // Sanitize and validate input
    $enrollment_data = array(
        'student_name' => sanitize_text_field( $_POST['student_name'] ?? '' ),
        'parent_name' => sanitize_text_field( $_POST['parent_name'] ?? '' ),
        'email' => sanitize_email( $_POST['email'] ?? '' ),
        'phone' => sanitize_text_field( $_POST['phone'] ?? '' ),
        'level' => sanitize_text_field( $_POST['level'] ?? '' ),
        'course' => sanitize_text_field( $_POST['course'] ?? '' ),
        'message' => sanitize_textarea_field( $_POST['message'] ?? '' ),
        'language' => sanitize_text_field( $_POST['language'] ?? 'es' ),
        'submission_date' => current_time( 'mysql' ),
        'submission_ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    );

    // Validate required fields
    if ( ! $enrollment_data['student_name'] || ! $enrollment_data['email'] || ! $enrollment_data['phone'] ) {
        wp_send_json_error( __( 'Missing required fields', 'valderrama' ) );
    }

    // If Gravity Forms is active, submit to form
    if ( class_exists( 'GFForms' ) ) {
        // Get the enrollment form
        $form = RGFormsModel::get_form_by_title( __( 'Enrollment - Tutoring & Courses', 'valderrama' ) );
        
        if ( $form ) {
            $entry = array(
                'form_id' => $form->id,
                '1' => $enrollment_data['student_name'],
                '2' => $enrollment_data['parent_name'],
                '3' => $enrollment_data['email'],
                '4' => $enrollment_data['phone'],
                '5' => $enrollment_data['level'],
                '6' => $enrollment_data['course'],
                '7' => $enrollment_data['message'],
            );
            
            $entry_id = GFAPI::add_entry( $entry );
            
            if ( is_wp_error( $entry_id ) ) {
                wp_send_json_error( __( 'Error submitting enrollment', 'valderrama' ) );
            }
        }
    }

    // Also save to custom table for backup
    global $wpdb;
    $table_name = $wpdb->prefix . 'valderrama_enrollments';
    
    $wpdb->insert(
        $table_name,
        $enrollment_data,
        array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
    );

    // Send email notification to admin
    $admin_email = get_option( 'admin_email' );
    $subject = sprintf(
        __( 'New Enrollment: %s - %s', 'valderrama' ),
        $enrollment_data['course'],
        $enrollment_data['student_name']
    );
    
    $message = sprintf(
        __(
            "New enrollment submission:\n\n" .
            "Student Name: %s\n" .
            "Parent/Guardian: %s\n" .
            "Email: %s\n" .
            "Phone: %s\n" .
            "Level: %s\n" .
            "Course/Service: %s\n" .
            "Message: %s\n\n" .
            "Submitted: %s\n" .
            "IP: %s",
            'valderrama'
        ),
        $enrollment_data['student_name'],
        $enrollment_data['parent_name'],
        $enrollment_data['email'],
        $enrollment_data['phone'],
        $enrollment_data['level'],
        $enrollment_data['course'],
        $enrollment_data['message'],
        $enrollment_data['submission_date'],
        $enrollment_data['submission_ip']
    );
    
    wp_mail( $admin_email, $subject, $message );

    // Send confirmation email to student
    $student_subject = __( 'Enrollment Confirmation - Valderrama International School', 'valderrama' );
    $student_message = sprintf(
        __(
            "Hi %s,\n\n" .
            "We have received your enrollment request for: %s\n\n" .
            "Our team will contact you shortly to confirm the registration details.\n\n" .
            "Best regards,\n" .
            "Valderrama International School Team",
            'valderrama'
        ),
        $enrollment_data['parent_name'],
        $enrollment_data['course']
    );
    
    wp_mail( $enrollment_data['email'], $student_subject, $student_message );

    wp_send_json_success( __( 'Enrollment submitted successfully', 'valderrama' ) );
}
add_action( 'wp_ajax_valderrama_enrollment', 'valderrama_handle_enrollment' );
add_action( 'wp_ajax_nopriv_valderrama_enrollment', 'valderrama_handle_enrollment' );

/**
 * Create custom table for enrollment storage
 */
function valderrama_create_enrollment_table() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'valderrama_enrollments';

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        student_name varchar(255) NOT NULL,
        parent_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(20) NOT NULL,
        level varchar(50) NOT NULL,
        course varchar(255) NOT NULL,
        message longtext,
        language varchar(10),
        submission_date datetime DEFAULT CURRENT_TIMESTAMP,
        submission_ip varchar(45),
        PRIMARY KEY  (id),
        KEY email (email),
        KEY submission_date (submission_date)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'valderrama_create_enrollment_table' );

/**
 * Flush rewrite rules on plugin deactivation
 */
function valderrama_cpt_deactivation() {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'valderrama_cpt_deactivation' );