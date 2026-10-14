/**
 * ============================================================================
 * CENTRAL AFFILIATE SWITCHBOARD (CRO & RETENTION OPTIMIZED)
 * ============================================================================
 * Update your affiliate offers and monetization links in this single file.
 * Changes here are dynamically reflected across all 10 fee calculator pages!
 */

const AFFILIATE_OFFERS = {
  // Optional automated affiliate monetization networks (e.g., Skimlinks, Sovrn / VigLink)
  globalScriptUrl: null, 

  // E-COMMERCE OFFER (Etsy, eBay, TikTok Shop, Amazon FBA, Shopify vs Etsy, Printful)
  ecommerce: {
    badgeText: "Save up to 80% on Marketplace Fees",
    headlineTemplate: (fee) => fee && fee > 0
      ? `Stop losing $${Number(fee).toFixed(0)} to marketplace cuts—keep up to 97% of every sale`
      : `Stop Giving Away 10%–25% of Every Sale in Marketplace Fees`,
    subtext: "Marketplaces take cuts on listings, transactions, payments, and mandatory ads. Launch your own independent storefront and pay flat, predictable rates.",
    buttonText: "Claim My $1/Month Store →",
    // >>> PASTE YOUR SHOPIFY AFFILIATE LINK BELOW <<<
    url: "https://www.shopify.com/free-trial",
    trustMicrocopy: "✓ $1/month promo for 3 months • No credit card required • Takes 60s to set up",
    benefitBulletPoints: [
      "Keep 97%+ of your revenue instead of giving 10%–25% to marketplaces",
      "100% ownership of your customer email list, brand, and repeat sales",
      "Special partner promo: $1/month for your first 3 months"
    ]
  },

  // PAYMENTS & FX OFFER (Stripe, PayPal, Wise vs PayPal, Patreon vs Substack)
  payments: {
    badgeText: "Cut International Wire & FX Fees by 6x",
    headlineTemplate: (fee) => fee && fee > 0
      ? `Stop losing $${Number(fee).toFixed(0)} to hidden FX spreads—keep your real earnings`
      : `Stop Losing 3% to 4.5% on Hidden Foreign Exchange Spreads`,
    subtext: "Traditional gateways and PayPal markup mid-market exchange rates and charge extra for cross-border transactions. Wise gives you true mid-market rates with transparent, minimal fees.",
    buttonText: "Cut My Transfer Fees by 80% →",
    // >>> PASTE YOUR WISE AFFILIATE LINK BELOW <<<
    url: "https://wise.com/business",
    trustMicrocopy: "✓ Free multi-currency account • No monthly subscription • Regulated worldwide",
    benefitBulletPoints: [
      "Receive local account details in USD, EUR, GBP, AUD, CAD, and 8+ currencies",
      "Convert at the real mid-market exchange rate without hidden markups",
      "Withdraw money directly to your domestic bank for pennies"
    ]
  }
};

/**
 * Injects the affiliate CTA card into the target element.
 * @param {string} category - 'ecommerce' or 'payments'
 * @param {string} containerId - DOM ID where callout should be rendered (default: 'affiliate-callout')
 * @param {number|null} estimatedFeesPaid - Optional calculated fee number to personalize headline
 */
function renderAffiliateCallout(category, containerId = 'affiliate-callout', estimatedFeesPaid = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const offer = AFFILIATE_OFFERS[category];
  if (!offer) return;

  const dynamicHeadline = typeof offer.headlineTemplate === 'function'
    ? offer.headlineTemplate(estimatedFeesPaid)
    : offer.headline;

  const feePill = (estimatedFeesPaid && estimatedFeesPaid > 0)
    ? `<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-3 shadow-xs">
        <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        You are paying approx. <strong>$${Number(estimatedFeesPaid).toFixed(2)}</strong> in fees on this volume
       </div>`
    : '';

  const bulletListHtml = offer.benefitBulletPoints && offer.benefitBulletPoints.length
    ? `<ul class="space-y-2 my-4 text-xs sm:text-sm text-slate-600">
        ${offer.benefitBulletPoints.map(item => `
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            <span class="leading-snug">${item}</span>
          </li>`).join('')}
       </ul>`
    : '';

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl bg-white border-2 border-indigo-200 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all duration-200">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="inline-block px-3 py-1 text-xs font-extrabold tracking-wide uppercase text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
          ${offer.badgeText}
        </span>
        <span class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Verified Partner Solution</span>
      </div>
      
      ${feePill}

      <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
        ${dynamicHeadline}
      </h3>
      
      <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
        ${offer.subtext}
      </p>

      ${bulletListHtml}

      <div class="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5">
          <span>${offer.trustMicrocopy}</span>
        </div>
        <a href="${offer.url}" target="_blank" rel="noopener sponsored" 
           class="cta-dopamine-btn w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg hover:shadow-indigo-300 transition-all duration-200 transform hover:-translate-y-0.5 text-center cursor-pointer">
          ${offer.buttonText}
        </a>
      </div>
    </div>
  `;
}

// Optionally load monetization script if configured
if (AFFILIATE_OFFERS.globalScriptUrl) {
  const script = document.createElement('script');
  script.src = AFFILIATE_OFFERS.globalScriptUrl;
  script.async = true;
  document.head.appendChild(script);
}
