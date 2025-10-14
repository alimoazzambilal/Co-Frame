let testInfo = {
  name: `CF Modern E-Commerce Redesign - Memory Air`,
};

let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

monitorChangesByConditionAndRun(checkForElements, onElementsFound);

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  // Hide all original content
  const originalContent = document.querySelector('.lp-positioned-content');
  if (originalContent) {
    originalContent.style.display = 'none';
  }
  
  const lpRoot = document.querySelector('#lp-pom-root');
  if (lpRoot) {
    lpRoot.style.display = 'none';
  }
  
  const allBlocks = document.querySelectorAll('[id^="lp-pom-block"]');
  allBlocks.forEach(block => {
    block.style.display = 'none';
  });
  
  const allBoxes = document.querySelectorAll('[id^="lp-pom-box"]');
  allBoxes.forEach(box => {
    box.style.display = 'none';
  });

  // Add custom styles
  addModernStyles();
  addAnimationStyles();

  // Create modern layout
  const modernContainer = createModernLayout();
  document.body.appendChild(modernContainer);

  // Initialize animations
  initScrollAnimations();

  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    const positionedContent = document.querySelector('.lp-positioned-content');
    const contentExists = !!positionedContent;

    return cfDefined && testActiveAbsent && contentExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

function addModernStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      background: #ffffff;
    }

    .cf-modern-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .cf-mobile-menu {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 280px;
      background: white;
      z-index: 2000;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
    }

    .cf-mobile-menu.open {
      transform: translateX(0);
    }

    .cf-mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }

    .cf-mobile-menu-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .cf-media-carousel {
      animation: scroll 30s linear infinite;
    }

    .cf-media-carousel:hover {
      animation-play-state: paused;
    }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .cf-product-card {
      transition: all 0.3s ease;
    }

    .cf-product-card:hover {
      transform: translateY(-8px);
    }

    .cf-testimonial-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cf-testimonial-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    }

    .cf-testimonial-carousel {
      position: relative;
      overflow: hidden;
    }

    .cf-testimonial-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .cf-testimonial-slide {
      min-width: 100%;
      padding: 0 16px;
    }

    @media (min-width: 768px) {
      .cf-testimonial-slide {
        min-width: 50%;
      }
    }

    @media (min-width: 1024px) {
      .cf-testimonial-slide {
        min-width: 33.333%;
      }
    }

    .cf-carousel-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      border: 2px solid #FF6B6B;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .cf-carousel-button:hover {
      background: #FF6B6B;
      transform: translateY(-50%) scale(1.1);
    }

    .cf-carousel-button:hover svg {
      stroke: white;
    }

    .cf-carousel-button-prev {
      left: -24px;
    }

    .cf-carousel-button-next {
      right: -24px;
    }

    .cf-carousel-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 32px;
    }

    .cf-carousel-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d1d5db;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cf-carousel-dot.active {
      background: #FF6B6B;
      width: 32px;
      border-radius: 5px;
    }

    @media (max-width: 768px) {
      .cf-nav-mobile {
        display: flex !important;
      }
      .cf-nav-desktop {
        display: none !important;
      }
      .cf-carousel-button {
        width: 40px;
        height: 40px;
      }
      .cf-carousel-button-prev {
        left: -12px;
      }
      .cf-carousel-button-next {
        right: -12px;
      }
    }
  `;
  document.head.appendChild(style);
}

function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cf-animate-fadeInUp {
      opacity: 0;
    }

    .cf-animate-fadeInUp.cf-in-view {
      animation: fadeInUp 0.6s ease forwards;
    }

    .cf-stagger-1 { animation-delay: 0.1s; }
    .cf-stagger-2 { animation-delay: 0.2s; }
    .cf-stagger-3 { animation-delay: 0.3s; }
    .cf-stagger-4 { animation-delay: 0.4s; }
  `;
  document.head.appendChild(style);
}

function createModernLayout() {
  return (
    <div className="cf-modern-container">
      <ModernNav />
      <HeroSection />
      <BenefitsSection />
      <ScienceSection />
      <TestimonialsSection />
      <WhatsIncludedSection />
      <MediaSection />
      <FooterCTA />
    </div>
  );
}

