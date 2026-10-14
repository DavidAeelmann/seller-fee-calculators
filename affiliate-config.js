/**
 * ============================================================================
 * CENTRAL AFFILIATE SWITCHBOARD
 * ============================================================================
 * Update your affiliate offers and monetization links in this single file.
 * Changes here are dynamically reflected across all 10 fee calculator pages!
 */

const AFFILIATE_OFFERS = {
  // Optional automated affiliate monetization networks (e.g., Skimlinks, Sovrn / VigLink)
  // Paste your script tag URL here if desired, or leave null.
  globalScriptUrl: null, 

  // E-COMMERCE OFFER (Etsy, eBay, TikTok Shop, Amazon FBA, Shopify vs Etsy, Printful)
  ecommerce: {
    badgeText: "Save up to 80% on Marketplace Fees",
    headline: "Stop Giving Away 10%–25% of Every Sale in Marketplace Fees",
    subtext: "Marketplaces take cuts on listing, transactions, payment processing, and ads. With Shopify, you own your store, keep your margins, and pay flat predictable rates.",
    buttonText: "Start a Shopify Store for $1/Month →",
    // >>> PASTE YOUR SHOPIFY AFFILIATE LINK BELOW <<<
    url: "https://www.shopify.com/free-trial",
    benefitBulletPoints: [
      "Keep 97%+ of your revenue instead of losing cuts to marketplace fees",
      "Full ownership of your customer list and brand identity",
      "Special partner promo: $1/month for your first 3 months"
    ]
  },

  // PAYMENTS & FX OFFER (Stripe, PayPal, Wise vs PayPal, Patreon vs Substack)
  payments: {
    badgeText: "Cut International Wire & FX Fees by 6x",
    headline: "Stop Losing 3% to 4.5% on Hidden Foreign Exchange Spreads",
    subtext: "Traditional platforms and PayPal markup mid-market exchange rates and charge exorbitant cross-border fees. Wise Business gives you true mid-market rates with transparent, minimal fees.",
    buttonText: "Open a Free Wise Business Account →",
    // >>> PASTE YOUR WISE AFFILIATE LINK BELOW <<<
    url: "https://wise.com/business",
    benefitBulletPoints: [
      "Receive local account details in USD, EUR, GBP, AUD, and 8+ currencies",
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

  const feeNote = (estimatedFeesPaid && estimatedFeesPaid > 0)
    ? `<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 mb-3">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"/></svg>
        You are paying approx. <strong>$${Number(estimatedFeesPaid).toFixed(2)}</strong> in fees on this volume
       </div>`
    : '';

  const bulletListHtml = offer.benefitBulletPoints && offer.benefitBulletPoints.length
    ? `<ul class="space-y-1.5 my-3 text-xs sm:text-sm text-slate-600">
        ${offer.benefitBulletPoints.map(item => `
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            <span>${item}</span>
          </li>`).join('')}
       </ul>`
    : '';

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-2 border-indigo-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="inline-block px-3 py-1 text-xs font-bold tracking-wide uppercase text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
          ${offer.badgeText}
        </span>
        <span class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Sponsored Partner</span>
      </div>
      
      ${feeNote}

      <h3 class="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
        ${offer.headline}
      </h3>
      
      <p class="text-sm text-slate-600 mt-2">
        ${offer.subtext}
      </p>

      ${bulletListHtml}

      <div class="mt-4 pt-3 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span class="text-xs text-slate-500 text-center sm:text-left">
          Free setup • No long-term contracts • Instant access
        </span>
        <a href="${offer.url}" target="_blank" rel="noopener sponsored" 
           class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md hover:shadow-indigo-200 transition-all text-center">
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
