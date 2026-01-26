import { createClient } from '@supabase/supabase-js';

// Bun automatically loads .env files
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TESTIMONIALS_DATA = [
  {
    client_name: 'Sarah Jenkins',
    position: 'CEO',
    company: 'TechFlow Innovations',
    content_en: '<p>IBLM Law Group provided exceptional counsel during our Series B funding. Their understanding of both technology and corporate law made the process seamless.</p>',
    content_id: '<p>IBLM Law Group memberikan nasihat luar biasa selama pendanaan Seri B kami. Pemahaman mereka tentang hukum teknologi dan korporasi membuat prosesnya berjalan lancar.</p>',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    sort_order: 1,
    is_published: true
  },
  {
    client_name: 'Michael Chen',
    position: 'Founder',
    company: 'PixelPerfect Games',
    content_en: '<p>As an indie game studio, we were lost in the complexity of IP rights. IBLM helped us secure our assets and negotiate fair publishing deals.</p>',
    content_id: '<p>Sebagai studio game indie, kami tersesat dalam kompleksitas hak kekayaan intelektual. IBLM membantu kami mengamankan aset dan menegosiasikan kesepakatan penerbitan yang adil.</p>',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    sort_order: 2,
    is_published: true
  },
  {
    client_name: 'Amanda Wijaya',
    position: 'HR Director',
    company: 'Nusantara Logistics',
    content_en: '<p>The People & Labor Expert Group at IBLM has been invaluable for our workforce restructuring. They handle sensitive matters with great empathy and professionalism.</p>',
    content_id: '<p>Grup Ahli Orang & Tenaga Kerja di IBLM sangat berharga bagi restrukturisasi tenaga kerja kami. Mereka menangani masalah sensitif dengan empati dan profesionalisme yang tinggi.</p>',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 4,
    sort_order: 3,
    is_published: true
  },
  {
    client_name: 'Budi Santoso',
    position: 'Operations Manager',
    company: 'Mega Retail Indonesia',
    content_en: '<p>We rely on IBLM for all our compliance needs. Their proactive approach to regulatory changes has saved us from potential pitfalls multiple times.</p>',
    content_id: '<p>Kami mengandalkan IBLM untuk semua kebutuhan kepatuhan kami. Pendekatan proaktif mereka terhadap perubahan peraturan telah menyelamatkan kami dari potensi masalah berkali-kali.</p>',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    sort_order: 4,
    is_published: true
  },
  {
    client_name: 'Elena Rodriguez',
    position: 'Creative Director',
    company: 'Artistic Vision',
    content_en: '<p>Protecting our creative work is paramount. IBLM\'s IP team is not only knowledgeable but truly passionate about the arts. Highly recommended.</p>',
    content_id: '<p>Melindungi karya kreatif kami adalah hal yang paling utama. Tim KI IBLM tidak hanya berpengetahuan luas tetapi juga benar-benar bersemangat tentang seni. Sangat direkomendasikan.</p>',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    sort_order: 5,
    is_published: true
  }
];

async function seed() {
  console.log('🌱 Starting Testimonial Seeding...');

  for (const item of TESTIMONIALS_DATA) {
    // Check if exists by client_name
    const { data: existing } = await supabase
      .from('testimonials')
      .select('id')
      .eq('client_name', item.client_name)
      .single();

    if (existing) {
      console.log(`  - Skipping existing testimonial from: ${item.client_name}`);
      continue;
    }

    const { error } = await supabase
      .from('testimonials')
      .insert({
        ...item,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error(`  - Error creating testimonial from ${item.client_name}:`, error.message);
    } else {
      console.log(`  - Created testimonial from: ${item.client_name}`);
    }
  }

  console.log('✅ Testimonial Seeding Complete!');
}

seed().catch(console.error);
