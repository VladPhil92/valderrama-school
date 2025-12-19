<?php
/**
 * Template Name: Subsection Page
 * Description: Template for subsection pages with sidebar navigation
 */

get_header(); ?>

<div class="subsection-page">
    
    <?php valderrama_breadcrumbs(); ?>

    <?php while ( have_posts() ) : the_post(); ?>
        
        <!-- Page Header -->
        <section class="page-header" style="background: #F5F5F5; padding: 3rem 2rem; border-bottom: 3px solid #C41E3A;">
            <div class="container">
                <div class="header-content" style="max-width: 900px; margin: 0 auto;">
                    <div class="page-icon" style="font-size: 3rem; margin-bottom: 1rem;">
                        <?php echo valderrama_get_section_icon(); ?>
                    </div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">
                        <?php the_title(); ?>
                    </h1>
                    <?php if ( get_field('page_subtitle') ) : ?>
                        <p style="font-size: 1.2rem; color: #666;">
                            <?php echo esc_html( get_field('page_subtitle') ); ?>
                        </p>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- Main Content Area -->
        <section class="page-content" style="padding: 4rem 2rem;">
            <div class="container">
                <div class="content-grid" style="display: grid; grid-template-columns: 1fr 300px; gap: 3rem;">
                    
                    <!-- Main Content -->
                    <div class="main-content">
                        <div class="content-body" style="font-size: 1.1rem; line-height: 1.8; color: #333;">
                            <?php the_content(); ?>
                        </div>
                        
                        <!-- Related Pages -->
                        <?php
                        $related_pages = valderrama_get_related_pages( 3 );
                        if ( ! empty( $related_pages ) ) :
                        ?>
                        <div class="related-pages" style="margin-top: 4rem; padding-top: 3rem; border-top: 2px solid #E0E0E0;">
                            <h3 style="font-size: 1.75rem; margin-bottom: 2rem; color: #C41E3A;">
                                <?php _e( 'Páginas relacionadas', 'valderrama' ); ?>
                            </h3>
                            <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                                <?php foreach ( $related_pages as $related ) : ?>
                                    <div class="related-card" style="background: #F5F5F5; padding: 1.5rem; border-radius: 8px; transition: background 0.3s;" onmouseover="this.style.background='#E8E8E8'" onmouseout="this.style.background='#F5F5F5'">
                                        <h4 style="font-size: 1.25rem; margin-bottom: 0.75rem;">
                                            <a href="<?php echo get_permalink( $related->ID ); ?>" style="color: #333; text-decoration: none;">
                                                <?php echo esc_html( $related->post_title ); ?>
                                            </a>
                                        </h4>
                                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 1rem;">
                                            <?php echo wp_trim_words( $related->post_excerpt ?: $related->post_content, 15 ); ?>
                                        </p>
                                        <a href="<?php echo get_permalink( $related->ID ); ?>" style="color: #C41E3A; font-weight: 600; font-size: 0.9rem; text-decoration: none;">
                                            <?php _e( 'Leer más', 'valderrama' ); ?> →
                                        </a>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <?php endif; ?>
                    </div>

                    <!-- Sidebar -->
                    <aside class="page-sidebar">
                        
                        <!-- Sibling Pages Navigation -->
                        <?php
                        $parent_id = wp_get_post_parent_id( get_the_ID() );
                        if ( $parent_id ) {
                            $siblings = get_children( array(
                                'post_parent' => $parent_id,
                                'post_type'   => 'page',
                                'orderby'     => 'menu_order',
                                'order'       => 'ASC',
                            ) );
                        } else {
                            $siblings = get_children( array(
                                'post_parent' => get_the_ID(),
                                'post_type'   => 'page',
                                'orderby'     => 'menu_order',
                                'order'       => 'ASC',
                            ) );
                        }
                        
                        if ( ! empty( $siblings ) ) :
                        ?>
                        <div class="sidebar-nav" style="background: #F5F5F5; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: #333; padding-bottom: 0.75rem; border-bottom: 2px solid #C41E3A;">
                                <?php 
                                if ( $parent_id ) {
                                    echo esc_html( get_the_title( $parent_id ) );
                                } else {
                                    _e( 'En esta sección', 'valderrama' );
                                }
                                ?>
                            </h3>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <?php foreach ( $siblings as $sibling ) : ?>
                                    <li style="margin-bottom: 0.75rem;">
                                        <a href="<?php echo get_permalink( $sibling->ID ); ?>" 
                                           style="display: block; padding: 0.5rem 0.75rem; color: <?php echo ( $sibling->ID === get_the_ID() ) ? '#C41E3A' : '#333'; ?>; font-weight: <?php echo ( $sibling->ID === get_the_ID() ) ? '600' : '400'; ?>; text-decoration: none; background: <?php echo ( $sibling->ID === get_the_ID() ) ? 'white' : 'transparent'; ?>; border-radius: 4px; transition: all 0.3s;" 
                                           onmouseover="if(this.style.background!=='white') this.style.background='white'" 
                                           onmouseout="if(<?php echo ( $sibling->ID !== get_the_ID() ) ? 'true' : 'false'; ?>) this.style.background='transparent'">
                                            <?php echo esc_html( $sibling->post_title ); ?>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                            <?php if ( $parent_id ) : ?>
                                <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #E0E0E0;">
                                    <a href="<?php echo get_permalink( $parent_id ); ?>" style="color: #0056A6; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                                        ← <?php _e( 'Volver a', 'valderrama' ); ?> <?php echo esc_html( get_the_title( $parent_id ) ); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>

                        <!-- Quick Actions -->
                        <div class="sidebar-actions" style="background: linear-gradient(135deg, #0056A6 0%, #4A90E2 100%); color: white; padding: 2rem; border-radius: 8px; text-align: center;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">
                                <?php _e( '¿Interesado?', 'valderrama' ); ?>
                            </h3>
                            <p style="font-size: 0.95rem; margin-bottom: 1.5rem; opacity: 0.9;">
                                <?php _e( 'Conoce más sobre nuestro proceso de admisión', 'valderrama' ); ?>
                            </p>
                            <a href="<?php echo esc_url( home_url('/admissions/') ); ?>" class="btn btn-primary" style="display: block; background: white; color: #0056A6; padding: 0.75rem 1.5rem; border-radius: 50px; font-weight: 600; text-decoration: none; margin-bottom: 1rem;">
                                <?php _e( 'Solicita Información', 'valderrama' ); ?>
                            </a>
                            <a href="<?php echo esc_url( home_url('/contact/') ); ?>" style="color: white; font-size: 0.9rem; text-decoration: underline;">
                                <?php _e( 'Contáctanos', 'valderrama' ); ?>
                            </a>
                        </div>

                    </aside>

                </div>
            </div>
        </section>

    <?php endwhile; ?>

</div>

<style>
@media (max-width: 992px) {
    .content-grid {
        grid-template-columns: 1fr !important;
    }
    .page-sidebar {
        order: -1;
    }
}
</style>

<?php get_footer(); ?>
