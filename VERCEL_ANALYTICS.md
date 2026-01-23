# Vercel Web Analytics Setup Guide

This Hexo blog has been configured to support Vercel Web Analytics. Follow these steps to enable it.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- Your blog deployed on Vercel.

## Step 1: Enable Web Analytics in Vercel Dashboard

1. Go to the [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project (this blog)
3. Click the **Analytics** tab
4. Click **Enable** from the dialog

> **Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Step 2: Enable Analytics in Configuration

Edit the `_config.next.yml` file and change the Vercel Analytics configuration:

```yaml
# Vercel Web Analytics
# See: https://vercel.com/docs/analytics
vercel_analytics:
  enable: true  # Change this from false to true
```

## Step 3: Deploy Your Changes

Deploy your blog to Vercel:

```bash
# Using Vercel CLI
vercel deploy

# Or commit and push if you have Git integration
git add .
git commit -m "Enable Vercel Web Analytics"
git push
```

## Step 4: Verify Installation

After deployment:

1. Visit your site
2. Open browser Developer Tools (F12)
3. Check the Network tab
4. Look for a request to `/_vercel/insights/script.js` and `/_vercel/insights/view`

If you see these requests, Web Analytics is working correctly!

## Step 5: View Your Data

Once your site is deployed and users have visited:

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. After a few days of visitors, you'll be able to explore your data

## Implementation Details

This implementation uses the HTML/plain JavaScript approach for Vercel Web Analytics, which is perfect for static Hexo sites. The analytics code is injected into the `<head>` section of every page through a custom template file at `source/_data/head.njk`.

The implementation includes:
- The Vercel Analytics tracking script
- Automatic page view tracking
- Privacy-compliant data collection
- No route tracking (as this is a static site)

## Disabling Analytics

To disable analytics, simply change the configuration back:

```yaml
vercel_analytics:
  enable: false
```

Then rebuild and deploy your site.

## Learn More

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Analytics Pricing](https://vercel.com/docs/analytics/limits-and-pricing)
