<?php
/**
 * Valderrama International School Theme functions and definitions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Theme setup
function valderrama_setup() {
    load_theme_textdomain( 'valderrama', get_template_directory() . '/languages' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    
    // Register navigation menus for multi-page structure
    register_nav_menus( array(
        'primary'      => __( 'Primary Menu', 'valderrama' ),
        'about'        => __( 'Quiénes Somos Menu', 'valderrama' ),
        'education'    => __( 'Modelo Educativo Menu', 'valderrama' ),
        'academics'    => __( 'Academics Menu', 'valderrama' ),
        'student-life' => __( 'Student Life Menu', 'valderrama' ),
        'learning'     => __( 'Learning Center Menu', 'valderrama' ),
        'admissions'   => __( 'Admissions Menu', 'valderrama' ),
        'community'    => __( 'Community Menu', 'valderrama' ),
        'transparency' => __( 'Transparency Menu', 'valderrama' ),
        'contact'      => __( 'Contact Menu', 'valderrama' ),
        'footer'       => __( 'Footer Menu', 'valderrama' ),
    ) );
}
add_action( 'after_setup_theme', 'valderrama_setup' );

// Enqueue styles and scripts
function valderrama_scripts() {
    wp_enqueue_style( 'valderrama-style', get_stylesheet_uri(), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'valderrama_scripts' );

// Register widget areas
function valderrama_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Sidebar', 'valderrama' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here.', 'valderrama' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'valderrama_widgets_init' );

// ACF Options Page (if ACF Pro is active)
if ( function_exists( 'acf_add_options_page' ) ) {
    acf_add_options_page(array(
        'page_title'    => __( 'Valderrama Settings', 'valderrama' ),
        'menu_title'    => __( 'Valderrama', 'valderrama' ),
        'menu_slug'     => 'valderrama-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
}

// Custom image sizes
add_image_size( 'hero', 1920, 600, true );
add_image_size( 'card', 800, 600, true );

// Helper: Get theme asset URL
function valderrama_asset( $path ) {
    return get_template_directory_uri() . '/' . ltrim( $path, '/' );
}

// Breadcrumbs function
function valderrama_breadcrumbs() {
    if ( is_front_page() ) {
        return;
    }
    
    echo '<nav class="breadcrumbs" aria-label="breadcrumb">';
    echo '<ol class="breadcrumb-list">';
    echo '<li class="breadcrumb-item"><a href="' . home_url() . '">' . __( 'Home', 'valderrama' ) . '</a></li>';
    
    if ( is_page() ) {
        $ancestors = get_post_ancestors( get_the_ID() );
        $ancestors = array_reverse( $ancestors );
        
        foreach ( $ancestors as $ancestor ) {
            echo '<li class="breadcrumb-item"><a href="' . get_permalink( $ancestor ) . '">' . get_the_title( $ancestor ) . '</a></li>';
        }
        
        echo '<li class="breadcrumb-item active" aria-current="page">' . get_the_title() . '</li>';
    }
    
    echo '</ol>';
    echo '</nav>';
}

// Get section icon based on page template or parent
function valderrama_get_section_icon( $page_id = null ) {
    if ( ! $page_id ) {
        $page_id = get_the_ID();
    }
    
    $template = get_page_template_slug( $page_id );
    $parent_id = wp_get_post_parent_id( $page_id );
    $slug = get_post_field( 'post_name', $page_id );
    
    // Icon mapping for main sections
    $icons = array(
        'quienes-somos'      => '🏫',
        'modelo-educativo'   => '📚',
        'academics'          => '🎓',
        'student-life'       => '⚽',
        'learning-center'    => '💡',
        'admissions'         => '📝',
        'community'          => '🤝',
        'transparency'       => '📋',
        'contact'            => '📞',
    );
    
    // Check current page or parent
    foreach ( $icons as $section => $icon ) {
        if ( strpos( $slug, $section ) !== false ) {
            return $icon;
        }
        if ( $parent_id && strpos( get_post_field( 'post_name', $parent_id ), $section ) !== false ) {
            return $icon;
        }
    }
    
    return '📄';
}

// Get related pages from same section
function valderrama_get_related_pages( $limit = 3 ) {
    $current_id = get_the_ID();
    $parent_id = wp_get_post_parent_id( $current_id );
    
    if ( ! $parent_id ) {
        $parent_id = $current_id;
    }
    
    $args = array(
        'post_type'      => 'page',
        'post_parent'    => $parent_id,
        'posts_per_page' => $limit,
        'post__not_in'   => array( $current_id ),
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );
    
    return get_posts( $args );
}

// Custom body classes for page hierarchy
function valderrama_body_classes( $classes ) {
    if ( is_page() ) {
        $parent_id = wp_get_post_parent_id( get_the_ID() );
        if ( $parent_id ) {
            $parent_slug = get_post_field( 'post_name', $parent_id );
            $classes[] = 'section-' . $parent_slug;
            $classes[] = 'subsection';
        } else {
            $classes[] = 'section-parent';
        }
    }
    return $classes;
}
add_filter( 'body_class', 'valderrama_body_classes' );

?>
