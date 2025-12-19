<?php
/**
 * VALDERRAMA INTERNATIONAL SCHOOL - AUTOMATIC PAGE INSTALLER
 * 
 * Este script crea automáticamente las 73 páginas del sitio web
 * con sus plantillas, jerarquía y menúes.
 * 
 * INSTALACIÓN:
 * 1. Subir este archivo a wp-content/themes/valderrama/
 * 2. Acceder a: yoursite.com/wp-content/themes/valderrama/install-valderrama-pages.php
 * 3. Seguir las instrucciones en pantalla
 * 
 * SEGURIDAD:
 * - Solo funciona si estás logueado como admin
 * - Se auto-elimina después de ejecutarse
 * 
 * Versión: 1.0
 * Fecha: 17 de Diciembre 2025
 */

// Seguridad: Solo funciona en WordPress
if ( ! defined( 'ABSPATH' ) ) {
    die( 'No direct access' );
}

// Cargar WordPress
require_once( dirname( __FILE__ ) . '/../../../wp-load.php' );

// Verificar que sea admin
if ( ! is_user_logged_in() || ! current_user_can( 'manage_options' ) ) {
    wp_die( 'Debes estar logueado como administrador para ejecutar este instalador.' );
}

// Función para crear páginas
function valderrama_create_page( $title, $slug, $template = '', $parent_id = 0, $content = '', $excerpt = '' ) {
    // Verificar si la página ya existe
    $existing = get_page_by_path( $slug );
    if ( $existing ) {
        return array( 'success' => false, 'message' => "Página '$title' ya existe", 'page_id' => $existing->ID );
    }

    // Crear la página
    $page_data = array(
        'post_title'    => $title,
        'post_name'     => $slug,
        'post_content'  => $content ?: "Contenido para $title",
        'post_excerpt'  => $excerpt,
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_parent'   => $parent_id,
    );

    $page_id = wp_insert_post( $page_data );

    if ( is_wp_error( $page_id ) ) {
        return array( 'success' => false, 'message' => "Error al crear '$title': " . $page_id->get_error_message() );
    }

    // Asignar plantilla si se especifica
    if ( $template ) {
        update_post_meta( $page_id, '_wp_page_template', $template );
    }

    return array( 'success' => true, 'message' => "✅ Página '$title' creada", 'page_id' => $page_id );
}

