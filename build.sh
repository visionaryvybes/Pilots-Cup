#!/bin/bash

# Exit on error
set -e

# Print commands before executing
set -x

echo "Creating static site instead of using Next.js build..."

# Create static directory
mkdir -p static

# Copy all public files to static directory
cp -r public/* static/

# Create a simple index.html file
cat > static/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Pilots Cup - Premium Karting Experience</title>
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <style>
    :root {
      --primary-color: #dc2626;
      --primary-hover: #b91c1c;
      --text-color: #ffffff;
      --bg-color: #000000;
      --secondary-bg: #111111;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      font-size: 16px;
      scroll-behavior: smooth;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: var(--text-color);
      background-color: var(--bg-color);
      overflow-x: hidden;
      width: 100%;
    }
    
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    header {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem 0;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    .nav {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .nav a:hover {
      color: var(--primary-color);
    }
    
    .btn {
      display: inline-block;
      background-color: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: var(--primary-hover);
    }
    
    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      background-image: url('/images/facilities/PHOTO-2025-03-04-08-59-06.jpg');
      background-size: cover;
      background-position: center;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
    
    .section {
      padding: 4rem 0;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .section-title h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .section-title p {
      color: #ccc;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature {
      background-color: var(--secondary-bg);
      padding: 2rem;
      border-radius: 0.5rem;
      text-align: center;
    }
    
    .feature h3 {
      margin: 1rem 0;
    }
    
    .karts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .kart {
      background-color: var(--secondary-bg);
      border-radius: 0.5rem;
      overflow: hidden;
    }
    
    .kart-image {
      height: 200px;
      background-size: cover;
      background-position: center;
    }
    
    .kart-content {
      padding: 1.5rem;
    }
    
    .kart h3 {
      margin-bottom: 0.5rem;
    }
    
    .kart-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #ccc;
    }
    
    footer {
      background-color: var(--secondary-bg);
      padding: 3rem 0;
      text-align: center;
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }
    
    .footer-links a {
      color: white;
      text-decoration: none;
    }
    
    .footer-links a:hover {
      color: var(--primary-color);
    }
    
    .copyright {
      color: #ccc;
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
      .nav-toggle {
        display: block;
      }
      
      .nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.9);
        flex-direction: column;
        padding: 1rem;
      }
      
      .nav.active {
        display: flex;
      }
      
      .hero h1 {
        font-size: 2rem;
      }
      
      .hero p {
        font-size: 1rem;
      }
      
      .section {
        padding: 2rem 0;
      }
      
      .section-title h2 {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        <a href="#" class="logo">Pilots Cup</a>
        <button class="nav-toggle" id="navToggle">☰</button>
        <nav class="nav" id="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#karts">Karts</a>
          <a href="#contact">Contact</a>
          <a href="#book" class="btn">Book Now</a>
        </nav>
      </div>
    </div>
  </header>

  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Pilots Cup</h1>
        <p>Experience the thrill of professional karting with our premium Rotax karts.</p>
        <a href="#book" class="btn">Book Your Kart Now</a>
      </div>
    </div>
  </section>

  <section id="about" class="section">
    <div class="container">
      <div class="section-title">
        <h2>About Pilots Cup</h2>
        <p>The premier destination for karting enthusiasts</p>
      </div>
      <div class="features">
        <div class="feature">
          <h3>Premium Karts</h3>
          <p>Our fleet features the latest Rotax karts, maintained to the highest standards for optimal performance and safety.</p>
        </div>
        <div class="feature">
          <h3>Professional Tracks</h3>
          <p>Race on world-class tracks designed for both beginners and experienced drivers.</p>
        </div>
        <div class="feature">
          <h3>Expert Coaching</h3>
          <p>Learn from our experienced instructors and improve your racing skills with personalized coaching.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="karts" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Our Karts</h2>
        <p>From Bambino to DD2, we have karts for all ages and skill levels</p>
      </div>
      <div class="karts">
        <div class="kart">
          <div class="kart-image" style="background-image: url('/images/karts/PHOTO-2025-03-04-08-53-03.jpg');"></div>
          <div class="kart-content">
            <h3>Bambino</h3>
            <div class="kart-meta">
              <span>Ages: 5-7 years</span>
              <span>Engine: Comer C50</span>
            </div>
            <p>Perfect for young beginners, our Bambino karts provide a safe and fun introduction to karting.</p>
            <a href="#book" class="btn">Book Now</a>
          </div>
        </div>
        <div class="kart">
          <div class="kart-image" style="background-image: url('/images/karts/PHOTO-2025-03-04-08-54-44.jpg');"></div>
          <div class="kart-content">
            <h3>Rotax Micro</h3>
            <div class="kart-meta">
              <span>Ages: 7-11 years</span>
              <span>Engine: Rotax Micro MAX</span>
            </div>
            <p>The next step up, our Micro karts offer more speed and handling for developing racers.</p>
            <a href="#book" class="btn">Book Now</a>
          </div>
        </div>
        <div class="kart">
          <div class="kart-image" style="background-image: url('/images/karts/PHOTO-2025-03-04-08-55-50.jpg');"></div>
          <div class="kart-content">
            <h3>Rotax DD2</h3>
            <div class="kart-meta">
              <span>Ages: 15+ years</span>
              <span>Engine: Rotax DD2</span>
            </div>
            <p>Our top-of-the-line karts for experienced racers, offering unmatched performance and speed.</p>
            <a href="#book" class="btn">Book Now</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Contact Us</h2>
        <p>Get in touch with our team</p>
      </div>
      <div class="contact-info" style="text-align: center;">
        <p>Email: info@pilotscup.com</p>
        <p>Phone: +971 555 5555</p>
        <p>Address: 123 Racing Lane, Dubai, UAE</p>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#karts">Karts</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="copyright">
          &copy; 2025 Pilots Cup. All rights reserved.
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Simple navigation toggle
    document.addEventListener('DOMContentLoaded', function() {
      const navToggle = document.getElementById('navToggle');
      const nav = document.getElementById('nav');
      
      navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
      });
      
      // Close menu when clicking on a link
      const navLinks = document.querySelectorAll('.nav a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          nav.classList.remove('active');
        });
      });
      
      // Apply responsive adjustments
      function applyResponsiveAdjustments() {
        // Set viewport height variable for iOS Safari
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      
      // Run on load
      applyResponsiveAdjustments();
      
      // Run on resize
      window.addEventListener('resize', applyResponsiveAdjustments);
      
      // Run on orientation change
      window.addEventListener('orientationchange', applyResponsiveAdjustments);
    });
  </script>
</body>
</html>
EOF

# Create a simple server.js file for Render.com
cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Install Express for the simple server
npm install express --save

echo "Static site build completed successfully!" 