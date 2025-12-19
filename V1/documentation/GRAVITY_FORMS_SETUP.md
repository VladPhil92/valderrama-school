# Gravity Forms Setup - Valderrama International School

## Overview
The enrollment system automatically creates a Gravity Forms form when the plugin is activated. This guide explains how to configure it in WordPress.

---

## Prerequisites

1. **Gravity Forms Plugin** - Must be installed and activated
   - Professional or higher license required for email notifications
   - Download from: https://www.gravityforms.com/

2. **Valderrama CPT Plugin** - The custom plugin that creates the enrollment form

---

## Installation Steps

### Step 1: Install Gravity Forms
1. Go to WordPress Admin > Plugins > Add New
2. Search for "Gravity Forms"
3. Install and Activate the plugin
4. Enter your license key in Gravity Forms settings

### Step 2: Activate Valderrama Plugin
1. Upload `valderrama-cpt-functions.php` to `/wp-content/plugins/`
2. Go to WordPress Admin > Plugins
3. Activate "Valderrama International School Custom Content Types"

### Step 3: Verify Form Creation
1. Go to Forms > All Forms
2. You should see "Enrollment - Tutoring & Courses" form automatically created
3. The form includes:
   - Student Name (required)
   - Parent/Guardian Name (required)
   - Email (required)
   - Phone Number (required)
   - Grade Level (select)
   - Course/Service Interest (required)
   - Additional Information (optional)

---

## Data Capture Locations

The enrollment data is captured in THREE places:

### 1. **Gravity Forms Entries**
- Location: WordPress Admin > Forms > All Forms > Entries
- View individual submissions
- Export to CSV/Excel
- Create reports

### 2. **Custom Database Table**
- Table: `wp_valderrama_enrollments`
- Backup location if Gravity Forms fails
- Includes: submission date, IP address, language

### 3. **Email Notifications**
- Admin email: Sent to site administrator
- Student email: Sent to parent email address
- Automatic confirmations on submission

---

## Email Configuration

### Admin Notification Email
**To:** Site Administrator Email (from Settings > General)
**Subject:** New Enrollment: [Course Name] - [Student Name]
**Triggers:** Form submission

**Email Content:**
- Student name
- Parent/Guardian name
- Email address
- Phone number
- Grade level
- Course/Service
- Message
- Submission date
- Submission IP address

### Student Notification Email
**To:** Parent email address (from form)
**Subject:** Enrollment Confirmation - Valderrama International School
**Triggers:** Form submission

**Email Content:**
- Confirmation message
- Course/service name
- Notice that team will contact them

---

## WhatsApp Integration

After form submission, the system:
1. Shows a success message
2. Automatically opens WhatsApp with pre-filled message
3. Message includes:
   - Student name
   - Parent/Guardian name
   - Course/Service
   - Phone number
   - Email address

**WhatsApp Contact:** +57 318 642 8218

---

## Landing Page Modal Form

The modal form on the landing page (`landing-preview.html`) integrates with:

1. **Form Fields:**
   - Student Name
   - Parent/Guardian Name
   - Email
   - Phone
   - Grade Level (Elementary, Middle, High School)
   - Optional message

2. **Submission Flow:**
   - User clicks any course/tutoring tag
   - Modal opens with form
   - Form pre-fills course name
   - User submits
   - Data sent to WordPress via AJAX
   - Gravity Forms entry created
   - Emails sent
   - WhatsApp link opened

---

## AJAX Endpoint

**URL:** `/wp-admin/admin-ajax.php`
**Action:** `valderrama_enrollment`
**Method:** POST

**Parameters:**
```
- action: "valderrama_enrollment"
- nonce: Security token
- course: Course/Service name
- student_name: Student full name
- parent_name: Parent/Guardian name
- email: Parent email
- phone: Contact phone
- level: Grade level (elementary/middle/high)
- message: Additional information
- language: Current language (es/en)
```

---

## Customization

### Change Admin Email
Go to Settings > General > Administrator Email Address

### Add More Fields
1. Go to Forms > All Forms
2. Click "Enrollment - Tutoring & Courses"
3. Click "Edit Form"
4. Add new fields using the form builder
5. Update landing page modal accordingly

### Change Email Templates
1. Go to Forms > All Forms
2. Click "Enrollment - Tutoring & Courses"
3. Go to "Settings" tab
4. Click "Notifications"
5. Edit notification text/subject

### Add Conditional Logic
1. Edit the form
2. Click a field
3. Enable "Conditional Logic"
4. Set conditions for showing/hiding fields

---

## Troubleshooting

### Form Not Created
- Check if Gravity Forms is activated
- Clear cache/check admin_init hook fired
- Check PHP error logs

### Emails Not Sending
- Verify SMTP is configured
- Check email in WordPress settings
- Check Gravity Forms notification settings
- Review server mail logs

### WhatsApp Link Not Opening
- Verify phone number format: +57 3186428218
- Test link manually in browser
- Check browser WhatsApp Web support

### AJAX Submission Failing
- Check browser console for errors
- Verify nonce is correct
- Check WordPress AJAX endpoint
- Review server error logs

---

## Security

The system includes:
- **Nonce verification** - Prevents CSRF attacks
- **Input sanitization** - Cleans all user inputs
- **Email validation** - Checks email format
- **Phone validation** - Basic phone format check
- **IP logging** - Tracks submission source
- **Rate limiting** - Recommended via plugin

---

## Monitoring Enrollments

### View in WordPress Admin
1. Go to Forms > All Forms
2. Click "Enrollment - Tutoring & Courses"
3. Click "Entries" tab
4. View all submissions with:
   - Name
   - Course
   - Date submitted
   - Source IP
   - Status

### Export Data
1. Select entries to export
2. Click "Export"
3. Choose format (CSV, XML)
4. Download and analyze in Excel

### Create Custom Reports
Use Gravity Forms Reports add-on for:
- Submission trends
- Most popular courses
- Lead conversion rates
- Source tracking

---

## Next Steps

1. **Test the system:**
   - Submit test enrollment via landing page
   - Verify Gravity Forms entry created
   - Check emails received
   - Test WhatsApp link

2. **Configure additional settings:**
   - Set up CRM integration (if needed)
   - Enable lead scoring (optional)
   - Create follow-up automations

3. **Monitor and optimize:**
   - Review enrollment trends
   - Adjust form fields based on feedback
   - Test mobile responsiveness

---

## Support

For Gravity Forms support: https://www.gravityforms.com/support/
For plugin issues: Check PHP error logs or contact development team
