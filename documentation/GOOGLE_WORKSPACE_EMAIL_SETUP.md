# Google Workspace Email Setup

This guide explains how to configure Google Workspace (Gmail) for the admissions form email notifications.

## Overview

The admissions form sends email notifications to `direccion@valderramainternationalschool.com` using Google Workspace's Gmail SMTP service via Nodemailer.

## Environment Variables Required

Add these variables to your `.env.local` file:

```env
# Google Workspace Email Configuration
GMAIL_USER=direccion@valderramainternationalschool.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

## Setting Up Google App Password

**Important:** You need to generate an "App Password" - you cannot use your regular Gmail password.

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)** and type `Valderrama Website`
5. Click **Generate**
6. Copy the 16-character password shown (format: `xxxx xxxx xxxx xxxx`)
7. Remove the spaces and use this as your `GMAIL_APP_PASSWORD`

### Example

If Google generates: `abcd efgh ijkl mnop`

Your `.env.local` should have:
```env
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

## How It Works

The system uses Nodemailer to send emails through Gmail's SMTP servers:

1. **Admin Notification**: When someone submits an admission form, an email is sent to `direccion@valderramainternationalschool.com` with all the applicant details and approve/deny buttons.

2. **Approval Email**: When an application is approved, a welcome email is sent to the parent's email address.

3. **Denial Email**: When an application is denied, a notification is sent to the parent's email address (with optional reason).

## Testing the Configuration

After setting up the environment variables, you can test by:

1. Restart your development server: `npm run dev`
2. Submit a test admission form on the website
3. Check the `direccion@valderramainternationalschool.com` inbox for the notification

## Troubleshooting

### "Email service not configured" warning
- Make sure both `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in `.env.local`
- Restart the server after adding environment variables

### "Invalid login" error
- Verify the app password is correct (no spaces)
- Make sure 2-Step Verification is still enabled
- Try generating a new app password

### Emails not arriving
- Check spam/junk folder
- Verify the email address is correct
- Check server logs for error messages

## Security Notes

- Never commit `.env.local` to version control
- App passwords can be revoked at any time from Google Account settings
- The app password only works for the specific Google account it was generated for

## Previous Configuration (Resend)

If you need to switch back to Resend, the previous configuration used:
```env
RESEND_API_KEY=your-resend-api-key
```

And required reverting `lib/email.ts` to use the Resend SDK instead of Nodemailer.
