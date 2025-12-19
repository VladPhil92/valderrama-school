<?php
/**
 * Template Name: Contact Page
 */

get_header(); ?>

<div class="container py-3">
    <?php
    while ( have_posts() ) :
        the_post();
        ?>
        <header class="page-header text-center">
            <h1><?php the_title(); ?></h1>
        </header>

        <div class="page-content">
            <div class="grid-2">
                <div class="contact-form-column">
                    <?php the_content(); ?>
                    
                    <div class="contact-form">
                        <h3><?php _e( 'Send us a message', 'valderrama' ); ?></h3>
                        
                        <?php echo do_shortcode('[gravityform id="1" title="false" description="false"]'); ?>
                        
                        <?php 
                        // If Gravity Forms is not available, show a basic form
                        if ( ! class_exists( 'GFCommon' ) ) : ?>
                            <form id="basic-contact-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
                                <input type="hidden" name="action" value="valderrama_contact_form">
                                <input type="hidden" name="nonce" value="<?php echo wp_create_nonce( 'valderrama_contact_nonce' ); ?>">
                                
                                <div class="form-group">
                                    <label for="name"><?php _e( 'Full Name', 'valderrama' ); ?> *</label>
                                    <input type="text" id="name" name="name" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email"><?php _e( 'Email Address', 'valderrama' ); ?> *</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="phone"><?php _e( 'Phone Number', 'valderrama' ); ?></label>
                                    <input type="tel" id="phone" name="phone">
                                </div>
                                
                                <div class="form-group">
                                    <label for="inquiry-type"><?php _e( 'Inquiry Type', 'valderrama' ); ?></label>
                                    <select id="inquiry-type" name="inquiry-type">
                                        <option value="admissions"><?php _e( 'Admissions', 'valderrama' ); ?></option>
                                        <option value="general"><?php _e( 'General Information', 'valderrama' ); ?></option>
                                        <option value="payment"><?php _e( 'Payment Questions', 'valderrama' ); ?></option>
                                        <option value="employment"><?php _e( 'Employment', 'valderrama' ); ?></option>
                                        <option value="other"><?php _e( 'Other', 'valderrama' ); ?></option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="message"><?php _e( 'Message', 'valderrama' ); ?> *</label>
                                    <textarea id="message" name="message" rows="5" required></textarea>
                                </div>
                                
                                <button type="submit" class="btn btn-primary"><?php _e( 'Send Message', 'valderrama' ); ?></button>
                            </form>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="contact-info-column">
                    <div class="contact-info">
                        <h3><?php _e( 'Contact Information', 'valderrama' ); ?></h3>
                        
                        <div class="info-item">
                            <h4><?php _e( 'Address', 'valderrama' ); ?></h4>
                            <p><?php echo esc_html( get_option('school_address', 'Calle 123, Cartagena, Colombia') ); ?></p>
                        </div>
                        
                        <div class="info-item">
                            <h4><?php _e( 'Phone', 'valderrama' ); ?></h4>
                            <p><?php echo esc_html( get_option('school_phone', '+57 5 123 4567') ); ?></p>
                        </div>
                        
                        <div class="info-item">
                            <h4><?php _e( 'Email', 'valderrama' ); ?></h4>
                            <p><a href="mailto:<?php echo esc_attr( get_option('school_email', 'info@valderramainternationalschool.com') ); ?>">
                                <?php echo esc_html( get_option('school_email', 'info@valderramainternationalschool.com') ); ?>
                            </a></p>
                        </div>
                        
                        <div class="info-item">
                            <h4><?php _e( 'Office Hours', 'valderrama' ); ?></h4>
                            <p>
                                <?php _e( 'Monday - Friday:', 'valderrama' ); ?> 7:30 AM - 4:30 PM<br>
                                <?php _e( 'Saturday:', 'valderrama' ); ?> 8:00 AM - 12:00 PM<br>
                                <?php _e( 'Sunday:', 'valderrama' ); ?> Closed
                            </p>
                        </div>
                    </div>
                    
                    <div class="contact-map">
                        <h3><?php _e( 'Find Us', 'valderrama' ); ?></h3>
                        
                        <?php 
                        // If Google Maps plugin is not available, show placeholder
                        echo do_shortcode('[wpgmza id="1"]') ?: '<div class="map-placeholder" style="height: 300px; background-color: #eee; display: flex; align-items: center; justify-content: center;">' . __('Map Placeholder - Google Maps API Key Required', 'valderrama') . '</div>';
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    endwhile; // End of the loop.
    ?>
</div>

<?php get_footer(); ?>