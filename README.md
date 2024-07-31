# Larnalytics

Larnalytics is a package to track page views for your website. It supports various technologies like Vue, React, Angular, Svelte, and HTML websites.

## Installation

Install the package via npm:

```bash
npm install larnalyticsjs
```

## Example
```javascript
import { trackPageViews } from 'larnalytics';

const api_key = 'YOUR_API_KEY';
const site_key = 'SITE_KEY';

document.addEventListener("DOMContentLoaded", function() {
  trackPageViews(api_key, site_key);
});
```

## For full documentation
[Visit Larnalytics](https://larnalytics.online/documentation)
