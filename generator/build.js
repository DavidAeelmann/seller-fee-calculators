// Node script to build the complete, robust, SEO-optimized 11 HTML pages
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const calculators = [
  {
    slug: 'etsy-fee-calculator.html',
    title: 'Etsy Fee Calculator 2026: Listing, Transaction & Ad Profit Calculator',
    shortTitle: 'Etsy Fee Calculator',
    metaDesc: 'Accurately calculate your Etsy seller fees, listing costs, payment processing, transaction cut, and offsite ad fees. See real take-home net profit and margins.',
    category: 'ecommerce',
    tag: 'Marketplace',
    icon: '🛍️',
    badge: 'Updated for 2026',
    description: 'Calculates Etsy $0.20 listing fee, 6.5% transaction fee on item + shipping, 3% + $0.25 payment processing, and optional 12% or 15% offsite ads.',
    inputs: [
      { id: 'salePrice', label: 'Item Sale Price ($)', type: 'number', val: '45.00', step: '0.01' },
      { id: 'shippingCharged', label: 'Shipping Charged to Buyer ($)', type: 'number', val: '5.00', step: '0.01' },
      { id: 'itemCost', label: 'Item Cost / COGS ($)', type: 'number', val: '12.00', step: '0.01' },
      { id: 'actualShipping', label: 'Actual Shipping & Packaging Cost ($)', type: 'number', val: '4.50', step: '0.01' },
      { 
        id: 'offsiteAds', 
        label: 'Offsite Ads Rate', 
        type: 'select', 
        val: 'none', 
        options: [
          { val: 'none', text: 'No Offsite Ads (0%)' },
          { val: 'opted', text: 'Optional Offsite Ads (15%)' },
          { val: 'mandatory', text: 'Mandatory Offsite Ads (12% - >$10k/yr)' }
        ] 
      },
      { id: 'listingRenewals', label: 'Listing Fee ($0.20 per item/renewal)', type: 'number', val: '1', step: '1' }
    ],
    calcLogic: `
      const price = parseFloat(document.getElementById('salePrice').value) || 0;
      const shipCharged = parseFloat(document.getElementById('shippingCharged').value) || 0;
      const cogs = parseFloat(document.getElementById('itemCost').value) || 0;
      const shipCost = parseFloat(document.getElementById('actualShipping').value) || 0;
      const adType = document.getElementById('offsiteAds').value;
      const renewals = parseInt(document.getElementById('listingRenewals').value) || 1;

      const grossRevenue = price + shipCharged;
      const listingFee = renewals * 0.20;
      const transactionFee = grossRevenue * 0.065;
      const paymentFee = (grossRevenue * 0.03) + 0.25;
      
      let adRate = 0;
      if (adType === 'opted') adRate = 0.15;
      if (adType === 'mandatory') adRate = 0.12;
      const offsiteAdFee = grossRevenue * adRate;

      const totalFees = listingFee + transactionFee + paymentFee + offsiteAdFee;
      const totalCosts = cogs + shipCost;
      const netProfit = grossRevenue - totalFees - totalCosts;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts,
        netProfit,
        margin,
        feeBreakdown: [
          { label: 'Etsy Listing Fee ($0.20)', amount: listingFee },
          { label: 'Transaction Fee (6.5% on item + ship)', amount: transactionFee },
          { label: 'Etsy Payments Processing (3% + $0.25)', amount: paymentFee },
          { label: 'Offsite Ads Fee (' + (adRate * 100) + '%)', amount: offsiteAdFee }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">How Etsy Seller Fees Work in 2026</h2>
      <p class="text-slate-600 mb-4">Selling on Etsy involves multiple layers of direct and indirect selling charges. When you list and sell a handmade, vintage, or craft supply product, Etsy deducts fees from your total buyer transaction balance before depositing funds into your seller bank account.</p>
      
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">1. Listing Fee ($0.20 USD)</h3>
          <p class="text-xs text-slate-600">A flat $0.20 fee is charged whenever you publish a listing or when an item sells and automatically renews. Listings expire after 4 months if unsold.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">2. Transaction Fee (6.5%)</h3>
          <p class="text-xs text-slate-600">Etsy takes a 6.5% fee on the total charge to the customer, including both the product retail price and any shipping and gift wrapping charges.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">3. Payment Processing (3% + $0.25)</h3>
          <p class="text-xs text-slate-600">For US sellers using Etsy Payments, Etsy charges 3% of the gross sale total plus a flat $0.25 fixed order processing fee.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">4. Offsite Ads (12% to 15%)</h3>
          <p class="text-xs text-slate-600">If Etsy advertises your item on Google, Facebook, or Pinterest and a sale occurs within 30 days, you pay an additional 15% (optional for stores under $10,000/yr) or 12% mandatory (stores over $10,000/yr).</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Real-World Worked Example</h3>
      <p class="text-slate-600 mb-3">Suppose you sell a custom leather wallet for <strong>$50.00</strong> and charge <strong>$5.00</strong> for domestic shipping. Your production materials cost is $15.00, and actual shipping label is $4.50. Let's calculate your fees without offsite ads:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-600 mb-6">
        <li><strong>Gross Revenue:</strong> $50.00 + $5.00 = $55.00</li>
        <li><strong>Listing Fee:</strong> $0.20</li>
        <li><strong>Transaction Fee (6.5% of $55.00):</strong> $3.58</li>
        <li><strong>Etsy Payment Processing (3% of $55.00 + $0.25):</strong> $1.90</li>
        <li><strong>Total Etsy Fees:</strong> $0.20 + $3.58 + $1.90 = <strong>$5.68 (10.33% of revenue)</strong></li>
        <li><strong>Cost of Goods & Postage:</strong> $15.00 + $4.50 = $19.50</li>
        <li><strong>Your Final Net Profit:</strong> $55.00 - $5.68 - $19.50 = <strong>$29.82 (54.2% Net Margin)</strong></li>
      </ul>
    `,
    faqs: [
      { q: "Does Etsy charge transaction fees on the shipping cost?", a: "Yes. Etsy charges the 6.5% transaction fee on the full order total paid by the customer, which explicitly includes the shipping fee charged and any gift wrapping options." },
      { q: "Can I opt out of Etsy Offsite Ads?", a: "If your Etsy shop has earned less than $10,000 USD in any consecutive 12-month period, you can choose to opt out in your shop settings. However, once your shop surpasses $10,000 in trailing 12-month revenue, participation is mandatory for the lifetime of your shop at a discounted 12% fee." },
      { q: "When does Etsy charge the $0.20 listing fee?", a: "The $0.20 listing fee is billed immediately when you create or renew a listing. If you list an item with a quantity of 5, you are billed $0.20 initially, and another $0.20 each time one sells and auto-renews until inventory reaches zero." },
      { q: "Why should Etsy sellers consider opening an independent Shopify store?", a: "Etsy fees consume roughly 10% to 25% of top-line revenue per transaction. By launching an independent Shopify storefront, you pay a flat monthly plan plus standard 2.9% + $0.30 payment processing, allowing high-volume sellers to retain up to 80% more profit." }
    ]
  },
  {
    slug: 'shopify-vs-etsy-calculator.html',
    title: 'Shopify vs Etsy Fee Calculator: Monthly Profit & Cost Comparison',
    shortTitle: 'Shopify vs Etsy Comparison',
    metaDesc: 'Compare your exact monthly selling costs on Shopify vs Etsy. See side-by-side break-even points, transaction fee differences, and how much profit you keep.',
    category: 'ecommerce',
    tag: 'Platform Comparison',
    icon: '⚖️',
    badge: 'Side-by-Side Analysis',
    description: 'Interactive comparison between Etsy listing + transaction cuts vs Shopify flat subscription ($39/mo Basic) + payment processing.',
    inputs: [
      { id: 'monthlyOrders', label: 'Monthly Orders (Volume)', type: 'number', val: '120', step: '1' },
      { id: 'avgOrderValue', label: 'Average Order Value ($)', type: 'number', val: '45.00', step: '1' },
      { id: 'cogsPerOrder', label: 'Product & Shipping Cost per Order ($)', type: 'number', val: '16.00', step: '0.50' },
      { 
        id: 'shopifyPlan', 
        label: 'Shopify Plan', 
        type: 'select', 
        val: 'basic', 
        options: [
          { val: 'starter', text: 'Shopify Starter ($5/mo + 5%)' },
          { val: 'basic', text: 'Shopify Basic ($39/mo + 2.9% + 30¢)' },
          { val: 'shopify', text: 'Shopify Plan ($105/mo + 2.7% + 30¢)' },
          { val: 'advanced', text: 'Shopify Advanced ($399/mo + 2.5% + 30¢)' }
        ] 
      },
      { id: 'etsyAdPct', label: 'Etsy Offsite Ads Rate (%)', type: 'number', val: '0', step: '1' }
    ],
    calcLogic: `
      const orders = parseInt(document.getElementById('monthlyOrders').value) || 0;
      const aov = parseFloat(document.getElementById('avgOrderValue').value) || 0;
      const cogs = parseFloat(document.getElementById('cogsPerOrder').value) || 0;
      const plan = document.getElementById('shopifyPlan').value;
      const adRate = (parseFloat(document.getElementById('etsyAdPct').value) || 0) / 100;

      const grossRevenue = orders * aov;
      const totalCogs = orders * cogs;

      // Etsy Fees
      const etsyListing = orders * 0.20;
      const etsyTx = grossRevenue * 0.065;
      const etsyPay = (grossRevenue * 0.03) + (orders * 0.25);
      const etsyAds = grossRevenue * adRate;
      const totalEtsyFees = etsyListing + etsyTx + etsyPay + etsyAds;
      const etsyProfit = grossRevenue - totalEtsyFees - totalCogs;

      // Shopify Fees
      let shopifySub = 39;
      let shopifyRate = 0.029;
      let shopifyFixed = 0.30;
      if (plan === 'starter') { shopifySub = 5; shopifyRate = 0.05; shopifyFixed = 0.30; }
      else if (plan === 'shopify') { shopifySub = 105; shopifyRate = 0.027; shopifyFixed = 0.30; }
      else if (plan === 'advanced') { shopifySub = 399; shopifyRate = 0.025; shopifyFixed = 0.30; }

      const shopifyPay = (grossRevenue * shopifyRate) + (orders * shopifyFixed);
      const totalShopifyFees = shopifySub + shopifyPay;
      const shopifyProfit = grossRevenue - totalShopifyFees - totalCogs;
      const difference = shopifyProfit - etsyProfit;

      return {
        grossRevenue,
        totalFees: totalEtsyFees,
        totalCosts: totalShopifyFees,
        netProfit: difference,
        margin: grossRevenue > 0 ? (shopifyProfit / grossRevenue) * 100 : 0,
        customMetrics: [
          { label: 'Etsy Total Monthly Fees', val: '$' + totalEtsyFees.toFixed(2), color: 'text-amber-600' },
          { label: 'Shopify Total Monthly Fees', val: '$' + totalShopifyFees.toFixed(2), color: 'text-emerald-600' },
          { label: 'Etsy Monthly Take-Home', val: '$' + etsyProfit.toFixed(2), color: 'text-slate-800' },
          { label: 'Shopify Monthly Take-Home', val: '$' + shopifyProfit.toFixed(2), color: 'text-indigo-600' }
        ],
        feeBreakdown: [
          { label: 'Etsy Listing + Transaction + Processing', amount: totalEtsyFees },
          { label: 'Shopify Subscription + Payment Processing', amount: totalShopifyFees }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Shopify vs Etsy: Which Makes You More Money?</h2>
      <p class="text-slate-600 mb-4">Choosing between Etsy and Shopify is not just a platform preference—it is a foundational financial decision for your e-commerce business. Etsy acts as a high-traffic curated marketplace that charges substantial variable commission on every single item sold. Shopify, by contrast, gives you a standalone online store with a predictable flat subscription fee and standard merchant processing.</p>

      <div class="overflow-x-auto mb-8">
        <table class="w-full text-left text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 text-slate-700">
            <tr>
              <th class="p-3 border-b border-slate-200">Fee Component</th>
              <th class="p-3 border-b border-slate-200">Etsy Marketplace</th>
              <th class="p-3 border-b border-slate-200">Shopify Store</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-slate-600">
            <tr>
              <td class="p-3 font-semibold">Monthly Subscription</td>
              <td class="p-3">$0/month (standard seller account)</td>
              <td class="p-3">$39/month (Basic plan, or $1/mo promo)</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold">Listing / Creation Fees</td>
              <td class="p-3">$0.20 per item listing / renewal</td>
              <td class="p-3">Unlimited free product listings</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold">Platform Commission</td>
              <td class="p-3">6.5% on item + shipping total</td>
              <td class="p-3">0% extra when using Shopify Payments</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold">Credit Card Processing</td>
              <td class="p-3">3.0% + $0.25 per transaction</td>
              <td class="p-3">2.9% + $0.30 per transaction</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold">Customer Data Ownership</td>
              <td class="p-3">No direct customer email ownership</td>
              <td class="p-3">100% full email & marketing ownership</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">The Break-Even Formula</h3>
      <p class="text-slate-600 mb-3">At what sales volume does Shopify beat Etsy in net profit? Because Etsy takes approximately <strong>9.5% to 10% + $0.45</strong> per sale and Shopify Basic costs <strong>$39/mo + 2.9% + $0.30</strong>, the mathematical break-even threshold typically sits between <strong>$650 to $800 in monthly sales volume</strong>.</p>
      <p class="text-slate-600 mb-6">Once your store reliably exceeds $1,000 per month in gross sales, staying exclusively on Etsy costs you hundreds of dollars in unnecessary marketplace commissions every quarter.</p>
    `,
    faqs: [
      { q: "At what monthly revenue should I switch from Etsy to Shopify?", a: "Most sellers find the break-even threshold is between $700 and $1,000 per month in gross revenue. Above that level, Shopify's flat $39/month plan generates higher net profit than Etsy's 6.5% transaction cut." },
      { q: "Can I sell on both Etsy and Shopify simultaneously?", a: "Yes. Many successful merchants use Etsy as a brand discovery channel while directing repeat buyers, email subscribers, and wholesale inquiries to their independent Shopify store where they earn higher margins." },
      { q: "Does Shopify charge transaction fees if I use third-party payment gateways?", a: "Shopify charges 0% transaction fees when you use Shopify Payments. If you choose an external payment gateway like an independent merchant processor, Shopify charges 2.0% on Basic, 1.0% on Shopify, and 0.5% on Advanced." },
      { q: "Does Shopify provide built-in buyer traffic like Etsy?", a: "No. Unlike Etsy's internal search engine, Shopify is a standalone storefront. You are responsible for driving your own traffic through SEO, organic social media, email marketing, or paid advertising." }
    ]
  },
  {
    slug: 'tiktok-shop-fee-calculator.html',
    title: 'TikTok Shop Fee Calculator 2026: Commission, Affiliate Cut & Net Profit',
    shortTitle: 'TikTok Shop Fee Calculator',
    metaDesc: 'Calculate TikTok Shop referral fees, creator affiliate commission cuts, shipping subsidies, and net seller profits accurately for 2026.',
    category: 'ecommerce',
    tag: 'Social Commerce',
    icon: '📱',
    badge: 'Updated Rates',
    description: 'Includes TikTok Shop 6% standard referral fee (with introductory tiers), affiliate creator cut, shipping allowances, and net margins.',
    inputs: [
      { id: 'retailPrice', label: 'Product Retail Price ($)', type: 'number', val: '35.00', step: '0.50' },
      { id: 'shippingCharged', label: 'Shipping Paid by Customer ($)', type: 'number', val: '0.00', step: '0.50' },
      { id: 'cogs', label: 'Item Manufacturing Cost / COGS ($)', type: 'number', val: '8.50', step: '0.10' },
      { id: 'shippingCost', label: 'Your Actual Fulfillment & Shipping Cost ($)', type: 'number', val: '4.80', step: '0.10' },
      { 
        id: 'ttCommissionRate', 
        label: 'TikTok Referral Fee Rate', 
        type: 'select', 
        val: '0.06', 
        options: [
          { val: '0.06', text: 'Standard Rate (6% + $0.30/order)' },
          { val: '0.08', text: 'Category Rate (8% + $0.30/order)' },
          { val: '0.02', text: 'Promotional New Seller Rate (2%)' }
        ] 
      },
      { id: 'creatorCut', label: 'Creator Affiliate Commission (%)', type: 'number', val: '15', step: '1' }
    ],
    calcLogic: `
      const price = parseFloat(document.getElementById('retailPrice').value) || 0;
      const shipCharged = parseFloat(document.getElementById('shippingCharged').value) || 0;
      const cogs = parseFloat(document.getElementById('cogs').value) || 0;
      const shipCost = parseFloat(document.getElementById('shippingCost').value) || 0;
      const ttRate = parseFloat(document.getElementById('ttCommissionRate').value) || 0.06;
      const affiliatePct = (parseFloat(document.getElementById('creatorCut').value) || 0) / 100;

      const grossRevenue = price + shipCharged;
      const tiktokFee = (grossRevenue * ttRate) + 0.30;
      const creatorCommission = price * affiliatePct;
      const totalFees = tiktokFee + creatorCommission;
      const totalCosts = cogs + shipCost;
      const netProfit = grossRevenue - totalFees - totalCosts;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts,
        netProfit,
        margin,
        feeBreakdown: [
          { label: 'TikTok Shop Referral Fee', amount: tiktokFee },
          { label: 'Creator Affiliate Commission', amount: creatorCommission }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Understanding TikTok Shop Fees in 2026</h2>
      <p class="text-slate-600 mb-4">TikTok Shop has evolved rapidly into one of the highest-converting social commerce channels globally. However, seller fee structures have transitioned from early subsidized promotional rates to competitive standard platform commission models.</p>

      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Standard Commission</h3>
          <p class="text-xs text-slate-600">Most product categories operate on a <strong>6.0% commission + $0.30 fixed fee per order</strong>. Certain high-margin apparel categories may reach up to 8%.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Creator Affiliate Cut</h3>
          <p class="text-xs text-slate-600">If you recruit TikTok creators to post video reviews or host LIVE streams, you set an open affiliate commission (typically between 10% and 20%).</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Fulfillment by TikTok (FBT)</h3>
          <p class="text-xs text-slate-600">Using TikTok fulfillment centers introduces separate pick, pack, and warehousing storage charges comparable to Amazon Multi-Channel Fulfillment.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Sample Margin Breakdown</h3>
      <p class="text-slate-600 mb-3">Assume a trending beauty roller priced at <strong>$30.00</strong> with free shipping for the buyer. Your product sourcing cost is $6.00 and packaging/postage costs $4.50. You offer a 15% affiliate commission to TikTok creators:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-600 mb-6">
        <li><strong>TikTok Platform Cut (6% + $0.30):</strong> $1.80 + $0.30 = $2.10</li>
        <li><strong>Affiliate Influencer Commission (15%):</strong> $4.50</li>
        <li><strong>Total Slicing Fees:</strong> $6.60 (22.0% of retail price)</li>
        <li><strong>Product & Shipping Costs:</strong> $6.00 + $4.50 = $10.50</li>
        <li><strong>Net Take-Home Seller Profit:</strong> $30.00 - $6.60 - $10.50 = <strong>$12.90 (43.0% Net Margin)</strong></li>
      </ul>
    `,
    faqs: [
      { q: "What is the standard TikTok Shop referral fee in 2026?", a: "The standard fee for US merchants is 6% plus $0.30 per completed order across the majority of retail categories." },
      { q: "Do I have to pay creator affiliate commissions on organic sales?", a: "No. Creator affiliate commissions only apply when an order is directly attributed to a creator's tagged showcase, video tag, or LIVE broadcast link." },
      { q: "How does TikTok Shop handle shipping subsidies?", a: "TikTok frequently offers buyers free shipping coupons funded directly by TikTok. In these campaigns, sellers are reimbursed according to TikTok's agreed co-pay terms." },
      { q: "Can I connect my Shopify store to TikTok Shop?", a: "Yes. You can synchronize your product catalog, real-time inventory, and order fulfillment directly from your Shopify admin using the official TikTok sales channel app." }
    ]
  },
  {
    slug: 'ebay-final-value-calculator.html',
    title: 'eBay Final Value Fee Calculator 2026: Category Rates, Promoted Ads & Profit',
    shortTitle: 'eBay Final Value Calculator',
    metaDesc: 'Accurately calculate your eBay seller final value fees, insertion fees, promoted listing ad rates, and net seller profits across popular product categories.',
    category: 'ecommerce',
    tag: 'Marketplace',
    icon: '🏷️',
    badge: 'Category Breakdown',
    description: 'Calculates eBay Final Value Fees (13.25% standard + $0.30), insertion costs, optional promoted listing ad spend, and net profit.',
    inputs: [
      { id: 'itemSoldPrice', label: 'Item Sold Price ($)', type: 'number', val: '85.00', step: '1.00' },
      { id: 'shippingCharged', label: 'Shipping Charged to Buyer ($)', type: 'number', val: '8.50', step: '0.50' },
      { id: 'itemCost', label: 'Item Acquisition Cost ($)', type: 'number', val: '28.00', step: '1.00' },
      { id: 'actualShipping', label: 'Your Actual Shipping Cost ($)', type: 'number', val: '7.80', step: '0.50' },
      { 
        id: 'ebayCategory', 
        label: 'eBay Product Category', 
        type: 'select', 
        val: 'standard', 
        options: [
          { val: 'standard', text: 'Most Categories (13.25% + $0.30)' },
          { val: 'electronics', text: 'Computers & Consumer Electronics (9.0% + $0.30)' },
          { val: 'clothing', text: 'Clothing, Shoes & Accessories (13.25% + $0.30)' },
          { val: 'books', text: 'Books, Movies & Music (14.95% + $0.30)' },
          { val: 'guitars', text: 'Musical Instruments & Guitars (6.35% + $0.30)' }
        ] 
      },
      { id: 'promotedAdRate', label: 'Promoted Listings Ad Rate (%)', type: 'number', val: '4.0', step: '0.5' }
    ],
    calcLogic: `
      const soldPrice = parseFloat(document.getElementById('itemSoldPrice').value) || 0;
      const shipCharged = parseFloat(document.getElementById('shippingCharged').value) || 0;
      const cogs = parseFloat(document.getElementById('itemCost').value) || 0;
      const shipCost = parseFloat(document.getElementById('actualShipping').value) || 0;
      const cat = document.getElementById('ebayCategory').value;
      const adRate = (parseFloat(document.getElementById('promotedAdRate').value) || 0) / 100;

      let fvfRate = 0.1325;
      if (cat === 'electronics') fvfRate = 0.09;
      if (cat === 'books') fvfRate = 0.1495;
      if (cat === 'guitars') fvfRate = 0.0635;

      const grossRevenue = soldPrice + shipCharged;
      const fvfFee = (grossRevenue * fvfRate) + 0.30;
      const promotedAdFee = grossRevenue * adRate;
      const totalFees = fvfFee + promotedAdFee;
      const totalCosts = cogs + shipCost;
      const netProfit = grossRevenue - totalFees - totalCosts;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts,
        netProfit,
        margin,
        feeBreakdown: [
          { label: 'Final Value Fee (' + (fvfRate * 100).toFixed(2) + '% + $0.30)', amount: fvfFee },
          { label: 'Promoted Listings Ad Fee (' + (adRate * 100).toFixed(1) + '%)', amount: promotedAdFee }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">How eBay Final Value Fees (FVF) Work in 2026</h2>
      <p class="text-slate-600 mb-4">eBay operates on a consolidated Managed Payments system. Instead of paying PayPal separately, eBay collects a single comprehensive <strong>Final Value Fee (FVF)</strong> that covers both marketplace facilitation and payment processing fees.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Standard Rate Structure</h3>
          <p class="text-xs text-slate-600">For most standard consumer categories, eBay charges <strong>13.25% of the total amount of the sale</strong> (item price + shipping + sales tax collected) plus a <strong>$0.30 fixed fee per order</strong> (or $0.40 for orders under $10).</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Promoted Listings Standard</h3>
          <p class="text-xs text-slate-600">Promoted Listings Standard is a pay-per-sale advertising model. You choose an ad rate percentage (e.g., 2% to 10%), which is charged only when a buyer clicks your ad and purchases within 30 days.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Worked Example: Electronics vs Clothing</h3>
      <p class="text-slate-600 mb-3">If you sell a camera lens for $200 with $15 shipping, in Consumer Electronics your fee is 9.0% + $0.30 = $19.65. If that exact same dollar amount was a pair of designer boots (13.25%), your eBay fee would be $28.79. Knowing your category rate prevents margin surprises.</p>
    `,
    faqs: [
      { q: "Does eBay calculate fees on buyer sales tax?", a: "Yes. eBay calculates the Final Value Fee on the entire gross transaction total, which includes the item price, shipping charged to the buyer, and applicable state sales tax collected by eBay." },
      { q: "How many free listings do eBay sellers receive per month?", a: "Standard individual accounts without an eBay Store subscription typically receive 250 zero-insertion-fee listings per calendar month." },
      { q: "What is the fee if a buyer requests a cancellation?", a: "If you approve a full cancellation or refund, eBay credits back the variable portion of your Final Value Fee, though they retain the $0.30 fixed per-order fee." },
      { q: "How can high-volume eBay sellers reduce their fee percentage?", a: "Subscribing to an eBay Store (Basic, Premium, or Anchor) lowers category Final Value Fee percentages and grants quarterly coupon credits for branded shipping supplies." }
    ]
  },
  {
    slug: 'printful-dropshipping-calculator.html',
    title: 'Printful Profit & Fee Calculator: POD Base Cost, Shipping & Net Margins',
    shortTitle: 'Printful Dropshipping Calculator',
    metaDesc: 'Calculate Printful print-on-demand base manufacturing costs, shipping, sales platform fees, and exact net profit margins per item.',
    category: 'ecommerce',
    tag: 'Print-on-Demand',
    icon: '👕',
    badge: 'POD Profitability',
    description: 'Factoring Printful blank garment costs, DTG/embroidery fulfillment, shipping rates, and marketplace cuts (Etsy or Shopify).',
    inputs: [
      { id: 'sellingPrice', label: 'Retail Selling Price ($)', type: 'number', val: '29.99', step: '1.00' },
      { id: 'shippingCharged', label: 'Shipping Charged to Customer ($)', type: 'number', val: '4.99', step: '0.50' },
      { id: 'printfulBaseCost', label: 'Printful Base Product Cost ($)', type: 'number', val: '11.50', step: '0.50' },
      { id: 'printfulShipping', label: 'Printful Shipping Charge ($)', type: 'number', val: '4.79', step: '0.10' },
      { 
        id: 'storePlatform', 
        label: 'Connected Sales Channel', 
        type: 'select', 
        val: 'etsy', 
        options: [
          { val: 'etsy', text: 'Etsy (6.5% + 3% + 45¢)' },
          { val: 'shopify', text: 'Shopify (2.9% + 30¢)' },
          { val: 'direct', text: 'Direct Website / WooCommerce (2.9% + 30¢)' }
        ] 
      },
      { id: 'marketingSpend', label: 'Ad Spend / CAC per Sale ($)', type: 'number', val: '4.00', step: '0.50' }
    ],
    calcLogic: `
      const price = parseFloat(document.getElementById('sellingPrice').value) || 0;
      const shipCharged = parseFloat(document.getElementById('shippingCharged').value) || 0;
      const baseCost = parseFloat(document.getElementById('printfulBaseCost').value) || 0;
      const baseShipping = parseFloat(document.getElementById('printfulShipping').value) || 0;
      const platform = document.getElementById('storePlatform').value;
      const adSpend = parseFloat(document.getElementById('marketingSpend').value) || 0;

      const grossRevenue = price + shipCharged;
      let platformFee = 0;
      if (platform === 'etsy') {
        platformFee = (grossRevenue * 0.065) + (grossRevenue * 0.03) + 0.45;
      } else {
        platformFee = (grossRevenue * 0.029) + 0.30;
      }

      const fulfillmentCost = baseCost + baseShipping;
      const totalFees = platformFee + adSpend;
      const totalCosts = fulfillmentCost;
      const netProfit = grossRevenue - platformFee - fulfillmentCost - adSpend;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts,
        netProfit,
        margin,
        feeBreakdown: [
          { label: 'Sales Channel Processing & Platform Fee', amount: platformFee },
          { label: 'Advertising / Acquisition Cost per Sale', amount: adSpend },
          { label: 'Printful Blank & Printing Fulfillment', amount: baseCost },
          { label: 'Printful Shipping & Postage', amount: baseShipping }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">How to Price Print-on-Demand Products for Profit</h2>
      <p class="text-slate-600 mb-4">Print-on-demand (POD) eliminates upfront bulk inventory risks, but operating margins can quickly erode if you fail to account for the triangular fee stack: base blank garment production, fulfillment shipping, and marketplace transaction deductions.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Printful Base Pricing</h3>
          <p class="text-xs text-slate-600">Base prices vary based on garment quality (e.g. Gildan 64000 vs Bella+Canvas 3001) and print placement (front, back, sleeve, or inside label prints).</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Platform Multiplier</h3>
          <p class="text-xs text-slate-600">Selling POD via Etsy takes ~10% off top-line revenue, whereas hosting on your own Shopify storefront cuts variable deductions to ~3%, preserving vital margin.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Pricing Strategy Formula</h3>
      <p class="text-slate-600 mb-3">To maintain a healthy <strong>30% net profit margin</strong> after advertising and platform fees, utilize the targeted retail markup formula:</p>
      <div class="p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 mb-6">
        Minimum Retail Price = (Printful Base + Shipping + Target Profit) / (1 - Platform Fee % - Target Ad Margin %)
      </div>
    `,
    faqs: [
      { q: "Is Printful dropshipping profitable in 2026?", a: "Yes, provided you target retail prices between $28 and $36 for custom graphic tees and hoodies above $55. Attempting to sell $18 T-shirts leaves zero margin after production and marketing." },
      { q: "Does Printful charge a monthly subscription fee?", a: "Printful is free to connect with zero recurring subscription fees. You only pay when an end customer places an order that triggers manufacturing and fulfillment." },
      { q: "Should I charge separate shipping or offer Free Shipping?", a: "Testing consistently indicates that folding the $4.79 shipping cost into the product retail price (e.g. $32 with Free Shipping instead of $27 + $5 shipping) yields higher checkout completion rates." },
      { q: "Why do POD sellers move from Etsy to Shopify?", a: "Because POD margins are already compressed by base manufacturing costs, eliminating Etsy's 6.5% transaction cut by running on Shopify significantly increases net profitability per order." }
    ]
  },
  {
    slug: 'amazon-fba-margin-calculator.html',
    title: 'Amazon FBA Fee & Net Profit Calculator 2026: Referral Fees & Fulfillment',
    shortTitle: 'Amazon FBA Margin Calculator',
    metaDesc: 'Calculate Amazon FBA fulfillment fees, category referral cuts, inbound shipping, storage costs, and net ROI for Amazon private label and wholesale sellers.',
    category: 'ecommerce',
    tag: 'Fulfillment by Amazon',
    icon: '📦',
    badge: 'FBA Profit Model',
    description: 'Comprehensive calculation of Amazon 15% referral fee, size-tier FBA pick & pack fees, inventory storage, and net ROI.',
    inputs: [
      { id: 'amazonPrice', label: 'Amazon Selling Price ($)', type: 'number', val: '27.99', step: '0.50' },
      { id: 'cogsPerUnit', label: 'Unit Sourcing / COGS ($)', type: 'number', val: '5.20', step: '0.10' },
      { id: 'inboundFreight', label: 'Inbound Freight per Unit to Amazon ($)', type: 'number', val: '1.10', step: '0.05' },
      { 
        id: 'sizeTier', 
        label: 'FBA Size & Weight Tier', 
        type: 'select', 
        val: 'small_std', 
        options: [
          { val: 'small_std', text: 'Small Standard (<16 oz) - ~$3.86' },
          { val: 'large_std_1lb', text: 'Large Standard (1 to 2 lbs) - ~$5.40' },
          { val: 'large_std_3lb', text: 'Large Standard (2 to 3 lbs) - ~$6.10' },
          { val: 'oversize', text: 'Small Oversize - ~$10.50+' }
        ] 
      },
      { id: 'referralRate', label: 'Referral Fee Rate (%)', type: 'number', val: '15', step: '1' },
      { id: 'ppcSpend', label: 'Sponsored Ads (PPC) per Unit ($)', type: 'number', val: '3.50', step: '0.25' }
    ],
    calcLogic: `
      const price = parseFloat(document.getElementById('amazonPrice').value) || 0;
      const cogs = parseFloat(document.getElementById('cogsPerUnit').value) || 0;
      const freight = parseFloat(document.getElementById('inboundFreight').value) || 0;
      const tier = document.getElementById('sizeTier').value;
      const refRate = (parseFloat(document.getElementById('referralRate').value) || 15) / 100;
      const ppc = parseFloat(document.getElementById('ppcSpend').value) || 0;

      let fbaPickPack = 3.86;
      if (tier === 'large_std_1lb') fbaPickPack = 5.40;
      if (tier === 'large_std_3lb') fbaPickPack = 6.10;
      if (tier === 'oversize') fbaPickPack = 10.50;

      const grossRevenue = price;
      const referralFee = price * refRate;
      const totalFees = referralFee + fbaPickPack + ppc;
      const totalCosts = cogs + freight;
      const netProfit = grossRevenue - totalFees - totalCosts;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
      const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts,
        netProfit,
        margin,
        customMetrics: [
          { label: 'Return on Investment (ROI)', val: roi.toFixed(1) + '%', color: roi >= 100 ? 'text-emerald-600' : 'text-slate-800' }
        ],
        feeBreakdown: [
          { label: 'Amazon Referral Fee (' + (refRate * 100) + '%)', amount: referralFee },
          { label: 'FBA Pick & Pack Fulfillment Fee', amount: fbaPickPack },
          { label: 'Amazon PPC Advertising per Sale', amount: ppc },
          { label: 'Product Sourcing + Inbound Freight', amount: totalCosts }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Deconstructing Amazon FBA Fee Architecture</h2>
      <p class="text-slate-600 mb-4">Fulfillment by Amazon (FBA) grants instant Prime badge eligibility and world-class logistics, but success requires meticulously accounting for the multi-tiered Amazon fee structure.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">1. Referral Fee (Typically 15%)</h3>
          <p class="text-xs text-slate-600">Amazon charges a category commission on every product sold. In most major categories (Home, Kitchen, Toys, Beauty), this fee is 15% with a minimum $0.30 fee.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">2. FBA Fulfillment Fee</h3>
          <p class="text-xs text-slate-600">This unit fee covers picking, packing, shipping, customer service, and product returns handling. It is calculated strictly on packaged unit weight and dimensions.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">The "Rule of Thirds" for Amazon Private Label</h3>
      <p class="text-slate-600 mb-6">Experienced Amazon FBA brand builders often target the classic rule of thirds: <strong>1/3 for manufacturing and landed freight</strong>, <strong>1/3 for Amazon referral & FBA fees</strong>, and <strong>1/3 for marketing and net profit</strong>. If your Amazon fees exceed 45% of your retail price, package redesign or tier reclassification is required.</p>
    `,
    faqs: [
      { q: "What is an Amazon FBA Referral Fee?", a: "The referral fee is Amazon's sales commission for listing your product on their marketplace, generally 15% of the total selling price." },
      { q: "What determines my FBA fulfillment fee?", a: "FBA fulfillment fees are determined primarily by item dimensions (Small Standard, Large Standard, or Oversize) and billable unit shipping weight." },
      { q: "What is the monthly Amazon Professional Seller subscription?", a: "The Professional selling account costs $39.99 per month, allowing unlimited product listings without the $0.99 per-item fee charged to Individual accounts." },
      { q: "How can I avoid Amazon aged inventory surcharges?", a: "Keep inventory turn rates healthy (under 90 days of supply) to avoid Amazon's aged inventory surcharges that apply to units stored longer than 180 days." }
    ]
  },
  {
    slug: 'stripe-fee-calculator.html',
    title: 'Stripe Fee Calculator 2026: Domestic, International & "How Much to Charge"',
    shortTitle: 'Stripe Fee Calculator',
    metaDesc: 'Accurate Stripe fee calculator for 2.9% + $0.30 domestic, international cards, billing, and reverse calculation: how much to charge to receive exactly $X.',
    category: 'payments',
    tag: 'Payment Processing',
    icon: '💳',
    badge: 'Reverse Calculator',
    description: 'Calculate Stripe credit card processing fees, international card surcharges (1.5%), currency conversion (1%), and reverse net target pricing.',
    inputs: [
      { id: 'targetAmount', label: 'Amount You Want to Charge or Receive ($)', type: 'number', val: '100.00', step: '5.00' },
      { 
        id: 'calcMode', 
        label: 'Calculation Direction', 
        type: 'select', 
        val: 'forward', 
        options: [
          { val: 'forward', text: 'I am charging this amount (Calculate Fees & Net)' },
          { val: 'reverse', text: 'I need to receive this exact amount (Calculate What to Invoice)' }
        ] 
      },
      { 
        id: 'cardOrigin', 
        label: 'Card Type & Location', 
        type: 'select', 
        val: 'domestic', 
        options: [
          { val: 'domestic', text: 'Standard US Domestic Card (2.9% + 30¢)' },
          { val: 'international', text: 'International Card (+1.5% = 4.4% + 30¢)' },
          { val: 'international_fx', text: 'International + Currency Conversion (+2.5% = 5.4% + 30¢)' }
        ] 
      },
      { 
        id: 'stripeBilling', 
        label: 'Stripe Billing / Invoicing Add-on', 
        type: 'select', 
        val: '0', 
        options: [
          { val: '0', text: 'Standard Checkout (0%)' },
          { val: '0.005', text: 'Stripe Invoicing / Recurring Billing (+0.5%)' }
        ] 
      }
    ],
    calcLogic: `
      const rawAmount = parseFloat(document.getElementById('targetAmount').value) || 0;
      const mode = document.getElementById('calcMode').value;
      const cardType = document.getElementById('cardOrigin').value;
      const billingRate = parseFloat(document.getElementById('stripeBilling').value) || 0;

      let basePct = 0.029;
      if (cardType === 'international') basePct = 0.044;
      if (cardType === 'international_fx') basePct = 0.054;
      const totalPct = basePct + billingRate;
      const fixedFee = 0.30;

      let grossRevenue = 0;
      let stripeFee = 0;
      let netTakeHome = 0;

      if (mode === 'forward') {
        grossRevenue = rawAmount;
        stripeFee = (grossRevenue * totalPct) + fixedFee;
        netTakeHome = grossRevenue - stripeFee;
      } else {
        // Reverse formula: To receive N net: Gross = (N + fixedFee) / (1 - totalPct)
        netTakeHome = rawAmount;
        grossRevenue = (netTakeHome + fixedFee) / (1 - totalPct);
        stripeFee = grossRevenue - netTakeHome;
      }

      const margin = grossRevenue > 0 ? (netTakeHome / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees: stripeFee,
        totalCosts: 0,
        netProfit: netTakeHome,
        margin,
        customMetrics: [
          { label: mode === 'reverse' ? 'Recommended Invoice Amount' : 'Customer Pays', val: '$' + grossRevenue.toFixed(2), color: 'text-indigo-600' },
          { label: 'Stripe Takes', val: '$' + stripeFee.toFixed(2), color: 'text-rose-600' },
          { label: 'You Keep in Bank', val: '$' + netTakeHome.toFixed(2), color: 'text-emerald-600' }
        ],
        feeBreakdown: [
          { label: 'Stripe Percentage Fee (' + (totalPct * 100).toFixed(2) + '%)', amount: grossRevenue * totalPct },
          { label: 'Stripe Fixed Transaction Fee', amount: fixedFee }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Stripe Pricing & Reverse Fee Formula</h2>
      <p class="text-slate-600 mb-4">Stripe powers checkout flows across millions of websites. While domestic transactions are straightforward at <strong>2.9% + $0.30</strong>, accepting international cards or multi-currency payments adds incremental percentage markups that reduce your net payout.</p>

      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Domestic Cards</h3>
          <p class="text-xs text-slate-600">2.9% + $0.30 per successful card charge for standard US-issued Visa, Mastercard, American Express, and Discover cards.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Cross-Border Cards</h3>
          <p class="text-xs text-slate-600">Cards issued outside your Stripe country incur an additional <strong>+1.5% fee</strong> (totaling 4.4% + $0.30).</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Currency Conversion</h3>
          <p class="text-xs text-slate-600">If conversion is required, Stripe assesses an additional <strong>1% currency conversion fee</strong> on top of card rates.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Reverse Calculation: How to Receive Exactly $X</h3>
      <p class="text-slate-600 mb-3">When invoicing a client for $1,000, simply adding 2.9% ($29) to the invoice ($1,029) leaves you short, because Stripe will deduct 2.9% from the new $1,029 total! To receive <em>exactly</em> $1,000, use the mathematical reverse formula:</p>
      <div class="p-4 bg-slate-100 rounded-lg text-sm font-mono text-slate-800 mb-6">
        Invoice Amount = (Desired Net + $0.30) / (1 - 0.029)<br>
        Invoice Amount = ($1,000.30) / 0.971 = <strong>$1,030.18</strong>
      </div>
    `,
    faqs: [
      { q: "What is Stripe's standard fee in the United States?", a: "Stripe's standard pricing in the US is 2.9% plus $0.30 per successful credit or debit card charge." },
      { q: "Does Stripe refund processing fees when I issue a customer refund?", a: "No. Stripe retains the original transaction fee (both the percentage and fixed fee) when you refund a customer payment." },
      { q: "How much extra does Stripe charge for international cards?", a: "Stripe adds a 1.5% fee for international cards, plus an additional 1% if currency conversion is required." },
      { q: "How can I avoid Stripe international currency conversion fees?", a: "By connecting a Wise Business multi-currency account, you can receive foreign funds natively without suffering Stripe's automatic currency conversion markup." }
    ]
  },
  {
    slug: 'paypal-international-calculator.html',
    title: 'PayPal Fee Calculator: Commercial, Cross-Border & FX Conversion Fees',
    shortTitle: 'PayPal International Calculator',
    metaDesc: 'Calculate PayPal merchant transaction fees, international cross-border markups (1.5%), and 3.5%–4.0% foreign exchange spread deductions.',
    category: 'payments',
    tag: 'International Payments',
    icon: '🌐',
    badge: 'Cross-Border & FX',
    description: 'Calculates PayPal standard 3.49% + $0.49, 1.5% cross-border surcharge, and hidden 4% currency conversion spread loss.',
    inputs: [
      { id: 'paymentAmount', label: 'Payment Amount ($)', type: 'number', val: '250.00', step: '10.00' },
      { 
        id: 'ppTxType', 
        label: 'PayPal Transaction Type', 
        type: 'select', 
        val: 'cross_border', 
        options: [
          { val: 'domestic_checkout', text: 'Domestic PayPal Checkout (3.49% + $0.49)' },
          { val: 'domestic_card', text: 'Domestic Card Processing (2.99% + $0.49)' },
          { val: 'cross_border', text: 'International / Cross-Border (4.99% + $0.49)' }
        ] 
      },
      { 
        id: 'currencySpread', 
        label: 'Currency Conversion Required?', 
        type: 'select', 
        val: '4.0', 
        options: [
          { val: '0', text: 'No FX Conversion (Same Currency)' },
          { val: '3.0', text: 'Standard 3.0% FX Spread' },
          { val: '4.0', text: 'Standard International 4.0% FX Spread' }
        ] 
      }
    ],
    calcLogic: `
      const amount = parseFloat(document.getElementById('paymentAmount').value) || 0;
      const txType = document.getElementById('ppTxType').value;
      const fxSpreadPct = (parseFloat(document.getElementById('currencySpread').value) || 0) / 100;

      let pctRate = 0.0349;
      let fixedFee = 0.49;
      if (txType === 'domestic_card') pctRate = 0.0299;
      if (txType === 'cross_border') pctRate = 0.0499;

      const grossRevenue = amount;
      const transactionFee = (grossRevenue * pctRate) + fixedFee;
      const fxLoss = (grossRevenue - transactionFee) * fxSpreadPct;
      const totalFees = transactionFee + fxLoss;
      const netProfit = grossRevenue - totalFees;
      const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees,
        totalCosts: 0,
        netProfit,
        margin,
        feeBreakdown: [
          { label: 'PayPal Transaction Fee (' + (pctRate * 100).toFixed(2) + '% + $' + fixedFee.toFixed(2) + ')', amount: transactionFee },
          { label: 'Hidden Currency Conversion Spread (' + (fxSpreadPct * 100).toFixed(1) + '%)', amount: fxLoss }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">The Real Cost of International PayPal Payments</h2>
      <p class="text-slate-600 mb-4">PayPal is globally recognized, but cross-border freelancers, contractors, and merchants often forfeit <strong>8% to 10% of their gross earnings</strong> when collecting international client payments due to combined transaction fees and currency conversion markups.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Cross-Border Surcharge (1.50%)</h3>
          <p class="text-xs text-slate-600">PayPal adds an automatic 1.50% cross-border fee whenever the sender's account is registered in a country outside the receiver's jurisdiction, raising merchant fees to ~4.99%.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Hidden FX Spread (3.0% to 4.5%)</h3>
          <p class="text-xs text-slate-600">Rather than charging a transparent line-item fee for exchanging foreign currencies, PayPal builds a hefty 3% to 4.5% spread into their proprietary exchange rate versus the real mid-market benchmark.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Worked Case Study: $1,000 International Invoice</h3>
      <p class="text-slate-600 mb-3">When a European or British client pays your US PayPal account $1,000 USD converted to GBP/EUR:</p>
      <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-600 mb-6">
        <li><strong>Stated PayPal Merchant Fee (4.99% + $0.49):</strong> $50.39</li>
        <li><strong>4.0% FX Conversion Mark-Down:</strong> $37.98</li>
        <li><strong>Total Money Lost:</strong> <strong>$88.37 (8.84% Total Loss)</strong></li>
        <li><strong>Actual Net Received:</strong> $911.63</li>
      </ul>
    `,
    faqs: [
      { q: "Why is PayPal's exchange rate different from Google or Reuters?", a: "Google displays the mid-market rate (the real wholesale exchange rate). PayPal marks up this rate by roughly 3.0% to 4.5% as an undisclosed currency conversion profit margin." },
      { q: "What is PayPal's cross-border fee?", a: "PayPal assesses an additional 1.50% surcharge for commercial transactions sent across international borders." },
      { q: "Can I receive foreign currency in PayPal without converting?", a: "Yes, you can hold multiple currencies in your PayPal balance, but withdrawing those funds to your local bank account almost always triggers PayPal's mandatory conversion rate." },
      { q: "What is the best alternative to PayPal for international invoices?", a: "Wise Business enables you to invoice clients in their local currency and convert at true mid-market rates with a tiny 0.4%–0.6% transparent fee, saving up to 85% compared to PayPal." }
    ]
  },
  {
    slug: 'wise-vs-paypal-calculator.html',
    title: 'Wise vs PayPal Calculator: International Invoice & FX Fee Comparison',
    shortTitle: 'Wise vs PayPal FX Comparison',
    metaDesc: 'Compare Wise Business vs PayPal for international client invoices. See how much money you lose to PayPal exchange rate spreads vs Wise mid-market rates.',
    category: 'payments',
    tag: 'FX & Wire Comparison',
    icon: '💱',
    badge: 'Save on FX',
    description: 'Direct dollar-for-dollar comparison showing how much freelancers and international businesses save using Wise instead of PayPal.',
    inputs: [
      { id: 'invoiceTotal', label: 'Invoice Amount ($ USD equivalent)', type: 'number', val: '2000.00', step: '100.00' },
      { 
        id: 'clientCurrency', 
        label: 'Currency Pair', 
        type: 'select', 
        val: 'eur_usd', 
        options: [
          { val: 'eur_usd', text: 'EUR (€) to USD ($)' },
          { val: 'gbp_usd', text: 'GBP (£) to USD ($)' },
          { val: 'aud_usd', text: 'AUD (A$) to USD ($)' },
          { val: 'cad_usd', text: 'CAD (C$) to USD ($)' }
        ] 
      },
      { id: 'wiseFeeRate', label: 'Wise Transparent Fee Rate (%)', type: 'number', val: '0.45', step: '0.05' }
    ],
    calcLogic: `
      const invoice = parseFloat(document.getElementById('invoiceTotal').value) || 0;
      const wiseRate = (parseFloat(document.getElementById('wiseFeeRate').value) || 0.45) / 100;

      // PayPal cost: 4.99% cross-border fee + $0.49 + 4.0% FX spread
      const ppFee = (invoice * 0.0499) + 0.49;
      const ppFx = (invoice - ppFee) * 0.040;
      const totalPayPalLoss = ppFee + ppFx;
      const payPalTakeHome = invoice - totalPayPalLoss;

      // Wise cost: mid-market rate + ~0.45% fee
      const totalWiseLoss = invoice * wiseRate;
      const wiseTakeHome = invoice - totalWiseLoss;

      const moneySavedWithWise = wiseTakeHome - payPalTakeHome;
      const margin = invoice > 0 ? (wiseTakeHome / invoice) * 100 : 0;

      return {
        grossRevenue: invoice,
        totalFees: totalPayPalLoss,
        totalCosts: totalWiseLoss,
        netProfit: moneySavedWithWise,
        margin,
        customMetrics: [
          { label: 'Lost to PayPal Fees & FX', val: '$' + totalPayPalLoss.toFixed(2), color: 'text-rose-600' },
          { label: 'Lost to Wise Transparent Fee', val: '$' + totalWiseLoss.toFixed(2), color: 'text-emerald-600' },
          { label: 'Extra Cash in Your Pocket with Wise', val: '+$' + moneySavedWithWise.toFixed(2), color: 'text-emerald-700' }
        ],
        feeBreakdown: [
          { label: 'PayPal Cross-Border & FX Deduction', amount: totalPayPalLoss },
          { label: 'Wise Mid-Market Transfer Fee', amount: totalWiseLoss }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Wise vs PayPal: The Truth About Currency Exchange Fees</h2>
      <p class="text-slate-600 mb-4">When sending or receiving money across borders, high-street banks and platforms like PayPal frequently promote "low upfront fees" or "0% commission" while concealing substantial fees inside inflated exchange rate spreads.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">How PayPal Charges</h3>
          <p class="text-xs text-slate-600">PayPal deducts a <strong>4.4%–4.99% cross-border processing fee</strong> followed by a <strong>3.0%–4.5% currency exchange mark-down</strong> against the wholesale mid-market rate.</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">How Wise Charges</h3>
          <p class="text-xs text-slate-600">Wise uses the exact <strong>real mid-market exchange rate</strong> (the one you see on Google) and charges a transparent fee starting at just <strong>0.35% to 0.5%</strong>.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Side-by-Side Savings Benchmark</h3>
      <p class="text-slate-600 mb-6">On an annual international invoicing volume of <strong>$50,000</strong>, processing through PayPal costs approximately <strong>$4,400+ in fees and hidden spreads</strong>. Processing through Wise Business costs roughly <strong>$225 in total fees</strong>—putting over <strong>$4,000 back into your business</strong>.</p>
    `,
    faqs: [
      { q: "Why is Wise so much cheaper than PayPal for cross-border transfers?", a: "Wise built a proprietary network of local bank accounts around the world. When you send money internationally, the money rarely crosses borders; it moves from local account to local account at the mid-market rate." },
      { q: "Does Wise provide local bank account details?", a: "Yes. With a Wise Business account, you get local bank account numbers, sort codes, and IBANs in USD, EUR, GBP, AUD, CAD, and more." },
      { q: "Can my clients pay me on Wise if they don't have a Wise account?", a: "Yes. Clients can pay via standard local bank transfer, ACH, wire, or credit card directly into your local Wise account details just like any domestic vendor." },
      { q: "Is Wise safe for large business transactions?", a: "Yes. Wise is heavily regulated by financial authorities worldwide, including FinCEN in the United States and the FCA in the United Kingdom." }
    ]
  },
  {
    slug: 'patreon-vs-substack-calculator.html',
    title: 'Patreon vs Substack Calculator: Platform Fees & Net Creator Income',
    shortTitle: 'Patreon vs Substack Calculator',
    metaDesc: 'Compare Patreon platform tiers (8%–12%) vs Substack flat 10% cut and Stripe payment processing. Calculate your exact monthly creator take-home income.',
    category: 'payments',
    tag: 'Creator Economy',
    icon: '✍️',
    badge: 'Creator Income',
    description: 'Calculates Patreon Pro (8%) / Premium (12%) vs Substack 10% fee + Stripe 2.9% + 30¢ credit card processing deductions.',
    inputs: [
      { id: 'monthlySubscribers', label: 'Active Monthly Subscribers', type: 'number', val: '450', step: '25' },
      { id: 'monthlyPrice', label: 'Average Subscription Price / Month ($)', type: 'number', val: '7.00', step: '0.50' },
      { 
        id: 'patreonPlan', 
        label: 'Patreon Plan Tier', 
        type: 'select', 
        val: 'pro', 
        options: [
          { val: 'pro', text: 'Patreon Pro (8% platform fee)' },
          { val: 'premium', text: 'Patreon Premium (12% platform fee)' }
        ] 
      },
      { id: 'annualDiscountPct', label: 'Annual Payer Share (% getting 10% off)', type: 'number', val: '15', step: '5' }
    ],
    calcLogic: `
      const subs = parseInt(document.getElementById('monthlySubscribers').value) || 0;
      const price = parseFloat(document.getElementById('monthlyPrice').value) || 0;
      const patreonTier = document.getElementById('patreonPlan').value;

      const grossRevenue = subs * price;
      
      // Patreon: Platform fee (8% or 12%) + Payment processing (~2.9% + 30¢ or 5% micro)
      const patreonRate = patreonTier === 'premium' ? 0.12 : 0.08;
      const patreonPlatformFee = grossRevenue * patreonRate;
      const patreonProcessing = (grossRevenue * 0.029) + (subs * 0.30);
      const totalPatreonDeductions = patreonPlatformFee + patreonProcessing;
      const patreonNet = grossRevenue - totalPatreonDeductions;

      // Substack: 10% platform fee + Stripe processing (2.9% + 30¢)
      const substackPlatformFee = grossRevenue * 0.10;
      const substackProcessing = (grossRevenue * 0.029) + (subs * 0.30);
      const totalSubstackDeductions = substackPlatformFee + substackProcessing;
      const substackNet = grossRevenue - totalSubstackDeductions;

      const netDifference = substackNet - patreonNet;
      const margin = grossRevenue > 0 ? (substackNet / grossRevenue) * 100 : 0;

      return {
        grossRevenue,
        totalFees: totalSubstackDeductions,
        totalCosts: totalPatreonDeductions,
        netProfit: substackNet,
        margin,
        customMetrics: [
          { label: 'Patreon Total Monthly Fees', val: '$' + totalPatreonDeductions.toFixed(2), color: 'text-amber-600' },
          { label: 'Substack Total Monthly Fees', val: '$' + totalSubstackDeductions.toFixed(2), color: 'text-indigo-600' },
          { label: 'Patreon Monthly Take-Home', val: '$' + patreonNet.toFixed(2), color: 'text-slate-800' },
          { label: 'Substack Monthly Take-Home', val: '$' + substackNet.toFixed(2), color: 'text-emerald-600' }
        ],
        feeBreakdown: [
          { label: 'Platform Cut (Patreon ' + (patreonRate * 100) + '% vs Substack 10%)', amount: substackPlatformFee },
          { label: 'Stripe Payment Processing (2.9% + 30¢ per sub)', amount: substackProcessing }
        ]
      };
    `,
    contentHtml: `
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Patreon vs Substack: Platform Economics for Creators</h2>
      <p class="text-slate-600 mb-4">Both Patreon and Substack have empowered independent writers, podcasters, educators, and artists to build direct recurring subscriber revenue. However, their monetization fee structures and payment processor mechanics differ considerably.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Patreon Fee Tiers</h3>
          <p class="text-xs text-slate-600">Patreon charges an <strong>8% platform cut (Pro)</strong> or <strong>12% cut (Premium)</strong>, in addition to standard payment processing fees (2.9% + $0.30 or micro-payment rates).</p>
        </div>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Substack Platform Cut</h3>
          <p class="text-xs text-slate-600">Substack charges a flat <strong>10% fee on recurring paid subscriptions</strong>, with processing routed directly to your connected Stripe account at 2.9% + $0.30.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-3">Understanding the Fixed $0.30 Charge on Low Tier Pledges</h3>
      <p class="text-slate-600 mb-6">If you offer low-priced $3 or $5 monthly tiers, fixed credit card fees ($0.30) consume a massive percentage of your pledge (6% to 10% on payment fees alone!). Encouraging annual billing or higher price points ($8–$15/month) drastically increases your net creator take-home pay.</p>
    `,
    faqs: [
      { q: "What percentage does Substack take from paid newsletters?", a: "Substack charges a flat 10% platform fee on all paid subscriptions. Credit card processing fees (2.9% + $0.30 via Stripe) are separate." },
      { q: "Is Substack free to use for free email newsletters?", a: "Yes. Substack is 100% free with no email sending or subscriber caps if you do not turn on paid subscriptions." },
      { q: "Which platform is better for community vs written content?", a: "Patreon is generally better suited for multimedia creators offering community Discord roles and exclusive video/audio tiers, while Substack excels for written essays and email-first newsletters." },
      { q: "Do I own my subscriber email list on both platforms?", a: "Substack allows you to export your full email subscriber list at any time with zero friction. Patreon allows member data exports, but email communication is typically designed through their internal messaging feed." }
    ]
  }
];

