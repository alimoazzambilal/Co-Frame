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
  blogsLink.href = '/blog';
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
      title: '10 Hidden Gems in Spain Beyond Barcelona',
      description: 'Spain has so much more to offer than its bustling capital. Discover lesser-known treasures scattered across the country, from charming coastal villages to historic mountain towns. These hidden gems offer authentic experiences away from the crowds, where you can truly connect with Spanish culture, local cuisine, and breathtaking landscapes that will make your holiday unforgettable.',
      link: '/blog/10-hidden-gems-spain'
    },
    'madrid-local': {
      title: 'How to Feel Like a Local in Madrid',
      description: 'Experience authentic Spanish life in Madrid like a true madrileño. Skip the tourist traps and discover where locals eat, drink, and gather. From hidden tapas bars in La Latina to vibrant nightlife in Malasaña, learn the insider tips that will transform your Madrid experience. Explore bustling markets, relax in beautiful parks, and immerse yourself in the rhythm of this vibrant capital.',
      link: '/blog/feel-like-local-madrid'
    },
    'tapas-guide': {
      title: 'A Foodie\'s Guide to Tapas Trails',
      description: 'Spanish food culture is centered around the tradition of sharing, and there\'s no better way to experience it than through tapas. This guide takes you on a culinary journey through Spain\'s most famous regions, from the seafood specialties of Galicia to the jamón ibérico of Andalucia. Learn the history behind each dish and discover the best places to enjoy authentic tapas trails.',
      link: '/blog/foodie-guide-tapas'
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
}

function openBlogModal(data, modal) {
  const title = modal.querySelector('.cf-modal-title');
  const content = modal.querySelector('.cf-modal-content');
  const image = modal.querySelector('.cf-modal-image');
  const cta = modal.querySelector('.cf-modal-cta');

  if (title) title.textContent = data.title;
  if (content) content.textContent = data.description;
  if (image) {
    if (data.title.includes('Hidden Gems')) {
      image.src = 'https://content.tui.co.uk/adamtui/2017_3/17_9/e0db0bfa-5a43-4a90-acdc-a739009d0ce7/shutterstock_404636176WebOriginalCompressed.jpg';
    } else if (data.title.includes('Madrid')) {
      image.src = 'https://content.tui.co.uk/adamtui/2016_9/22_21/9e2669f4-901c-4434-b837-a6890167da32/LIB_SHU_10_F060_RFWebOriginalCompressed.jpg';
    } else if (data.title.includes('Tapas')) {
      image.src = 'https://content.tui.co.uk/adamtui/2016_12/18_14/c901febf-8847-4175-acb5-a6e000f61f44/MAJ_PMI_F135WebOriginalCompressed.jpg';
    }
  }
  if (cta) cta.href = data.link;

  modal.classList.remove('cf:hidden');
  modal.classList.add('cf:flex');
  document.body.style.overflow = 'hidden';
}

function closeBlogModal(modal) {
  modal.classList.add('cf:hidden');
  modal.classList.remove('cf:flex');
  document.body.style.overflow = '';
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