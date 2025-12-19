<?php
/**
 * Template Name: Home Page
 * Description: Multi-section homepage for Valderrama International School
 */

get_header(); ?>

<div class="home-page">
    
    <!-- Hero Section -->
    <section class="hero-section" style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); color: white; padding: 6rem 2rem; text-align: center;">
        <div class="container">
            <div class="hero-content">
                <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.2;">
                    <?php echo esc_html( get_field('hero_title') ?: 'Valderrama International School' ); ?>
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.95;">
                    <?php echo esc_html( get_field('hero_subtitle') ?: 'Educación bilingüe de excelencia en Cartagena' ); ?>
                </p>
                <div class="hero-ctas" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="<?php echo esc_url( home_url('/admissions/') ); ?>" class="btn btn-primary" style="background: white; color: #C41E3A; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; font-size: 1.1rem;">
                        <?php _e( 'Solicita Información', 'valderrama' ); ?>
                    </a>
                    <a href="<?php echo esc_url( home_url('/admissions/agenda-visita/') ); ?>" class="btn btn-secondary" style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; font-size: 1.1rem;">
                        <?php _e( 'Agenda una Visita', 'valderrama' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ¿Por qué Valderrama? -->
    <section class="why-valderrama py-5" style="padding: 4rem 2rem; background: #F5F5F5;">
        <div class="container">
            <h2 class="text-center" style="font-size: 2.5rem; margin-bottom: 3rem; color: #C41E3A;">
                <?php _e( '¿Por qué elegir Valderrama?', 'valderrama' ); ?>
            </h2>
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                
                <!-- Feature 1: Educación Personalizada -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Educación Personalizada</h3>
                    <p style="color: #666; line-height: 1.6;">Cada estudiante es único. Adaptamos nuestra enseñanza a sus ritmos y necesidades individuales.</p>
                </div>

                <!-- Feature 2: Bilingüismo Real -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🌍</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Bilingüismo Real</h3>
                    <p style="color: #666; line-height: 1.6;">Inmersión natural en inglés y español desde el primer día, con certificaciones internacionales.</p>
                </div>

                <!-- Feature 3: Aprendizaje por Proyectos -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🔬</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Aprendizaje por Proyectos</h3>
                    <p style="color: #666; line-height: 1.6;">Metodología PBL que conecta el aprendizaje con situaciones reales y relevantes.</p>
                </div>

                <!-- Feature 4: Desarrollo Integral -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Desarrollo Integral</h3>
                    <p style="color: #666; line-height: 1.6;">Formamos personas completas: cognitiva, emocional, social, física y espiritualmente.</p>
                </div>

                <!-- Feature 5: Tecnología Consciente -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">💻</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Tecnología Consciente</h3>
                    <p style="color: #666; line-height: 1.6;">Blended learning que integra lo mejor de lo digital y presencial.</p>
                </div>

                <!-- Feature 6: Ciudadanía Global -->
                <div class="feature-card" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Ciudadanía Global</h3>
                    <p style="color: #666; line-height: 1.6;">Service Learning y proyectos de impacto social que forman líderes responsables.</p>
                </div>

            </div>
        </div>
    </section>

    <!-- Modelo Educativo Overview -->
    <section class="educational-model py-5" style="padding: 4rem 2rem; background: white;">
        <div class="container">
            <h2 class="text-center" style="font-size: 2.5rem; margin-bottom: 2rem; color: #C41E3A;">
                <?php _e( 'Nuestro Modelo Educativo', 'valderrama' ); ?>
            </h2>
            <p class="text-center" style="max-width: 800px; margin: 0 auto 3rem; font-size: 1.2rem; color: #666;">
                Combinamos lo mejor de las metodologías Montessori, PBL y Blended Learning para crear una experiencia educativa única y transformadora.
            </p>
            <div class="model-pillars" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                
                <div class="pillar" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎓</div>
                    <h3 style="color: #0056A6; margin-bottom: 1rem;">Aprendizaje Significativo</h3>
                    <p style="color: #666;">Conectamos el conocimiento con la vida real y los intereses de cada estudiante.</p>
                </div>

                <div class="pillar" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">💡</div>
                    <h3 style="color: #0056A6; margin-bottom: 1rem;">Tecnología Consciente</h3>
                    <p style="color: #666;">Herramientas digitales integradas de forma intencional y pedagógica.</p>
                </div>

                <div class="pillar" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🌎</div>
                    <h3 style="color: #0056A6; margin-bottom: 1rem;">Pensamiento Global</h3>
                    <p style="color: #666;">Perspectiva internacional y ciudadanía responsable desde el primer día.</p>
                </div>

            </div>
            <div class="text-center" style="margin-top: 3rem;">
                <a href="<?php echo esc_url( home_url('/modelo-educativo/') ); ?>" class="btn btn-primary" style="background: #C41E3A; color: white; padding: 1rem 2rem; border-radius: 50px; font-weight: 600;">
                    <?php _e( 'Conoce Nuestro Modelo', 'valderrama' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Niveles Académicos -->
    <section class="academic-levels py-5" style="padding: 4rem 2rem; background: #F5F5F5;">
        <div class="container">
            <h2 class="text-center" style="font-size: 2.5rem; margin-bottom: 3rem; color: #C41E3A;">
                <?php _e( 'Niveles Académicos', 'valderrama' ); ?>
            </h2>
            <div class="levels-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                
                <!-- Preescolar -->
                <div class="level-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div class="level-header" style="background: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%); padding: 3rem 2rem; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🌱</div>
                        <h3 style="font-size: 2rem; color: white; margin-bottom: 0.5rem;">Preescolar</h3>
                        <p style="color: white; opacity: 0.9;">3-5 años</p>
                    </div>
                    <div class="level-content" style="padding: 2rem;">
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Metodología Montessori
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Ambiente preparado
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Desarrollo sensorial
                            </li>
                        </ul>
                        <a href="<?php echo esc_url( home_url('/academics/preescolar/') ); ?>" class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%; text-align: center; display: block; padding: 0.75rem; border: 2px solid #C41E3A; color: #C41E3A; border-radius: 8px; font-weight: 600;">
                            Ver más
                        </a>
                    </div>
                </div>

                <!-- Primaria -->
                <div class="level-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div class="level-header" style="background: linear-gradient(135deg, #4A90E2 0%, #0056A6 100%); padding: 3rem 2rem; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📖</div>
                        <h3 style="font-size: 2rem; color: white; margin-bottom: 0.5rem;">Primaria</h3>
                        <p style="color: white; opacity: 0.9;">Grados 1-5</p>
                    </div>
                    <div class="level-content" style="padding: 2rem;">
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Aprendizaje por proyectos
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Bilingüismo integrado
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Habilidades STEAM
                            </li>
                        </ul>
                        <a href="<?php echo esc_url( home_url('/academics/educacion-basica/') ); ?>" class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%; text-align: center; display: block; padding: 0.75rem; border: 2px solid #C41E3A; color: #C41E3A; border-radius: 8px; font-weight: 600;">
                            Ver más
                        </a>
                    </div>
                </div>

                <!-- Media -->
                <div class="level-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div class="level-header" style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); padding: 3rem 2rem; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🎓</div>
                        <h3 style="font-size: 2rem; color: white; margin-bottom: 0.5rem;">Media</h3>
                        <p style="color: white; opacity: 0.9;">Grados 6-11</p>
                    </div>
                    <div class="level-content" style="padding: 2rem;">
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Preparación universitaria
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Orientación vocacional
                            </li>
                            <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0;">✓</span> Proyectos de impacto
                            </li>
                        </ul>
                        <a href="<?php echo esc_url( home_url('/academics/educacion-media/') ); ?>" class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%; text-align: center; display: block; padding: 0.75rem; border: 2px solid #C41E3A; color: #C41E3A; border-radius: 8px; font-weight: 600;">
                            Ver más
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-section" style="background: linear-gradient(135deg, #0056A6 0%, #4A90E2 100%); color: white; padding: 5rem 2rem; text-align: center;">
        <div class="container">
            <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">
                <?php _e( '¿Listo para ser parte de Valderrama?', 'valderrama' ); ?>
            </h2>
            <p style="font-size: 1.25rem; margin-bottom: 2.5rem; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto;">
                Únete a una comunidad educativa que transforma vidas y prepara líderes para el futuro.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="<?php echo esc_url( home_url('/admissions/') ); ?>" class="btn btn-primary" style="background: white; color: #0056A6; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; font-size: 1.1rem;">
                    <?php _e( 'Iniciar Proceso de Admisión', 'valderrama' ); ?>
                </a>
                <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="btn btn-secondary" style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; font-size: 1.1rem;">
                    <?php _e( 'Contáctanos', 'valderrama' ); ?>
                </a>
            </div>
        </div>
    </section>

</div>

<?php get_footer(); ?>
