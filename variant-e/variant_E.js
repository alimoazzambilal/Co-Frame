let testInfo = {
  name: `CF Hero Redesign - Complete Page Restructure`,
};

let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

monitorChangesByConditionAndRun(checkForElements, onElementsFound);

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

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

  addTestimonialStyles();
  addFontStyles();
  addCarouselStyles();
  addMobileNavStyles();
  addBenefitsAnimationStyles();

  const nav = createNavigation();
  document.body.insertBefore(nav, document.body.firstChild);

  const mainContainer = createMainContainer();
  document.body.appendChild(mainContainer);

  initBenefitsAnimation();

  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

    const positionedContent = document.querySelector('.lp-positioned-content');
    const contentExists = !!positionedContent;
    console.log('Check: .lp-positioned-content exists =>', contentExists);

    return cfDefined && testActiveAbsent && contentExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

function addFontStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@400;700&display=swap');
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Bellota Text', Arial, sans-serif !important;
    }
    
    button, .lp-pom-button, a[class*="button"] {
      font-family: 'Bellota Text', Arial, sans-serif !important;
    }
  `;
  document.head.appendChild(style);
}

function addCarouselStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cf-scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    .cf-carousel-track {
      animation: cf-scroll 30s linear infinite;
    }
    
    .cf-carousel-track:hover {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);
}

function addMobileNavStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .cf-mobile-hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1001;
    }

    .cf-mobile-hamburger span {
      width: 30px;
      height: 3px;
      background: #333;
      border-radius: 2px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: center;
    }

    .cf-mobile-hamburger.cf-open span:nth-child(1) {
      transform: rotate(45deg) translateY(8px);
    }

    .cf-mobile-hamburger.cf-open span:nth-child(2) {
      opacity: 0;
    }

    .cf-mobile-hamburger.cf-open span:nth-child(3) {
      transform: rotate(-45deg) translateY(-8px);
    }

    .cf-mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 1000;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 2rem;
    }

    .cf-mobile-menu-overlay.cf-open {
      display: flex;
    }

    .cf-mobile-menu-overlay a {
      font-size: 1.5rem;
      color: #333;
      text-decoration: none;
      font-weight: 500;
    }

    .cf-mobile-menu-overlay .cf-mobile-buy-btn {
      background: black;
      color: white;
      padding: 1rem 2rem;
      border-radius: 9999px;
      font-size: 1.25rem;
    }

    @media (max-width: 800px) {
      .cf-mobile-hamburger {
        display: flex;
        position: absolute;
        right: 1rem;
      }

      nav > div > div:nth-child(2),
      nav > div > div:nth-child(4) {
        display: none !important;
      }

      nav > div {
        position: relative;
        justify-content: center !important;
        min-height: 60px;
      }

      nav > div > div:nth-child(3) {
        position: absolute;
        left: 1rem;
        margin: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function addBenefitsAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cf-fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cf-benefit-card {
      opacity: 0;
      animation: cf-fadeInUp 0.6s ease-out forwards;
    }

    .cf-benefit-card:nth-child(1) {
      animation-delay: 0.1s;
    }

    .cf-benefit-card:nth-child(2) {
      animation-delay: 0.2s;
    }

    .cf-benefit-card:nth-child(3) {
      animation-delay: 0.3s;
    }

    .cf-benefit-card:nth-child(4) {
      animation-delay: 0.4s;
    }

    .cf-benefit-card.cf-animated {
      animation-play-state: running;
    }
  `;
  document.head.appendChild(style);
}

function addTestimonialStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .cf-heading-underline {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
      margin: 0 auto;
      border-radius: 2px;
    }

    .cf-testimonial-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cf-testimonial-card:hover {
      transform: translateY(-8px);
    }

    .cf-quote-mark {
      position: relative;
    }

    .cf-quote-mark::before {
      content: '"';
      position: absolute;
      left: -0.3em;
      top: -0.1em;
      font-size: 3em;
      opacity: 0.15;
      font-family: Georgia, serif;
      line-height: 1;
    }
  `;
  document.head.appendChild(style);
}

function initBenefitsAnimation() {
  const benefitCards = document.querySelectorAll('.cf-benefit-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cf-animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  benefitCards.forEach(card => {
    observer.observe(card);
  });
}

function createNavigation() {
  const logoImg = document.querySelector('#lp-pom-image-144 img');
  const logoSrc = logoImg?.src || '';

  const hamburgerBtn = (
    <button className="cf-mobile-hamburger" onClick={(e) => {
      e.currentTarget.classList.toggle('cf-open');
      const overlay = document.querySelector('.cf-mobile-menu-overlay');
      overlay?.classList.toggle('cf-open');
    }}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );

  const mobileMenuOverlay = (
    <div className="cf-mobile-menu-overlay" onClick={(e) => {
      if (e.target === e.currentTarget || e.target.tagName === 'A') {
        e.currentTarget.classList.remove('cf-open');
        const hamburger = document.querySelector('.cf-mobile-hamburger');
        hamburger?.classList.remove('cf-open');
      }
    }}>
      <a href="#">About Us</a>
      <a href="#">Benefits</a>
      <a href="#">Science</a>
      <a href="#">Stories</a>
      <a href="#">Contact</a>
      <a href="https://memoryair.com/products/memory-air-device" className="cf-mobile-buy-btn">Buy Now</a>
    </div>
  );

  return (
    <nav className="cf:fixed cf:top-0 cf:left-0 cf:right-0 cf:z-[1000] cf:bg-transparent cf:px-8 cf:py-4">
      <div className="cf:max-w-7xl cf:mx-auto cf:flex cf:items-center cf:justify-between">
        {hamburgerBtn}

        <div className="cf:flex cf:items-center cf:gap-8">
          <a href="#" className="cf:text-[#333] cf:text-base cf:font-normal cf:no-underline cf:hover:text-black">About Us</a>
          <a href="#" className="cf:text-[#333] cf:text-base cf:font-normal cf:no-underline cf:hover:text-black">Benefits</a>
          <a href="#" className="cf:text-[#333] cf:text-base cf:font-normal cf:no-underline cf:hover:text-black">Science</a>
        </div>

        <div className="cf:flex-shrink-0">
          <img src={logoSrc} alt="Memory Air" className="cf:h-10 cf:brightness-0" />
        </div>

        <div className="cf:flex cf:items-center cf:gap-8">
          <a href="#" className="cf:text-[#333] cf:text-base cf:font-normal cf:no-underline cf:hover:text-black">Stories</a>
          <a href="#" className="cf:text-[#333] cf:text-base cf:font-normal cf:no-underline cf:hover:text-black">Contact</a>
          <a href="https://memoryair.com/products/memory-air-device" className="cf:bg-black cf:text-white cf:px-6 cf:py-3 cf:rounded-full cf:text-base cf:font-medium cf:no-underline cf:transition-all cf:hover:bg-[#333]">Buy Now</a>
        </div>
      </div>
      {mobileMenuOverlay}
    </nav>
  );
}

function createMainContainer() {
  return (
    <main className="cf:relative">
      <HeroSection />
      <KeyBenefitsSection />
      <ImproveMemorySection />
      <WhyMemoryAirSection />
      <ExpertsSection />
      <WhatIsDeviceSection />
      <WhatsIncludedSection />
      <MediaCoverageSection />
      <FooterCTASection />
    </main>
  );
}

function HeroSection() {
  const bgImage = 'https://cdn.coframe.com/assets/memoryair/artwork-c5ed34ff-b659-4b3f-b2db-453912487afa.webp';

  return (
    <section
      className="cf:relative cf:min-h-screen cf:flex cf:items-start cf:justify-center cf:pt-40 cf:pb-16 cf:px-8 cf:bg-cover cf:bg-center cf:bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')`, paddingTop: '160px' }}
    >
      <div className="cf:max-w-6xl cf:mx-auto cf:text-center">
        <h1 className="cf:text-5xl cf:lg:text-6xl cf:font-bold cf:text-black cf:mb-6 cf:tracking-tight cf:leading-tight">
          BIGGEST IMPROVEMENT OF HUMAN<br />MEMORY EVER DISCOVERED
        </h1>

        <p className="cf:text-lg cf:lg:text-xl cf:text-[#666] cf:max-w-3xl cf:mx-auto cf:leading-relaxed">
          Clinically designed to help your brain rest, recover, and perform better every morning.
        </p>
      </div>
    </section>
  );
}