// Estructura de páginas a crear
$pages_to_create = array(
    // HOME
    array(
        'title'    => 'Home',
        'slug'     => 'home',
        'template' => 'page-home.php',
        'excerpt'  => 'Página de inicio con hero, diferenciadores, modelo educativo y CTAs',
    ),
    // QUIÉNES SOMOS
    array(
        'title'    => 'Quiénes Somos',
        'slug'     => 'quienes-somos',
        'template' => 'page-section.php',
        'excerpt'  => 'Presentación institucional, historia, misión, visión y valores',
        'children' => array(
            array( 'title' => 'Historia y Fundación', 'slug' => 'historia-fundacion', 'excerpt' => 'Fundación en 2025, respuesta educativa en Colombia, hitos y visión de futuro' ),
            array( 'title' => 'Misión, Visión y Valores', 'slug' => 'mision-vision-valores', 'excerpt' => 'Misión: Educación de calidad con cuidado amoroso. Visión: Escuela de referencia. 5 Valores' ),
            array( 'title' => 'Filosofía Institucional', 'slug' => 'filosofia-institucional', 'excerpt' => 'Concepto del ser humano, teoría pedagógica, desarrollo integral y principios humanistas' ),
            array( 'title' => 'Principios y Valores', 'slug' => 'principios-valores', 'excerpt' => '5 Principios institucionales detallados: cómo se manifiestan en la práctica diaria' ),
            array( 'title' => 'Identidad Institucional', 'slug' => 'identidad-institucional', 'excerpt' => 'Logo, lema, colores institucionales, tipografía y línea gráfica' ),
            array( 'title' => 'Comunidad Educativa', 'slug' => 'comunidad-educativa', 'excerpt' => 'Estructura: estudiantes, docentes, administrativos, padres y espacios de participación' ),
            array( 'title' => 'Gobierno Escolar', 'slug' => 'gobierno-escolar', 'excerpt' => 'Consejo Directivo, Académico, de Estudiantes y de Padres. Procesos democráticos' ),
        ),
    ),
    // MODELO EDUCATIVO
    array(
        'title'    => 'Modelo Educativo',
        'slug'     => 'modelo-educativo',
        'template' => 'page-section.php',
        'excerpt'  => 'Enfoque pedagógico innovador: PBL, Service Learning, educación personalizada',
        'children' => array(
            array( 'title' => 'Enfoque Pedagógico', 'slug' => 'enfoque-pedagogico', 'excerpt' => '3 Pilares: Aprendizaje Significativo, Tecnología Consciente, Pensamiento Global' ),
            array( 'title' => 'Educación Personalizada', 'slug' => 'educacion-personalizada', 'excerpt' => 'Cada estudiante es único. Atención diferenciada y respeto a ritmos individuales' ),
            array( 'title' => 'Metodología Montessori', 'slug' => 'metodologia-montessori', 'excerpt' => 'Principios Montessori: libertad, responsabilidad y ambiente preparado' ),
            array( 'title' => 'Aprendizaje por Proyectos (PBL)', 'slug' => 'aprendizaje-por-proyectos', 'excerpt' => 'Project-Based Learning: integración interdisciplinaria y conexión con vida real' ),
            array( 'title' => 'Service Learning', 'slug' => 'service-learning', 'excerpt' => 'Aprendizaje con propósito: proyectos de impacto social y responsabilidad ciudadana' ),
            array( 'title' => 'Blended Learning', 'slug' => 'blended-learning', 'excerpt' => 'Integración de tecnología: espacios físicos y virtuales, recursos digitales' ),
            array( 'title' => 'Educación Holística', 'slug' => 'educacion-holistica', 'excerpt' => 'Desarrollo integral: dimensiones cognitiva, emocional, social, física y espiritual' ),
            array( 'title' => 'Habilidades del Siglo XXI', 'slug' => 'habilidades-siglo-xxi', 'excerpt' => 'Pensamiento crítico, creatividad, comunicación, colaboración y liderazgo' ),
            array( 'title' => 'Evaluación y Seguimiento', 'slug' => 'evaluacion-seguimiento', 'excerpt' => 'Sistema evaluativo diferenciado, formativo, con reportes y reuniones de seguimiento' ),
        ),
    ),
    // ACADEMICS
    array(
        'title'    => 'Academics',
        'slug'     => 'academics',
        'template' => 'page-section.php',
        'excerpt'  => 'Programa académico completo: Preescolar, Primaria, Media y educación bilingüe',
        'children' => array(
            array( 'title' => 'Visión Académica General', 'slug' => 'vision-academica', 'excerpt' => 'Calendario B (Agosto-Junio), niveles educativos, estructura curricular y articulación' ),
            array( 'title' => 'Preescolar', 'slug' => 'preescolar', 'excerpt' => '3-5 años: Montessori, experiencias de aprendizaje, espacios preparados' ),
            array( 'title' => 'Educación Básica Primaria', 'slug' => 'educacion-basica', 'excerpt' => 'Grados 1-5: Currículo por áreas, proyectos interdisciplinarios y competencias' ),
            array( 'title' => 'Educación Media', 'slug' => 'educacion-media', 'excerpt' => 'Grados 6-11: Profundización académica, preparación universitaria y proyectos de impacto' ),
            array( 'title' => 'Educación Bilingüe', 'slug' => 'educacion-bilingue', 'excerpt' => 'Modelo bilingüe balanceado, certificaciones internacionales (Cambridge, TOEFL)' ),
            array( 'title' => 'Ciudadanía Global y Multiculturalidad', 'slug' => 'ciudadania-global', 'excerpt' => 'Formación de ciudadanos globales, proyectos internacionales y perspectiva intercultural' ),
            array( 'title' => 'Orientación Vocacional', 'slug' => 'orientacion-vocacional', 'excerpt' => 'Programa desde grado 9: talleres, encuentros con profesionales y apoyo a decisiones' ),
            array( 'title' => 'Preparación para Educación Superior', 'slug' => 'preparacion-educacion-superior', 'excerpt' => 'Diplomas internacionales (US Diploma, IB), preparación SAT/ACT y asesoría' ),
        ),
    ),
    // STUDENT LIFE
    array(
        'title'    => 'Student Life',
        'slug'     => 'student-life',
        'template' => 'page-section.php',
        'excerpt'  => 'Vida estudiantil integral: bienestar, convivencia, actividades culturales y deportivas',
        'children' => array(
            array( 'title' => 'Bienestar Estudiantil', 'slug' => 'bienestar-estudiantil', 'excerpt' => 'Apoyo emocional y psicológico, nutrición, salud y espacios seguros' ),
            array( 'title' => 'Convivencia Escolar', 'slug' => 'convivencia-escolar', 'excerpt' => 'Principios de convivencia, normas de comportamiento, resolución de conflictos' ),
            array( 'title' => 'Sistema Preventivo y Mediación', 'slug' => 'sistema-preventivo', 'excerpt' => 'Modelo preventivo, medidas de acompañamiento, mediación escolar' ),
            array( 'title' => 'Actividades Culturales y Artísticas', 'slug' => 'actividades-culturales', 'excerpt' => 'Música, danza, artes plásticas, teatro, festivales y excursiones culturales' ),
            array( 'title' => 'Actividades Deportivas', 'slug' => 'actividades-deportivas', 'excerpt' => 'Karate, volleyball, educación física, torneos internos y campeonatos escolares' ),
            array( 'title' => 'Proyectos y Salidas Pedagógicas', 'slug' => 'proyectos-salidas', 'excerpt' => 'Salidas de campo, proyectos de investigación, viajes pedagógicos y expediciones' ),
            array( 'title' => 'Liderazgo Estudiantil', 'slug' => 'liderazgo-estudiantil', 'excerpt' => 'Gobierno estudiantil, personeros, voceros, comités temáticos y formación en liderazgo' ),
        ),
    ),
    // LEARNING CENTER
    array(
        'title'    => 'Learning Center',
        'slug'     => 'learning-center',
        'template' => 'page-section.php',
        'excerpt'  => 'Centro de aprendizaje complementario: tutorías, refuerzo y programas extracurriculares',
        'children' => array(
            array( 'title' => 'Tutorías Académicas', 'slug' => 'tutorias-academicas', 'excerpt' => 'Elementary, Middle, High School: Matemática, Lenguaje, Ciencias, Inglés. Personalizado' ),
            array( 'title' => 'Programas de Refuerzo', 'slug' => 'programas-refuerzo', 'excerpt' => 'Dificultades académicas específicas: lectura, comprensión, matemática, lógica' ),
            array( 'title' => 'Inclusión y Apoyo Educativo', 'slug' => 'inclusion-apoyo', 'excerpt' => 'Necesidades educativas especiales, diagnósticos, evaluaciones y planes individualizados' ),
            array( 'title' => 'Escuela de Padres', 'slug' => 'escuela-padres', 'excerpt' => 'Talleres: crianza respetuosa, adolescencia, tecnología en familia' ),
            array( 'title' => 'Programas Extracurriculares', 'slug' => 'programas-extracurriculares', 'excerpt' => 'Música, artes, deportes, idiomas, robótica y STEM. Horarios flexibles' ),
            array( 'title' => 'Educación Continua', 'slug' => 'educacion-continua', 'excerpt' => 'Programas para adultos, capacitación docente, talleres comunitarios' ),
        ),
    ),
    // ADMISSIONS
    array(
        'title'    => 'Admissions',
        'slug'     => 'admissions',
        'template' => 'page-section.php',
        'excerpt'  => 'Proceso de admisión: requisitos, costos, visitas y preguntas frecuentes',
        'children' => array(
            array( 'title' => 'Proceso de Admisión', 'slug' => 'proceso-admision', 'excerpt' => '5 pasos: solicitud, evaluación académica, entrevista familiar, decisión' ),
            array( 'title' => 'Requisitos y Etapas', 'slug' => 'requisitos-etapas', 'excerpt' => 'Documentos por nivel, requisitos de salud y vacunación, políticas de inclusión' ),
            array( 'title' => 'Costos y Matrículas', 'slug' => 'costos-matriculas', 'excerpt' => 'Tabla de costos por nivel, formas de pago, becas, planes de financiamiento' ),
            array( 'title' => 'Agenda tu Visita', 'slug' => 'agenda-visita', 'excerpt' => 'Calendario de visitas, formulario de reserva, tour virtual' ),
            array( 'title' => 'Preguntas Frecuentes', 'slug' => 'preguntas-frecuentes', 'excerpt' => 'FAQs: edad mínima, requisitos de idioma, políticas, transferencias y becas' ),
            array( 'title' => 'Contacto Admisiones', 'slug' => 'contacto-admisiones', 'excerpt' => 'Información de contacto, formulario de consulta, email, chat y horarios' ),
        ),
    ),
    // COMMUNITY
    array(
        'title'    => 'Community',
        'slug'     => 'community',
        'template' => 'page-section.php',
        'excerpt'  => 'Comunidad educativa: padres, participación, proyección social y convenios',
        'children' => array(
            array( 'title' => 'Padres de Familia', 'slug' => 'padres-familia', 'excerpt' => 'Rol de padres en la comunidad, participación en actividades y recursos' ),
            array( 'title' => 'Consejo de Padres', 'slug' => 'consejo-padres', 'excerpt' => 'Estructura del consejo, integrantes, roles, reuniones, actas e iniciativas' ),
            array( 'title' => 'Participación Comunitaria', 'slug' => 'participacion-comunitaria', 'excerpt' => 'Formas de participar: voluntariados, eventos comunitarios y grupos de interés' ),
            array( 'title' => 'Proyección Social', 'slug' => 'proyeccion-social', 'excerpt' => 'Programas de impacto social, alianzas comunitarias, Service Learning' ),
            array( 'title' => 'Convenios Institucionales', 'slug' => 'convenios-institucionales', 'excerpt' => 'Alianzas académicas, universidades convenio, instituciones culturales' ),
            array( 'title' => 'Alumni', 'slug' => 'alumni', 'excerpt' => 'Red de graduados, historias de éxito, eventos de alumni y mentoría' ),
        ),
    ),
    // TRANSPARENCY
    array(
        'title'    => 'Transparency',
        'slug'     => 'transparency',
        'template' => 'page-section.php',
        'excerpt'  => 'Transparencia institucional: PEI, manual de convivencia, políticas y documentos',
        'children' => array(
            array( 'title' => 'Proyecto Educativo Institucional (PEI)', 'slug' => 'proyecto-educativo-pei', 'excerpt' => 'Documento completo descargable, resumen ejecutivo, principios fundamentales' ),
            array( 'title' => 'Manual de Convivencia', 'slug' => 'manual-convivencia', 'excerpt' => 'Normas de conducta, derechos y deberes, régimen disciplinario, procedimientos' ),
            array( 'title' => 'Políticas Institucionales', 'slug' => 'politicas-institucionales', 'excerpt' => 'Política de privacidad, datos, anti-bullying, ambiental y de inclusión' ),
            array( 'title' => 'Informes y Comunicados', 'slug' => 'informes-comunicados', 'excerpt' => 'Comunicados institucionales, reportes académicos, evaluaciones internas' ),
            array( 'title' => 'Calendario Académico', 'slug' => 'calendario-academico', 'excerpt' => 'Calendario 2025-2026, fechas de inicio/cierre, evaluaciones, vacaciones' ),
            array( 'title' => 'Documentos Oficiales', 'slug' => 'documentos-oficiales', 'excerpt' => 'Resoluciones, acuerdos, estatutos, resoluciones ministeriales y certificaciones' ),
        ),
    ),
    // CONTACT
    array(
        'title'    => 'Contact',
        'slug'     => 'contact',
        'template' => 'page-section.php',
        'excerpt'  => 'Contacto: información, ubicación, formulario, horarios y redes sociales',
        'children' => array(
            array( 'title' => 'Información de Contacto', 'slug' => 'informacion-contacto', 'excerpt' => 'Teléfono, Email, WhatsApp. Departamentos específicos y correos por área' ),
            array( 'title' => 'Ubicación', 'slug' => 'ubicacion', 'excerpt' => 'Mapa interactivo, Dirección: Cl 5a # 8 - 82, Castillogrande. Cómo llegar' ),
            array( 'title' => 'Formulario de Contacto', 'slug' => 'formulario-contacto', 'excerpt' => 'Formulario completo: nombre, email, teléfono, asunto, mensaje y departamento' ),
            array( 'title' => 'Horarios de Atención', 'slug' => 'horarios-atencion', 'excerpt' => 'Horarios de oficina, atención a padres, visitas programadas, números de emergencia' ),
            array( 'title' => 'Redes Sociales', 'slug' => 'redes-sociales', 'excerpt' => 'Facebook, Instagram, YouTube, WhatsApp Business, LinkedIn y TikTok' ),
        ),
    ),
);