// Helper to build modern header
function getHeaderHtml(activeSlug = '') {
  return `
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-indigo-700 transition-colors">
            ⚡
          </div>
          <div>
            <span class="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">FeeCalculators<span class="text-indigo-600">.pro</span></span>
            <span class="hidden sm:block text-[11px] text-slate-400 font-medium leading-none">E-Commerce & Payment Profit Suite</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
          <a href="etsy-fee-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'etsy-fee-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">Etsy</a>
          <a href="shopify-vs-etsy-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'shopify-vs-etsy-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">Shopify vs Etsy</a>
          <a href="tiktok-shop-fee-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'tiktok-shop-fee-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">TikTok</a>
          <a href="ebay-final-value-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'ebay-final-value-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">eBay</a>
          <a href="amazon-fba-margin-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'amazon-fba-margin-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">Amazon FBA</a>
          <a href="stripe-fee-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'stripe-fee-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">Stripe</a>
          <a href="wise-vs-paypal-calculator.html" class="px-2.5 py-1.5 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${activeSlug === 'wise-vs-paypal-calculator.html' ? 'text-indigo-600 bg-indigo-50 font-bold' : ''}">Wise vs PayPal</a>
        </nav>

        <div class="flex items-center gap-2">
          <a href="index.html" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <span>All 10 Tools</span>
          </a>
        </div>
      </div>
    </div>
  </header>
  `;
}

