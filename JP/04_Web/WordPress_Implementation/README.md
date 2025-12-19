# Valderrama International School WordPress Implementation Guide

## Project Overview
This package contains the complete WordPress theme, plugin configuration, and setup documentation for the Valderrama International School website. The site is designed as a bilingual (Spanish/English) educational institution website featuring programs, events, admissions information, and community engagement.

## Directory Structure

```
WordPress_Implementation/
├── wp-content/
│   ├── themes/
│   │   └── valderrama/          # Custom WordPress theme
│   │       ├── style.css        # Main stylesheet
│   │       ├── functions.php    # Theme functions
│   │       ├── header.php       # Header template
│   │       ├── footer.php       # Footer template
│   │       ├── index.php        # Main/home template
│   │       ├── page-contact.php # Contact page template
│   │       └── languages/       # Translation files
│   │           └── valderrama.pot
│   └── plugins/
│       └── valderrama-cpt-functions.php  # Custom post types & taxonomies
├── wp-config-sample.php         # Database configuration template
└── README.md                    # This file
```

## Installation Steps

### 1. Host & Domain Setup
- Secure hosting with PHP 7.4+, MySQL 5.7+, and SSL certificate
- Configure domain DNS: valderramainternationalschool.com
- Set up SSL certificate (HTTPS required)
- Recommended: VPS or Cloud hosting with minimum 4GB RAM, 50GB SSD

### 2. Database Configuration
```bash
# Create database and user
CREATE DATABASE valderrama_school;
CREATE USER 'valderrama_wp'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON valderrama_school.* TO 'valderrama_wp'@'localhost';
FLUSH PRIVILEGES;
```

### 3. WordPress Installation
1. Download WordPress 6.4+ from wordpress.org
2. Extract to your hosting directory
3. Copy `wp-config-sample.php` to `wp-config.php`
4. Update database credentials in wp-config.php
5. Generate unique security keys from https://api.wordpress.org/secret-key/1.1/salt/
6. Run WordPress installation wizard

### 4. Theme Installation
1. Copy the `valderrama` folder to `/wp-content/themes/`
2. Activate theme in WordPress dashboard: Appearance → Themes
3. Set up navigation menus: Appearance → Menus
4. Create main and footer menus
5. Configure theme options if using a theme customizer

### 5. Plugin Installation
Install the following plugins (activate in order):

**Multilingual:**
- WPML (Sitepress Multilingual CMS) - for Spanish/English support

**Content Management:**
- Advanced Custom Fields Pro (ACF Pro)
- CPT UI (if not using bundled plugin)
- Valderrama CPT Functions (included, upload to /wp-content/plugins/)

**Forms & Events:**
- Gravity Forms - for advanced forms (contact, admissions, scholarships)
- The Events Calendar Pro - for event management

**SEO & Performance:**
- Yoast SEO - for SEO optimization
- WP Rocket - for caching and performance

**Security & Backups:**
- Wordfence Security - for firewall and malware scanning
- UpdraftPlus - for automated backups

### 6. WPML Configuration
1. Activate WPML
2. Go to WPML → Languages
3. Add Spanish (es) and English (en) languages
4. Configure language URLs: Prefixed (es/, en/)
5. Translate theme strings and plugin content

### 7. Custom Post Types Setup
1. Upload `valderrama-cpt-functions.php` to `/wp-content/plugins/`
2. Activate plugin
3. Verify in WordPress dashboard sidebar:
   - Events
   - Academic Programs
   - Galleries
   - Staff Members
   - Testimonials

## Page Structure

### Required Pages
1. **Home** - Main landing page with hero section
2. **About Us** - School mission, vision, history
3. **Programs** - Academic programs (Kindergarten through Grade 12)
4. **Admissions** - Admission process and application
5. **Events** - Calendar and event listing
6. **News** - Blog posts and announcements
7. **Gallery** - Photo galleries by category
8. **Contact** - Contact form and information

### Custom Post Types
- **Events** - School events with date, time, location
- **Programs** - Academic programs with curriculum details
- **Staff** - Staff directory with departments
- **Galleries** - Photo galleries organized by category
- **Testimonials** - Parent and student testimonials

## Multilingual Setup

### Content Translation Workflow
1. Create content in Spanish (main language)
2. Set page permalink in Spanish (SEO-friendly URLs)
3. Use WPML to translate to English
4. Translate:
   - Page titles and content
   - Menu items
   - Form labels
   - Meta descriptions

### Language Switching
- Language switcher widget in header
- Default language: Spanish
- URL structure: `/es/` for Spanish, `/en/` for English

## Forms Configuration

### Forms to Create (using Gravity Forms)
1. **Contact Form** - Name, Email, Phone, Subject, Message
2. **Admissions Application** - Multi-step form
   - Student Information
   - Academic History
   - Parent Information
   - Supporting Documents
3. **Scholarship Request** - Income documentation, essays
4. **Event Registration** - Event selection, attendee count
5. **Tour Schedule** - Preferred dates and times

