
import { createClient } from '@supabase/supabase-js';
import path from 'path';

// Bun automatically loads .env files
// Ensure this script is run from the directory containing .env.local or passing the env vars explicitly

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const ARTICLES_DATA = [
  {
    title: "The Virtual Asset Paradox: Property Rights in Centralized Servers",
    date: "2024-01-15",
    category: "Research",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    author: "IBLM Research Team",
    summary: "A comprehensive white paper analyzing the legal status of in-game items across EU, US, and Asian jurisdictions. We explore the tension between EULA definitions and emerging property law.",
    content: `
      <p>
        <strong>Abstract:</strong> This paper explores the tension between End
        User License Agreements (EULAs) which traditionally define virtual
        items as licensed services, and emerging case law that increasingly
        treats them as personal property with tangible value.
      </p>
      <h3>The Shift in Judicial Sentiment</h3>
      <p>
        Our research indicates a shifting judicial sentiment in the EU
        regarding the resale rights of digital goods. Following the precedent
        set by <em>UsedSoft v. Oracle</em>, we argue that
        'tokenized' items that can be traded on secondary markets
        may soon be subject to the doctrine of exhaustion.
      </p>
      <h3>Implications for MMO Economies</h3>
      <p>
        We analyze three potential regulatory futures: status quo, strict
        regulation (classifying loot boxes as gambling), and a middle ground
        of 'digital consumer rights' that guarantees ownership
        portability. For studios, this means the current model of
        'revocable license' may effectively be dead within 5 years.
      </p>
    `
  },
  {
    title: "Algorithmic Fairness in Matchmaking Systems",
    date: "2023-12-05",
    category: "Research",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    author: "IBLM Research Team",
    summary: "Investigating the legal implications of Engagement Optimized Matchmaking (EOMM) and potential consumer protection liabilities regarding transparency and manipulation.",
    content: `
      <p>
        As matchmaking algorithms move beyond pure skill-based ranking (SBMM)
        to maximize player retention and spend (EOMM), new legal risks emerge
        regarding transparency and deceptive practices.
      </p>
      <h3>The Black Box Problem</h3>
      <p>
        Players are increasingly aware that their multiplayer experience is
        curated not just for fairness, but for psychological engagement. Our
        paper dissects the potential liability under the FTC Act for 'dark
        patterns' if matchmaking is secretly weighted to encourage
        microtransaction purchases (e.g., matching a player with a paid skin
        against lower-skill opponents to showcase the item).
      </p>
      <p>
        We propose a framework for 'Algorithmic Disclosure' that
        allows studios to maintain trade secrets while satisfying consumer
        protection requirements.
      </p>
    `
  },
  {
    title: "AI in Game Development: The New Copyright Frontier",
    date: "2023-10-12",
    category: "Intellectual Property",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary: "As generative AI tools become standard in asset creation, studios face a legal gray area. We analyze the latest US Copyright Office rulings and what they mean for your IP portfolio.",
    content: `
      <p>
        The integration of Generative AI into game development pipelines is
        not just a technological shift; it's a legal earthquake. As
        studios increasingly rely on tools like Midjourney and Stable
        Diffusion for concept art, textures, and even voice acting, the
        question of ownership has never been more critical.
      </p>
      <h3>The Human Authorship Requirement</h3>
      <p>
        Recent guidance from the US Copyright Office has reinforced the
        'human authorship' requirement. This creates a dichotomy in
        modern game development: assets created entirely by human hands are
        protected, while those generated purely by AI may fall into the public
        domain.
      </p>
      <p>
        For studios, this presents a significant risk. If your main character
        design is AI-generated and unprotectable, you have no legal recourse
        against clones or derivatives. We advise a 'sandwich'
        approach to asset creation: human sketching, AI iteration, and
        significant human overpainting/finalization.
      </p>
      <h3>Data Scrapping and Liability</h3>
      <p>
        Beyond copyright registration, there is the looming issue of
        infringement. Several class-action lawsuits are currently testing
        whether training AI models on copyrighted data constitutes 'fair
        use'. Until the courts provide clarity, we recommend strict
        indemnification clauses in vendor contracts and a thorough audit of
        any third-party AI tools used in your pipeline.
      </p>
    `
  },
  {
    title: "Esports Franchising: Key Contract Clauses for 2024",
    date: "2023-09-28",
    category: "Esports",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    author: "David Choi",
    summary: "The franchised league model is evolving. From revenue sharing to termination rights, we break down the essential clauses team owners must negotiate in the upcoming season.",
    content: `
      <p>
        The esports winter has thawed, but the landscape has changed. The era
        of inflated valuations and loose franchise agreements is over. In
        2024, sustainability is the watchword, and your participation
        agreement needs to reflect that.
      </p>
      <h3>Revenue Share Transparency</h3>
      <p>
        Historically, publishers have been opaque about league revenues. New
        standard clauses are demanding third-party auditing rights for teams.
        If you are buying into a slot, you need a guarantee that the revenue
        split is based on verified net revenues, not gross figures with hidden
        deductions.
      </p>
      <h3>Force Majeure and League Cancellation</h3>
      <p>
        After the collapse of several high-profile leagues, 'termination
        for convenience' clauses by publishers are being heavily
        contested. We are structuring agreements that provide specific
        buy-back guarantees if a league ceases operations within the first 3
        years.
      </p>
    `
  },
  {
    title: "Influencer Disclosures: Navigating FTC Updates",
    date: "2023-09-15",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    author: "Sarah Jenkins",
    summary: "The FTC has updated its endorsement guides. 'Link in bio' is no longer enough. Learn how to keep your influencer campaigns compliant and avoid hefty fines.",
    content: `
      <p>
        The Federal Trade Commission is no longer sending warning letters;
        they are levying fines. The updated Endorsement Guides make it clear
        that disclosures must be "unavoidable".
      </p>
      <h3>Visual and Audible Disclosures</h3>
      <p>
        For TikTok and Reels, a text overlay that is hidden by the UI buttons
        is considered non-compliant. The disclosure must be superimposed over
        the video itself and, crucially, if the endorsement is in the audio,
        the disclosure must be audible as well.
      </p>
      <p>
        We are advising clients to implement a strict "Compliance
        Checklist" for all influencer activations, requiring approval of
        the draft content before it goes live to ensure these standards are
        met.
      </p>
    `
  },
  {
    title: "Loot Boxes & Gambling: The EU Regulatory Storm",
    date: "2023-08-10",
    category: "Intellectual Property",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary: "With Belgium and the Netherlands leading the charge, the EU is closing in on loot box mechanics. We discuss compliant monetization strategies for the European market.",
    content: `
      <p>
        The definition of 'gambling' in video games is expanding.
        While the UK has decided against an immediate ban, the EU Parliament
        has voted to take action to protect consumers, specifically minors.
      </p>
      <h3>Transparency Mechanics</h3>
      <p>
        To operate safely in the EU, games must now disclose exact drop rates
        within the UI of the purchase screen. Furthermore, 'pity
        timers' (guaranteed drops after X attempts) are becoming an
        industry standard to argue against the 'chance' element in
        court.
      </p>
    `
  },
  {
    title: "M&A in Gaming: Trends for 2024",
    date: "2023-07-22",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary: "Consolidation continues, but regulatory scrutiny is at an all-time high. How to structure your studio for a successful exit in a hostile antitrust environment.",
    content: `
      <p>
        The mega-mergers of 2022 attracted the eye of the FTC and CMA. In
        2024, we are seeing a shift towards mid-market acquisitions. Large
        publishers are looking to acquire specific IP or technical talent
        rather than entire publishing arms.
      </p>
      <h3>Earn-outs and Retention</h3>
      <p>
        Deal structures have shifted from all-cash upfront to heavy earn-out
        components. Founders should be prepared for 3-5 year vesting periods
        attached to performance milestones of the studio post-acquisition.
      </p>
    `
  }
];

