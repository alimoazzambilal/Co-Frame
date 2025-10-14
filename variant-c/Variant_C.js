let testInfo = {
  name: `CF Test - [Homepage]: Redesign Customer Stories Section (Direct Execution)`,
};

console.log('[CF] Variant starting...', testInfo);

let testInitiated = initTest(testInfo);
if (!testInitiated) {
  console.log('[CF] Test already running, exiting...');
  return false;
}

console.log('[CF] Test initialized successfully');

addStyling();

setTimeout(() => {
  console.log('[CF] Starting execution after 2s delay');
  try {
    executeVariant();
  } catch (error) {
    console.error('[CF] Fatal error during variant execution:', error);
  }
}, 2000);

function executeVariant() {
  console.log('[CF] executeVariant called');
  
  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('cf-test-active', testInfo.name);
    console.log('[CF] Body marked as cf-test-active');
  }
  
  console.log('[CF] Step 1: Finding target section');
  const allH2s = document.querySelectorAll('h2.headline-l');
  console.log('[CF] Found h2.headline-l elements:', allH2s.length);
  
  let heading = null;
  for (let i = 0; i < allH2s.length; i++) {
    const h2 = allH2s[i];
    const text = h2.textContent || '';
    console.log('[CF] Checking h2 text:', text.substring(0, 50));
    if (text.includes('What would you do with more time')) {
      heading = h2;
      break;
    }
  }
  
  if (!heading) {
    console.error('[CF] Target heading not found');
    return;
  }
  console.log('[CF] Target heading found:', heading.textContent);
  
  const section = heading.closest('section');
  if (!section) {
    console.error('[CF] Parent section not found');
    return;
  }
  console.log('[CF] Parent section found');
  
  console.log('[CF] Step 2: Updating section header');
  const headerContainer = section.querySelector('.space-y-8.text-center');
  if (!headerContainer) {
    console.error('[CF] Header container not found');
    return;
  }
  
  const h2 = headerContainer.querySelector('h2');
  const p = headerContainer.querySelector('p');
  
  if (h2) {
    h2.textContent = 'Customer Stories';
    console.log('[CF] H2 updated');
  }
  if (p) {
    p.textContent = 'See how Ramp helps businesses save time and money.';
    console.log('[CF] P updated');
  }
  
  console.log('[CF] Step 3: Adding star rating');
  const starRatingContainer = createStarRating();
  const parentForRating = p ? p.parentElement : null;
  if (parentForRating) {
    parentForRating.appendChild(starRatingContainer);
    console.log('[CF] Star rating added');
  } else {
    console.warn('[CF] Could not find parent for star rating');
  }
  
  console.log('[CF] Step 4: Rearranging customer cards');
  
  const allDivs = section.querySelectorAll('div');
  let gridContainer = null;
  for (let i = 0; i < allDivs.length; i++) {
    const div = allDivs[i];
    if (div.classList.contains('mx-auto') && div.className.includes('max-w-')) {
      gridContainer = div;
      break;
    }
  }
  
  if (!gridContainer) {
    console.error('[CF] Grid container not found');
    return;
  }
  console.log('[CF] Grid container found');
  
  const cardListContainer = gridContainer.querySelector('section[role="region"] > div.flex');
  if (!cardListContainer) {
    console.error('[CF] Card list container not found');
    return;
  }
  console.log('[CF] Card list container found');
  
  cardListContainer.style.transform = 'none';
  const cardListParent = cardListContainer.parentElement;
  if (cardListParent) {
    cardListParent.style.overflow = 'visible';
  }
  console.log('[CF] Slider disabled');
  
  const cards = Array.from(cardListContainer.querySelectorAll('div[role="group"]'));
  console.log('[CF] Found cards:', cards.length);
  
  if (cards.length >= 5) {
    const featuredCard = cards[0];
    const otherCards = cards.slice(1, 5);
    
    const smallCardsWrapper = document.createElement('div');
    smallCardsWrapper.className = 'cf-small-cards-grid';
    for (let i = 0; i < otherCards.length; i++) {
      smallCardsWrapper.appendChild(otherCards[i]);
    }
    console.log('[CF] Small cards wrapper created with', otherCards.length, 'cards');
    
    while (cardListContainer.firstChild) {
      cardListContainer.removeChild(cardListContainer.firstChild);
    }
    cardListContainer.appendChild(featuredCard);
    cardListContainer.appendChild(smallCardsWrapper);
    console.log('[CF] Cards reordered');
    
    cardListContainer.classList.add('cf-stories-grid-container');
    featuredCard.classList.add('cf-featured-card');
    console.log('[CF] CSS classes added');
  } else {
    console.warn('[CF] Not enough cards found:', cards.length);
  }
  
  console.log('[CF] Step 5: Hiding slider navigation');
  const sliderNav = gridContainer.querySelector('.absolute.inset-0');
  if (sliderNav) {
    sliderNav.style.display = 'none';
    console.log('[CF] Slider nav hidden');
  } else {
    console.warn('[CF] Slider nav not found');
  }
  
  const sliderDots = gridContainer.querySelector('.flex.flex-wrap.items-center.justify-center');
  if (sliderDots) {
    sliderDots.style.display = 'none';
    console.log('[CF] Slider dots hidden');
  } else {
    console.warn('[CF] Slider dots not found');
  }
  
  console.log('[CF] Step 6: Moving and updating CTA');
  const ctaLink = headerContainer ? headerContainer.querySelector('a[href="/customers"]') : null;
  const ctaWrapper = ctaLink ? ctaLink.parentElement : null;
  
  if (ctaWrapper && gridContainer) {
    gridContainer.insertAdjacentElement('afterend', ctaWrapper);
    console.log('[CF] CTA moved');
    
    ctaWrapper.className = 'cf:mt-10 cf:text-center cf:lg:mt-12';
    
    if (ctaLink) {
      ctaLink.className = 'cf:group/link cf:text-black/60 cf:hover:text-black cf:items-center cf:gap-2 cf:inline-flex cf:text-base';
      
      const existingIcon = ctaLink.querySelector('div');
      if (existingIcon) {
        existingIcon.remove();
        console.log('[CF] Existing icon removed');
      }
      
      const arrowIcon = createArrowIcon();
      ctaLink.appendChild(arrowIcon);
      console.log('[CF] CTA restyled with arrow icon');
    }
  } else {
    console.warn('[CF] Could not find CTA elements');
  }
  
  console.log('[CF] Step 7: Hiding original 5-star rating section');
  const allFlexCentered = document.querySelectorAll('.flex.flex-col.items-center.justify-center.space-y-2.text-center');
  for (let i = 0; i < allFlexCentered.length; i++) {
    const container = allFlexCentered[i];
    const text = container.textContent || '';
    if (text.includes('5 star rating') && text.includes('2,000+ reviews')) {
      container.style.display = 'none';
      console.log('[CF] Original 5-star rating section hidden');
      break;
    }
  }
  
  console.log('[CF] Step 8: Redesigning enterprises section');
  const allH2sEnterprise = document.querySelectorAll('h2.headline-l');
  let enterpriseHeading = null;
  for (let i = 0; i < allH2sEnterprise.length; i++) {
    const h2 = allH2sEnterprise[i];
    const text = h2.textContent || '';
    if (text.includes('For startups, global enterprises')) {
      enterpriseHeading = h2;
      break;
    }
  }
  
  if (enterpriseHeading) {
    const enterpriseSection = enterpriseHeading.closest('section');
    if (enterpriseSection) {
      const gridContainerEnterprise = enterpriseSection.querySelector('.grid.gap-5');
      if (gridContainerEnterprise) {
        let originalAnimation = null;
        const allCards = gridContainerEnterprise.querySelectorAll('.flex.w-full');
        for (let i = 0; i < allCards.length; i++) {
          const card = allCards[i];
          const headline = card.querySelector('.body-l, .leading-trim');
          if (headline && headline.textContent && headline.textContent.includes('Completely flexible')) {
            const mediaElement = card.querySelector('.relative.h-auto.overflow-hidden, .KbCard_kbcard-media__dLoGD');
            if (mediaElement) {
              originalAnimation = mediaElement.cloneNode(true);
              console.log('[CF] Original animation extracted');
              break;
            }
          }
        }
        
        const newLayout = createEnterpriseCardLayout(originalAnimation);
        gridContainerEnterprise.replaceWith(newLayout);
        console.log('[CF] Enterprise section redesigned with original animation');
      }
    }
  } else {
    console.warn('[CF] Enterprise section heading not found');
  }
  
  console.log('[CF] All changes completed successfully');
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
  console.log('[CF] variantRendered event emitted');
}

