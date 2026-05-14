/**
 * GOOGLE ADS CONVERSION TRACKING
 * 
 * Critical for tracking ROI and campaign performance
 * Google Ads ID: AW-18117776220
 * 
 * This utility provides functions to track conversion events
 * that will appear in Google Ads dashboard.
 */

/**
 * Track a conversion event in Google Ads
 * @param {string} conversionLabel - The conversion label from Google Ads
 * @param {number} value - Optional conversion value in CLP
 * @param {string} currency - Currency code (default: 'CLP')
 */
export function trackConversion(conversionLabel, value = 0, currency = 'CLP') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-18117776220/${conversionLabel}`,
      'value': value,
      'currency': currency
    });
    
    console.log('✅ Conversion tracked:', conversionLabel, value);
  } else {
    console.warn('⚠️ Google Tag not loaded yet');
  }
}

/**
 * Track form submission conversion
 * @param {string} formType - Type of form (e.g., 'contact', 'idp4', 'bsl23')
 * @param {Object} data - Form data (optional)
 */
export function trackFormSubmission(formType, data = {}) {
  // Map form types to conversion labels
  // IMPORTANT: Replace these with actual conversion labels from Google Ads
  const conversionLabels = {
    'contact': 'CONTACT_FORM_LABEL', // Replace with actual label
    'idp4': 'IDP4_SUBMISSION_LABEL',  // Replace with actual label
    'bsl23': 'BSL23_SUBMISSION_LABEL', // Replace with actual label
    'consultation': 'CONSULTATION_REQUEST_LABEL' // Replace with actual label
  };
  
  const label = conversionLabels[formType];
  
  if (label && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-18117776220/${label}`,
      'event_category': 'Form',
      'event_label': formType,
      'value': 0,
      'currency': 'CLP'
    });
    
    console.log(`✅ Form submission tracked: ${formType}`);
  }
}

/**
 * Track WhatsApp click conversion
 * @param {string} source - Where the click originated (e.g., 'header', 'footer', 'contacto')
 */
export function trackWhatsAppClick(source = 'general') {
  if (typeof window !== 'undefined' && window.gtag) {
    // IMPORTANT: Replace 'WHATSAPP_CLICK_LABEL' with actual label from Google Ads
    window.gtag('event', 'conversion', {
      'send_to': 'AW-18117776220/WHATSAPP_CLICK_LABEL',
      'event_category': 'WhatsApp',
      'event_label': source,
      'value': 0,
      'currency': 'CLP'
    });
    
    // Also track as a general event for analytics
    window.gtag('event', 'whatsapp_click', {
      'event_category': 'Engagement',
      'event_label': source
    });
    
    console.log(`✅ WhatsApp click tracked from: ${source}`);
  }
}

/**
 * Track phone click conversion
 * @param {string} source - Where the click originated
 */
export function trackPhoneClick(source = 'general') {
  if (typeof window !== 'undefined' && window.gtag) {
    // IMPORTANT: Replace 'PHONE_CLICK_LABEL' with actual label from Google Ads
    window.gtag('event', 'conversion', {
      'send_to': 'AW-18117776220/PHONE_CLICK_LABEL',
      'event_category': 'Phone',
      'event_label': source
    });
    
    console.log(`✅ Phone click tracked from: ${source}`);
  }
}

/**
 * Track email click conversion
 * @param {string} source - Where the click originated
 */
export function trackEmailClick(source = 'general') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-18117776220/EMAIL_CLICK_LABEL',
      'event_category': 'Email',
      'event_label': source
    });
    
    console.log(`✅ Email click tracked from: ${source}`);
  }
}

/**
 * Track page view (automatic via gtag config, but can be called manually)
 * @param {string} pagePath - The page path
 */
export function trackPageView(pagePath) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-18117776220', {
      'page_path': pagePath
    });
  }
}

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {Object} params - Event parameters
 */
export function trackCustomEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log(`✅ Custom event tracked: ${eventName}`, params);
  }
}

/**
 * Initialize enhanced conversions (optional but recommended)
 * This allows Google to use hashed user data for better attribution
 */
export function enhanceConversion(userData = {}) {
  if (typeof window !== 'undefined' && window.gtag && userData.email) {
    window.gtag('set', 'user_data', {
      "email": userData.email,
      "phone_number": userData.phone,
      "address": {
        "first_name": userData.firstName,
        "last_name": userData.lastName,
        "city": userData.city,
        "region": userData.region,
        "country": "CL"
      }
    });
  }
}

// Export all tracking functions
export default {
  trackConversion,
  trackFormSubmission,
  trackWhatsAppClick,
  trackPhoneClick,
  trackEmailClick,
  trackPageView,
  trackCustomEvent,
  enhanceConversion
};
