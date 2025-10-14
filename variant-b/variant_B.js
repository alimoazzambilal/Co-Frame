console.log('Adding How Ramp Works section');

function init() {
  const heroSection = document.querySelector('#hero-section');
  
  if (!heroSection) {
    console.error('Hero section not found');
    return;
  }

  if (document.querySelector('#how-ramp-works-section')) {
    console.log('How Ramp Works section already exists');
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
    return;
  }

  const newSection = <HowRampWorksSection />;
  heroSection.parentElement.insertBefore(newSection, heroSection.nextSibling);

  console.log('How Ramp Works section added successfully');
  
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function HowRampWorksSection() {
  return (
    <section 
      id="how-ramp-works-section" 
      className="cf:bg-white cf:py-16 cf:md:py-24 cf:lg:py-32"
      aria-label="How Ramp Works"
    >
      <div className="cf:mx-auto cf:w-full cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <h2 className="cf:text-center cf:text-[48px] cf:leading-[50px] cf:font-normal cf:tracking-[-0.48px] cf:mb-12 cf:md:mb-16 cf:lg:mb-20 cf:text-[oklch(0.1465_0.0057_69.2)]">
          How Ramp Works
        </h2>
        
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:md:gap-12 cf:lg:gap-16">
          <Step
            number="1"
            label="Connect your accounts"
            description="Sync cards, vendors, and accounting tools in minutes."
            iconType="connect"
          />
          <Step
            number="2"
            label="Set smart controls"
            description="Automate budgets, policies, and spend approvals."
            iconType="controls"
          />
          <Step
            number="3"
            label="Track & save automatically"
            description="Real-time insights and savings—no manual work."
            iconType="chart"
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, label, description, iconType }) {
  return (
    <div className="cf:flex cf:flex-col cf:items-center cf:text-center">
      <div className="cf:mb-6" aria-hidden="true">
        <Icon type={iconType} />
      </div>
      <div className="cf:text-[16px] cf:leading-[22px] cf:font-normal cf:mb-3 cf:text-[oklch(0.1465_0.0057_69.2_/_0.6)]">
        Step {number}
      </div>
      <h3 className="cf:text-[20px] cf:leading-[26px] cf:font-medium cf:mb-3 cf:text-[oklch(0.1465_0.0057_69.2)]">
        {label}
      </h3>
      <p className="cf:text-[16px] cf:leading-[24px] cf:font-normal cf:text-[oklch(0.1465_0.0057_69.2_/_0.6)] cf:max-w-[320px]">
        {description}
      </p>
    </div>
  );
}

function Icon({ type }) {
  const iconColor = '#1a1a1a';
  const iconSize = 32;
  
  const renderIcon = () => {
    if (type === 'connect') {
      return (
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Connection icon"
        >
          <circle cx="12" cy="12" r="4" stroke={iconColor} strokeWidth="2" fill="none" />
          <circle cx="36" cy="36" r="4" stroke={iconColor} strokeWidth="2" fill="none" />
          <circle cx="36" cy="12" r="4" stroke={iconColor} strokeWidth="2" fill="none" />
          <line x1="15" y1="13" x2="32" y2="13" stroke={iconColor} strokeWidth="2" />
          <line x1="15" y1="14" x2="33" y2="33" stroke={iconColor} strokeWidth="2" />
        </svg>
      );
    }
    
    if (type === 'controls') {
      return (
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Settings icon"
        >
          <line x1="8" y1="14" x2="40" y2="14" stroke={iconColor} strokeWidth="2" />
          <circle cx="18" cy="14" r="4" fill={iconColor} />
          <line x1="8" y1="24" x2="40" y2="24" stroke={iconColor} strokeWidth="2" />
          <circle cx="30" cy="24" r="4" fill={iconColor} />
          <line x1="8" y1="34" x2="40" y2="34" stroke={iconColor} strokeWidth="2" />
          <circle cx="22" cy="34" r="4" fill={iconColor} />
        </svg>
      );
    }
    
    if (type === 'chart') {
      return (
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Chart icon"
        >
          <polyline 
            points="8,36 16,28 24,32 32,20 40,24" 
            stroke={iconColor} 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="6" y1="40" x2="42" y2="40" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="8" x2="6" y2="40" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
    
    return null;
  };
  
  return (
    <div className="cf:w-[80px] cf:h-[80px] cf:rounded-full cf:bg-[#f4f2f0] cf:flex cf:items-center cf:justify-center">
      {renderIcon()}
    </div>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}