function ModernNav() {
  // Debug: Check multiple logo sources
  const logoImg1 = document.querySelector('#lp-pom-image-144 img');
  const logoImg2 = document.querySelector('#lp-pom-image-407 img');
  const logoImg3 = document.querySelector('#lp-pom-image-144 .lp-pom-image-container img');
  
  // Try different logo sources in order of preference
  let logoSrc = logoImg1?.src || logoImg2?.src || logoImg3?.src || 
                '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1c5jydh-memory-air-logo-may-17-2021-01_102q01k02q01a000005028.png';
  
  // Debug log
  console.log('Logo source found:', logoSrc);

  // Mobile menu toggle functionality
  setTimeout(() => {
    const menuBtn = document.querySelector('.cf-menu-toggle');
    const closeBtn = document.querySelector('.cf-menu-close');
    const overlay = document.querySelector('.cf-mobile-menu-overlay');
    const mobileMenu = document.querySelector('.cf-mobile-menu');
    
    const openMenu = () => {
      mobileMenu?.classList.add('open');
      overlay?.classList.add('open');
    };
    
    const closeMenu = () => {
      mobileMenu?.classList.remove('open');
      overlay?.classList.remove('open');
    };
    
    menuBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
  }, 100);

  return (
    <>
      <nav className="cf-modern-nav cf:px-6 cf:py-4">
        <div className="cf:max-w-7xl cf:mx-auto cf:flex cf:items-center cf:justify-between">
          <div className="cf:flex cf:items-center">
            <img 
              src={logoSrc} 
              alt="Memory Air" 
              className="cf:h-10 cf:w-auto cf:max-w-[180px] cf:object-contain"
              style={{ 
                filter: 'brightness(0) saturate(100%)',
                opacity: '1',
                visibility: 'visible',
                display: 'block',
                minWidth: '120px'
              }}
              onError={(e) => {
                console.log('Logo failed to load, using text fallback');
                e.target.style.display = 'none';
                const textLogo = document.createElement('div');
                textLogo.innerHTML = '<span style="font-size: 24px; font-weight: bold; color: #000;">Memory Air</span>';
                e.target.parentNode?.appendChild(textLogo);
              }}
            />
          </div>

          <div className="cf-nav-desktop cf:hidden cf:lg:flex cf:items-center cf:gap-8">
            <a href="#" className="cf:text-gray-700 cf:hover:text-gray-900 cf:transition-colors cf:no-underline">About</a>
            <a href="#" className="cf:text-gray-700 cf:hover:text-gray-900 cf:transition-colors cf:no-underline">How It Works</a>
            <a href="#" className="cf:text-gray-700 cf:hover:text-gray-900 cf:transition-colors cf:no-underline">Science</a>
            <a href="#" className="cf:text-gray-700 cf:hover:text-gray-900 cf:transition-colors cf:no-underline">Testimonials</a>
          </div>

          <button className="cf-menu-toggle cf-nav-mobile cf:lg:hidden cf:p-2">
            <span className="material-icons" style={{ fontSize: '28px', color: '#000000' }}>menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="cf-mobile-menu-overlay"></div>

      {/* Mobile Menu Drawer */}
      <div className="cf-mobile-menu cf:p-6">
        <div className="cf:flex cf:justify-end cf:mb-8">
          <button className="cf-menu-close cf:p-2">
            <span className="material-icons" style={{ fontSize: '28px', color: '#000000' }}>close</span>
          </button>
        </div>
        
        <nav className="cf:flex cf:flex-col cf:gap-6">
          <a href="#" className="cf:text-gray-700 cf:hover:text-[#FF6B6B] cf:transition-colors cf:no-underline cf:text-lg cf:font-medium">About</a>
          <a href="#" className="cf:text-gray-700 cf:hover:text-[#FF6B6B] cf:transition-colors cf:no-underline cf:text-lg cf:font-medium">How It Works</a>
          <a href="#" className="cf:text-gray-700 cf:hover:text-[#FF6B6B] cf:transition-colors cf:no-underline cf:text-lg cf:font-medium">Science</a>
          <a href="#" className="cf:text-gray-700 cf:hover:text-[#FF6B6B] cf:transition-colors cf:no-underline cf:text-lg cf:font-medium">Testimonials</a>
        </nav>
      </div>
    </>
  );
}

