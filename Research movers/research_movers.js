// Test Configuration
let testInfo = {
  name: `CF - Spain Holidays: Add Blogs Navigation Link & Blog Cards Section`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// Track success
let allSuccess = true;

// Main Code - Execute directly without MutationObserver
applyVariant();

// === MAIN FUNCTIONS ===

function applyVariant() {
  console.log(`[${testInfo.name}] Starting variant application...`);
  
  try {
    // Set test active marker
    document.body?.setAttribute(`cf-test-active`, testInfo.name);

    // 1. Add Blogs navigation link
    try {
      addBlogsNavLink();
    } catch (e) {
      console.error(`[${testInfo.name}] Error adding Blogs nav link:`, e);
      allSuccess = false;
    }

    // 2. Create and inject blog cards section
    try {
      createBlogCardsSection();
    } catch (e) {
      console.error(`[${testInfo.name}] Error creating blog cards section:`, e);
      allSuccess = false;
    }

    // 3. Initialize blog page renderer
    try {
      initializeBlogPageRenderer();
    } catch (e) {
      console.error(`[${testInfo.name}] Error initializing blog renderer:`, e);
      allSuccess = false;
    }

    // Add styling
    try {
      addStyling();
    } catch (e) {
      console.error(`[${testInfo.name}] Error adding styling:`, e);
      allSuccess = false;
    }

    // Inform Coframe SDK variant has successfully finished rendering
    // Only emit if all operations succeeded
    if (allSuccess) {
      window.CFQ = window.CFQ || [];
      window.CFQ.push({ emit: 'variantRendered' });
      console.log(`[${testInfo.name}] Variant rendering complete - event emitted`);
    } else {
      console.error(`[${testInfo.name}] Variant had errors, not emitting variantRendered`);
    }
  } catch (e) {
    console.error(`[${testInfo.name}] Critical error in applyVariant:`, e);
    allSuccess = false;
  }
}

function addBlogsNavLink() {
  const navList = document.querySelector('.oh-navigation-l1');
  if (!navList) {
    throw new Error('Navigation list not found');
  }

  // Find the Extras item
  const extrasLink = Array.from(navList.querySelectorAll('a')).find(el => 
    el.textContent?.trim() === 'Extras'
  );
  
  if (!extrasLink) {
    throw new Error('Extras link not found');
  }

  const extrasLi = extrasLink.closest('li');
  if (!extrasLi) {
    throw new Error('Extras list item not found');
  }

  // Check if Blogs already exists
  const blogsAlreadyExists = Array.from(navList.querySelectorAll('a')).some(el => 
    el.textContent?.trim() === 'Blogs'
  );
  
  if (blogsAlreadyExists) {
    console.log(`[${testInfo.name}] Blogs link already exists`);
    return;
  }

  // Create Blogs link
  const blogsLi = document.createElement('li');
  blogsLi.setAttribute('role', 'button');

  const blogsLink = document.createElement('a');
  blogsLink.href = '#cf-blog-section';
  blogsLink.setAttribute('role', 'button');
  blogsLink.className = 'js-nav-link';

  const blogsSpan = document.createElement('span');
  blogsSpan.className = 'openmfe-analytics';

  // Create icon element
  const blogIcon = document.createElement('img');
  blogIcon.src = 'https://cdn.coframe.com/assets/tui/news-stroke-rounded-fc725619-cd43-42fb-9c01-1ddf72c9bf4c.webp';
  blogIcon.alt = '';
  blogIcon.className = 'mobile-ssg-header';
  blogIcon.width = 24;
  blogIcon.height = 24;

  // Append icon and text to span
  blogsSpan.appendChild(blogIcon);
  const textNode = document.createTextNode('Blogs');
  blogsSpan.appendChild(textNode);

  blogsLink.appendChild(blogsSpan);
  blogsLi.appendChild(blogsLink);

  extrasLi.insertAdjacentElement('beforebegin', blogsLi);
  console.log(`[${testInfo.name}] Blogs navigation link with icon added`);
}

function createBlogCardsSection() {
  // Find Facts About Spain section
  const factsSection = document.querySelector('.facts-about');
  if (!factsSection) {
    throw new Error('Facts About Spain section not found');
  }

  // Create the blog section with modal
  const blogSection = createBlogSectionHTML();
  
  // Insert after facts section
  const factsSectionParent = factsSection.closest('.container') || factsSection.parentElement;
  if (!factsSectionParent) {
    throw new Error('Facts section parent not found');
  }

  factsSectionParent.insertAdjacentHTML('afterend', blogSection);
  console.log(`[${testInfo.name}] Blog cards section injected`);

  // Add event listeners for blog cards
  setupBlogCardListeners();
}

function createBlogSectionHTML() {
  return `
    <div class="cf:py-16 cf:bg-gray-50" id="cf-blog-section">
      <div class="container">
        <div class="l-content-container">
          <div class="cf:mb-10 cf:text-center">
            <h2 class="cf:text-4xl cf:font-bold cf:text-[#1a115a] cf:mb-3">
              Get Inspired Before You Go
            </h2>
            <p class="cf:text-gray-600 cf:text-base cf:max-w-2xl cf:mx-auto">
              Discover the beauty, culture, and hidden corners of Spain through stories from locals and travelers.
            </p>
          </div>
          <div class="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:lg:grid-cols-3 cf:gap-8 cf:mb-12">
            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="hidden-gems">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2017_3/17_9/e0db0bfa-5a43-4a90-acdc-a739009d0ce7/shutterstock_404636176WebOriginalCompressed.jpg" alt="10 Hidden Gems in Spain Beyond Barcelona" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  10 Hidden Gems in Spain Beyond Barcelona
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Discover lesser-known treasures and secret spots across Spain away from the crowds.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>

            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="madrid-local">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2016_9/22_21/9e2669f4-901c-4434-b837-a6890167da32/LIB_SHU_10_F060_RFWebOriginalCompressed.jpg" alt="How to Feel Like a Local in Madrid" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  How to Feel Like a Local in Madrid
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Experience authentic Spanish culture and life through the eyes of real madrileños.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>

            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="tapas-guide">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2016_12/18_14/c901febf-8847-4175-acb5-a6e000f61f44/MAJ_PMI_F135WebOriginalCompressed.jpg" alt="A Foodie's Guide to Tapas Trails" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  A Foodie's Guide to Tapas Trails
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Explore authentic Spanish cuisine and culinary heritage through traditional tapas.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>

            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="festivals-celebrations">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2019_3/28_10/ee88cdc4-3beb-4ed1-9f9e-aa1e00b0b42f/LOC_000123_shutterstock_1131574217WebOriginalCompressed.jpg" alt="Spanish Festivals and Celebrations You Won't Forget" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  Spanish Festivals and Celebrations
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Experience vibrant fiestas, cultural celebrations, and traditions that bring Spain to life.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>

            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="best-beaches">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2017_11/7_9/93d9c8ff-5c26-4b82-8a22-a82400976efa/shutterstock_576770563WebOriginalCompressed.jpg" alt="Best Beaches and Coastal Escapes in Spain" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  Best Beaches and Coastal Escapes
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Find your perfect Spanish beach from hidden coves to golden sandy shores.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>

            <div class="cf-blog-card cf:bg-white cf:rounded-3xl cf:overflow-hidden cf:shadow-sm cf:transition-all cf:duration-300 cf:hover:shadow-lg cf:hover:-translate-y-2 cf:flex cf:flex-col cf:h-full cf:cursor-pointer" data-blog-id="wine-regions">
              <div class="cf:relative cf:w-full cf:h-56 cf:overflow-hidden cf:bg-gray-200">
                <img src="https://content.tui.co.uk/adamtui/2016_11/8_17/ea64b7b4-17ef-4814-93c9-a6b80122ac2e/LIB_SHU_16_F1005WebOriginalCompressed.jpg" alt="Wine Tasting Adventures in Spain's Top Regions" class="cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-300 cf:hover:scale-105">
              </div>
              <div class="cf:p-5 cf:flex cf:flex-col cf:flex-grow">
                <h3 class="cf:text-2xl cf:font-bold cf:text-[#1a115a] cf:mb-0 cf:leading-tight">
                  Wine Tasting Adventures in Spain
                </h3>
                <p class="cf:text-xs cf:text-gray-600 cf:mb-4 cf:line-clamp-3 cf:min-h-7 cf:mt-[2px]">
                  Discover Spain's renowned wine regions and embark on unforgettable tasting experiences.
                </p>
                <button class="cf-blog-read-more cf:inline-flex cf:items-center cf:bg-[#1a115a] cf:text-white cf:px-4 cf:py-2 cf:rounded-full cf:text-xs cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-blue-900 cf:w-fit cf:mt-auto">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cf-blog-modal cf:fixed cf:inset-0 cf:bg-black cf:bg-opacity-50 cf:z-50 cf:hidden cf:flex cf:items-center cf:justify-center cf:p-4 cf:animation-fadeInSlideUp">
        <div class="cf-modal-container cf:bg-[#f9f7f4] cf:rounded-2xl cf:max-w-2xl cf:w-full cf:shadow-2xl cf:transition-all cf:duration-300 cf:overflow-hidden cf:border cf:border-gray-200 cf:flex cf:flex-col cf:max-h-[90vh]">
          <!-- Featured Image Banner with Gradient Overlay and Title -->
          <div class="cf:relative cf:w-full cf:h-64 cf:overflow-hidden cf:bg-gray-300">
            <img class="cf-modal-image cf:w-full cf:h-full cf:object-cover cf:transition-transform cf:duration-500" alt="Featured image">
            <!-- Gradient overlay: dark at bottom, transparent at top -->
            <div class="cf:absolute cf:inset-0 cf:bg-gradient-to-t cf:from-black cf:via-black/30 cf:to-transparent cf:transition-all cf:duration-300"></div>
            <!-- Title positioned bottom-left in the gradient area -->
            <h2 class="cf-modal-title cf:absolute cf:bottom-6 cf:left-6 cf:right-6 cf:text-white cf:text-3xl cf:font-bold cf:leading-tight cf:drop-shadow-lg"></h2>
          </div>

          <!-- Preview Content Area -->
          <div class="cf:p-8 cf:flex cf:flex-col cf:flex-grow cf:overflow-y-auto cf-modal-content-wrapper">
            <p class="cf:text-xs cf:font-semibold cf:text-gray-500 cf:uppercase cf:tracking-widest cf:mb-2">
              Preview
            </p>
            <p class="cf-modal-content cf:text-gray-[#444] cf:text-base cf:leading-relaxed cf:mb-6 cf:line-height-[1.8]"></p>
            
            <!-- Action Buttons -->
            <div class="cf:flex cf:gap-3 cf:pt-4 cf:mt-auto">
              <a class="cf-modal-cta cf:inline-flex cf:items-center cf:gap-2 cf:bg-[#0b49f4] cf:text-white cf:px-6 cf:py-3 cf:rounded-full cf:text-sm cf:font-semibold cf:transition-all cf:duration-300 cf:hover:bg-[#0940d9] cf:hover:shadow-lg cf:hover:scale-105 cf:group">
                <span class="cf:transition-transform cf:duration-300 cf:group-hover:translate-x-1">✈️</span>
                Continue Reading
              </a>
              <button class="cf-modal-close-btn cf:px-6 cf:py-3 cf:text-gray-700 cf:border cf:border-gray-300 cf:rounded-full cf:text-sm cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-gray-100">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupBlogCardListeners() {
  const blogCards = document.querySelectorAll('.cf-blog-card');
  const modal = document.querySelector('.cf-blog-modal');
  
  if (!modal) {
    throw new Error('Blog modal not found');
  }

  const blogData = {
    'hidden-gems': {
      slug: '10-hidden-gems-spain',
      title: '10 Hidden Gems in Spain Beyond Barcelona',
      description: 'Spain has so much more to offer than its bustling capital. Discover lesser-known treasures scattered across the country, from charming coastal villages to historic mountain towns. These hidden gems offer authentic experiences away from the crowds, where you can truly connect with Spanish culture, local cuisine, and breathtaking landscapes that will make your holiday unforgettable.',
      image: 'https://content.tui.co.uk/adamtui/2017_3/17_9/e0db0bfa-5a43-4a90-acdc-a739009d0ce7/shutterstock_404636176WebOriginalCompressed.jpg',
      link: '/blog/10-hidden-gems-spain'
    },
    'madrid-local': {
      slug: 'feel-like-local-madrid',
      title: 'How to Feel Like a Local in Madrid',
      description: 'Experience authentic Spanish life in Madrid like a true madrileño. Skip the tourist traps and discover where locals eat, drink, and gather. From hidden tapas bars in La Latina to vibrant nightlife in Malasaña, learn the insider tips that will transform your Madrid experience. Explore bustling markets, relax in beautiful parks, and immerse yourself in the rhythm of this vibrant capital.',
      image: 'https://content.tui.co.uk/adamtui/2016_9/22_21/9e2669f4-901c-4434-b837-a6890167da32/LIB_SHU_10_F060_RFWebOriginalCompressed.jpg',
      link: '/blog/feel-like-local-madrid'
    },
    'tapas-guide': {
      slug: 'foodie-guide-tapas',
      title: 'A Foodie\'s Guide to Tapas Trails',
      description: 'Spanish food culture is centered around the tradition of sharing, and there\'s no better way to experience it than through tapas. This guide takes you on a culinary journey through Spain\'s most famous regions, from the seafood specialties of Galicia to the jamón ibérico of Andalucia. Learn the history behind each dish and discover the best places to enjoy authentic tapas trails.',
      image: 'https://content.tui.co.uk/adamtui/2016_12/18_14/c901febf-8847-4175-acb5-a6e000f61f44/MAJ_PMI_F135WebOriginalCompressed.jpg',
      link: '/blog/foodie-guide-tapas'
    },
    'festivals-celebrations': {
      slug: 'spanish-festivals-celebrations',
      title: 'Spanish Festivals and Celebrations You Won\'t Forget',
      description: 'Spain comes alive during its vibrant festivals and celebrations. From the world-famous Running of the Bulls in Pamplona to the fiery Las Fallas of Valencia and the passionate flamenco festivals, discover cultural events that showcase Spanish traditions, music, dance, and community spirit. Plan your trip around these unforgettable celebrations and experience Spain like never before.',
      image: 'https://content.tui.co.uk/adamtui/2019_3/28_10/ee88cdc4-3beb-4ed1-9f9e-aa1e00b0b42f/LOC_000123_shutterstock_1131574217WebOriginalCompressed.jpg',
      link: '/blog/spanish-festivals-celebrations'
    },
    'best-beaches': {
      slug: 'best-beaches-spain',
      title: 'Best Beaches and Coastal Escapes in Spain',
      description: 'Spain\'s coastline stretches over 7,600 kilometers with diverse beach experiences for every traveler. Whether you\'re seeking secluded Mediterranean coves, golden Atlantic shores, or bustling beach resort towns, Spain delivers. Explore stunning beaches from the rugged Costa Brava to the sun-soaked Costa del Sol, each offering unique charm and unforgettable seaside experiences.',
      image: 'https://content.tui.co.uk/adamtui/2017_11/7_9/93d9c8ff-5c26-4b82-8a22-a82400976efa/shutterstock_576770563WebOriginalCompressed.jpg',
      link: '/blog/best-beaches-spain'
    },
    'wine-regions': {
      slug: 'wine-tasting-adventures',
      title: 'Wine Tasting Adventures in Spain\'s Top Regions',
      description: 'Spain is one of the world\'s premier wine destinations with a rich winemaking heritage spanning centuries. Explore renowned regions like Rioja, Penedès, and Riojas, where you can tour vineyards, meet passionate winemakers, and taste exquisite wines. Learn about Spanish wine traditions and discover why Spanish wines are celebrated globally among connoisseurs.',
      image: 'https://content.tui.co.uk/adamtui/2016_11/8_17/ea64b7b4-17ef-4814-93c9-a6b80122ac2e/LIB_SHU_16_F1005WebOriginalCompressed.jpg',
      link: '/blog/wine-tasting-adventures'
    }
  };

  blogCards.forEach(card => {
    const readMoreBtn = card.querySelector('.cf-blog-read-more');
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const blogId = card.getAttribute('data-blog-id');
        if (blogId && blogData[blogId]) {
          openBlogModal(blogData[blogId], modal);
        }
      });
    }
  });

  // Close modal event listeners
  const closeButtons = modal.querySelectorAll('.cf-modal-close, .cf-modal-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeBlogModal(modal);
    });
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBlogModal(modal);
    }
  });

  // Setup CTA button listener
  const ctaBtn = modal.querySelector('.cf-modal-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('[Blog CTA] Button clicked!');
      
      const blogSlug = modal.getAttribute('data-blog-slug');
      console.log('[Blog CTA] Retrieved slug:', blogSlug);
      
      if (blogSlug) {
        const fullBlogContent = getBlogContent(blogSlug);
        console.log('[Blog CTA] Full blog content retrieved:', fullBlogContent ? 'YES' : 'NO');
        
        if (fullBlogContent) {
          console.log('[Blog CTA] Opening blog page...');
          openBlogPageInNewTab(fullBlogContent);
        } else {
          console.warn('[Blog CTA] Could not find full blog content for slug:', blogSlug);
        }
      } else {
        console.warn('[Blog CTA] No blog slug stored in modal');
      }
    });
    console.log('[Blog CTA] Event listener attached successfully');
  } else {
    console.error('[Blog CTA] CTA button not found in modal!');
  }
}

function openBlogModal(data, modal) {
  const title = modal.querySelector('.cf-modal-title');
  const content = modal.querySelector('.cf-modal-content');
  const image = modal.querySelector('.cf-modal-image');

  if (title) title.textContent = data.title;
  if (content) content.textContent = data.description;
  if (image && data.image) {
    image.src = data.image;
  }
  
  // Store the blog slug for later retrieval of full content
  modal.setAttribute('data-blog-slug', data.slug);

  modal.classList.remove('cf:hidden');
  modal.classList.add('cf:flex');
  document.body.style.overflow = 'hidden';
}

function openBlogPageInNewTab(blogContent) {
  try {
    console.log('[openBlogPageInNewTab] Starting for:', blogContent.title);
    console.log('[openBlogPageInNewTab] Sections count:', blogContent.sections?.length);
    
    let contentHtml = '';
    if (blogContent.sections && Array.isArray(blogContent.sections)) {
      blogContent.sections.forEach(section => {
        if (section.type === 'text') {
          contentHtml += `<p style="font-size: 18px; color: #374151; line-height: 1.75; margin-bottom: 24px;">${section.content}</p>`;
        } else if (section.type === 'heading') {
          contentHtml += `<h2 style="font-size: 32px; font-weight: bold; color: #1a115a; margin-top: 48px; margin-bottom: 24px;">${section.content}</h2>`;
        } else if (section.type === 'image') {
          contentHtml += `<div style="margin: 40px 0; border-radius: 24px; overflow: hidden;"><img src="${section.src}" alt="${section.alt}" style="width: 100%; height: 384px; object-fit: cover; border-radius: 24px;"></div>`;
        }
      });
    }
    
    console.log('[openBlogPageInNewTab] Content HTML length:', contentHtml.length);
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blogContent.title} | TUI Blog</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'TUITypeWeb', 'TUITypeLocal', 'FallbackFont', sans-serif; background-color: #f3f4f6; }
    header { background-color: white; border-bottom: 1px solid #e5e7eb; padding: 16px 0; }
    .header-content { max-width: 56rem; margin: 0 auto; padding: 0 24px; }
    header a { font-size: 24px; font-weight: bold; color: #1a115a; text-decoration: none; }
    main { background-color: #f3f4f6; padding: 64px 24px; }
    article { max-width: 56rem; margin: 0 auto; }
    .featured-img { margin-bottom: 32px; border-radius: 48px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .featured-img img { width: 100%; height: 384px; object-fit: cover; display: block; }
    .blog-header { margin-bottom: 40px; }
    .blog-header h1 { font-size: 48px; font-weight: bold; color: #1a115a; margin-bottom: 16px; line-height: 1.2; }
    .blog-header .subtitle { font-size: 20px; color: #4b5563; margin-bottom: 24px; }
    .meta { display: flex; align-items: center; gap: 24px; color: #4b5563; }
    .meta span { font-size: 14px; }
    .content-wrapper { background-color: white; border-radius: 24px; padding: 40px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .cta-section { margin-top: 48px; background: linear-gradient(to right, #1a115a, #0b49f4); border-radius: 24px; padding: 40px; color: white; text-align: center; }
    .cta-section h3 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
    .cta-section p { font-size: 18px; margin-bottom: 24px; }
    .cta-btn { display: inline-block; background-color: white; color: #1a115a; padding: 12px 32px; border-radius: 9999px; font-weight: bold; text-decoration: none; }
    .cta-btn:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); }
    footer { background-color: #111827; color: white; padding: 48px 24px; margin-top: 64px; text-align: center; }
    footer p { margin-bottom: 16px; }
    footer .text-muted { color: #9ca3af; }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <a href="https://www.tui.co.uk">TUI</a>
    </div>
  </header>
  <main>
    <article>
      <div class="featured-img">
        <img src="${blogContent.featuredImage}" alt="${blogContent.title}">
      </div>
      <div class="blog-header">
        <h1>${blogContent.title}</h1>
        <p class="subtitle">${blogContent.subtitle}</p>
        <div class="meta">
          <span><strong>${blogContent.author}</strong></span>
          <span>${blogContent.date}</span>
          <span>${blogContent.readTime}</span>
        </div>
      </div>
      <div class="content-wrapper">
        ${contentHtml}
      </div>
      <div class="cta-section">
        <h3>Ready to Explore Spain?</h3>
        <p>Start planning your Spanish adventure today with TUI</p>
        <a href="https://www.tui.co.uk/destinations/europe/spain/holidays-spain.html" class="cta-btn" target="_blank">View Spain Holidays</a>
      </div>
    </article>
  </main>
  <footer>
    <div>
      <p>&copy; 2024 TUI. All rights reserved.</p>
      <p class="text-muted">Explore the world with TUI</p>
    </div>
  </footer>
</body>
</html>`;

    console.log('[openBlogPageInNewTab] HTML length:', htmlContent.length);
    console.log('[openBlogPageInNewTab] Opening new window...');
    
    const newWindow = window.open('', '_blank');
    
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      console.log('[openBlogPageInNewTab] SUCCESS - Content written to new window');
    } else {
      console.error('[openBlogPageInNewTab] FAILED - window.open returned null (popup blocker?)');
    }
    
  } catch (err) {
    console.error('[openBlogPageInNewTab] ERROR:', err);
  }
}

