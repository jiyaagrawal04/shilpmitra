// Seed 4 scheme criteria into Supabase scheme_criteria table
// Run: node scripts/seed-policies.js

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const schemes = [
  {
    scheme_id: 'pm_vishwakarma',
    scheme_name: 'PM Vishwakarma Yojana',
    source_url: 'https://pmvishwakarma.gov.in',
    version: 1,
    updated_by: 'seed',
    criteria_json: {
      who_qualifies: [
        'Traditional artisan or craftsperson working with hands or tools',
        'Must be in one of 18 notified trades including weaving, pottery, blacksmithing, carpentry, cobbling, tailoring',
        'Age 18+ at time of registration',
        'Self-employed, not salaried',
        'Not enrolled in PMEGP, MUDRA, PM SVANidhi in last 5 years',
        'One member per family only'
      ],
      income_limit: 'No upper income limit specified',
      craft_types_covered: [
        'Weaving', 'Pottery', 'Blacksmithing', 'Carpentry', 'Cobbling',
        'Tailoring', 'Basket weaving', 'Toy making', 'Goldsmithing',
        'Sculpture', 'Stone carving', 'Locksmithing', 'Fishing nets',
        'Hammer and tool kit making', 'Boat making', 'Armourer'
      ],
      group_status_bonus: [],
      benefits: [
        'PM Vishwakarma certificate and ID card',
        'Skill training: 5 days basic + 15 days advanced with ₹500/day stipend',
        'Toolkit incentive up to ₹15,000 via e-voucher',
        'Collateral-free credit: ₹1 lakh Tranche 1, ₹2 lakh Tranche 2',
        '5% concessional interest rate on loans',
        'Digital payment incentive ₹1/transaction up to ₹100/month'
      ],
      loan_amount: '₹1,00,000 (Tranche 1) + ₹2,00,000 (Tranche 2)',
      subsidy_percent: '5% interest subvention',
      required_documents: [
        'Aadhaar card', 'Bank account details', 'Mobile number linked to Aadhaar',
        'Caste certificate if applicable', 'Craft activity proof'
      ],
      disqualifiers: [
        'Enrolled in PMEGP within last 5 years',
        'Enrolled in MUDRA within last 5 years',
        'Government employee or salaried worker',
        'More than one family member already enrolled'
      ],
      application_url: 'https://pmvishwakarma.gov.in'
    }
  },
  {
    scheme_id: 'mudra_shishu',
    scheme_name: 'MUDRA Loan — Shishu',
    source_url: 'https://www.mudra.org.in',
    version: 1,
    updated_by: 'seed',
    criteria_json: {
      who_qualifies: [
        'Non-farm micro or small enterprise',
        'Loan requirement up to ₹50,000',
        'Must show some business activity',
        'No CIBIL default in last 3 years'
      ],
      income_limit: 'No formal income cap — loan up to ₹50,000',
      craft_types_covered: ['All non-farm trades and crafts'],
      group_status_bonus: ['Women entrepreneurs get priority processing'],
      benefits: [
        'Loan up to ₹50,000 at ~10-12% market rate',
        'No collateral required for Shishu tier',
        'Repayment tenure up to 5 years',
        'MUDRA card for working capital'
      ],
      loan_amount: 'Up to ₹50,000',
      subsidy_percent: 'No direct subsidy — market rate loan',
      required_documents: [
        'Identity proof', 'Address proof', 'Business activity proof',
        'Bank account statement last 6 months', 'Passport size photo'
      ],
      disqualifiers: ['CIBIL default in last 3 years', 'No business activity at all'],
      application_url: 'https://www.mudra.org.in'
    }
  },
  {
    scheme_id: 'pmegp',
    scheme_name: 'PMEGP — Prime Minister Employment Generation Programme',
    source_url: 'https://www.kviconline.gov.in/pmegpeportal',
    version: 1,
    updated_by: 'seed',
    criteria_json: {
      who_qualifies: [
        'Individual 18 years and above',
        'Minimum 8th standard pass for projects above ₹10 lakh',
        'New micro enterprise only — not existing businesses',
        'Manufacturing project cost up to ₹50 lakh',
        'Service project cost up to ₹20 lakh'
      ],
      income_limit: 'No income cap — project viability assessed',
      craft_types_covered: ['All manufacturing and service trades'],
      group_status_bonus: [
        'SC/ST/Women/Ex-servicemen/PH — 5% beneficiary margin instead of 10%',
        'Higher subsidy: 25% urban, 35% rural for reserved categories'
      ],
      benefits: [
        'Subsidy 15-25% for general category',
        'Subsidy 25-35% for SC/ST/Women/minorities/ex-servicemen/PH',
        'Bank loan covers remaining project cost',
        'No collateral up to ₹10 lakh under CGTMSE'
      ],
      loan_amount: 'Up to ₹50 lakh (manufacturing) / ₹20 lakh (service)',
      subsidy_percent: '15-35% depending on category and location',
      required_documents: [
        'Aadhaar card', 'PAN card', 'Educational qualification certificate',
        'Caste or category certificate', 'Project report',
        'Bank account', 'Passport size photo'
      ],
      disqualifiers: [
        'Previously availed REGP/PMRY/PMEGP benefit',
        'Existing business (must be new enterprise)',
        'Below 8th standard for projects above ₹10 lakh'
      ],
      application_url: 'https://www.kviconline.gov.in/pmegpeportal'
    }
  },
  {
    scheme_id: 'sfurti',
    scheme_name: 'SFURTI — Scheme of Fund for Regeneration of Traditional Industries',
    source_url: 'https://sfurti.msme.gov.in',
    version: 1,
    updated_by: 'seed',
    criteria_json: {
      who_qualifies: [
        'Traditional industry cluster — minimum 500 artisans for new cluster',
        'Minimum 50 artisans for mini cluster',
        'Individual artisan must be part of a registered cluster',
        'Applicable crafts: khadi, village industries, coir, traditional crafts'
      ],
      income_limit: 'Cluster-level assessment, not individual',
      craft_types_covered: ['Khadi', 'Coir', 'Village industries', 'Traditional crafts'],
      group_status_bonus: ['Clusters with majority SC/ST/Women members get priority'],
      benefits: [
        'Soft loan and grant for common facility centres',
        'Technology upgradation support',
        'Skill development for cluster members',
        'Market linkage assistance',
        'Up to ₹2.5 crore for new cluster',
        'Up to ₹0.75 crore for mini cluster'
      ],
      loan_amount: '₹75 lakh (mini) to ₹2.5 crore (new cluster)',
      subsidy_percent: 'Grant component 90% for NE/hill states, 75% others',
      required_documents: [
        'Cluster registration proof', 'Member list with Aadhaar',
        'DPR (Detailed Project Report)', 'Land documents for CFC',
        'Bank account of cluster entity'
      ],
      disqualifiers: [
        'Individual artisan not part of any registered cluster',
        'Craft type not in approved list',
        'Cluster below minimum member count'
      ],
      application_url: 'https://sfurti.msme.gov.in'
    }
  }
];

async function seedPolicies() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.log('⚠️  SUPABASE_URL and SUPABASE_SERVICE_KEY required. Set them in backend/.env');
    console.log('📋 Scheme data exported for reference. Run this after configuring Supabase.');
    return;
  }

  for (const scheme of schemes) {
    const { error } = await supabase.from('scheme_criteria').upsert(scheme);
    if (error) {
      console.error(`❌ Failed to seed ${scheme.scheme_id}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${scheme.scheme_name}`);
    }
  }
  console.log('\n🎉 Seeded 4 schemes into scheme_criteria table.');
}

seedPolicies();

// Also export for use as module
export { schemes };
