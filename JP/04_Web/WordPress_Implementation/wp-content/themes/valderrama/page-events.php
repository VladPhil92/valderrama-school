<?php
/**
 * Template Name: Events Page
 */

get_header(); ?>

<div class="container py-3">
    <header class="page-header text-center">
        <h1><?php the_title(); ?></h1>
    </header>

    <div class="page-content">
        <?php
        // If The Events Calendar is active, show shortcode
        if ( shortcode_exists( 'tribe_events' ) ) {
            echo do_shortcode('[tribe_events view="list" events_per_page="10"]');
        } else {
            // Fallback to custom event CPT listing
            $events_query = new WP_Query( array(
                'post_type'      => 'event',
                'posts_per_page' => 10,
                'meta_key'       => 'event_date',
                'orderby'        => 'meta_value',
                'order'          => 'ASC',
                'meta_query'     => array(
                    array(
                        'key'     => 'event_date',
                        'value'   => date('Y-m-d'),
                        'compare' => '>=',
                        'type'    => 'DATE'
                    )
                )
            ) );

            if ( $events_query->have_posts() ) :
                echo '<div class="grid-2">';
                while ( $events_query->have_posts() ) : $events_query->the_post(); ?>
                    <div class="event-card">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="event-image" style="background-image: url(<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'card' ) ); ?>);"></div>
                        <?php endif; ?>
                        <div class="event-content">
                            <div class="event-date">
                                <?php 
                                $event_date = get_field( 'event_date' );
                                if ( $event_date ) {
                                    echo esc_html( date_i18n( get_option( 'date_format' ), strtotime( $event_date ) ) );
                                }
                                ?>
                            </div>
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <p><?php the_excerpt(); ?></p>
                        </div>
                    </div>
                <?php endwhile;
                echo '</div>';
                wp_reset_postdata();
            else :
                _e( 'No upcoming events found.', 'valderrama' );
            endif;
        }
        ?>
    </div>
</div>

<?php get_footer(); ?>