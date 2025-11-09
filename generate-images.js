const sharp = require('sharp');
const fs = require('fs');

// Create favicon (512x512)
const createFavicon = async () => {
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="80" fill="url(#grad)"/>
      <text x="256" y="380" font-size="320" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">K</text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/icon.png');
  
  console.log('✓ Created icon.png');
};

// Create Open Graph image (1200x630)
const createOGImage = async () => {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Logo and brand -->
      <rect x="460" y="150" width="80" height="80" rx="16" fill="url(#logoGrad)"/>
      <text x="500" y="215" font-size="48" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">K</text>
      <text x="560" y="215" font-size="64" font-weight="bold" fill="#111827" font-family="Arial">kensa</text>
      
      <!-- Tagline -->
      <text x="600" y="320" font-size="48" font-weight="bold" text-anchor="middle" fill="#111827" font-family="Arial">Your Research,</text>
      <text x="600" y="380" font-size="48" font-weight="bold" text-anchor="middle" fill="#14b8a6" font-family="Arial">Elevated</text>
      
      <!-- Subtitle -->
      <text x="600" y="460" font-size="28" text-anchor="middle" fill="#6b7280" font-family="Arial">AI-powered platform for researchers</text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/opengraph-image.png');
  
  console.log('✓ Created opengraph-image.png');
};

// Create a simple favicon.ico as well
const createFaviconIco = async () => {
  const svg = `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#grad)"/>
      <text x="16" y="24" font-size="20" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">K</text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/favicon.ico');
  
  console.log('✓ Created favicon.ico');
};

// Run all
(async () => {
  // Create public directory if it doesn't exist
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  await createFavicon();
  await createOGImage();
  await createFaviconIco();
  
  console.log('\n🎉 All images created successfully!');
  console.log('Now run: git add . && git commit -m "Add branded images" && git push');
})();