function HeroSection() {
  // Updated hero product image URL
  const HERO_PRODUCT_IMAGE = "https://cdn.coframe.com/assets/memoryair/Group-1-ca087e6d-2b78-424c-bf40-5a533fc6e5b8.webp";
  
  return (
    <section className="cf:bg-[#D7FBF9] cf:min-h-screen cf:flex cf:items-center cf:justify-center cf:px-6 cf:pt-64 cf:pb-32">
      <div className="cf:max-w-7xl cf:mx-auto cf:w-full">
        <div className="cf:grid cf:grid-cols-1 cf:lg:grid-cols-2 cf:gap-12 cf:items-center">
          {/* Left side - Product Image */}
          <div className="cf:flex cf:justify-center cf:lg:justify-end">
            <img 
              src={HERO_PRODUCT_IMAGE}
              alt="Memory Air Device Hero" 
              className="cf:max-w-full cf:h-auto cf:object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Right side - Content */}
          <div className="cf:text-center cf:lg:text-left">
            <p className="cf:text-[#2d3748] cf:text-sm cf:tracking-wide cf:mb-1">
              #New Breakthrough
            </p>
            
            <p className="cf:text-[#2d3748] cf:text-lg cf:mb-2 cf:leading-relaxed">
              Enlight your mind. Make yourself more focused.
            </p>
            
            <h1 className="cf:text-5xl cf:lg:text-6xl cf:font-bold cf:text-black cf:leading-tight cf:tracking-tight">
              MEMORY IMPROVEMENT
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: '🧠',
      title: 'Memory Retention',
      description: 'Enhance memory by up to 300% through nightly scent therapy'
    },
    {
      icon: '🌙',
      title: 'Deep Sleep',
      description: 'Promotes restorative sleep cycles naturally'
    },
    {
      icon: '💨',
      title: 'Smart Airflow',
      description: 'Whisper-quiet operation throughout the night'
    },
    {
      icon: '⚡',
      title: 'Morning Energy',
      description: 'Wake up refreshed and mentally sharp'
    }
  ];

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-white">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:text-gray-900 cf:mb-4">
          Why Memory Air Works
        </h2>
        <p className="cf:text-lg cf:text-center cf:text-gray-600 cf:mb-12 cf:max-w-3xl cf:mx-auto">
          Designed by neuroscientists and sleep experts, combining scent-based therapy with smart technology
        </p>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:lg:grid-cols-4 cf:gap-6">
          {benefits.map((benefit, idx) => (
            <BenefitCard key={idx} {...benefit} delay={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, description, delay }) {
  return (
    <div className={`cf-animate-fadeInUp cf-stagger-${delay + 1} cf:bg-white cf:border cf:border-gray-100 cf:rounded-2xl cf:p-6 cf:text-center cf:shadow-sm cf:hover:shadow-md cf:transition-all`}>
      <div className="cf:text-4xl cf:mb-4">{icon}</div>
      <h3 className="cf:text-xl cf:font-semibold cf:mb-2 cf:text-gray-900">{title}</h3>
      <p className="cf:text-gray-600 cf:text-sm">{description}</p>
    </div>
  );
}

function ProductShowcase() {
  const products = [
    {
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/qoa11f-memoryair2-hero-004-05_108v06v08v06e00000801o.jpg',
      title: 'Feel Sharper',
      description: 'Clearer mind and more confidence'
    },
    {
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/12dh2wb-memoryair2-hero-004-01_108w06v00000000000001o.jpg',
      title: 'Feel Younger',
      description: 'People reported feeling 4-6 years younger'
    },
    {
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1yowopv-memoryair2-hero-004-04_108v06v08v06e00000801o.jpg',
      title: 'Feel More Focused',
      description: 'Reclaimed focus for moments that matter'
    }
  ];

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-[#FAFAFA]">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:text-gray-900 cf:mb-4">
          Improve Memory
        </h2>
        <p className="cf:text-lg cf:text-center cf:text-gray-600 cf:mb-12">
          Neuro Scent Therapy has shown improvements of <span className="cf:text-[#FF6B6B] cf:font-semibold">226%</span> in healthy adults 
          and <span className="cf:text-[#FF6B6B] cf:font-semibold">300%</span> in patients with dementia
        </p>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ image, title, description }) {
  return (
    <div className="cf-product-card cf:bg-white cf:rounded-2xl cf:overflow-hidden cf:shadow-md">
      <div className="cf:aspect-square cf:overflow-hidden">
        <img src={image} alt={title} className="cf:w-full cf:h-full cf:object-cover" />
      </div>
      <div className="cf:p-6">
        <h3 className="cf:text-2xl cf:font-semibold cf:mb-2">{title}</h3>
        <p className="cf:text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ScienceSection() {
  const features = [
    {
      icon: '🧬',
      text: 'Based upon 16 years of neuroscience research'
    },
    {
      icon: '🏆',
      text: 'Created by a "Top 2% Scientist" in the world'
    },
    {
      icon: '🛡️',
      text: 'No Drugs, No Side Effects'
    },
    {
      icon: '📈',
      text: 'Tracks your Progress'
    }
  ];

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-gradient-to-br cf:from-[#D7FBF9] cf:to-[#F0FEFD]">
      <div className="cf:max-w-6xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:text-gray-900 cf:mb-12">
          Why Memory Air™?
        </h2>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-8 cf:max-w-4xl cf:mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="cf:bg-white cf:rounded-2xl cf:p-8 cf:flex cf:items-center cf:gap-6 cf:shadow-sm">
              <div className="cf:text-5xl cf:flex-shrink-0">{feature.icon}</div>
              <p className="cf:text-gray-700 cf:font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: '"...Can improve memory by up to 300%, much better than drugs."',
      author: 'Professor Emerita Dr. Amy Borenstein',
      credential: 'USF, UCSD',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1d8cuh9-image-5-1_108w05600000000000001o.jpg'
    },
    {
      quote: '"...Significantly improved memory."',
      author: 'Associate Professor Dr. Lorene Nelson',
      credential: 'Stanford School of Medicine',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/a3hzzj-oldlady.webp'
    },
    {
      quote: '"...Improved memory...No Side Effects."',
      author: 'Professor Emeritus Dr. James Mortimer',
      credential: "USF, World Expert in Alzheimer's",
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/80ze7u-image-7-6202d12f-1930-4044-b708-cf18179114f4.webp'
    },
    {
      quote: '"...Convincing Evidence!"',
      author: 'Professor Emeritus Dr. David Thom',
      credential: 'Stanford School of Medicine',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/7naimq-group.webp'
    },
    {
      quote: '"...Truly Impressive!"',
      author: 'Professor Emeritus Dr. Edward Abramson',
      credential: 'CSUC',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/jfmfc6-oldman.webp'
    },
    {
      quote: '"...A transformative impact!"',
      author: 'Nancy Wassom Bernstein',
      credential: 'RN, MS, Nurse Practitioner',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/14h8jw-nancy.webp'
    }
  ];

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-white">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:text-gray-900 cf:mb-12">
          The Experts Love Memory Air™
        </h2>

        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}

function TestimonialCarousel({ testimonials }) {
  const carouselId = 'cf-testimonial-carousel-' + Math.random().toString(36).substr(2, 9);
  
  // Set up carousel after render
  setTimeout(() => {
    const track = document.querySelector(`#${carouselId} .cf-testimonial-track`);
    const prevBtn = document.querySelector(`#${carouselId} .cf-carousel-button-prev`);
    const nextBtn = document.querySelector(`#${carouselId} .cf-carousel-button-next`);
    const dots = document.querySelectorAll(`#${carouselId} .cf-carousel-dot`);
    
    if (!track) return;
    
    let currentIndex = 0;
    const totalSlides = testimonials.length;
    let slidesToShow = 3;
    
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        slidesToShow = 1;
      } else if (window.innerWidth < 1024) {
        slidesToShow = 2;
      } else {
        slidesToShow = 3;
      }
    };
    
    const updateCarousel = () => {
      updateSlidesToShow();
      const slideWidth = 100 / slidesToShow;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      
      // Update dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    const goToNext = () => {
      currentIndex = (currentIndex + 1) % (totalSlides - slidesToShow + 1);
      updateCarousel();
    };
    
    const goToPrev = () => {
      currentIndex = currentIndex === 0 ? totalSlides - slidesToShow : currentIndex - 1;
      updateCarousel();
    };
    
    prevBtn?.addEventListener('click', goToPrev);
    nextBtn?.addEventListener('click', goToNext);
    
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel();
      });
    });
    
    // Auto-play
    const autoPlayInterval = setInterval(goToNext, 5000);
    
    // Pause on hover
    const carousel = document.querySelector(`#${carouselId}`);
    carousel?.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    
    // Responsive
    window.addEventListener('resize', updateCarousel);
    
    updateCarousel();
  }, 100);
  
  return (
    <div id={carouselId} className="cf:relative cf:px-12">
      <div className="cf-testimonial-carousel">
        <div className="cf-testimonial-track">
          {testimonials.map((test, idx) => (
            <div key={idx} className="cf-testimonial-slide">
              <TestimonialCard {...test} />
            </div>
          ))}
        </div>
      </div>
      
      <button className="cf-carousel-button cf-carousel-button-prev" aria-label="Previous">
        <span className="material-icons" style={{ fontSize: '28px', color: '#000000' }}>chevron_left</span>
      </button>
      
      <button className="cf-carousel-button cf-carousel-button-next" aria-label="Next">
        <span className="material-icons" style={{ fontSize: '28px', color: '#000000' }}>chevron_right</span>
      </button>
      
      <div className="cf-carousel-dots">
        {testimonials.map((_, idx) => (
          <div key={idx} className={`cf-carousel-dot ${idx === 0 ? 'active' : ''}`}></div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, credential, image }) {
  return (
    <div className="cf-testimonial-card cf:bg-white cf:border cf:border-gray-100 cf:rounded-2xl cf:p-8 cf:shadow-sm cf:h-full cf:flex cf:flex-col cf:items-center cf:text-center">
      <p className="cf:text-[#FF6B6B] cf:font-semibold cf:text-lg cf:mb-6 cf:flex-grow">
        {quote}
      </p>
      
      <div className="cf:flex cf:flex-col cf:items-center">
        <div className="cf:w-24 cf:h-24 cf:rounded-full cf:overflow-hidden cf:mb-4 cf:border-4 cf:border-gray-100">
          <img src={image} alt={author} className="cf:w-full cf:h-full cf:object-cover" />
        </div>
        
        <div>
          <p className="cf:font-semibold cf:text-gray-900 cf:text-base cf:mb-1">{author}</p>
          <p className="cf:text-sm cf:text-gray-600">{credential}</p>
        </div>
      </div>
    </div>
  );
}

function WhatsIncludedSection() {
  const slides = [
    {
      image: 'https://cdn.coframe.com/assets/memoryair/Gemini_Generated_Image_gm9jg8gm9jg8gm9j-cabcf20f-328a-4a98-9a6e-b72215b3228b.webp',
      category: 'MEMORY ENHANCEMENT',
      title: 'MEMORY AIR™ DEVICE',
      description: 'Experience revolutionary scent-based therapy that enhances memory while you sleep. Scientifically proven results.',
    },
    {
      image: 'https://cdn.coframe.com/assets/memoryair/man-sleeping-bed-with-soft-daylight-a0dccc2e-f1dd-4a9f-a000-d5c0bd297a5e.webp',
      category: 'SLEEP THERAPY',
      title: 'NIGHTLY REFILLS',
      description: 'Auto-shipped monthly refills ensure maximum therapy potency. Never run out of your memory enhancement solution.',
    },
    {
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/qoa11f-memoryair2-hero-004-05_108v06v08v06e00000801o.jpg',
      category: 'PROVEN RESULTS',
      title: '100% GUARANTEED',
      description: 'Join thousands who have improved their memory. 60-day money-back guarantee with no questions asked.',
    }
  ];

  const carouselId = 'cf-whats-included-carousel-' + Math.random().toString(36).substr(2, 9);

  // Set up carousel autoplay after render
  setTimeout(() => {
    const imageTrack = document.querySelector(`#${carouselId} .cf-slide-track-images`);
    const contentSlides = document.querySelectorAll(`#${carouselId} .cf-content-slide`);
    const dots = document.querySelectorAll(`#${carouselId} .cf-slide-dot`);
    
    if (!imageTrack || contentSlides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    const updateSlide = () => {
      // Update image track
      imageTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update content slides with opacity
      contentSlides.forEach((slide, idx) => {
        if (idx === currentSlide) {
          slide.style.opacity = '1';
          slide.style.zIndex = '1';
        } else {
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        }
      });
      
      // Update dots
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    const goToNext = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
    };
    
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentSlide = idx;
        updateSlide();
      });
    });
    
    // Auto-play every 4 seconds
    setInterval(goToNext, 4000);
    
    updateSlide();
  }, 100);

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-white">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:text-gray-900 cf:mb-16">
          What's Included?
        </h2>

        <div id={carouselId} className="cf:relative cf:max-w-5xl cf:mx-auto">
          <div className="cf:grid cf:grid-cols-1 cf:lg:grid-cols-2 cf:overflow-hidden cf:rounded-3xl cf:shadow-2xl">
            {/* Left Side - Image Carousel */}
            <div className="cf:relative cf:bg-[#E8F4F3] cf:overflow-hidden cf:min-h-[500px]">
              <div className="cf-slide-track-images cf:flex cf:transition-transform cf:duration-500 cf:ease-in-out cf:h-full">
                {slides.map((slide, idx) => (
                  <div key={idx} className="cf:min-w-full cf:flex cf:items-center cf:justify-center cf:min-h-[500px]">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="cf:w-full cf:h-full cf:object-cover cf:min-h-[500px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Content with Gradient */}
            <div className="cf:bg-gradient-to-br cf:from-[#6BA5A5] cf:to-[#4A8E8E] cf:text-white cf:p-12 cf:flex cf:flex-col cf:justify-center cf:relative">
              {slides.map((slide, idx) => (
                <div 
                  key={idx} 
                  className="cf-content-slide cf:absolute cf:inset-0 cf:p-12 cf:flex cf:flex-col cf:justify-center cf:transition-opacity cf:duration-500"
                  style={{ opacity: idx === 0 ? 1 : 0, zIndex: idx === 0 ? 1 : 0 }}
                >
                  <p className="cf:text-sm cf:font-semibold cf:tracking-widest cf:mb-4 cf:opacity-90 cf:text-left">
                    {slide.category}
                  </p>
                  
                  <h3 className="cf:text-4xl cf:lg:text-5xl cf:font-bold cf:mb-6 cf:leading-tight cf:text-left">
                    {slide.title}
                  </h3>
                  
                  <p className="cf:text-lg cf:mb-8 cf:leading-relaxed cf:opacity-95 cf:text-left">
                    {slide.description}
                  </p>
                  
                  <button 
                    onClick={() => window.location.href = 'https://memoryair.com/products/memory-air-device'}
                    className="cf:bg-white cf:text-[#4A8E8E] cf:px-10 cf:py-4 cf:rounded-full cf:font-semibold cf:hover:bg-gray-100 cf:transition-all cf:shadow-lg cf:inline-block cf:w-fit"
                  >
                    SHOP NOW
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="cf:flex cf:justify-center cf:gap-3 cf:mt-8">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                className={`cf-slide-dot cf:w-3 cf:h-3 cf:rounded-full cf:transition-all cf:cursor-pointer cf:border-0 ${idx === 0 ? 'active cf:bg-[#4A8E8E] cf:w-8' : 'cf:bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaSection() {
  const logos = [
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1wwas6w-scientific-american-logo-svg_108w02g000000000000028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/712cb97b-medscape-logo.svg',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/19qwwf2-new-york-times-logo_103w02x03w00p000014028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1t3elgv-psychology-today-logo-vector-svg-_104s01203x01200f000028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/jgysvl-verywell-logo_103z01703z00r000008028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/3y5of0-mj-primary-header-logo-standard_108w02c000000000000028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/146pdk2-npr-symbol_102x01n02x01b000006028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1qs9rul-newsmax-logo-svg_108f01b02x01b02r000028.png',
    '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/19rp0j2-frontiers-in-neuroscience_108w02m000000000000028.png'
  ];

  return (
    <section className="cf:py-20 cf:px-6 cf:bg-gradient-to-br cf:from-[#D7FBF9] cf:to-[#F0FEFD]">
      <div className="cf:max-w-7xl cf:mx-auto">
        <p className="cf:text-center cf:text-lg cf:font-medium cf:text-gray-700 cf:mb-12">
          Reported in hundreds of articles, programs, and podcasts
        </p>
        
        <div className="cf:overflow-hidden">
          <div className="cf-media-carousel cf:flex cf:gap-12 cf:items-center">
            {[...logos, ...logos].map((logo, idx) => (
              <img key={idx} src={logo} alt="" className="cf:h-12 cf:w-auto cf:object-contain cf:grayscale cf:opacity-60 cf:hover:grayscale-0 cf:hover:opacity-100 cf:transition-all" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cf:bg-[#f5f5f5] cf:text-gray-700 cf:py-16 cf:px-6">
      <div className="cf:max-w-7xl cf:mx-auto">
        {/* Main Footer Content */}
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:lg:grid-cols-5 cf:gap-12 cf:mb-12">
          {/* Brand Section */}
          <div className="cf:lg:col-span-1">
            <h3 className="cf:text-2xl cf:font-bold cf:text-gray-900 cf:mb-4">
              MEMORY AIR
            </h3>
            <p className="cf:text-sm cf:text-gray-600 cf:leading-relaxed">
              Revolutionary scent-based therapy that enhances memory while you sleep. Backed by 16 years of neuroscience research.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="cf:text-sm cf:font-bold cf:text-gray-900 cf:mb-4 cf:tracking-wider">
              COMPANY
            </h4>
            <ul className="cf:flex cf:flex-col cf:gap-3">
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="cf:text-sm cf:font-bold cf:text-gray-900 cf:mb-4 cf:tracking-wider">
              PRODUCT
            </h4>
            <ul className="cf:flex cf:flex-col cf:gap-3">
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="cf:text-sm cf:font-bold cf:text-gray-900 cf:mb-4 cf:tracking-wider">
              HELP
            </h4>
            <ul className="cf:flex cf:flex-col cf:gap-3">
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="cf:text-sm cf:font-bold cf:text-gray-900 cf:mb-4 cf:tracking-wider">
              SOCIAL
            </h4>
            <ul className="cf:flex cf:flex-col cf:gap-3">
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:transition-colors cf:text-sm cf:no-underline">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tags Section */}
        <div className="cf:border-t cf:border-gray-300 cf:pt-8 cf:mb-8">
          <div className="cf:text-center">
            <p className="cf:text-sm cf:text-gray-600 cf:mb-4">
              <span className="cf:font-semibold">Tags:</span>{' '}
              Memory Enhancement | Neuroscience | Sleep Therapy | Brain Health | Cognitive Function | 
              Scent Therapy | Memory Device | Alzheimer's Prevention | Mental Clarity | Natural Treatment | 
              Clinical Research | Memory Loss | Brain Fog | Wellness | Health Tech
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="cf:border-t cf:border-gray-300 cf:pt-8 cf:text-center">
          <p className="cf:text-sm cf:text-gray-600">
            © Memory Air 2024 | Made with ❤️ for Better Memory |{' '}
            <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:no-underline">Privacy Policy</a>
            {' • '}
            <a href="#" className="cf:text-gray-600 cf:hover:text-[#FF6B6B] cf:no-underline">Terms of Service</a>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="cf:fixed cf:bottom-8 cf:right-8 cf:bg-gray-900 cf:text-white cf:w-12 cf:h-12 cf:rounded-md cf:flex cf:items-center cf:justify-center cf:shadow-lg cf:hover:bg-[#FF6B6B] cf:transition-all cf:z-50"
        aria-label="Back to top"
      >
        <span className="material-icons" style={{ fontSize: '28px', color: '#ffffff' }}>keyboard_arrow_up</span>
      </button>
    </footer>
  );
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cf-in-view');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.cf-animate-fadeInUp');
  animatedElements.forEach(el => observer.observe(el));
}

function monitorChangesByConditionAndRun(check, code, keepChecking = false) {
  let checkAndRun = () => check() && (!keepChecking && observer.disconnect(), code());
  var observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  checkAndRun();

  if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
}

function initTest() {
  let cfObj = window.CF || { qaTesting: false, testsRunning: [] };

  if (cfObj.testsRunning.find((test) => test.name == testInfo.name)) {
    console.warn(`The following test is already running: `, testInfo);
    return false;
  }

  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];
  window.CF = { ...window.CF, ...cfObj };

  return { ...window.CF };
}