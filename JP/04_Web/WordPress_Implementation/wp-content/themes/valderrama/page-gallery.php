<?php
/**
 * Template Name: Gallery Page
 */

get_header(); ?>

<div class="container py-3">
    <header class="page-header text-center">
        <h1><?php the_title(); ?></h1>
    </header>

    <div class="page-content">
        <div class="gallery-filters mb-3">
            <ul class="filter-list">
                <li class="filter-item active" data-category="all"><?php _e( 'All Photos', 'valderrama' ); ?></li>
                <li class="filter-item" data-category="campus"><?php _e( 'Campus', 'valderrama' ); ?></li>
                <li class="filter-item" data-category="events"><?php _e( 'Events', 'valderrama' ); ?></li>
                <li class="filter-item" data-category="activities"><?php _e( 'Activities', 'valderrama' ); ?></li>
                <li class="filter-item" data-category="students"><?php _e( 'Students', 'valderrama' ); ?></li>
            </ul>
        </div>

        <div class="gallery-grid grid-3">
            <?php
            $galleries_query = new WP_Query( array(
                'post_type'      => 'gallery',
                'posts_per_page' => 20,
                'orderby'        => 'date',
                'order'          => DESC
            ) );

            if ( $galleries_query->have_posts() ) :
                while ( $galleries_query->have_posts() ) : $galleries_query->the_post();
                    $category = get_field( 'gallery_category' ) ?: 'campus';
                    ?>
                    <div class="gallery-item" data-category="<?php echo esc_attr( $category ); ?>">
                        <div class="gallery-image-wrapper">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <a href="<?php the_permalink(); ?>">
                                    <div class="gallery-image" style="background-image: url(<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'card' ) ); ?>);"></div>
                                </a>
                            <?php else : ?>
                                <div class="gallery-image placeholder" style="background-color: #f1f1f1;">
                                    <span><?php _e( 'No image', 'valderrama' ); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="gallery-info">
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <div class="gallery-meta">
                                <span class="gallery-date"><?php echo get_the_date(); ?></span>
                                <?php if ( $category ) : ?>
                                    <span class="gallery-category"><?php echo esc_html( $category ); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile;
                wp_reset_postdata();
            else :
                echo '<div class="no-content">';
                _e( 'No galleries found.', 'valderrama' );
                echo '</div>';
            endif;
            ?>
        </div>

        <div class="gallery-pagination mb-3">
            <?php 
            // Pagination 
            $total_pages = $galleries_query->max_num_pages;
            if ( $total_pages > 1 ) :
                $current_page = max( 1, get_query_var('paged') );
                echo '<div class="pagination">';
                echo paginate_links( array(
                    'base'      => get_pagenum_link(1) . '%_%',
                    'format'    => 'page/%#%',
                    'current'   => $current_page,
                    'total'     => $total_pages,
                    'prev_text' => __( '&laquo; Previous', 'valderrama' ),
                    'next_text' => __( 'Next &raquo;', 'valderrama' ),
                    'type'      => 'list'
                ) );
                echo '</div>';
            endif;
            ?>
        </div>
    </div>
</div>

<div class="gallery-lightbox">
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
        <div class="lightbox-image"></div>
        <div class="lightbox-close">&times;</div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.filter-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filter items
            filterItems.forEach(filter => filter.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            galleryItems.forEach(galleryItem => {
                if (category === 'all' || galleryItem.getAttribute('data-category') === category) {
                    galleryItem.style.display = 'block';
                } else {
                    galleryItem.style.display = 'none';
                }
            });
        });
    });
});
</script>

<?php get_footer(); ?>