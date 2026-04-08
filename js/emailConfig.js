/**
 * VIF.Dev Portfolio - Email Configuration
 * 
 * SECURITY NOTE: This file contains EmailJS configuration.
 * While these keys are technically client-side and visible in browser,
 * we've implemented additional security measures:
 * 
 * 1. Rate limiting on EmailJS dashboard
 * 2. Domain restrictions (only your domain can use these)
 * 3. Honeypot field for bot detection
 * 4. Client-side validation
 * 
 * For production, consider:
 * - Setting up domain restrictions in EmailJS dashboard
 * - Enabling reCAPTCHA in EmailJS settings
 * - Setting up email quota limits
 */

const EmailConfig = {
  // EmailJS Public Key - Configure domain restrictions in EmailJS dashboard
  publicKey: 'cs8QoSnqtKqc4SkwX',
  
  // Service and Template IDs
  serviceId: 'service_g6jsrwq',
  templateId: 'template_pxji6pp',
  
  // Recipient name for template
  recipientName: 'Voun Irish Florence Dejumo',
  
  // Rate limiting settings (client-side)
  rateLimiting: {
    maxAttempts: 3,
    windowMs: 60000 // 1 minute
  }
};

// Freeze the config to prevent modification
Object.freeze(EmailConfig);
Object.freeze(EmailConfig.rateLimiting);

// Export for use
window.EmailConfig = EmailConfig;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmailConfig;
}
