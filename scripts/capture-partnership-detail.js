const puppeteer = require('puppeteer');

(async () => {
  console.log('📸 Capturing Truox Partnership Detail (zoomed in)...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1600,  // Smaller viewport = larger content
      height: 900
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set a zoom level for larger text/content
  await page.setViewport({
    width: 1600,
    height: 900,
    deviceScaleFactor: 1.25  // Makes content 25% larger
  });
  
  const url = 'http://localhost:3001/partnership/2';
  console.log(`📍 Loading ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({
    path: 'public/partnership-dashboard1.png',
    fullPage: false
  });
  
  await browser.close();
  
  console.log('✅ Zoomed screenshot saved to public/partnership-dashboard1.png');
})();
