<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container">
        <div class="header-inner" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
            <div class="site-branding">
                <div class="logo">
                    <?php
                    $logo = get_theme_mod( 'custom_logo' );
                    if ( $logo ) :
                        echo wp_get_attachment_image( $logo, 'full', array( 'class' => 'custom-logo' ) );
                    else :
                        echo '<img src="' . esc_url( get_template_directory_uri() ) . '/../99_Plantillas_y_Recursos_Comunes/LOGO VALDERRAMA INTERNATIONAL SCHOOL.png" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '" style="max-height: 80px;">';
                    endif;
                    ?>
                </div>
            </div>

            <button class="mobile-menu-toggle" id="mobileMenuToggle" style="display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #333;" onclick="toggleMobileMenu()">
                ☰
            </button>

            <nav id="site-navigation" class="main-navigation" style="display: flex; align-items: center;">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'nav-menu',
                    'container'      => false,
                ) );
                ?>
            </nav>

            <style>
                .nav-menu {
                    list-style: none;
                    display: flex;
                    margin: 0;
                    padding: 0;
                    gap: 0.5rem;
                }
                .nav-menu > li {
                    position: relative;
                }
                .nav-menu > li > a {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #333;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.3s;
                    white-space: nowrap;
                }
                .nav-menu > li > a:hover {
                    color: #C41E3A;
                }
                .nav-menu > li:hover > .sub-menu {
                    display: block;
                }
                .nav-menu .sub-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    border: 1px solid #E0E0E0;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    min-width: 250px;
                    padding: 0.5rem 0;
                    list-style: none;
                    margin: 0;
                    z-index: 1000;
                }
                .nav-menu .sub-menu li {
                    padding: 0;
                }
                .nav-menu .sub-menu li a {
                    display: block;
                    padding: 0.75rem 1.5rem;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.3s;
                }
                .nav-menu .sub-menu li a:hover {
                    background: #F5F5F5;
                    color: #C41E3A;
                }
                
                @media (max-width: 992px) {
                    .mobile-menu-toggle {
                        display: block !important;
                    }
                    .main-navigation {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        border-top: 1px solid #E0E0E0;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                        z-index: 1000;
                    }
                    .main-navigation.active {
                        display: block !important;
                    }
                    .nav-menu {
                        flex-direction: column;
                        padding: 1rem;
                    }
                    .nav-menu > li {
                        border-bottom: 1px solid #E0E0E0;
                    }
                    .nav-menu .sub-menu {
                        position: static;
                        display: none;
                        box-shadow: none;
                        border: none;
                        border-left: 3px solid #C41E3A;
                        margin-left: 1rem;
                        margin-top: 0.5rem;
                    }
                    .nav-menu > li.menu-item-has-children > a::after {
                        content: ' ▼';
                        font-size: 0.75rem;
                    }
                }
            </style>

            <script>
                function toggleMobileMenu() {
                    const nav = document.getElementById('site-navigation');
                    nav.classList.toggle('active');
                }
                
                // Toggle submenus on mobile
                document.addEventListener('DOMContentLoaded', function() {
                    if (window.innerWidth <= 992) {
                        const menuItems = document.querySelectorAll('.menu-item-has-children > a');
                        menuItems.forEach(item => {
                            item.addEventListener('click', function(e) {
                                e.preventDefault();
                                const submenu = this.nextElementSibling;
                                if (submenu && submenu.classList.contains('sub-menu')) {
                                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                                }
                            });
                        });
                    }
                });
            </script>

            <div class="header-actions">
                <div class="language-switcher">
                    <?php
                    if ( function_exists( 'wpml_add_language_selector' ) ) {
                        wpml_add_language_selector();
                    }
                    ?>
                </div>
                <div class="access-buttons">
                    <a href="#" class="btn"><?php _e( 'Parent Portal', 'valderrama' ); ?></a>
                </div>
            </div>
        </div>
    </div>
</header>

<main id="primary" class="site-main">