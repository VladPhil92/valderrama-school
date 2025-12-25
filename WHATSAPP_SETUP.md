# WhatsApp Notification Setup

## Overview
The admissions form sends a WhatsApp notification to +57 318 6428218 whenever a new application is submitted.

## Setup Using WhatsApp Business Cloud API (Free)

### 1. Create a Meta (Facebook) Developer Account
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create an account or log in
3. Click "My Apps" → "Create App"
4. Select "Business" as app type

### 2. Add WhatsApp Product
1. In your app dashboard, click "Add Product"
2. Find "WhatsApp" and click "Set Up"
3. This gives you a test phone number to start

### 3. Get Your Credentials
1. Go to WhatsApp → Getting Started
2. Copy your:
   - **Phone Number ID** (under "From")
   - **Access Token** (temporary, 24 hours)

### 4. Get a Permanent Access Token
1. Go to Settings → Basic
2. Copy your **App ID** and **App Secret**
3. Use the Graph API Explorer to generate a permanent token:
   - Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
   - Select your app
   - Get a User Access Token with `whatsapp_business_messaging` permission
   - Exchange it for a permanent token using:
```bash
curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_TEMP_TOKEN"
```

### 5. Verify Your Business Phone Number
1. To use your own number (+57 318 6428218), you need to:
   - Verify your business on Meta Business
   - Add and verify your phone number
   - This allows unlimited messages

### 6. Add Environment Variables

Add these to your `.env.local` (local) and Render (production):

```
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
```

## Message Format

Each notification includes:
- 🎓 Student information (name, document, birthdate, grade)
- 👨‍👩‍👧 Parent/guardian details
- 📋 Additional information
- 📅 Registration timestamp (Colombia timezone)

## Testing

Test with the WhatsApp test number first:
1. Add your test number as a recipient in Meta dashboard
2. Submit a form
3. Check if you receive the WhatsApp message

## Free Tier Limits

- **Test Number:** 1,000 messages/month (free)
- **Verified Business:** Unlimited free messages for 1-1 conversations

## Troubleshooting

If notifications don't work:
1. Check Render logs for errors
2. Verify environment variables are set correctly
3. Ensure WhatsApp phone number is verified in Meta Business
4. Check that access token hasn't expired

## Alternative: Simpler Solution

If Meta's setup is too complex, you can use:
- **Twilio WhatsApp API** (paid, but easier setup)
- **Webhook to Zapier/Make** (no-code solution)

Let me know if you need help with alternatives!