// Helper to build modern footer with full cross-linking
function getFooterHtml() {
  return `
  <footer class="bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="md:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">⚡</div>
            <span class="text-base font-bold text-white">FeeCalculators.pro</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            Free, fast, 100% client-side profit and fee calculators for modern online merchants, dropshippers, creators, and freelancers.
          </p>
          <div class="text-[11px] text-slate-500">
            © 2026 FeeCalculators.pro. All rights reserved.
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Marketplaces & POD</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="etsy-fee-calculator.html" class="hover:text-white transition-colors">Etsy Fee Calculator</a></li>
            <li><a href="shopify-vs-etsy-calculator.html" class="hover:text-white transition-colors">Shopify vs Etsy Comparison</a></li>
            <li><a href="tiktok-shop-fee-calculator.html" class="hover:text-white transition-colors">TikTok Shop Fee Calculator</a></li>
            <li><a href="ebay-final-value-calculator.html" class="hover:text-white transition-colors">eBay Final Value Calculator</a></li>
            <li><a href="printful-dropshipping-calculator.html" class="hover:text-white transition-colors">Printful POD Calculator</a></li>
            <li><a href="amazon-fba-margin-calculator.html" class="hover:text-white transition-colors">Amazon FBA Margin Calculator</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Payments & FX</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="stripe-fee-calculator.html" class="hover:text-white transition-colors">Stripe Fee Calculator</a></li>
            <li><a href="paypal-international-calculator.html" class="hover:text-white transition-colors">PayPal International Fees</a></li>
            <li><a href="wise-vs-paypal-calculator.html" class="hover:text-white transition-colors">Wise vs PayPal FX Comparison</a></li>
            <li><a href="patreon-vs-substack-calculator.html" class="hover:text-white transition-colors">Patreon vs Substack Calculator</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Transparency & Disclosures</h4>
          <p class="text-xs text-slate-400 leading-relaxed mb-3">
            Calculators are built for educational and planning estimates. Fees reflect published standard 2026 platform schedules. We may earn an affiliate commission when you sign up through partner links at zero extra cost to you.
          </p>
          <div class="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400">
            🔒 Fast & 100% private. All calculations run locally in your browser. No financial data is ever collected or stored.
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>All 10 calculators open instantly with zero install or login.</div>
        <div class="flex items-center gap-4">
          <a href="index.html" class="hover:text-slate-300">Directory</a>
          <span>•</span>
          <a href="sitemap.xml" class="hover:text-slate-300">Sitemap</a>
          <span>•</span>
          <a href="robots.txt" class="hover:text-slate-300">Robots.txt</a>
        </div>
      </div>
    </div>
  </footer>
  `;
}