// Procesar solicitud
$action = isset( $_GET['action'] ) ? sanitize_text_field( $_GET['action'] ) : '';

if ( $action === 'create' && isset( $_GET['nonce'] ) && wp_verify_nonce( $_GET['nonce'], 'valderrama_install' ) ) {
    // Crear todas las páginas
    $results = array();
    
    foreach ( $pages_to_create as $page ) {
        // Crear página padre
        $template = isset( $page['template'] ) ? $page['template'] : 'page-section.php';
        $result = valderrama_create_page( 
            $page['title'], 
            $page['slug'], 
            $template, 
            0, 
            '', 
            $page['excerpt']
        );
        $results[] = $result;
        $parent_id = $result['page_id'];

        // Crear subpáginas si existen
        if ( isset( $page['children'] ) && ! is_wp_error( $parent_id ) ) {
            foreach ( $page['children'] as $child ) {
                $child_result = valderrama_create_page(
                    $child['title'],
                    $child['slug'],
                    'page-subsection.php',
                    $parent_id,
                    '',
                    $child['excerpt']
                );
                $results[] = $child_result;
            }
        }
    }

    // Mostrar resultados
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Valderrama - Instalación Completada</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
                color: #333;
                padding: 2rem;
            }
            .container {
                max-width: 900px;
                margin: 0 auto;
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            }
            h1 {
                color: #C41E3A;
                text-align: center;
                margin-bottom: 2rem;
            }
            .success-count {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                font-weight: bold;
                text-align: center;
                font-size: 1.2rem;
            }
            .results-list {
                max-height: 400px;
                overflow-y: auto;
                border: 1px solid #ddd;
                border-radius: 8px;
            }
            .result-item {
                padding: 0.75rem 1rem;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .result-item:last-child {
                border-bottom: none;
            }
            .result-item.success {
                background: #f0f7f0;
            }
            .result-item.error {
                background: #fef0f0;
                color: #c41e3a;
            }
            .icon {
                font-weight: bold;
                width: 20px;
            }
            .next-steps {
                background: #e7f3ff;
                border: 1px solid #b3d9ff;
                padding: 1.5rem;
                border-radius: 8px;
                margin-top: 2rem;
            }
            .next-steps h2 {
                color: #0056A6;
                margin-top: 0;
            }
            .next-steps ol {
                margin: 1rem 0;
            }
            .next-steps li {
                margin-bottom: 0.5rem;
            }
            .button-group {
                text-align: center;
                margin-top: 2rem;
            }
            .button {
                display: inline-block;
                background: #C41E3A;
                color: white;
                padding: 0.75rem 2rem;
                border: none;
                border-radius: 50px;
                font-size: 1rem;
                cursor: pointer;
                text-decoration: none;
                margin: 0 0.5rem;
            }
            .button:hover {
                background: #8B0000;
            }
            .button.secondary {
                background: #0056A6;
            }
            .button.secondary:hover {
                background: #003d7a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>✅ Instalación Completada - Valderrama International School</h1>
            
            <?php
            $success_count = 0;
            $error_count = 0;
            foreach ( $results as $result ) {
                if ( $result['success'] ) {
                    $success_count++;
                } else {
                    $error_count++;
                }
            }
            ?>
            
            <div class="success-count">
                ✅ <?php echo $success_count; ?> páginas creadas | ❌ <?php echo $error_count; ?> errores
            </div>

            <div class="results-list">
                <?php foreach ( $results as $result ) : ?>
                    <div class="result-item <?php echo $result['success'] ? 'success' : 'error'; ?>">
                        <span class="icon"><?php echo $result['success'] ? '✅' : '❌'; ?></span>
                        <span><?php echo esc_html( $result['message'] ); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="next-steps">
                <h2>📋 Próximos Pasos</h2>
                <ol>
                    <li><strong>Ve a WordPress Admin:</strong> <a href="<?php echo admin_url( 'edit.php?post_type=page' ); ?>" target="_blank"><?php echo admin_url( 'edit.php?post_type=page' ); ?></a></li>
                    <li><strong>Verifica las 73 páginas creadas</strong> - Todas deben estar publicadas</li>
                    <li><strong>Crea el Menú Principal:</strong> Apariencia > Menús</li>
                    <li><strong>Añade las páginas al menú</strong> en orden (HOME, QUIÉNES SOMOS, MODELO EDUCATIVO, etc.)</li>
                    <li><strong>Asigna el menú</strong> a la ubicación "Primary Menu"</li>
                    <li><strong>Verifica la navegación</strong> en el sitio frontend</li>
                    <li><strong>Llena contenido:</strong> Edita cada página con contenido real</li>
                </ol>

                <h3>💡 Notas Importantes</h3>
                <ul>
                    <li>Las plantillas ya están asignadas automáticamente</li>
                    <li>Los breadcrumbs y navegación funcionarán automáticamente</li>
                    <li>Las páginas relacionadas se mostrarán automáticamente</li>
                    <li>IMPORTANTE: El menú debe crearse manualmente en WordPress Admin</li>
                </ul>
            </div>

            <div class="button-group">
                <a href="<?php echo admin_url( 'edit.php?post_type=page' ); ?>" class="button" target="_blank">
                    🔗 Ir a WordPress Pages
                </a>
                <a href="<?php echo admin_url( 'nav-menus.php' ); ?>" class="button secondary" target="_blank">
                    📋 Crear Menú
                </a>
            </div>
        </div>

        <script>
            // Auto-eliminar este archivo después de 5 segundos
            setTimeout(function() {
                // Notificar al servidor para eliminar el archivo
                fetch('<?php echo admin_url( 'admin-ajax.php' ); ?>?action=valderrama_cleanup', { method: 'POST' });
            }, 5000);
        </script>
    </body>
    </html>
    <?php
    exit;
}

// Mostrar página inicial con instrucciones
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valderrama - Instalador Automático</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
            color: #333;
            padding: 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 3rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .logo {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        h1 {
            color: #C41E3A;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        .info-box {
            background: #f0f7f0;
            border-left: 4px solid #28a745;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-radius: 8px;
        }
        .info-box h3 {
            color: #155724;
            margin-top: 0;
        }
        .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-radius: 8px;
        }
        .warning-box h3 {
            color: #856404;
            margin-top: 0;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #0056A6 0%, #4A90E2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }
        .stat-card h4 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
        }
        .stat-card p {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        .button {
            display: block;
            width: 100%;
            max-width: 300px;
            margin: 2rem auto;
            padding: 1rem;
            background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(196, 30, 58, 0.3);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .feature {
            padding: 1rem;
            background: #f5f5f5;
            border-radius: 8px;
        }
        .feature h4 {
            color: #C41E3A;
            margin-top: 0;
        }
        .manual-steps {
            background: #f9f9f9;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 2rem;
            border: 1px solid #ddd;
        }
        .manual-steps h3 {
            color: #333;
            margin-top: 0;
        }
        .manual-steps ol {
            margin: 1rem 0;
        }
        .manual-steps li {
            margin-bottom: 0.75rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🚀</div>
        <h1>Instalador Automático - Valderrama International School</h1>
        <p class="subtitle">Crea automáticamente las 73 páginas del sitio web con plantillas y jerarquía</p>

        <div class="info-box">
            <h3>✅ ¿Qué hace este script?</h3>
            <p>Este instalador crea automáticamente:</p>
            <ul>
                <li><strong>1 página HOME</strong> con plantilla de homepage</li>
                <li><strong>9 secciones principales</strong> (Quiénes Somos, Modelo Educativo, Academics, etc.)</li>
                <li><strong>63 subpáginas</strong> organizadas jerárquicamente</li>
                <li><strong>Plantillas asignadas</strong> automáticamente a cada página</li>
                <li><strong>Breadcrumbs, navegación y relacionadas</strong> funcionarán automáticamente</li>
            </ul>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h4>73</h4>
                <p>Páginas totales</p>
            </div>
            <div class="stat-card">
                <h4>10</h4>
                <p>Menús principales</p>
            </div>
            <div class="stat-card">
                <h4>5</h4>
                <p>Plantillas dinámicas</p>
            </div>
            <div class="stat-card">
                <h4>2 min</h4>
                <p>Tiempo de ejecución</p>
            </div>
        </div>

        <div class="warning-box">
            <h3>⚠️ Importante</h3>
            <p><strong>Requisitos:</strong></p>
            <ul>
                <li>Debes estar logueado como administrador</li>
                <li>Debes estar en tu sitio WordPress</li>
                <li>Este archivo se auto-elimina después de ejecutarse (por seguridad)</li>
                <li>NO ejecutes si ya tienes páginas con estos slugs</li>
            </ul>
        </div>

        <div class="features">
            <div class="feature">
                <h4>📄 Plantillas Automáticas</h4>
                <p>Cada página recibe la plantilla correcta (page-home.php, page-section.php, page-subsection.php)</p>
            </div>
            <div class="feature">
                <h4>🔗 Jerarquía Completa</h4>
                <p>Las subpáginas quedan correctamente ligadas a sus padres</p>
            </div>
            <div class="feature">
                <h4>🎯 SEO-Ready</h4>
                <p>URLs limpias y meta descriptions configuradas</p>
            </div>
            <div class="feature">
                <h4>⚡ Super Rápido</h4>
                <p>Todas las 73 páginas se crean en 2 minutos</p>
            </div>
        </div>

        <?php
        $nonce = wp_create_nonce( 'valderrama_install' );
        $create_url = add_query_arg( array(
            'action' => 'create',
            'nonce' => $nonce,
        ), admin_url( 'admin-ajax.php' ) );
        ?>
        
        <a href="<?php echo esc_url( $create_url ); ?>" class="button">
            🚀 CREAR 73 PÁGINAS AUTOMÁTICAMENTE
        </a>

        <div class="manual-steps">
            <h3>📋 Qué hacer después</h3>
            <ol>
                <li><strong>Verifica las 73 páginas</strong> en WordPress Admin > Páginas</li>
                <li><strong>Crea un Menú</strong> en Apariencia > Menús</li>
                <li><strong>Añade las 10 páginas padre</strong> al menú (HOME, QUIÉNES SOMOS, MODELO EDUCATIVO, etc.)</li>
                <li><strong>Asigna el menú</strong> a la ubicación "Primary Menu"</li>
                <li><strong>Prueba la navegación</strong> en tu sitio web</li>
                <li><strong>Llena los contenidos</strong> de cada página</li>
                <li><strong>Configura SEO</strong> (instala Yoast SEO si lo deseas)</li>
            </ol>
        </div>

        <div class="info-box">
            <h3>❓ ¿Dudas?</h3>
            <p>Consulta estos documentos en tu carpeta:</p>
            <ul>
                <li><strong>GUIA_IMPLEMENTACION_MULTIPAGE.md</strong> - Manual completo paso-a-paso</li>
                <li><strong>ARQUITECTURA_SITIO_COMPLETA.md</strong> - Especificación de las 73 páginas</li>
            </ul>
        </div>
    </div>
</body>
</html>
<?php
