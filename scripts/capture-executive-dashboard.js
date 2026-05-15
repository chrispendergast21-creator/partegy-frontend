const puppeteer = require('puppeteer');

(async () => {
  console.log('📸 Capturing full Executive Dashboard...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Navigate to localhost
  const url = 'http://localhost:3001/executive';
  console.log(`📍 Loading ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Take full page screenshot
  await page.screenshot({
    path: 'public/executive-dashboard.png',
    fullPage: true
  });
  
  await browser.close();
  
  console.log('✅ Screenshot saved to public/executive-dashboard.png');
})();
