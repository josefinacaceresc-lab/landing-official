/**
 * MOBILE-FIRST OPTIMIZATION SYSTEM
 * 
 * Critical for 80% of high-complexity leads from mobile searches
 * 
 * This utility provides:
 * - Responsive helpers
 * - Touch target validation
 * - Safe area utilities
 * - Performance optimization
 * - Mobile-specific styling
 */

/**
 * Tailwind Breakpoints Reference
 * sm: 640px   (small phones landscape, larger phones portrait)
 * md: 768px   (tablets)
 * lg: 1024px  (small laptops)
 * xl: 1280px  (desktops)
 * 2xl: 1536px (large desktops)
 * 
 * Mobile-First means: base styles are for mobile, then scale up
 */

/**
 * TOUCH TARGET UTILITIES
 * Minimum 44x44px for accessibility and usability
 */

export const touchTargetClasses = {
  // Minimum touch target (44x44px)
  button: 'min-h-[44px] min-w-[44px] touch-manipulation',
  
  // Small button (still 44px height, can be narrower width with padding)
  buttonSm: 'min-h-[44px] px-4 touch-manipulation',
  
  // Large button (for primary CTAs)
  buttonLg: 'min-h-[52px] px-6 touch-manipulation',
  
  // Extra large button (for hero CTAs)
  buttonXl: 'min-h-[60px] px-8 touch-manipulation',
  
  // Icon-only button (square 44x44px minimum)
  iconButton: 'h-[44px] w-[44px] touch-manipulation flex items-center justify-center',
  
  // Link with adequate padding for touch
  link: 'py-2 px-1 touch-manipulation inline-block',
  
  // Nav item (adequate height and spacing)
  navItem: 'py-3 px-4 touch-manipulation block',
};

/**
 * TYPOGRAPHY SCALE FOR MOBILE
 * Optimized Poppins sizes for readability without horizontal scroll
 */

export const mobileTypography = {
  // Display (for hero titles)
  display: {
    mobile: 'text-3xl',     // 30px on mobile
    tablet: 'md:text-5xl',  // 48px on tablet
    desktop: 'lg:text-7xl'  // 72px on desktop
  },
  
  // H1 (page titles)
  h1: {
    mobile: 'text-2xl',     // 24px on mobile
    tablet: 'md:text-4xl',  // 36px on tablet
    desktop: 'lg:text-5xl'  // 48px on desktop
  },
  
  // H2 (section titles)
  h2: {
    mobile: 'text-xl',      // 20px on mobile
    tablet: 'md:text-3xl',  // 30px on tablet
    desktop: 'lg:text-4xl'  // 36px on desktop
  },
  
  // H3 (subsection titles)
  h3: {
    mobile: 'text-lg',      // 18px on mobile
    tablet: 'md:text-2xl',  // 24px on tablet
    desktop: 'lg:text-3xl'  // 30px on desktop
  },
  
  // Body (regular text)
  body: {
    mobile: 'text-base',    // 16px on mobile (minimum for readability)
    tablet: 'md:text-lg',   // 18px on tablet
    desktop: 'lg:text-xl'   // 20px on desktop
  },
  
  // Small text (captions, labels)
  small: {
    mobile: 'text-sm',      // 14px on mobile
    tablet: 'md:text-base', // 16px on tablet
    desktop: 'lg:text-lg'   // 18px on desktop
  },
  
  // Combine function
  combine: (scale) => {
    return `${scale.mobile} ${scale.tablet} ${scale.desktop}`;
  }
};

/**
 * SAFE AREA UTILITIES
 * Respect iOS notches and Android status bars
 */

export const safeAreaClasses = {
  // Top safe area (for fixed headers)
  top: 'pt-safe',
  
  // Bottom safe area (for fixed footers/CTAs)
  bottom: 'pb-safe',
  
  // Both top and bottom
  vertical: 'pt-safe pb-safe',
  
  // Full safe area (all sides)
  all: 'p-safe',
  
  // Custom safe area values (add to globals.css)
  // Use CSS env() variables
};

/**
 * PERFORMANCE OPTIMIZATION CLASSES
 * Ensure smooth scrolling and interaction
 */

export const performanceClasses = {
  // Enable GPU acceleration for transforms
  gpuAccelerated: 'transform-gpu',
  
  // Smooth scrolling
  smoothScroll: 'scroll-smooth',
  
  // Optimize for touch interactions
  touchOptimized: 'touch-manipulation [-webkit-tap-highlight-color:transparent]',
  
  // Prevent layout shift (for images/videos)
  noLayoutShift: 'relative overflow-hidden',
  
  // Lazy loading helper
  lazyLoad: 'loading-lazy',
  
  // Will-change for animations (use sparingly)
  willChangeTransform: 'will-change-transform',
  willChangeOpacity: 'will-change-opacity',
};

/**
 * MOBILE-SPECIFIC LAYOUT UTILITIES
 */