function createEnterpriseCardLayout(originalAnimation) {
  const cardSets = [
    [
      { title: 'Startups', category: 'SOFTWARE & TECHNOLOGY', segment: 'EARLY STAGE', bgImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop' },
      { title: 'Enterprise', category: 'FINANCIAL SERVICES', segment: 'GLOBAL', bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' }
    ],
    [
      { 
        title: 'An extension of your team.', 
        description: 'Get dedicated support anytime, anywhere. We\'re always ready to help.',
        bgImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop'
      },
      { 
        title: 'Operate globally.', 
        description: 'Send payments to 195 countries in over 40 currencies and reimburse employees in their local currencies within 2 days.',
        bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
      }
    ]
  ];
  
  let currentSet = 1;
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'cf-nav-prev cf:w-12 cf:h-12 cf:rounded-full cf:bg-white cf:border-2 cf:border-gray-800 cf:flex cf:items-center cf:justify-center cf:transition-all cf:hover:bg-gray-100 cf:shadow-md cf:relative cf:z-50';
  prevBtn.style.position = 'relative';
  prevBtn.style.zIndex = '999';
  
  const prevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  prevSvg.setAttribute('width', '24');
  prevSvg.setAttribute('height', '24');
  prevSvg.setAttribute('viewBox', '0 0 24 24');
  prevSvg.setAttribute('fill', 'none');
  prevSvg.style.display = 'block';
  prevSvg.style.pointerEvents = 'none';
  
  const prevPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  prevPath.setAttribute('d', 'M15 18L9 12L15 6');
  prevPath.setAttribute('stroke', '#000000');
  prevPath.setAttribute('stroke-width', '3');
  prevPath.setAttribute('stroke-linecap', 'round');
  prevPath.setAttribute('stroke-linejoin', 'round');
  
  prevSvg.appendChild(prevPath);
  prevBtn.appendChild(prevSvg);
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'cf-nav-next cf:w-12 cf:h-12 cf:rounded-full cf:bg-black cf:border-2 cf:border-black cf:flex cf:items-center cf:justify-center cf:transition-all cf:hover:bg-gray-800 cf:shadow-md cf:relative cf:z-50';
  nextBtn.style.position = 'relative';
  nextBtn.style.zIndex = '999';
  
  const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nextSvg.setAttribute('width', '24');
  nextSvg.setAttribute('height', '24');
  nextSvg.setAttribute('viewBox', '0 0 24 24');
  nextSvg.setAttribute('fill', 'none');
  nextSvg.style.display = 'block';
  nextSvg.style.pointerEvents = 'none';
  
  const nextPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  nextPath.setAttribute('d', 'M9 18L15 12L9 6');
  nextPath.setAttribute('stroke', '#FFFFFF');
  nextPath.setAttribute('stroke-width', '3');
  nextPath.setAttribute('stroke-linecap', 'round');
  nextPath.setAttribute('stroke-linejoin', 'round');
  
  nextSvg.appendChild(nextPath);
  nextBtn.appendChild(nextSvg);
  
  const container = (
    <div className="cf:relative cf:mt-12">
      <div className="cf:flex cf:flex-col cf:gap-6 cf:lg:flex-row">
        <div className="cf:flex-1 cf:min-h-[400px]">
          {createFeaturedCard(originalAnimation)}
        </div>
        
        <div className="cf-cards-container cf:w-full cf:lg:w-[400px] cf:flex cf:flex-col cf:gap-6">
          {createSmallCard(cardSets[currentSet][0])}
          {createSmallCard(cardSets[currentSet][1])}
        </div>
      </div>
      
      <div className="cf:flex cf:justify-end cf:gap-3 cf:mt-6">
      </div>
    </div>
  );
  
  const navContainer = container.querySelector('.cf\\:flex.cf\\:justify-end');
  if (navContainer) {
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
  }
  
  setTimeout(() => {
    const cardsContainer = document.querySelector('.cf-cards-container');
    
    if (prevBtn && nextBtn && cardsContainer) {
      prevBtn.addEventListener('click', () => {
        currentSet = currentSet === 0 ? 1 : 0;
        updateCards(cardsContainer, cardSets[currentSet]);
      });
      
      nextBtn.addEventListener('click', () => {
        currentSet = currentSet === 1 ? 0 : 1;
        updateCards(cardsContainer, cardSets[currentSet]);
      });
    }
  }, 100);
  
  return container;
}

function updateCards(container, cards) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.style.opacity = '0';
  setTimeout(() => {
    cards.forEach(cardData => {
      container.appendChild(createSmallCard(cardData));
    });
    container.style.opacity = '1';
    container.style.transition = 'opacity 300ms ease-in-out';
  }, 150);
}

function createFeaturedCard(originalAnimation) {
  const learnMoreBtn = document.createElement('button');
  learnMoreBtn.className = 'cf:inline-flex cf:items-center cf:gap-3 cf:pl-6 cf:pr-2 cf:py-2 cf:bg-black cf:text-white cf:rounded-full cf:transition-all cf:hover:opacity-90';
  
  const btnText = document.createElement('span');
  btnText.className = 'cf:font-medium cf:text-sm';
  btnText.textContent = 'Learn More';
  
  const iconCircle = document.createElement('div');
  iconCircle.className = 'cf:w-8 cf:h-8 cf:rounded-full cf:bg-white cf:flex cf:items-center cf:justify-center';
  
  const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrowSvg.setAttribute('width', '16');
  arrowSvg.setAttribute('height', '16');
  arrowSvg.setAttribute('viewBox', '0 0 16 16');
  arrowSvg.setAttribute('fill', 'none');
  arrowSvg.style.display = 'block';
  
  const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrowPath.setAttribute('d', 'M3 8h10m0 0l-4-4m4 4l-4 4');
  arrowPath.setAttribute('stroke', '#000000');
  arrowPath.setAttribute('stroke-width', '2');
  arrowPath.setAttribute('stroke-linecap', 'round');
  arrowPath.setAttribute('stroke-linejoin', 'round');
  
  arrowSvg.appendChild(arrowPath);
  iconCircle.appendChild(arrowSvg);
  learnMoreBtn.appendChild(btnText);
  learnMoreBtn.appendChild(iconCircle);
  
  return (
    <div className="cf-enterprise-card cf:relative cf:h-full cf:rounded-2xl cf:overflow-hidden cf:bg-black">
      {/* Background image */}
      <div 
        className="cf:absolute cf:inset-0 cf:bg-cover cf:bg-center cf:transition-transform cf:duration-700 cf:hover:scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop)' }}
      />
      
      {/* Dark gradient overlay */}
      <div className="cf:absolute cf:inset-0 cf:bg-gradient-to-br cf:from-black/70 cf:via-black/60 cf:to-black/50" />
      
      {/* Text content */}
      <div className="cf:relative cf:z-10 cf:flex cf:flex-col cf:justify-between cf:h-full cf:p-8 cf:lg:p-12">
        <div>
          <h3 className="cf:text-3xl cf:lg:text-4xl cf:font-normal cf:mb-4 cf:leading-tight cf:text-white">
            Completely flexible.
          </h3>
          <p className="cf:text-base cf:text-white/90 cf:mb-8 cf:max-w-[500px]">
            Customize Ramp to fit your business and give you the controls you need with policies, roles, and approval workflows.
          </p>
          
          <div className="cf:flex cf:items-center cf:gap-4">
            {learnMoreBtn}
          </div>
        </div>
      </div>
      
      {/* Large logo watermark in bottom right */}
      <div className="cf:absolute cf:bottom-8 cf:right-8 cf:opacity-[0.15] cf:pointer-events-none">
        <svg width="300" height="80" viewBox="0 0 300 80" fill="none">
          <text x="0" y="60" fontSize="80" fontWeight="500" fontFamily="lausanne, sans-serif" fill="#FFFFFF">
            ramp
          </text>
        </svg>
      </div>
    </div>
  );
}

function createSmallCard(props) {
  const { title, category, segment, description, bgImage } = props;
  
  return (
    <div className="cf-enterprise-card cf:relative cf:h-[250px] cf:rounded-2xl cf:overflow-hidden cf:group cf:cursor-pointer">
      <div 
        className="cf:absolute cf:inset-0 cf:bg-cover cf:bg-center cf:transition-transform cf:duration-700 cf:group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="cf:absolute cf:inset-0 cf:bg-gradient-to-t cf:from-black/85 cf:via-black/50 cf:to-transparent" />
      
      <div className="cf:relative cf:h-full cf:p-6 cf:flex cf:flex-col cf:justify-between cf:text-white">
        <div className="cf:flex cf:items-start cf:justify-between">
          <div className="cf:flex-1">
            <h4 className="cf:text-2xl cf:font-normal cf:tracking-wide cf:mb-2">
              {title}
            </h4>
            {description && (
              <p className="cf:text-sm cf:text-white/90 cf:leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {category && segment && (
          <div className="cf:flex cf:flex-col cf:gap-2">
            <span className="cf:inline-block cf:w-fit cf:px-3 cf:py-1.5 cf:text-[10px] cf:font-medium cf:tracking-widest cf:uppercase cf:bg-white/20 cf:backdrop-blur-sm cf:rounded-full">
              {category}
            </span>
            <span className="cf:inline-block cf:w-fit cf:px-3 cf:py-1.5 cf:text-[10px] cf:font-medium cf:tracking-widest cf:uppercase cf:bg-white/20 cf:backdrop-blur-sm cf:rounded-full">
              {segment}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function createStarRating() {
  console.log('[CF] Creating star rating component');
  const container = document.createElement('div');
  container.className = 'cf:flex cf:items-center cf:justify-center cf:gap-4 cf:pt-2';
  
  const starsContainer = document.createElement('div');
  starsContainer.className = 'cf:flex cf:gap-1';
  
  for (let i = 0; i < 5; i++) {
    const star = createStarIcon();
    starsContainer.appendChild(star);
  }
  
  const text = document.createElement('div');
  text.className = 'cf:leading-trim cf:body-m cf:text-black/60';
  
  const strongSpan = document.createElement('span');
  strongSpan.className = 'cf:text-black cf:font-medium';
  strongSpan.textContent = '5 stars';
  
  text.appendChild(strongSpan);
  text.appendChild(document.createTextNode(' from 2,000+ reviews'));
  
  container.appendChild(starsContainer);
  container.appendChild(text);
  
  return container;
}

function createStarIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.className = 'cf:text-[#FFB020]';
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z');
  
  svg.appendChild(path);
  return svg;
}

function createArrowIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '14');
  svg.setAttribute('height', '12');
  svg.setAttribute('viewBox', '0 0 14 12');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.className = 'cf:transition-transform cf:group-hover/link:translate-x-1';
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M8.508 1.058L12.94 5.51M12.94 5.51L8.508 9.97M12.94 5.51H0.992');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '1.5');
  
  svg.appendChild(path);
  return svg;
}

function addStyling() {
  console.log('[CF] Adding custom styles');
  const cssArray = [
    {
      desc: 'Customer Stories Grid Layout',
      css: `
        .cf-stories-grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 0;
        }

        .cf-small-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .cf-small-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .cf-stories-grid-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        .cf-featured-card > a > .group {
          aspect-ratio: auto !important;
          height: 100%;
        }

        .cf-stories-grid-container div[role="group"] > div.pointer-events-none {
          display: none !important;
        }
        
        .cf-stories-grid-container div[role="group"] {
          pointer-events: auto !important;
          opacity: 1 !important;
        }
        
        @media (max-width: 1023px) {
          .cf-stories-grid-container .group .absolute.inset-x-0.bottom-0 {
            opacity: 1 !important;
          }
          .cf-stories-grid-container .group .absolute.inset-0 {
            opacity: 1 !important;
          }
        }
        
        @media (min-width: 1024px) {
          /* Target stats overlay - default hidden */
          .cf-stories-grid-container div[role="group"] a .absolute.inset-x-0.bottom-0 {
            opacity: 0 !important;
            transition: opacity 300ms ease-in-out;
          }
          
          /* Target tags - default visible */
          .cf-stories-grid-container div[role="group"] a .relative.w-full > .flex.flex-col.gap-2 {
            opacity: 1 !important;
            transition: opacity 300ms ease-in-out;
          }
          
          /* Target gradient overlay - default hidden */
          .cf-stories-grid-container .bg-gradient-to-t.from-black {
            opacity: 0 !important;
            transition: opacity 300ms ease-in-out;
          }
          
          /* Hover: show stats */
          .cf-stories-grid-container div[role="group"] a:hover .absolute.inset-x-0.bottom-0 {
            opacity: 1 !important;
          }
          
          /* Hover: hide tags */
          .cf-stories-grid-container div[role="group"] a:hover .relative.w-full > .flex.flex-col.gap-2 {
            opacity: 0 !important;
          }
          
          /* Hover: show gradient - uses .group:hover not a:hover */
          .cf-stories-grid-container .group:hover .bg-gradient-to-t.from-black {
            opacity: 1 !important;
          }
        }
      `,
    },
    {
      desc: 'Enterprise Cards Layout',
      css: `
        .cf-enterprise-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .cf-enterprise-card:hover {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
        }
        
        .cf-animated-mockup {
          animation: cf-float 3s ease-in-out infinite;
        }
        
        @keyframes cf-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .cf-animated-mockup .cf\\:bg-green-500 {
          animation: cf-pulse 2s ease-in-out infinite;
        }
        
        @keyframes cf-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        
        .cf-animated-mockup button {
          position: relative;
          overflow: hidden;
        }
        
        .cf-animated-mockup button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          animation: cf-ripple 2s infinite;
        }
        
        @keyframes cf-ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          50% {
            width: 100px;
            height: 100px;
            opacity: 0.2;
          }
          100% {
            width: 150px;
            height: 150px;
            opacity: 0;
          }
        }
      `,
    },
  ];

  cssArray.forEach(function(item) {
    const newStyleElem = document.createElement('style');
    newStyleElem.dataset.desc = item.desc;
    newStyleElem.innerHTML = item.css;
    document.head.insertAdjacentElement('beforeend', newStyleElem);
  });
  console.log('[CF] Styles added');
}

function initTest() {
  console.log('[CF] Initializing test');
  const cfObj = window.CF || { qaTesting: false, testsRunning: [] };
  
  const alreadyRunning = cfObj.testsRunning.find(function(test) {
    return test.name === testInfo.name;
  });
  
  if (alreadyRunning) {
    console.warn('[CF] Test already running:', testInfo);
    return false;
  }
  
  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];
  window.CF = { ...window.CF, ...cfObj };
  
  console.log('[CF] Test initialized, running tests:', cfObj.testsRunning.length);
  return window.CF;
}