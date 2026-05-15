const puppeteer = require('puppeteer');

(async () => {
  console.log('📸 Capturing Truox Partnership Detail...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  const url = 'http://localhost:3001/partnership/2';
  console.log(`📍 Loading ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({
    path: 'public/partnership-dashboard1.png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  
  await browser.close();
  
  console.log('✅ Screenshot saved to public/partnership-dashboard1.png');
})();
