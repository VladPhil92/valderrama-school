<?php
/**
 * Main template file
 */

get_header(); ?>

<div class="container">
    <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1><?php _e( 'Valderrama International School', 'valderrama' ); ?></h1>
            <p><?php _e( 'A bilingual IB school in Cartagena, Colombia', 'valderrama' ); ?></p>
            <div class="hero-buttons">
                <a href="#" class="btn btn-primary"><?php _e( 'Explore Programs', 'valderrama' ); ?></a>
                <a href="#" class="btn btn-secondary"><?php _e( 'Schedule a Visit', 'valderrama' ); ?></a>
            </div>
        </div>
    </div>
    
    <section class="valderrama-is-message py-3">
        <div class="container">
            <h2><?php _e( 'Valderrama is...', 'valderrama' ); ?></h2>
            <div class="valderrama-is-message-values">
                <div class="value-item">
                    <h3><?php _e( 'Excellence', 'valderrama' ); ?></h3>
                    <p><?php _e( 'Being excellent', 'valderrama' ); ?></p>
                </div>
                <div class="value-item">
                    <h3><?php _e( 'Community', 'valderrama' ); ?></h3>
                    <p><?php _e( 'Helping others', 'valderrama' ); ?></p>
                </div>
                <div class="value-item">
                    <h3><?php _e( 'Respect', 'valderrama' ); ?></h3>
                    <p><?php _e( 'Listening when others are talking', 'valderrama' ); ?></p>
                </div>
                <div class="value-item">
                    <h3><?php _e( 'Innovation', 'valderrama' ); ?></h3>
                    <p><?php _e( 'Creating new solutions', 'valderrama' ); ?></p>
                </div>
            </div>
        </div>
    </section>

    <section class="news-events py-3">
        <div class="container">
            <h2><?php _e( 'Latest News & Events', 'valderrama' ); ?></h2>
            <div class="grid-2">
                <?php
                $news_query = new WP_Query( array(
                    'post_type' => 'post',
                    'posts_per_page' => 3,
                ) );
                
                if ( $news_query->have_posts() ) :
                    while ( $news_query->have_posts() ) : $news_query->the_post(); ?>
                        <article class="news-item">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="news-image">
                                    <?php the_post_thumbnail( 'card' ); ?>
                                </div>
                            <?php endif; ?>
                            <div class="news-content">
                                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <div class="news-meta">
                                    <span class="news-date"><?php echo get_the_date(); ?></span>
                                </div>
                                <div class="news-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                                <a href="<?php the_permalink(); ?>" class="btn btn-secondary"><?php _e( 'Read More', 'valderrama' ); ?></a>
                            </div>
                        </article>
                    <?php endwhile;
                    wp_reset_postdata();
                else :
                    _e( 'No news found.', 'valderrama' );
                endif;
                ?>
            </div>
        </div>
    </section>
    
    <section class="upcoming-events py-3">
        <div class="container">
            <h2><?php _e( 'Upcoming Events', 'valderrama' ); ?></h2>
            <div class="grid-2">
                <?php
                $events_query = new WP_Query( array(
                    'post_type' => 'event',
                    'posts_per_page' => 4,
                    'meta_key' => 'event_date',
                    'orderby' => 'meta_value',
                    'order' => 'ASC',
                ) );
                
                if ( $events_query->have_posts() ) :
                    while ( $events_query->have_posts() ) : $events_query->the_post(); ?>
                        <div class="event-card">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="event-image" style="background-image: url(<?php echo get_the_post_thumbnail_url( null, 'card' ); ?>);"></div>
                            <?php endif; ?>
                            <div class="event-content">
                                <div class="event-date">
                                    <?php 
                                    $event_date = get_field( 'event_date' );
                                    if ( $event_date ) {
                                        echo date_i18n( get_option( 'date_format' ), strtotime( $event_date ) );
                                    }
                                    ?>
                                </div>
                                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <p><?php the_excerpt(); ?></p>
                                <a href="<?php the_permalink(); ?>" class="btn btn-secondary"><?php _e( 'View Event', 'valderrama' ); ?></a>
                            </div>
                        </div>
                    <?php endwhile;
                    wp_reset_postdata();
                else :
                    _e( 'No upcoming events found.', 'valderrama' );
                endif;
                ?>
            </div>
        </div>
    </section>
    
    <section class="cta-section py-3 text-center">
        <div class="container">
            <h2><?php _e( 'Ready to Join Our Community?', 'valderrama' ); ?></h2>
            <p><?php _e( 'Start your application today and join our global community', 'valderrama' ); ?></p>
            <div class="cta-buttons">
                <a href="#" class="btn btn-primary"><?php _e( 'Apply Now', 'valderrama' ); ?></a>
                <a href="#" class="btn btn-secondary"><?php _e( 'Schedule a Tour', 'valderrama' ); ?></a>
            </div>
        </div>
    </section>
</div>

<?php get_footer(); ?>