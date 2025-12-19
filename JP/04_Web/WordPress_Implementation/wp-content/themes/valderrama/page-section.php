<?php
/**
 * Template Name: Section Parent Page
 * Description: Template for main section pages (e.g., Quiénes Somos, Modelo Educativo, Academics)
 */

get_header(); ?>

<div class="section-page">
    
    <?php valderrama_breadcrumbs(); ?>

    <?php while ( have_posts() ) : the_post(); ?>
        
        <!-- Section Hero -->
        <section class="section-hero" style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); color: white; padding: 4rem 2rem; text-align: center;">
            <div class="container">
                <div class="section-icon" style="font-size: 5rem; margin-bottom: 1rem;">
                    <?php echo valderrama_get_section_icon(); ?>
                </div>
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">
                    <?php the_title(); ?>
                </h1>
                <?php if ( get_field('section_subtitle') ) : ?>
                    <p style="font-size: 1.25rem; opacity: 0.95; max-width: 700px; margin: 0 auto;">
                        <?php echo esc_html( get_field('section_subtitle') ); ?>
                    </p>
                <?php endif; ?>
            </div>
        </section>

        <!-- Section Introduction -->
        <section class="section-intro" style="padding: 4rem 2rem; background: white;">
            <div class="container" style="max-width: 900px; margin: 0 auto;">
                <div class="content" style="font-size: 1.1rem; line-height: 1.8; color: #333;">
                    <?php the_content(); ?>
                </div>
            </div>
        </section>

        <!-- Subpages Navigation -->
        <?php
        $child_pages = get_children( array(
            'post_parent' => get_the_ID(),
            'post_type'   => 'page',
            'orderby'     => 'menu_order',
            'order'       => 'ASC',
        ) );
        
        if ( ! empty( $child_pages ) ) :
        ?>
        <section class="section-subpages" style="padding: 4rem 2rem; background: #F5F5F5;">
            <div class="container">
                <h2 style="font-size: 2.5rem; margin-bottom: 3rem; text-align: center; color: #C41E3A;">
                    <?php _e( 'Explora esta sección', 'valderrama' ); ?>
                </h2>
                <div class="subpages-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <?php foreach ( $child_pages as $child ) : ?>
                        <div class="subpage-card" style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <div class="subpage-icon" style="font-size: 3rem; margin-bottom: 1rem;">
                                <?php echo valderrama_get_section_icon( $child->ID ); ?>
                            </div>
                            <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">
                                <a href="<?php echo get_permalink( $child->ID ); ?>" style="color: inherit; text-decoration: none;">
                                    <?php echo esc_html( $child->post_title ); ?>
                                </a>
                            </h3>
                            <?php if ( $child->post_excerpt ) : ?>
                                <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                                    <?php echo esc_html( $child->post_excerpt ); ?>
                                </p>
                            <?php else : ?>
                                <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                                    <?php echo wp_trim_words( $child->post_content, 20, '...' ); ?>
                                </p>
                            <?php endif; ?>
                            <a href="<?php echo get_permalink( $child->ID ); ?>" class="btn-link" style="color: #C41E3A; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                                <?php _e( 'Ver más', 'valderrama' ); ?> →
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- Call to Action -->
        <section class="section-cta" style="background: linear-gradient(135deg, #0056A6 0%, #4A90E2 100%); color: white; padding: 4rem 2rem; text-align: center;">
            <div class="container">
                <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">
                    <?php 
                    if ( get_field('cta_title') ) {
                        echo esc_html( get_field('cta_title') );
                    } else {
                        _e( '¿Quieres saber más?', 'valderrama' );
                    }
                    ?>
                </h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <?php 
                    if ( get_field('cta_subtitle') ) {
                        echo esc_html( get_field('cta_subtitle') );
                    } else {
                        _e( 'Contáctanos para conocer más sobre Valderrama International School', 'valderrama' );
                    }
                    ?>
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="btn btn-primary" style="background: white; color: #0056A6; padding: 1rem 2rem; border-radius: 50px; font-weight: 600;">
                        <?php _e( 'Contáctanos', 'valderrama' ); ?>
                    </a>
                    <a href="<?php echo esc_url( home_url('/admissions/') ); ?>" class="btn btn-secondary" style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 50px; font-weight: 600;">
                        <?php _e( 'Proceso de Admisión', 'valderrama' ); ?>
                    </a>
                </div>
            </div>
        </section>

    <?php endwhile; ?>

</div>

<?php get_footer(); ?>