function closeBlogModal(modal) {
  modal.classList.add('cf:hidden');
  modal.classList.remove('cf:flex');
  document.body.style.overflow = '';
}

function initializeBlogPageRenderer() {
  // Check if we're on a blog page
  const pathMatch = window.location.pathname.match(/\/blog\/([a-z0-9-]+)\/?$/);
  if (pathMatch) {
    const blogSlug = pathMatch[1];
    const blogContent = getBlogContent(blogSlug);
    if (blogContent) {
      renderBlogPage(blogContent);
    }
  }
}

function getBlogContent(slug) {
  const blogDatabase = {
    '10-hidden-gems-spain': {
      title: '10 Hidden Gems in Spain Beyond Barcelona',
      subtitle: 'Discover Lesser-Known Treasures Away from the Crowds',
      author: 'Travel Insider',
      date: 'October 2024',
      readTime: '8 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2017_3/17_9/e0db0bfa-5a43-4a90-acdc-a739009d0ce7/shutterstock_404636176WebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Spain has so much more to offer than its bustling capital. While Barcelona and Madrid draw millions of tourists annually, the true essence of Spanish culture, landscapes, and hospitality lies in the lesser-known corners of this vibrant country.'
        },
        {
          type: 'text',
          content: 'Discover charming coastal villages where fishermen still work the Mediterranean shores, historic mountain towns frozen in time, and countryside regions where authentic Spanish traditions remain untouched by mass tourism.'
        },
        {
          type: 'heading',
          content: 'Why Explore Hidden Gems?'
        },
        {
          type: 'text',
          content: 'These hidden gems offer authentic experiences where you can truly connect with Spanish culture, sample local cuisine at family-run restaurants, and create unforgettable memories away from crowded tourist attractions.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2016_11/8_17/ea64b7b4-17ef-4814-93c9-a6b80122ac2e/LIB_SHU_16_F1005WebOriginalCompressed.jpg',
          alt: 'Hidden gem village in Spain'
        },
        {
          type: 'heading',
          content: 'Top Hidden Destinations to Visit'
        },
        {
          type: 'text',
          content: 'From the white villages of Andalucia to the Pyrenean valleys, from the untouched beaches of Galicia to the artistic enclaves in smaller cities, Spain\'s hidden gems reveal a different side of this beautiful country that most travelers never experience.'
        }
      ]
    },
    'feel-like-local-madrid': {
      title: 'How to Feel Like a Local in Madrid',
      subtitle: 'Insider Tips to Experience Authentic Spanish Capital Life',
      author: 'Madrid Expert',
      date: 'October 2024',
      readTime: '6 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2016_9/22_21/9e2669f4-901c-4434-b837-a6890167da32/LIB_SHU_10_F060_RFWebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Experience authentic Spanish life in Madrid like a true madrileño. Skip the tourist traps and discover where locals eat, drink, and gather in this vibrant capital city.'
        },
        {
          type: 'text',
          content: 'From hidden tapas bars in La Latina to vibrant nightlife in Malasaña, from bustling markets to beautiful parks, Madrid is a city best experienced through the eyes of those who call it home.'
        },
        {
          type: 'heading',
          content: 'Neighborhood Guide for Locals'
        },
        {
          type: 'text',
          content: 'Each neighborhood in Madrid has its own character and charm. Explore the bohemian vibes of Malasaña, the historic streets of La Latina, the trendy boutiques of Chueca, and the authentic markets of Chamberí.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2019_3/28_10/ee88cdc4-3beb-4ed1-9f9e-aa1e00b0b42f/LOC_000123_shutterstock_1131574217WebOriginalCompressed.jpg',
          alt: 'Madrid street life'
        },
        {
          type: 'heading',
          content: 'Insider Dining Experiences'
        },
        {
          type: 'text',
          content: 'Learn the insider tips that will transform your Madrid experience. Discover family-run restaurants, traditional tapas bars, and local markets where you can experience authentic Spanish cuisine as the locals do.'
        }
      ]
    },
    'foodie-guide-tapas': {
      title: 'A Foodie\'s Guide to Tapas Trails',
      subtitle: 'Explore Spain\'s Culinary Heritage Through Traditional Tapas',
      author: 'Culinary Guide',
      date: 'October 2024',
      readTime: '7 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2016_12/18_14/c901febf-8847-4175-acb5-a6e000f61f44/MAJ_PMI_F135WebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Spanish food culture is centered around the tradition of sharing, and there\'s no better way to experience it than through tapas. Small plates, big flavors, and even bigger experiences await you.'
        },
        {
          type: 'text',
          content: 'This culinary journey takes you through Spain\'s most famous regions, from the seafood specialties of Galicia to the jamón ibérico of Andalucia, discovering the stories and traditions behind each dish.'
        },
        {
          type: 'heading',
          content: 'Regional Tapas Specialties'
        },
        {
          type: 'text',
          content: 'Each region of Spain has its own tapas traditions. Learn about Basque pintxos, Andalusian gazpacho, Catalonian pan con tomate, and many more regional specialties.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2017_11/7_9/93d9c8ff-5c26-4b82-8a22-a82400976efa/shutterstock_576770563WebOriginalCompressed.jpg',
          alt: 'Spanish tapas'
        },
        {
          type: 'heading',
          content: 'Best Tapas Bars to Visit'
        },
        {
          type: 'text',
          content: 'Discover the best places to enjoy authentic tapas trails. From historic establishments in Madrid to modern tapas bars in Barcelona, experience the art of Spanish dining at its finest.'
        }
      ]
    },
    'spanish-festivals-celebrations': {
      title: 'Spanish Festivals and Celebrations You Won\'t Forget',
      subtitle: 'Experience Vibrant Cultural Events That Define Spain',
      author: 'Festival Guide',
      date: 'October 2024',
      readTime: '9 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2019_3/28_10/ee88cdc4-3beb-4ed1-9f9e-aa1e00b0b42f/LOC_000123_shutterstock_1131574217WebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Spain comes alive during its vibrant festivals and celebrations. From the world-famous Running of the Bulls in Pamplona to the fiery Las Fallas of Valencia, Spanish celebrations showcase centuries of tradition and passion.'
        },
        {
          type: 'text',
          content: 'These cultural events bring communities together in spectacular fashion, featuring music, dance, traditional costumes, and unforgettable moments that reveal the heart and soul of Spanish culture.'
        },
        {
          type: 'heading',
          content: 'Major Spanish Festivals'
        },
        {
          type: 'text',
          content: 'From Semana Santa processions to La Tomatina tomato festival, from flamenco celebrations to Christmas markets, Spain\'s calendar is filled with events that attract visitors from around the world.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2016_11/8_17/ea64b7b4-17ef-4814-93c9-a6b80122ac2e/LIB_SHU_16_F1005WebOriginalCompressed.jpg',
          alt: 'Spanish festival celebration'
        },
        {
          type: 'heading',
          content: 'Planning Your Festival Visit'
        },
        {
          type: 'text',
          content: 'Learn how to plan your trip around these unforgettable celebrations and experience Spain like never before. Timing, accommodation, and insider tips to make the most of your festival adventure.'
        }
      ]
    },
    'best-beaches-spain': {
      title: 'Best Beaches and Coastal Escapes in Spain',
      subtitle: 'Find Your Perfect Spanish Beach Paradise',
      author: 'Beach Guide',
      date: 'October 2024',
      readTime: '8 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2017_11/7_9/93d9c8ff-5c26-4b82-8a22-a82400976efa/shutterstock_576770563WebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Spain\'s coastline stretches over 7,600 kilometers with diverse beach experiences for every traveler. Whether you\'re seeking secluded Mediterranean coves, golden Atlantic shores, or bustling beach resort towns, Spain delivers.'
        },
        {
          type: 'text',
          content: 'From the rugged Costa Brava to the sun-soaked Costa del Sol, from the dramatic cliffs of the Basque country to the pine-fringed beaches of the Balearic Islands, Spanish beaches offer unique charm and unforgettable seaside experiences.'
        },
        {
          type: 'heading',
          content: 'Regional Beach Guide'
        },
        {
          type: 'text',
          content: 'Explore the differences between Spain\'s most famous beach regions. Each coast offers distinct characteristics, from calm turquoise waters to vibrant beach culture and water sports.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2016_9/22_21/9e2669f4-901c-4434-b837-a6890167da32/LIB_SHU_10_F060_RFWebOriginalCompressed.jpg',
          alt: 'Spanish beach paradise'
        },
        {
          type: 'heading',
          content: 'Hidden Beach Secrets'
        },
        {
          type: 'text',
          content: 'Discover lesser-known beaches that offer the perfect escape from crowded tourist destinations. Find your ideal beach whether you want relaxation, adventure, or a mix of both.'
        }
      ]
    },
    'wine-tasting-adventures': {
      title: 'Wine Tasting Adventures in Spain\'s Top Regions',
      subtitle: 'Discover Spain\'s World-Class Wine Heritage',
      author: 'Wine Expert',
      date: 'October 2024',
      readTime: '10 min read',
      featuredImage: 'https://content.tui.co.uk/adamtui/2016_11/8_17/ea64b7b4-17ef-4814-93c9-a6b80122ac2e/LIB_SHU_16_F1005WebOriginalCompressed.jpg',
      sections: [
        {
          type: 'text',
          content: 'Spain is one of the world\'s premier wine destinations with a rich winemaking heritage spanning centuries. From the prestigious vineyards of Rioja to the innovative wineries of Penedès, Spanish wines are celebrated globally.'
        },
        {
          type: 'text',
          content: 'Explore renowned wine regions where you can tour vineyards, meet passionate winemakers, taste exquisite wines, and learn about Spanish wine traditions that have been perfected over generations.'
        },
        {
          type: 'heading',
          content: 'Spain\'s Premier Wine Regions'
        },
        {
          type: 'text',
          content: 'Discover the characteristics of Spain\'s most famous wine regions. From bold Riojas to refreshing Albariíos, from Sherry wines to innovative new-world style productions, each region tells its own story.'
        },
        {
          type: 'image',
          src: 'https://content.tui.co.uk/adamtui/2016_12/18_14/c901febf-8847-4175-acb5-a6e000f61f44/MAJ_PMI_F135WebOriginalCompressed.jpg',
          alt: 'Spanish vineyard landscape'
        },
        {
          type: 'heading',
          content: 'Wine Touring Tips'
        },
        {
          type: 'text',
          content: 'Get insider tips on planning wine tours, tasting etiquette, food pairings, and how to make the most of your wine country adventure in Spain.'
        }
      ]
    }
  };

  return blogDatabase[slug] || null;
}

