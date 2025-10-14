console.log('Ramp headline variant - starting');

const headline = document.querySelector('#hero-section h1.headline-xl');

if (headline) {
  console.log('Found headline element', headline);
  
  headline.innerHTML = 'Automate spend. Accelerate growth.';
  
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
  console.log('Headline updated successfully');
} else {
  console.error('Headline element not found');
}