// Generate Index Page
function generateIndexPage() {
  const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Commerce & Payment Fee Calculators 2026: Calculate Net Profits & Margins</title>
  <meta name="description" content="Free instant profit and fee calculators for Etsy, Shopify, TikTok Shop, eBay, Amazon FBA, Printful, Stripe, PayPal, Wise, and Substack. No sign up required.">
  <link rel="canonical" href="https://DavidAeelmann.github.io/seller-fee-calculators/index.html">
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "E-Commerce & Payment Fee Calculators Suite",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Comprehensive suite of 10 free fee, margin, and profit calculators for e-commerce sellers, dropshippers, creators, and freelancers."
  }
  </script>
</head>
<body class="bg-slate-50 text-slate-800 flex flex-col min-h-screen font-sans antialiased">
  ${getHeaderHtml('index.html')}

  <!-- Hero Banner -->
  <section class="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-600 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-6">
        <span>Updated for 2026 Platform Fee Schedules</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Stop Guessing. Know Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-400">Exact Net Profit</span>.
      </h1>
      <p class="text-base sm:text-lg text-indigo-200 max-w-2xl mx-auto mb-8 leading-relaxed">
        Accurate, instant, mobile-friendly fee and profit calculators for Etsy, Shopify, TikTok Shop, eBay, Amazon FBA, Stripe, Wise, and creator platforms.
      </p>

      <!-- Search & Filter Controls -->
      <div class="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
        <div class="relative flex-grow">
          <input type="text" id="searchInput" placeholder="Search calculator (e.g. Etsy, Stripe, TikTok, FX)..." 
                 class="w-full px-4 py-3 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md">
          <svg class="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <select id="categoryFilter" class="px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400">
          <option value="all">All Categories</option>
          <option value="ecommerce">E-Commerce & Marketplaces</option>
          <option value="payments">Payments & Creator Economy</option>
        </select>
      </div>
    </div>
  </section>

  <!-- Calculators Grid -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Featured Fee Calculators</h2>
        <p class="text-sm text-slate-500">Select any tool below for instant, reactive calculations and real-world worked examples.</p>
      </div>
      <span id="resultCount" class="text-xs font-semibold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">10 Tools Available</span>
    </div>

    <div id="calculatorGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${calculators.map(c => `
        <a href="${c.slug}" data-category="${c.category}" data-keywords="${c.title.toLowerCase()} ${c.description.toLowerCase()} ${c.tag.toLowerCase()}" 
           class="calc-card group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-200">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-2xl">${c.icon}</span>
              <span class="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">${c.tag}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
              ${c.shortTitle}
            </h3>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              ${c.description}
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Calculate Fees Now</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>
      `).join('')}
    </div>

    <!-- Empty State -->
    <div id="noResults" class="hidden text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
      <div class="text-3xl mb-2">🔍</div>
      <h3 class="text-base font-bold text-slate-800">No calculators found</h3>
      <p class="text-xs text-slate-500 mt-1">Try searching for keywords like "Etsy", "eBay", "Stripe", or "PayPal".</p>
    </div>
  </main>

  ${getFooterHtml()}

  <script>
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const cards = document.querySelectorAll('.calc-card');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');

    function filterCards() {
      const query = searchInput.value.toLowerCase().trim();
      const cat = categoryFilter.value;
      let visible = 0;

      cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const category = card.getAttribute('data-category') || '';
        const matchesQuery = !query || keywords.includes(query);
        const matchesCategory = (cat === 'all') || (category === cat);

        if (matchesQuery && matchesCategory) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      resultCount.textContent = visible + ' Tool' + (visible === 1 ? '' : 's') + ' Available';
      if (visible === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }

    searchInput.addEventListener('input', filterCards);
    categoryFilter.addEventListener('change', filterCards);
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(rootDir, 'index.html'), pageHtml, 'utf8');
  console.log('Generated: index.html');
}

// Generate Individual Calculator Pages
function generateCalculatorPages() {
  calculators.forEach(c => {
    const faqSchemaItems = c.faqs.map(f => `{
      "@type": "Question",
      "name": ${JSON.stringify(f.q)},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ${JSON.stringify(f.a)}
      }
    }`).join(',');

    const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.title}</title>
  <meta name="description" content="${c.metaDesc}">
  <link rel="canonical" href="https://DavidAeelmann.github.io/seller-fee-calculators/${c.slug}">
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Structured Data: WebApplication -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": ${JSON.stringify(c.title)},
    "description": ${JSON.stringify(c.metaDesc)},
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>

  <!-- Structured Data: FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${faqSchemaItems}
    ]
  }
  </script>
</head>
<body class="bg-slate-50 text-slate-800 flex flex-col min-h-screen font-sans antialiased">
  ${getHeaderHtml(c.slug)}

  <!-- Breadcrumbs & Title Header -->
  <section class="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <nav class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
        <a href="index.html" class="hover:text-indigo-600 transition-colors">Directory</a>
        <span>/</span>
        <span class="text-slate-800 font-bold">${c.shortTitle}</span>
      </nav>
      <div class="flex flex-wrap items-center gap-3 mb-2">
        <span class="text-3xl">${c.icon}</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ${c.title}
        </h1>
      </div>
      <p class="text-sm text-slate-600 max-w-3xl leading-relaxed">
        ${c.metaDesc} Instant live calculation updates as you adjust values below.
      </p>
    </div>
  </section>

  <!-- Main Calculator Workspace -->
  <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left Column: Inputs Form -->
      <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 class="text-sm font-bold uppercase tracking-wider text-slate-800">Calculation Inputs</h2>
          <span class="text-xs text-indigo-600 font-semibold">Live Reactive Math</span>
        </div>

        <form id="calcForm" class="space-y-4">
          ${c.inputs.map(inp => {
            if (inp.type === 'select') {
              return `
              <div>
                <label for="${inp.id}" class="block text-xs font-bold text-slate-700 mb-1.5">${inp.label}</label>
                <select id="${inp.id}" class="calc-input w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  ${inp.options.map(opt => `<option value="${opt.val}" ${opt.val === inp.val ? 'selected' : ''}>${opt.text}</option>`).join('')}
                </select>
              </div>`;
            } else {
              return `
              <div>
                <label for="${inp.id}" class="block text-xs font-bold text-slate-700 mb-1.5">${inp.label}</label>
                <div class="relative">
                  <input type="${inp.type}" id="${inp.id}" value="${inp.val}" step="${inp.step || 'any'}" min="0"
                         class="calc-input w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
              </div>`;
            }
          }).join('')}
        </form>

        <div class="pt-2">
          <button type="button" id="resetBtn" class="text-xs text-slate-500 hover:text-slate-700 underline font-medium">
            Reset to default sample values
          </button>
        </div>
      </div>

      <!-- Right Column: Results & Visual Breakdown -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Net Result Banner Card -->
        <div class="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Net Estimated Take-Home</span>
            <span id="marginBadge" class="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              0.0% Margin
            </span>
          </div>

          <div class="flex items-baseline gap-2 mb-6">
            <span id="netProfitDisplay" class="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">$0.00</span>
            <span class="text-xs text-slate-400">net profit</span>
          </div>

          <!-- Dynamic Visual Bar -->
          <div class="space-y-1.5 mb-6">
            <div class="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>Financial Breakdown of Gross Volume</span>
              <span id="grossDisplay">$0.00 Gross</span>
            </div>
            <div class="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div id="barProfit" class="h-full bg-emerald-500 transition-all duration-300" style="width: 50%"></div>
              <div id="barFees" class="h-full bg-rose-500 transition-all duration-300" style="width: 25%"></div>
              <div id="barCosts" class="h-full bg-amber-500 transition-all duration-300" style="width: 25%"></div>
            </div>
            <div class="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Net Profit</div>
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Platform Fees</div>
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Product/COGS/Shipping</div>
            </div>
          </div>

          <!-- Custom Additional Metrics if any -->
          <div id="customMetricsContainer" class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800"></div>
        </div>

        <!-- Dynamic Affiliate Switchboard CTA Card -->
        <div id="affiliate-callout"></div>

        <!-- Detailed Breakdown Accordion / Table -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100">
            Itemized Fee & Expense Breakdown
          </h3>
          <div id="feeBreakdownTable" class="space-y-2 text-sm"></div>
        </div>
      </div>
    </div>

    <!-- Educational SEO Content Section (400+ words) -->
    <article class="mt-14 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm prose max-w-none">
      ${c.contentHtml}

      <!-- FAQ Section -->
      <div class="mt-10 pt-8 border-t border-slate-200">
        <h3 class="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
        <div class="space-y-4">
          ${c.faqs.map(f => `
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h4 class="font-bold text-slate-800 text-sm sm:text-base mb-1.5">${f.q}</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${f.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  </main>

  ${getFooterHtml()}

  <!-- Affiliate Switchboard Script -->
  <script src="affiliate-config.js"></script>

  <!-- Interactive Calculation Script -->
  <script>
    function calculate() {
      try {
        ${c.calcLogic}
      } catch (err) {
        console.error('Calculation error:', err);
        return null;
      }
    }

    function updateUI() {
      const result = calculate();
      if (!result) return;

      const { grossRevenue, totalFees, totalCosts, netProfit, margin, feeBreakdown, customMetrics } = result;

      // Net profit display
      const netProfitEl = document.getElementById('netProfitDisplay');
      netProfitEl.textContent = '$' + netProfit.toFixed(2);
      if (netProfit < 0) {
        netProfitEl.className = 'text-4xl sm:text-5xl font-extrabold text-rose-400 tracking-tight';
      } else {
        netProfitEl.className = 'text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight';
      }

      // Margin badge
      const marginEl = document.getElementById('marginBadge');
      marginEl.textContent = margin.toFixed(1) + '% Margin';

      // Gross total
      document.getElementById('grossDisplay').textContent = '$' + grossRevenue.toFixed(2) + ' Gross';

      // Progress bars
      const safeGross = grossRevenue > 0 ? grossRevenue : (totalFees + totalCosts + Math.abs(netProfit)) || 1;
      const profitPct = Math.max(0, Math.min(100, (netProfit / safeGross) * 100));
      const feesPct = Math.max(0, Math.min(100, (totalFees / safeGross) * 100));
      const costsPct = Math.max(0, Math.min(100, (totalCosts / safeGross) * 100));

      document.getElementById('barProfit').style.width = profitPct + '%';
      document.getElementById('barFees').style.width = feesPct + '%';
      document.getElementById('barCosts').style.width = costsPct + '%';

      // Custom metrics if provided
      const customContainer = document.getElementById('customMetricsContainer');
      if (customMetrics && customMetrics.length > 0) {
        customContainer.classList.remove('hidden');
        customContainer.innerHTML = customMetrics.map(function(m) {
          return '<div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">' +
                 '<div class="text-[11px] text-slate-400 font-medium">' + m.label + '</div>' +
                 '<div class="text-sm sm:text-base font-bold ' + (m.color || 'text-white') + '">' + m.val + '</div>' +
                 '</div>';
        }).join('');
      } else {
        customContainer.classList.add('hidden');
      }

      // Breakdown list
      const breakdownEl = document.getElementById('feeBreakdownTable');
      if (feeBreakdown && feeBreakdown.length > 0) {
        breakdownEl.innerHTML = feeBreakdown.map(function(item) {
          return '<div class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-xs sm:text-sm">' +
                 '<span class="text-slate-600">' + item.label + '</span>' +
                 '<span class="font-bold text-slate-900">$' + item.amount.toFixed(2) + '</span>' +
                 '</div>';
        }).join('') +
          '<div class="flex items-center justify-between pt-2 border-t border-slate-200 text-xs sm:text-sm font-bold">' +
          '<span class="text-slate-800">Total Deductions</span>' +
          '<span class="text-rose-600">$' + (totalFees + totalCosts).toFixed(2) + '</span>' +
          '</div>';
      }

      // Dynamically render switchboard affiliate card personalized with calculated total fees
      if (typeof renderAffiliateCallout === 'function') {
        renderAffiliateCallout('${c.category}', 'affiliate-callout', totalFees);
      }
    }

    // Attach reactive input listeners
    document.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('input', updateUI);
      input.addEventListener('change', updateUI);
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
      document.getElementById('calcForm').reset();
      updateUI();
    });

    // Run on initial page load
    window.addEventListener('DOMContentLoaded', updateUI);
  </script>
