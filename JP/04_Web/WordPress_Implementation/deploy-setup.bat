@echo off
TITLE Valderrama International School - WordPress Setup Script
COLOR 0A
echo.
echo ===================================================
echo  Valderrama International School - WordPress Setup
echo ===================================================
echo.
echo This script will help you deploy the WordPress site
echo for Valderrama International School.
echo.
echo Please ensure you have completed the following:
echo 1. Purchased and configured hosting
echo 2. Created the database as documented in README.md
echo 3. Downloaded WordPress 6.4+ from wordpress.org
echo 4. Set up SSL certificate for the domain
echo.
pause

:START
echo.
echo [1] Configure WordPress settings
echo [2] Set up database configuration
echo [3] Install required plugins
echo [4] Configure multilingual support
echo [5] Set up custom content types
echo [6] Exit
echo.
set /p choice=Please select an option: 
echo.

if "%choice%"=="1" goto CONFIG_WP
if "%choice%"=="2" goto CONFIG_DB
if "%choice%"=="3" goto INSTALL_PLUGINS
if "%choice%"=="4" goto CONFIG_MULTILINGUAL
if "%choice%"=="5" goto SETUP_CPT
if "%choice%"=="6" goto EXIT
goto START

:CONFIG_WP
echo.
echo Configuring WordPress settings...
echo.
echo Please follow these steps:
echo 1. Update wp-config.php database credentials
echo 2. Generate unique security keys:
echo    https://api.wordpress.org/secret-key/1.1/salt/
echo 3. Set table prefix to "vis_"
echo.
pause
goto START

:CONFIG_DB
echo.
echo Configuring database...
echo.
echo Please ensure you have created the database with:
echo - Database name: valderrama_school
echo - Database user: valderrama_wp
echo - User password: [secure password]
echo.
echo Example SQL commands:
echo CREATE DATABASE valderrama_school;
echo CREATE USER 'valderrama_wp'@'localhost' IDENTIFIED BY 'password';
echo GRANT ALL PRIVILEGES ON valderrama_school.* TO 'valderrama_wp'@'localhost';
echo FLUSH PRIVILEGES;
echo.
pause
goto START

:INSTALL_PLUGINS
echo.
echo Required plugins for Valderrama School website:
echo.
echo MULTILINGUAL:
echo - WPML (Sitepress Multilingual CMS)
echo.
echo CONTENT MANAGEMENT:
echo - Advanced Custom Fields Pro
echo - Gravity Forms
echo.
echo EVENTS CALENDAR:
echo - The Events Calendar Pro
echo.
echo SEO & PERFORMANCE:
echo - Yoast SEO
echo - WP Rocket
echo.
echo SECURITY:
echo - Wordfence Security
echo.
echo BACKUPS:
echo - UpdraftPlus
echo.
echo Please download and install these plugins.
echo.
pause
goto START

:CONFIG_MULTILINGUAL
echo.
echo Configuring multilingual support:
echo.
echo After installing WPML:
echo 1. Navigate to WPML -> Languages
echo 2. Add Spanish (es) and English (en)
echo 3. Configure language URLs: Prefixed (es/, en/)
echo 4. Default language: Spanish
echo 5. Enable language switcher in header
echo.
pause
goto START

:SETUP_CPT
echo.
echo Setting up custom content types:
echo.
echo The valderrama-cpt-functions.php plugin includes:
echo - Events
echo - Academic Programs
echo - Galleries
echo - Staff Members
echo - Testimonials
echo.
echo Complete the following steps:
echo 1. Upload valderrama-cpt-functions.php to wp-content/plugins/
echo 2. Activate the plugin in WordPress dashboard
echo 3. Verify custom post types appear in dashboard menu
echo 4. Create sample content for each post type
echo.
echo Don't forget to set up the corresponding taxonomies:
echo - Event Categories
echo - Gallery Categories
echo - Staff Departments
echo - Program Levels
echo.
pause
goto START

:EXIT
echo.
echo Thank you for using the Valderrama School setup script!
echo.
echo Next steps:
echo 1. Review README.md for detailed configuration
echo 2. Install and activate the Valderrama theme
echo 3. Create the main navigation menus
echo 4. Create the required pages
echo 5. Configure forms if using Gravity Forms
echo 6. Set up SEO with Yoast
echo 7. Test all functionality before launch
echo.
echo ===================================================
echo  Valderrama International School
echo  Website Setup Complete
echo ===================================================
echo.
pause
exit