// Seed demo data: user Raju, 18 months of transactions, products, cluster, notifications
// Run: node scripts/seed.js

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function seed() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.log('⚠️  SUPABASE_URL and SUPABASE_SERVICE_KEY required.');
    console.log('Set them in backend/.env, then run: npm run seed');
    return;
  }

  // 1. Create user Raju
  console.log('👤 Creating user Raju...');
  const { data: raju, error: rajuErr } = await supabase.from('users').upsert({
    name: 'Raju Kumar',
    craft_type: 'Pottery',
    location: 'Khurja, UP',
    state: 'Uttar Pradesh',
    income_band: '1-3L',
    family_size: 4,
    group_status: 'OBC',
    language: 'hi',
    phone: '9876543210',
    aadhaar_last4: '4321'
  }, { onConflict: 'phone' }).select().single();

  if (rajuErr) { console.error('❌ User create failed:', rajuErr.message); return; }
  console.log(`✅ User: ${raju.name} (${raju.id})`);

  const rajuId = raju.id;

  // 2. Create 18 months of transactions (Jan 2023 – Jun 2024)
  console.log('💰 Creating 18 months of transactions...');
  const monthlyAmounts = [2800, 3100, 2500, 3400, 2900, 3600,
                          4100, 3800, 4500, 5000, 4200, 4800,
                          5500, 6000, 5200, 6500, 7000, 6800];
  const buyers = ['A. Sharma', 'R. Patel', 'M. Gupta', 'K. Verma', 'S. Joshi',
                  'D. Mehra', 'N. Singh', 'P. Kumar', 'L. Arora', 'V. Thakur'];
  const products_names = ['Terracotta Vase', 'Clay Diya Set', 'Pottery Planter',
                          'Ceramic Bowl', 'Earthen Pot', 'Clay Figurine'];

  let txns = [];
  for (let i = 0; i < 18; i++) {
    const year = 2023 + Math.floor((i) / 12);
    const month = (i % 12) + 1;
    const total = monthlyAmounts[i];

    // Split into 2-3 transactions per month
    const splits = i % 3 === 0 ? [0.5, 0.3, 0.2] : [0.6, 0.4];
    for (let j = 0; j < splits.length; j++) {
      const day = 5 + j * 10;
      const amt = Math.round(total * splits[j]);
      txns.push({
        seller_id: rajuId,
        buyer_name: buyers[(i + j) % buyers.length],
        amount: amt,
        upi_ref: `UPI${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}${Math.floor(Math.random() * 99999)}`,
        payment_status: 'completed',
        notes: products_names[(i + j) % products_names.length],
        created_at: new Date(year, month - 1, day).toISOString()
      });
    }
  }

  const { error: txnErr } = await supabase.from('transactions').insert(txns);
  if (txnErr) console.error('❌ Transactions:', txnErr.message);
  else console.log(`✅ Created ${txns.length} transactions (total ~₹81,700)`);

  // 3. Create 6 demo products
  console.log('🏺 Creating demo products...');
  const demoProducts = [
    { seller_id: rajuId, title: 'Terracotta Flower Vase', craft_type: 'Pottery', category: 'Home Decor', price: 850, photo_url: 'https://placehold.co/400x400?text=Vase', tags: ['terracotta', 'handmade', 'decor'], is_active: true },
    { seller_id: rajuId, title: 'Hand-painted Clay Diya Set (12 pcs)', craft_type: 'Pottery', category: 'Festival', price: 450, photo_url: 'https://placehold.co/400x400?text=Diya', tags: ['diya', 'festival', 'clay'], is_active: true },
    { seller_id: rajuId, title: 'Ceramic Tea Cup Set', craft_type: 'Pottery', category: 'Kitchen', price: 1200, photo_url: 'https://placehold.co/400x400?text=TeaCup', tags: ['ceramic', 'tea', 'handmade'], is_active: true },
    { seller_id: rajuId, title: 'Earthen Water Pot (Matka)', craft_type: 'Pottery', category: 'Traditional', price: 350, photo_url: 'https://placehold.co/400x400?text=Matka', tags: ['earthen', 'water', 'traditional'], is_active: true },
    { seller_id: rajuId, title: 'Decorative Clay Figurine', craft_type: 'Pottery', category: 'Art', price: 1500, photo_url: 'https://placehold.co/400x400?text=Figurine', tags: ['figurine', 'art', 'decorative'], is_active: true },
    { seller_id: rajuId, title: 'Blue Pottery Planter', craft_type: 'Pottery', category: 'Garden', price: 950, photo_url: 'https://placehold.co/400x400?text=Planter', tags: ['blue pottery', 'planter', 'garden'], is_active: true }
  ];

  const { error: prodErr } = await supabase.from('products').insert(demoProducts);
  if (prodErr) console.error('❌ Products:', prodErr.message);
  else console.log('✅ Created 6 demo products');

  // 4. Create cluster "Khurja Pottery Collective"
  console.log('👥 Creating cluster...');

  // Create other members first
  const otherMembers = [
    { name: 'Sunita Devi', craft_type: 'Pottery', location: 'Khurja, UP', state: 'Uttar Pradesh', phone: '9876543211', language: 'hi', group_status: 'Women' },
    { name: 'Mohan Lal', craft_type: 'Pottery', location: 'Khurja, UP', state: 'Uttar Pradesh', phone: '9876543212', language: 'hi', group_status: 'OBC' },
    { name: 'Priya Sharma', craft_type: 'Pottery', location: 'Khurja, UP', state: 'Uttar Pradesh', phone: '9876543213', language: 'hi', group_status: 'General' }
  ];

  const memberIds = [rajuId];
  for (const m of otherMembers) {
    const { data, error } = await supabase.from('users').upsert(m, { onConflict: 'phone' }).select().single();
    if (error) { console.error(`❌ Member ${m.name}:`, error.message); continue; }
    memberIds.push(data.id);
  }

  const { data: cluster, error: clusterErr } = await supabase.from('clusters').insert({
    name: 'Khurja Pottery Collective',
    admin_id: rajuId,
    description: 'A collective of Khurja pottery artisans specializing in traditional blue pottery and terracotta'
  }).select().single();

  if (clusterErr) { console.error('❌ Cluster:', clusterErr.message); }
  else {
    const splits = [40, 30, 20, 10];
    const roles = ['Lead Potter', 'Glazing Specialist', 'Kiln Manager', 'Marketing'];
    const members = memberIds.map((uid, i) => ({
      cluster_id: cluster.id,
      user_id: uid,
      role: roles[i],
      split_pct: splits[i],
      is_locked: true
    }));

    const { error: memErr } = await supabase.from('cluster_members').insert(members);
    if (memErr) console.error('❌ Cluster members:', memErr.message);
    else console.log(`✅ Cluster: ${cluster.name} with ${memberIds.length} members`);
  }

  // 5. Create notifications for Raju
  console.log('🔔 Creating notifications...');
  const notifs = [
    {
      user_id: rajuId,
      type: 'scheme_eligible',
      scheme_id: 'pm_vishwakarma',
      title_en: 'You qualify for PM Vishwakarma!',
      title_hi: 'आप PM विश्वकर्मा के लिए पात्र हैं!',
      title_kn: 'ನೀವು PM ವಿಶ್ವಕರ್ಮಕ್ಕೆ ಅರ್ಹರು!',
      body_en: 'Your 18-month sales record of ₹81,700 qualifies you for PM Vishwakarma toolkit and credit benefits.',
      body_hi: 'आपके 18 महीने के ₹81,700 के बिक्री रिकॉर्ड से आप PM विश्वकर्मा टूलकिट और क्रेडिट लाभ के लिए पात्र हैं।',
      body_kn: 'ನಿಮ್ಮ 18 ತಿಂಗಳ ₹81,700 ಮಾರಾಟ ದಾಖಲೆ PM ವಿಶ್ವಕರ್ಮ ಟೂಲ್‌ಕಿಟ್ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಲಾಭಗಳಿಗೆ ಅರ್ಹತೆ ನೀಡುತ್ತದೆ.',
      is_read: true,
      metadata: { eligibility_score: 85 }
    },
    {
      user_id: rajuId,
      type: 'order_confirmed',
      title_en: 'Order Confirmed — Terracotta Vase',
      title_hi: 'ऑर्डर की पुष्टि — टेराकोटा फूलदान',
      title_kn: 'ಆರ್ಡರ್ ದೃಢಪಡಿಸಲಾಗಿದೆ — ಟೆರಾಕೊಟಾ ಹೂದಾನಿ',
      body_en: 'A. Sharma ordered 1x Terracotta Flower Vase for ₹850.',
      body_hi: 'ए. शर्मा ने ₹850 में 1 टेराकोटा फूलदान का ऑर्डर दिया।',
      body_kn: 'A. ಶರ್ಮಾ ₹850 ಗೆ 1 ಟೆರಾಕೊಟಾ ಹೂದಾನಿ ಆರ್ಡರ್ ಮಾಡಿದರು.',
      is_read: false
    },
    {
      user_id: rajuId,
      type: 'payment_received',
      title_en: 'Payment Received — ₹1,200',
      title_hi: 'भुगतान प्राप्त — ₹1,200',
      title_kn: 'ಪಾವತಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ — ₹1,200',
      body_en: '₹1,200 received via UPI from R. Patel for Ceramic Tea Cup Set.',
      body_hi: '₹1,200 आर. पटेल से UPI द्वारा सिरेमिक चाय कप सेट के लिए प्राप्त।',
      body_kn: '₹1,200 R. ಪಟೇಲ್ ಅವಿಂದ UPI ಮೂಲಕ ಸಿರಾಮಿಕ್ ಟೀ ಕಪ್ ಸೆಟ್‌ಗಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
      is_read: false
    }
  ];

  const { error: notifErr } = await supabase.from('notifications').insert(notifs);
  if (notifErr) console.error('❌ Notifications:', notifErr.message);
  else console.log('✅ Created 3 notifications');

  console.log('\n🎉 Seed complete! User Raju is ready for demo.');
  console.log(`   User ID: ${rajuId}`);
}

seed();