async function seed() {
  console.log('🌱 Starting Article Seeding...');

  // 1. Process Categories
  console.log('📚 Processing Categories...');
  const categoryMap = new Map();
  const uniqueCategories = [...new Set(ARTICLES_DATA.map(a => a.category))];

  for (const catName of uniqueCategories) {
    const slug = catName.toLowerCase().replace(/ /g, '-');
    
    // Check if exists
    const { data: existing } = await supabase
      .from('article_categories')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      categoryMap.set(catName, existing.id);
      console.log(`  - Found category: ${catName}`);
    } else {
      // Create new
      const { data: newCat, error } = await supabase
        .from('article_categories')
        .insert({
          name_en: catName,
          name_id: catName, // Fallback for ID
          slug: slug,
          is_active: true
        })
        .select('id')
        .single();
      
      if (error) {
        console.error(`  - Error creating category ${catName}:`, error.message);
      } else {
        categoryMap.set(catName, newCat.id);
        console.log(`  - Created category: ${catName}`);
      }
    }
  }

  // 2. Process Authors
  console.log('👤 Processing Authors...');
  const authorMap = new Map();
  const uniqueAuthors = [...new Set(ARTICLES_DATA.map(a => a.author))];

  for (const authorName of uniqueAuthors) {
    // Check if exists (assuming name_en matches)
    const { data: existing } = await supabase
      .from('lawyers')
      .select('id')
      .eq('name_en', authorName)
      .single();

    if (existing) {
      authorMap.set(authorName, existing.id);
      console.log(`  - Found author: ${authorName}`);
    } else {
      // Create new placeholder lawyer
      const slug = authorName.toLowerCase().replace(/ /g, '-');
      const { data: newAuthor, error } = await supabase
        .from('lawyers')
        .insert({
          name_en: authorName,
          name_id: authorName,
          slug: slug,
          position_en: 'Contributor',
          position_id: 'Kontributor',
          is_active: true,
          email: `${slug}@iblm.com` // Fake email
        })
        .select('id')
        .single();

      if (error) {
        console.error(`  - Error creating author ${authorName}:`, error.message);
      } else {
        authorMap.set(authorName, newAuthor.id);
        console.log(`  - Created author: ${authorName}`);
      }
    }
  }

  // 3. Insert Articles
  console.log('📝 Inserting Articles...');
  
  for (const article of ARTICLES_DATA) {
    const slug = article.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // Check if exists
    const { data: existing } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      console.log(`  - Skipping existing article: ${article.title}`);
      continue;
    }

    const { error } = await supabase
      .from('articles')
      .insert({
        title_en: article.title,
        title_id: article.title, // Fallback
        slug: slug,
        excerpt_en: article.summary,
        excerpt_id: article.summary, // Fallback
        content_en: article.content,
        content_id: article.content, // Fallback
        cover_url: article.image,
        category_id: categoryMap.get(article.category),
        author_id: authorMap.get(article.author),
        published_at: new Date(article.date).toISOString(),
        is_published: true,
        created_at: new Date(article.date).toISOString() // Backdate creation
      });

    if (error) {
      console.error(`  - Error creating article ${article.title}:`, error.message);
    } else {
      console.log(`  - Created article: ${article.title}`);
    }
  }

  console.log('✅ Seeding Complete!');
}

seed().catch(console.error);