function KeyBenefitsSection() {
  const benefits = [
    {
      icon: BrainIcon,
      title: 'Memory Retention',
      description: 'Scientifically proven to enhance memory by up to 300% through nightly scent therapy.'
    },
    {
      icon: MoonIcon,
      title: 'Deep Sleep Quality',
      description: 'Promotes restorative sleep cycles, allowing your brain to consolidate memories naturally.'
    },
    {
      icon: WindIcon,
      title: 'Smart Airflow Technology',
      description: 'Whisper-quiet operation delivers precise scent distribution throughout the night.'
    },
    {
      icon: LightningIcon,
      title: 'Morning Energy',
      description: 'Wake up feeling refreshed, focused, and ready to tackle your day with mental clarity.'
    }
  ];

  return (
    <section className="cf:bg-gradient-to-b cf:from-[#f9fafb] cf:to-[#ffffff] cf:py-24 cf:px-8">
      <div className="cf:max-w-7xl cf:mx-auto">
        <div className="cf:text-center cf:mb-16">
          <h2 className="cf:text-4xl cf:font-bold cf:mb-4 cf:text-black">Why MemoryAir Works</h2>
          <p className="cf:text-lg cf:text-[#6b7280] cf:max-w-3xl cf:mx-auto cf:leading-relaxed">
            Designed by neuroscientists and sleep experts, MemoryAir combines scent-based therapy with smart airflow technology to naturally enhance cognitive health.
          </p>
        </div>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:lg:grid-cols-4 cf:gap-8">
          {benefits.map((benefit, index) => (
            <KeyBenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KeyBenefitCard({ icon: Icon, title, description }) {
  return (
    <div className="cf-benefit-card cf:bg-white cf:rounded-xl cf:p-8 cf:transition-all cf:duration-300 cf:hover:-translate-y-1 cf:shadow-sm cf:hover:shadow-md">
      <div className="cf:flex cf:justify-center cf:mb-6">
        <Icon />
      </div>
      <h3 className="cf:text-xl cf:font-bold cf:mb-3 cf:text-center cf:text-black" style={{ fontFamily: "'Bellota Text', Arial, sans-serif" }}>
        {title}
      </h3>
      <p className="cf:text-sm cf:text-[#6b7280] cf:text-center cf:leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
        {description}
      </p>
    </div>
  );
}

function BrainIcon() {
  return <div style={{ fontSize: '40px', lineHeight: 1 }}>🧠</div>;
}

function MoonIcon() {
  return <div style={{ fontSize: '40px', lineHeight: 1 }}>🌙</div>;
}

function WindIcon() {
  return <div style={{ fontSize: '40px', lineHeight: 1 }}>💨</div>;
}

function LightningIcon() {
  return <div style={{ fontSize: '40px', lineHeight: 1 }}>⚡</div>;
}

function ImproveMemorySection() {
  const benefits = [
    {
      title: 'Feel Sharper',
      description: 'Clearer mind and more confidence.',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/qoa11f-memoryair2-hero-004-05_108v06v08v06e00000801o.jpg'
    },
    {
      title: 'Feel Younger',
      description: 'People reported feeling 4-6 years younger while on Neuro Scent Therapy',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/12dh2wb-memoryair2-hero-004-01_108w06v00000000000001o.jpg'
    },
    {
      title: 'Feel More Focused',
      description: 'Reclaimed focus for the moments that matter',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1yowopv-memoryair2-hero-004-04_108v06v08v06e00000801o.jpg'
    }
  ];

  return (
    <section className="cf:bg-gradient-to-b cf:from-white cf:to-[#f8f9fa] cf:py-20 cf:px-8">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:mb-4">IMPROVE MEMORY</h2>
        <div className="cf-heading-underline cf:mb-6"></div>
        <p className="cf:text-lg cf:text-center cf:text-[#666] cf:mb-16 cf:max-w-3xl cf:mx-auto">
          Neuro Scent Therapy has shown improvements of <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>226%</span> in healthy adults and <span style={{ color: '#10b981', fontWeight: 'bold' }}>300%</span> in patients with dementia
        </p>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ title, description, image }) {
  return (
    <div className="cf:bg-white cf:rounded-lg cf:overflow-hidden cf:shadow-md cf:hover:shadow-lg cf:transition-shadow">
      <div className="cf:aspect-square cf:bg-gray-200">
        <img src={image} alt={title} className="cf:w-full cf:h-full cf:object-cover" />
      </div>
      <div className="cf:p-6">
        <h3 className="cf:text-2xl cf:font-bold cf:mb-3">{title}</h3>
        <p className="cf:text-[#666] cf:leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function WhyMemoryAirSection() {
  const features = [
    {
      text: 'Based upon 16 years of neuroscience research',
      icon: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/ftj9pv-neuroscience-icon_102l02l000000000000028.png'
    },
    {
      text: 'Created by a "Top 2% Scientist" in the world',
      icon: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/m74gzg-neuroscience-icon-1_102l02l000000000000028.png'
    },
    {
      text: 'No Drugs, No Side Effects',
      icon: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1idhu6l-neuroscience-icon-2_102l02l000000000000028.png'
    },
    {
      text: 'Tracks your Progress',
      icon: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1ajris1-neuroscience-icon-3_102l02l000000000000028.png'
    }
  ];

  return (
    <section className="cf:bg-[#f5f5f5] cf:py-20 cf:px-8">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:mb-16">Why Memory Air™?</h2>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-8 cf:max-w-4xl cf:mx-auto">
          {features.map((feature, index) => (
            <FeatureBox key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBox({ text, icon }) {
  return (
    <div className="cf:bg-white cf:rounded-lg cf:p-8 cf:text-center cf:shadow-sm cf:hover:shadow-md cf:transition-shadow">
      <div className="cf:mb-4 cf:flex cf:justify-center">
        <img src={icon} alt="" className="cf:h-16 cf:w-16 cf:object-contain" />
      </div>
      <p className="cf:text-lg cf:text-[#333]">{text}</p>
    </div>
  );
}

function ExpertsSection() {
  const testimonials = [
    {
      quote: '"...Can improve memory by up to 300%, much better than drugs."',
      expert: 'Professor Emerita Dr. Amy Borenstein, USF, UCSD',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1d8cuh9-image-5-1_108w05600000000000001o.jpg'
    },
    {
      quote: '"...Significantly improved memory."',
      expert: 'Associate Professor Dr. Lorene Nelson, Stanford School of Medicine',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/a3hzzj-oldlady.webp'
    },
    {
      quote: '"...Improved memory...No Side Effects."',
      expert: 'Professor Emeritus Dr. James Mortimer, USF, World Expert in Alzheimer\'s',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/80ze7u-image-7-6202d12f-1930-4044-b708-cf18179114f4.webp'
    },
    {
      quote: '"...Convincing Evidence!"',
      expert: 'Professor Emeritus Dr. David Thom, Stanford School of Medicine',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/7naimq-group.webp'
    },
    {
      quote: '"...Truly Impressive!"',
      expert: 'Professor Emeritus Dr. Edward Abramson, CSUC',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/jfmfc6-oldman.webp'
    },
    {
      quote: '"...A transformative impact!"',
      expert: 'Nancy Wassom Bernstein, RN, MS, Nurse Practitioner',
      image: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/14h8jw-nancy.webp'
    }
  ];

  const colors = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];

  return (
    <section className="cf:bg-gradient-to-b cf:from-[#f8f9fa] cf:to-white cf:py-20 cf:px-8">
      <div className="cf:max-w-7xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:mb-4">THE EXPERTS LOVE MEMORY AIR™</h2>
        <div className="cf-heading-underline cf:mb-16"></div>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:lg:grid-cols-3 cf:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} color={colors[index % colors.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, expert, image, color }) {
  return (
    <div
      className="cf-testimonial-card cf:bg-white cf:border cf:border-gray-200 cf:rounded-lg cf:p-6 cf:shadow-sm cf:relative"
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: color,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${color}33, 0 8px 10px -6px ${color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
      }}
    >
      <div className="cf:mb-4 cf:aspect-square cf:bg-gray-100 cf:rounded-xl cf:overflow-hidden">
        <img src={image} alt={expert} className="cf:w-full cf:h-full cf:object-cover" />
      </div>
      <p
        className="cf-quote-mark cf:font-bold cf:mb-3"
        style={{
          color: color,
          fontSize: '1.375rem',
          lineHeight: '1.75rem'
        }}
      >
        {quote}
      </p>
      <div
        className="cf:pt-3"
        style={{
          borderTopWidth: '2px',
          borderTopColor: color
        }}
      >
        <p className="cf:text-sm cf:text-[#666] cf:font-semibold">{expert}</p>
      </div>
    </div>
  );
}

function WhatIsDeviceSection() {
  const points = [
    'Everyone knows scents bring back memories',
    'Our NEW science has discovered scents also control memory',
    'Smelling different scents has been clinically shown to improve your sense of smell.',
    'Improving your sense of smell greatly improves your memory',
    'The Memory Air™ device emits 40 pleasant scents twice nightly',
    'The rotation of scents improves your sense of smell, which improves your memory by up to 300%'
  ];

  return (
    <section className="cf:bg-[#f5f5f5] cf:py-20 cf:px-8">
      <div className="cf:max-w-4xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:mb-12">What Is the Memory Air™ device?</h2>

        <ul className="cf:space-y-4">
          {points.map((point, index) => (
            <li key={index} className="cf:flex cf:items-start cf:text-lg cf:text-[#333]">
              <span className="cf:mr-4 cf:text-2xl cf:text-black">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhatsIncludedSection() {
  const deviceImage = '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/19b3as-1-memory-air-device-2_108w08w000000000000028.png';

  return (
    <section className="cf:bg-white cf:py-20 cf:px-8">
      <div className="cf:max-w-6xl cf:mx-auto">
        <h2 className="cf:text-4xl cf:font-bold cf:text-center cf:mb-12">What's Included?</h2>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-12 cf:items-center">
          <div className="cf:flex cf:justify-center">
            <img src={deviceImage} alt="Memory Air Device" className="cf:max-w-md cf:w-full" />
          </div>

          <div>
            <ul className="cf:space-y-4 cf:text-lg">
              <li className="cf:flex cf:items-start">
                <span className="cf:mr-4 cf:text-2xl cf:text-black">•</span>
                <span>Memory Air™ Device</span>
              </li>
              <li className="cf:flex cf:items-start">
                <span className="cf:mr-4 cf:text-2xl cf:text-black">•</span>
                <span>Auto shipped refills to ensure maximum therapy potency</span>
              </li>
              <li className="cf:flex cf:items-start">
                <span className="cf:mr-4 cf:text-2xl cf:text-black">•</span>
                <span>Better Memory and Less Brain Fog</span>
              </li>
              <li className="cf:flex cf:items-start">
                <span className="cf:mr-4 cf:text-2xl cf:text-black">•</span>
                <span>100% Satisfaction Guaranteed - 60 Day No questions asked money back guarantee</span>
              </li>
            </ul>

            <div className="cf:mt-8">
              <a
                href="https://memoryair.com/products/memory-air-device"
                className="cf:inline-block cf:bg-black cf:text-white cf:px-8 cf:py-4 cf:rounded-full cf:text-lg cf:font-semibold cf:no-underline cf:transition-all cf:hover:bg-[#333]"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaCoverageSection() {
  const mediaLogos = [
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1wwas6w-scientific-american-logo-svg_108w02g000000000000028.png', alt: 'Scientific American' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/712cb97b-medscape-logo.svg', alt: 'Medscape' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/19qwwf2-new-york-times-logo_103w02x03w00p000014028.png', alt: 'NY Times' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1t3elgv-psychology-today-logo-vector-svg-_104s01203x01200f000028.png', alt: 'Psychology Today' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/jgysvl-verywell-logo_103z01703z00r000008028.png', alt: 'Verywell' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/3y5of0-mj-primary-header-logo-standard_108w02c000000000000028.png', alt: 'Medical Journal' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/146pdk2-npr-symbol_102x01n02x01b000006028.png', alt: 'NPR' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/1qs9rul-newsmax-logo-svg_108f01b02x01b02r000028.png', alt: 'Newsmax' },
    { src: '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/19rp0j2-frontiers-in-neuroscience_108w02m000000000000028.png', alt: 'Frontiers' }
  ];

  return (
    <section className="cf:bg-[#f5f0e6] cf:py-20 cf:px-8">
      <div className="cf:max-w-7xl cf:mx-auto">
        <p className="cf:text-center cf:text-lg cf:font-semibold cf:italic cf:mb-12 cf:text-[#333]">
          Reported in hundreds of articles, programs, and podcasts.
        </p>

        <div className="cf:overflow-hidden cf:relative">
          <div className="cf-carousel-track cf:flex cf:gap-12 cf:items-center">
            {[...mediaLogos, ...mediaLogos].map((logo, index) => (
              <div key={index} className="cf:flex-shrink-0 cf:flex cf:justify-center cf:items-center cf:px-8">
                <img src={logo.src} alt={logo.alt} className="cf:max-h-12 cf:w-auto cf:object-contain cf:grayscale cf:opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCTASection() {
  return (
    <section className="cf:bg-[#1a1a1a] cf:text-white cf:py-20 cf:px-8">
      <div className="cf:max-w-4xl cf:mx-auto cf:text-center">
        <h2 className="cf:text-4xl cf:font-bold cf:mb-6">Take Control of Your Wellness Today</h2>
        <p className="cf:text-lg cf:text-gray-300 cf:mb-12 cf:leading-relaxed">
          Join thousands who have improved their memory with the Memory Air device. Order now and start living your healthiest life—one scent at a time.
        </p>

        <a
          href="https://memoryair.com/products/memory-air-device"
          className="cf:inline-block cf:bg-white cf:text-black cf:px-12 cf:py-4 cf:rounded-full cf:text-lg cf:font-semibold cf:no-underline cf:transition-all cf:hover:bg-gray-200 cf:mb-16"
        >
          Buy Now
        </a>

        <div className="cf:flex cf:justify-center cf:gap-6 cf:mb-12">
          <a href="#" className="cf:transition-opacity cf:hover:opacity-80">
            <img src="//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/2ff50fcd-social-icons-21.svg" alt="Social" className="cf:h-8 cf:w-8" />
          </a>
          <a href="#" className="cf:transition-opacity cf:hover:opacity-80">
            <img src="//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/fc50a204-social-icons-23.svg" alt="Social" className="cf:h-8 cf:w-8" />
          </a>
        </div>

        <div className="cf:flex cf:justify-center cf:gap-8 cf:text-sm">
          <a href="#" className="cf:text-gray-400 cf:hover:text-white cf:no-underline">Privacy Policy</a>
          <a href="#" className="cf:text-gray-400 cf:hover:text-white cf:no-underline">Terms of Service</a>
        </div>
      </div>
    </section>
  );
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