## SEO Configuration

### Yoast SEO Setup
1. Go to SEO → General Settings
2. Configure:
   - Site representation (Organization)
   - Webmaster verification codes
   - Sitemap settings
3. For each page, set:
   - Focus keyword
   - Meta description
   - SEO title

### XML Sitemap
- Auto-generated at: /sitemap_index.xml
- Submit to Google Search Console
- Ping Yoast SEO after updates

### Schema Markup
- Organization schema (auto-configured)
- LocalBusiness schema for contact info
- EducationalOrganization schema
- Event schema for calendar items

## Performance Optimization

### WP Rocket Configuration
1. Dashboard → WP Rocket
2. Cache Settings:
   - Enable cache
   - Cache mobile pages
   - Cache logged-in users
3. File Optimization:
   - Minify CSS/JS/HTML
   - Lazy load images
   - CNAME setup (if using CDN)
4. Database:
   - Cleanup revisions, trash, spam comments

### Image Optimization
- Resize images to correct dimensions before upload
- Use WebP format when possible
- Compress with ShortPixel or equivalent
- Recommended sizes:
  - Hero images: 1920x600px
  - Card images: 800x600px
  - Thumbnails: 400x300px

## Security Hardening

### Wordfence Configuration
1. Dashboard → Wordfence → Options
2. Enable:
   - Login security (2FA)
   - File integrity monitoring
   - Malware scanning
   - IP reputation monitoring
3. Firewall:
   - Set to "Learning Mode" initially
   - Configure blocking rules
   - Whitelist trusted IPs

### WordPress Hardening
```php
// Add to wp-config.php
define('AUTOSAVE_INTERVAL', 300);
define('WP_POST_REVISIONS', 5);
define('EMPTY_TRASH_DAYS', 7);
define('DISALLOW_FILE_EDIT', true);
```

### Database Backups
- UpdraftPlus: Backup daily
- Store backups: Google Drive, Amazon S3, or local server
- Test restore procedure monthly

## Content Management

### Daily Tasks
- Monitor and respond to contact form submissions
- Review pending comments (if enabled)
- Schedule posts using WordPress scheduler
- Update event calendar

### Weekly Tasks
- Review analytics (Google Analytics 4)
- Check for broken links
- Monitor security alerts from Wordfence

### Monthly Tasks
- Database cleanup using WP Rocket
- Review search console reports
- Update plugins and themes (on staging first)
- Generate backup reports

## Admin User Management

### User Roles
1. **Administrator** - Full access
2. **Editor** - Can publish and manage posts
3. **Author** - Can publish own posts
4. **Contributor** - Can submit drafts
5. **Subscriber** - Limited access

### Recommended Users
- Principal: Administrator
- Communications Manager: Editor
- Content Writers: Author/Contributor
- IT Support: Administrator (for maintenance)

## Testing Checklist

Before launch, verify:
- [ ] All pages render correctly on desktop, tablet, mobile
- [ ] Forms submit successfully in both languages
- [ ] Multilingual switching works
- [ ] Navigation menus display properly
- [ ] Images load correctly and are optimized
- [ ] Page load time < 3 seconds
- [ ] SSL certificate valid (HTTPS)
- [ ] Google Search Console verification
- [ ] Analytics tracking code installed
- [ ] Contact form emails send correctly
- [ ] Event calendar displays properly
- [ ] Mobile menu is functional
- [ ] Footer links work
- [ ] Accessibility check (WCAG 2.1 Level A)

## Troubleshooting

### Common Issues

**White Screen of Death**
- Check wp-config.php database credentials
- Enable WP_DEBUG in wp-config.php
- Check PHP error logs
- Verify file permissions (755 for folders, 644 for files)

**Forms Not Submitting**
- Verify Gravity Forms installation
- Check reCAPTCHA API keys if enabled
- Review browser console for JavaScript errors
- Check email deliverability settings

**Multilingual Issues**
- Verify WPML installation and license
- Check if page is translated in WPML dashboard
- Clear WPML cache
- Verify language URL structure

**Performance Issues**
- Enable WP Rocket caching
- Optimize images
- Remove unused plugins
- Increase PHP memory limit to 256MB
- Check database for orphaned data

## Support & Resources

### Documentation
- WordPress.org Codex: https://developer.wordpress.org/
- WPML Documentation: https://wpml.org/documentation/
- Yoast SEO Guide: https://yoast.com/wordpress/plugins/seo/
- Gravity Forms Docs: https://docs.gravityforms.com/

### Hosting Provider Resources
- cPanel documentation
- SSL certificate management
- Database administration tools

## Contact Information

**Valderrama International School**
- Address: Cartagena, Colombia
- Phone: +57 5 XXX XXXX
- Email: info@valderramainternationalschool.com
- Website: https://www.valderramainternationalschool.com

---

Last Updated: December 17, 2025
Theme Version: 1.0.0
WordPress Version Required: 6.4+