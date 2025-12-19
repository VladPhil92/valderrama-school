<?php
/**
 * Template Name: Parent Portal
 */

get_header(); ?>

<div class="container py-3">
    <header class="page-header text-center">
        <h1><?php the_title(); ?></h1>
        <p><?php _e( 'Access grades, communications, and school resources.', 'valderrama' ); ?></p>
    </header>

    <div class="page-content">
        <?php if ( is_user_logged_in() ) : ?>
            <div class="grid-2">
                <section>
                    <h2><?php _e( 'Recent Announcements', 'valderrama' ); ?></h2>
                    <?php
                    $announcements = new WP_Query( array(
                        'post_type'      => 'post',
                        'category_name'  => 'announcements',
                        'posts_per_page' => 5
                    ) );
                    if ( $announcements->have_posts() ) :
                        echo '<ul class="list">';
                        while ( $announcements->have_posts() ) : $announcements->the_post();
                            echo '<li><a href="' . esc_url( get_the_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></li>';
                        endwhile;
                        echo '</ul>';
                        wp_reset_postdata();
                    else :
                        _e( 'No announcements found.', 'valderrama' );
                    endif;
                    ?>
                </section>

                <section>
                    <h2><?php _e( 'Quick Links', 'valderrama' ); ?></h2>
                    <ul class="list">
                        <li><a href="#"><?php _e( 'Academic Calendar', 'valderrama' ); ?></a></li>
                        <li><a href="#"><?php _e( 'Payment Portal', 'valderrama' ); ?></a></li>
                        <li><a href="#"><?php _e( 'Lunch Menu', 'valderrama' ); ?></a></li>
                        <li><a href="#"><?php _e( 'Transportation', 'valderrama' ); ?></a></li>
                        <li><a href="#"><?php _e( 'Parent Handbook', 'valderrama' ); ?></a></li>
                    </ul>
                </section>
            </div>
        <?php else : ?>
            <div class="portal-login">
                <h2><?php _e( 'Login', 'valderrama' ); ?></h2>
                <?php echo wp_login_form( array( 'echo' => false ) ); ?>
                <p class="mt-2">
                    <a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php _e( 'Forgot your password?', 'valderrama' ); ?></a>
                </p>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>