</body>
</html>`;

    fs.writeFileSync(path.join(rootDir, c.slug), pageHtml, 'utf8');
    console.log('Generated:', c.slug);
  });
}

// Generate sitemap.xml and robots.txt
function generateSEOFiles() {
  const baseUrl = 'https://DavidAeelmann.github.io/seller-fee-calculators';
  const today = '2026-10-14';

  const allPages = ['index.html', ...calculators.map(c => c.slug)];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- 
  NOTE: Find and replace 'https://DavidAeelmann.github.io/seller-fee-calculators' 
  with your live production URL (e.g. https://fees.yourdomain.com or https://johndoe.github.io/seller-fee-calculators)
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${baseUrl}/${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

  const robotsTxt = `# robots.txt for FeeCalculators.pro
# Replace 'https://DavidAeelmann.github.io/seller-fee-calculators' with your real URL

User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('Generated: sitemap.xml and robots.txt');
}

// Generate NEXT_STEPS_FOR_ME.md
function generateNextSteps() {
  const mdContent = `# Next Steps: How to Test, Monetize & Deploy Your Fee Calculators

Congratulations! Your complete 100% static, zero-build E-Commerce & Payment Fee Calculator website is built and ready to launch.

---

### Step 1: Double-Click to Test Right Now (0 Seconds)
1. Open your computer's file explorer and go to:
   \`c:\\Users\\david\\Documents\\Antigravity\\seller-fee-calculators\`
2. Double-click **\`index.html\`**.
3. It will open instantly in your web browser (Chrome, Edge, Safari, Firefox).
4. Click on any of the 10 calculators and move the sliders or type new numbers.
5. Notice how:
   - Results update instantaneously without pressing any "Submit" button.
   - The sponsored affiliate callout card displays right below the profit box with personalized fee savings.
   - Every calculator cross-links seamlessly to all other tools.

---

### Step 2: Paste Your 2 Affiliate Links (Under 2 Minutes)
All 10 calculators are controlled by a single switchboard file: **\`affiliate-config.js\`**.

Open \`affiliate-config.js\` in your text editor:

1. **For Shopify (E-Commerce Offer):**
   Look for:
   \`\`\`javascript
   // >>> PASTE YOUR SHOPIFY AFFILIATE LINK BELOW <<<
   url: "https://www.shopify.com/free-trial",
   \`\`\`
   Replace the URL inside the quotes with your personal Shopify affiliate link.

2. **For Wise (Payments & FX Offer):**
   Look for:
   \`\`\`javascript
   // >>> PASTE YOUR WISE AFFILIATE LINK BELOW <<<
   url: "https://wise.com/business",
   \`\`\`
   Replace the URL inside the quotes with your personal Wise affiliate link.

3. Save the file. **All 10 calculator pages update instantly!**

*(Optional: If you use Sovrn / VigLink or Skimlinks auto-monetization scripts, paste the script URL into the \`globalScriptUrl: null\` line).*

---

### Step 3: Ask Me (AI CLI) to Deploy for Free ($0 Hosting)

Whenever you are ready to publish this live to the internet with free HTTPS and a free subdomain, simply tell me:

> *"Please push this folder live to GitHub Pages"*
> or
> *"Help me deploy this to Cloudflare Pages for free"*

I can initialize Git, commit the files, and guide you through or run the automated deployment commands in seconds.

---

### SEO Checklist Before Going Live
- Open \`sitemap.xml\` and \`robots.txt\`.
- Find and replace \`https://DavidAeelmann.github.io/seller-fee-calculators\` with your actual live domain or GitHub Pages URL.
- Submit \`https://YOUR-DOMAIN.com/sitemap.xml\` in **Google Search Console** to begin ranking for high-intent e-commerce search traffic.
`;

  fs.writeFileSync(path.join(rootDir, 'NEXT_STEPS_FOR_ME.md'), mdContent, 'utf8');
  console.log('Generated: NEXT_STEPS_FOR_ME.md');
}

// Execute all
generateIndexPage();
generateCalculatorPages();
generateSEOFiles();
generateNextSteps();
console.log('ALL FILES GENERATED SUCCESSFULLY!');
