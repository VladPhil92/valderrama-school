</main>

<footer class="site-footer">
    <div class="container">
        <div class="footer-widgets grid-3">
            <div class="footer-widget">
                <h3><?php _e( 'Valderrama International School', 'valderrama' ); ?></h3>
                <p><?php _e( 'A bilingual IB school in Cartagena, Colombia providing world-class education.', 'valderrama' ); ?></p>
                <div class="social-links">
                    <a href="#" class="social-icon">Facebook</a>
                    <a href="#" class="social-icon">Instagram</a>
                    <a href="#" class="social-icon">LinkedIn</a>
                </div>
            </div>
            
            <div class="footer-widget">
                <h3><?php _e( 'Quick Links', 'valderrama' ); ?></h3>
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'footer',
                    'menu_class'     => 'footer-menu',
                ) );
                ?>
            </div>
            
            <div class="footer-widget">
                <h3><?php _e( 'Contact Us', 'valderrama' ); ?></h3>
                <p>
                    <?php 
                    $address = get_option('school_address', 'Calle 123, Cartagena, Colombia');
                    echo esc_html($address);
                    ?><br>
                    <?php 
                    $phone = get_option('school_phone', '+57 5 123 4567');
                    echo esc_html($phone);
                    ?><br>
                    <?php 
                    $email = get_option('school_email', 'info@valderramainternationalschool.com');
                    echo esc_html($email);
                    ?>
                </p>
            </div>
        </div>
        
        <div class="copyright text-center py-3">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e( 'All rights reserved.', 'valderrama' ); ?></p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>