export const mobileLayout = {
  // Container with mobile-first padding
  container: 'px-4 mx-auto max-w-7xl sm:px-6 lg:px-8',
  
  // Section spacing (mobile-first)
  section: 'py-12 md:py-16 lg:py-20',
  
  // Grid (1 col mobile, 2 col tablet, 3+ col desktop)
  grid2: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',
  
  // Flex column on mobile, row on desktop
  flexResponsive: 'flex flex-col md:flex-row gap-4 md:gap-6',
  
  // Hide on mobile, show on desktop
  hideOnMobile: 'hidden md:block',
  
  // Show on mobile, hide on desktop
  showOnMobile: 'block md:hidden',
  
  // Full width on mobile, constrained on desktop
  fullWidthMobile: 'w-full md:w-auto',
};

/**
 * IMAGE OPTIMIZATION HELPERS
 * For use with next/image
 */

export const imageConfigs = {
  // Hero image
  hero: {
    sizes: '100vw',
    quality: 85,
    priority: true,
    placeholder: 'blur'
  },
  
  // Card/thumbnail image
  card: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 80,
    priority: false,
    loading: 'lazy'
  },
  
  // Avatar/profile image
  avatar: {
    sizes: '(max-width: 768px) 150px, 200px',
    quality: 90,
    priority: false,
    loading: 'lazy'
  },
  
  // Icon
  icon: {
    sizes: '64px',
    quality: 90,
    priority: false,
    loading: 'lazy'
  },
  
  // Full width content image
  content: {
    sizes: '(max-width: 768px) 100vw, 800px',
    quality: 85,
    priority: false,
    loading: 'lazy'
  }
};

/**
 * MOBILE FORM UTILITIES
 * Optimized for thumb interaction
 */

export const mobileFormClasses = {
  // Input field (adequate touch target)
  input: 'h-[52px] px-4 text-base rounded-lg touch-manipulation',
  
  // Textarea (adequate touch target)
  textarea: 'min-h-[120px] p-4 text-base rounded-lg touch-manipulation',
  
  // Select dropdown
  select: 'h-[52px] px-4 text-base rounded-lg touch-manipulation',
  
  // Checkbox/Radio (larger touch area)
  checkbox: 'h-[24px] w-[24px] touch-manipulation',
  
  // Form label (adequate spacing)
  label: 'block mb-2 text-sm font-medium',
  
  // Form group (spacing between fields)
  group: 'mb-6',
  
  // Submit button (prominent)
  submit: 'w-full h-[52px] md:w-auto md:min-w-[200px] text-lg font-semibold rounded-lg touch-manipulation',
};

/**
 * MOBILE NAVIGATION UTILITIES
 */

export const mobileNavClasses = {
  // Mobile menu button (hamburger)
  menuButton: 'h-[44px] w-[44px] flex items-center justify-center touch-manipulation md:hidden',
  
  // Mobile menu overlay
  menuOverlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden',
  
  // Mobile menu panel
  menuPanel: 'fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden',
  
  // Mobile nav item
  menuItem: 'block py-4 px-6 text-lg touch-manipulation border-b border-gray-100',
  
  // Desktop nav (hidden on mobile)
  desktopNav: 'hidden md:flex md:items-center md:gap-6',
};

/**
 * MOBILE MODAL/DIALOG UTILITIES
 * For WhatsApp Fast Capture and other modals
 */

export const mobileModalClasses = {
  // Modal overlay
  overlay: 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4',
  
  // Modal content (bottom sheet on mobile, centered on desktop)
  content: 'w-full max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-300 ease-out',
  
  // Modal header (drag handle on mobile)
  header: 'relative pt-4 pb-2 px-6 border-b border-gray-100',
  
  // Drag handle indicator
  dragHandle: 'w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden',
  
  // Modal body (scrollable if needed)
  body: 'p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto',
  
  // Modal actions (buttons)
  actions: 'flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-100',
};

/**
 * WHATSAPP FAST CAPTURE OPTIMIZED
 * Ergonomic for thumb interaction
 */

export const whatsAppCaptureClasses = {
  // Container
  container: 'w-full max-w-lg mx-auto',
  
  // Input field (large, easy to tap)
  input: 'w-full h-[56px] px-4 text-lg rounded-xl border-2 border-gray-300 focus:border-primary touch-manipulation',
  
  // Submit button (prominent, thumb-reachable)
  submitButton: 'w-full h-[56px] text-lg font-bold rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center gap-3 touch-manipulation shadow-lg',
  
  // Close button (top-right, easy to reach)
  closeButton: 'absolute top-4 right-4 h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 touch-manipulation',
  
  // Field group
  fieldGroup: 'mb-4',
  
  // Label
  label: 'block mb-2 text-base font-semibold text-gray-700',
};

/**
 * UTILITY FUNCTION: Check if device is mobile
 */

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
}

/**
 * UTILITY FUNCTION: Get viewport dimensions
 */

export function getViewportDimensions() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * UTILITY FUNCTION: Debounce for resize events
 */

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export everything
export default {
  touchTargetClasses,
  mobileTypography,
  safeAreaClasses,
  performanceClasses,
  mobileLayout,
  imageConfigs,
  mobileFormClasses,
  mobileNavClasses,
  mobileModalClasses,
  whatsAppCaptureClasses,
  isMobileDevice,
  getViewportDimensions,
  debounce
};
