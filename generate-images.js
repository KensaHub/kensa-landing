const sharp = require('sharp');
const fs = require('fs');
const toIco = require('to-ico');

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
      <text x="500" y="205" font-size="48" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">K</text>
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

// Create proper multi-size favicon.ico
const createProperFavicon = async () => {
  const sizes = [16, 32, 48];
  const buffers = [];
  
  const svg = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="40" fill="url(#grad)"/>
      <text x="128" y="190" font-size="160" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">K</text>
    </svg>
  `;
  
  for (const size of sizes) {
    const buffer = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push(buffer);
  }
  
  const icoBuffer = await toIco(buffers);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  
  console.log('✓ Created proper favicon.ico');
};

// Run all
(async () => {
  // Create public directory if it doesn't exist
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  await createFavicon();
  await createOGImage();
  await createProperFavicon();
  
  console.log('\n🎉 All images created successfully!');
})();