function renderBlogPage(blogContent) {
  let contentHtml = '';
  if (blogContent.sections && Array.isArray(blogContent.sections)) {
    blogContent.sections.forEach(section => {
      if (section.type === 'text') {
        contentHtml += `<p style="font-size: 18px; color: #374151; line-height: 1.75; margin-bottom: 24px;">${section.content}</p>`;
      } else if (section.type === 'heading') {
        contentHtml += `<h2 style="font-size: 32px; font-weight: bold; color: #1a115a; margin-top: 48px; margin-bottom: 24px;">${section.content}</h2>`;
      } else if (section.type === 'image') {
        contentHtml += `<div style="margin: 40px 0; border-radius: 24px; overflow: hidden;"><img src="${section.src}" alt="${section.alt}" style="width: 100%; height: 384px; object-fit: cover; border-radius: 24px;"></div>`;
      }
    });
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blogContent.title} | TUI Blog</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'TUITypeWeb', 'TUITypeLocal', 'FallbackFont', sans-serif; background-color: #f3f4f6; }
    header { background-color: white; border-bottom: 1px solid #e5e7eb; padding: 16px 0; }
    .header-content { max-width: 56rem; margin: 0 auto; padding: 0 24px; }
    header a { font-size: 24px; font-weight: bold; color: #1a115a; text-decoration: none; }
    main { background-color: #f3f4f6; padding: 64px 24px; }
    article { max-width: 56rem; margin: 0 auto; }
    .featured-img { margin-bottom: 32px; border-radius: 48px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .featured-img img { width: 100%; height: 384px; object-fit: cover; display: block; }
    .blog-header { margin-bottom: 40px; }
    .blog-header h1 { font-size: 48px; font-weight: bold; color: #1a115a; margin-bottom: 16px; line-height: 1.2; }
    .blog-header .subtitle { font-size: 20px; color: #4b5563; margin-bottom: 24px; }
    .meta { display: flex; align-items: center; gap: 24px; color: #4b5563; }
    .meta span { font-size: 14px; }
    .content-wrapper { background-color: white; border-radius: 24px; padding: 40px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .cta-section { margin-top: 48px; background: linear-gradient(to right, #1a115a, #0b49f4); border-radius: 24px; padding: 40px; color: white; text-align: center; }
    .cta-section h3 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
    .cta-section p { font-size: 18px; margin-bottom: 24px; }
    .cta-btn { display: inline-block; background-color: white; color: #1a115a; padding: 12px 32px; border-radius: 9999px; font-weight: bold; text-decoration: none; }
    .cta-btn:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); }
    footer { background-color: #111827; color: white; padding: 48px 24px; margin-top: 64px; text-align: center; }
    footer p { margin-bottom: 16px; }
    footer .text-muted { color: #9ca3af; }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <a href="https://www.tui.co.uk">TUI</a>
    </div>
  </header>
  <main>
    <article>
      <div class="featured-img">
        <img src="${blogContent.featuredImage}" alt="${blogContent.title}">
      </div>
      <div class="blog-header">
        <h1>${blogContent.title}</h1>
        <p class="subtitle">${blogContent.subtitle}</p>
        <div class="meta">
          <span><strong>${blogContent.author}</strong></span>
          <span>${blogContent.date}</span>
          <span>${blogContent.readTime}</span>
        </div>
      </div>
      <div class="content-wrapper">
        ${contentHtml}
      </div>
      <div class="cta-section">
        <h3>Ready to Explore Spain?</h3>
        <p>Start planning your Spanish adventure today with TUI</p>
        <a href="https://www.tui.co.uk/destinations/europe/spain/holidays-spain.html" class="cta-btn" target="_blank">View Spain Holidays</a>
      </div>
    </article>
  </main>
  <footer>
    <div>
      <p>&copy; 2024 TUI. All rights reserved.</p>
      <p class="text-muted">Explore the world with TUI</p>
    </div>
  </footer>
</body>
</html>`;

  document.documentElement.innerHTML = htmlContent;
}

// === HELPER FUNCTIONS ===

function addStyling() {
  const cssArray = [
    {
      desc: `Blog cards animations`,
      css: `
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cf\\:animation-fadeInSlideUp {
          animation: fadeInSlideUp 0.3s ease-out;
        }

        .cf-line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cf-modal-image {
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        .cf-blog-card:hover img {
          transform: scale(1.05);
        }

        .cf-blog-modal {
          backdrop-filter: blur(4px);
        }

        .cf-blog-read-more {
          cursor: pointer;
        }

        .cf-blog-read-more:hover {
          box-shadow: 0 4px 6px rgba(26, 17, 90, 0.3);
        }
      `,
    },
    {
      desc: 'Mobile nav icon alignment',
      css: `
        .oh-navigation-l1 .openmfe-analytics {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      `
    }
  ];

  cssArray.forEach(({ desc, css }) => {
    const newStyleElem = document.createElement(`style`);
    newStyleElem.dataset.desc = desc;
    newStyleElem.innerHTML = css;
    document.head.insertAdjacentElement(`beforeend`, newStyleElem);
  });
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