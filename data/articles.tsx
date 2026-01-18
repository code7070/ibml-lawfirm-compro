import { type Article } from "../types";
import React from "react";

export const ARTICLE_DATA: Article[] = [
  {
    id: "6",
    title: "The Virtual Asset Paradox: Property Rights in Centralized Servers",
    date: "Jan 15, 2024",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    author: "IBLM Research Team",
    summary:
      "A comprehensive white paper analyzing the legal status of in-game items across EU, US, and Asian jurisdictions. We explore the tension between EULA definitions and emerging property law.",
    content: (
      <>
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
          &apos;tokenized&apos; items that can be traded on secondary markets
          may soon be subject to the doctrine of exhaustion.
        </p>
        <h3>Implications for MMO Economies</h3>
        <p>
          We analyze three potential regulatory futures: status quo, strict
          regulation (classifying loot boxes as gambling), and a middle ground
          of &apos;digital consumer rights&apos; that guarantees ownership
          portability. For studios, this means the current model of
          &apos;revocable license&apos; may effectively be dead within 5 years.
        </p>
      </>
    ),
  },
  {
    id: "7",
    title: "Algorithmic Fairness in Matchmaking Systems",
    date: "Dec 05, 2023",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    author: "IBLM Research Team",
    summary:
      "Investigating the legal implications of Engagement Optimized Matchmaking (EOMM) and potential consumer protection liabilities regarding transparency and manipulation.",
    content: (
      <>
        <p>
          As matchmaking algorithms move beyond pure skill-based ranking (SBMM)
          to maximize player retention and spend (EOMM), new legal risks emerge
          regarding transparency and deceptive practices.
        </p>
        <h3>The Black Box Problem</h3>
        <p>
          Players are increasingly aware that their multiplayer experience is
          curated not just for fairness, but for psychological engagement. Our
          paper dissects the potential liability under the FTC Act for &apos;dark
          patterns&apos; if matchmaking is secretly weighted to encourage
          microtransaction purchases (e.g., matching a player with a paid skin
          against lower-skill opponents to showcase the item).
        </p>
        <p>
          We propose a framework for &apos;Algorithmic Disclosure&apos; that
          allows studios to maintain trade secrets while satisfying consumer
          protection requirements.
        </p>
      </>
    ),
  },
  {
    id: "1",
    title: "AI in Game Development: The New Copyright Frontier",
    date: "Oct 12, 2023",
    category: "Intellectual Property",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary:
      "As generative AI tools become standard in asset creation, studios face a legal gray area. We analyze the latest US Copyright Office rulings and what they mean for your IP portfolio.",
    content: (
      <>
        <p>
          The integration of Generative AI into game development pipelines is
          not just a technological shift; it&apos;s a legal earthquake. As
          studios increasingly rely on tools like Midjourney and Stable
          Diffusion for concept art, textures, and even voice acting, the
          question of ownership has never been more critical.
        </p>
        <h3>The Human Authorship Requirement</h3>
        <p>
          Recent guidance from the US Copyright Office has reinforced the
          &apos;human authorship&apos; requirement. This creates a dichotomy in
          modern game development: assets created entirely by human hands are
          protected, while those generated purely by AI may fall into the public
          domain.
        </p>
        <p>
          For studios, this presents a significant risk. If your main character
          design is AI-generated and unprotectable, you have no legal recourse
          against clones or derivatives. We advise a &apos;sandwich&apos;
          approach to asset creation: human sketching, AI iteration, and
          significant human overpainting/finalization.
        </p>
        <h3>Data Scrapping and Liability</h3>
        <p>
          Beyond copyright registration, there is the looming issue of
          infringement. Several class-action lawsuits are currently testing
          whether training AI models on copyrighted data constitutes &apos;fair
          use&apos;. Until the courts provide clarity, we recommend strict
          indemnification clauses in vendor contracts and a thorough audit of
          any third-party AI tools used in your pipeline.
        </p>
      </>
    ),
  },
  {
    id: "2",
    title: "Esports Franchising: Key Contract Clauses for 2024",
    date: "Sep 28, 2023",
    category: "Esports",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    author: "David Choi",
    summary:
      "The franchised league model is evolving. From revenue sharing to termination rights, we break down the essential clauses team owners must negotiate in the upcoming season.",
    content: (
      <>
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
          After the collapse of several high-profile leagues, &apos;termination
          for convenience&apos; clauses by publishers are being heavily
          contested. We are structuring agreements that provide specific
          buy-back guarantees if a league ceases operations within the first 3
          years.
        </p>
      </>
    ),
  },
  {
    id: "3",
    title: "Influencer Disclosures: Navigating FTC Updates",
    date: "Sep 15, 2023",
    category: "Social Media",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    author: "Sarah Jenkins",
    summary:
      "The FTC has updated its endorsement guides. &apos;Link in bio&apos; is no longer enough. Learn how to keep your influencer campaigns compliant and avoid hefty fines.",
    content: (
      <>
        <p>
          The Federal Trade Commission is no longer sending warning letters;
          they are levying fines. The updated Endorsement Guides make it clear
          that disclosures must be &quot;unavoidable&quot;.
        </p>
        <h3>Visual and Audible Disclosures</h3>
        <p>
          For TikTok and Reels, a text overlay that is hidden by the UI buttons
          is considered non-compliant. The disclosure must be superimposed over
          the video itself and, crucially, if the endorsement is in the audio,
          the disclosure must be audible as well.
        </p>
        <p>
          We are advising clients to implement a strict &quot;Compliance
          Checklist&quot; for all influencer activations, requiring approval of
          the draft content before it goes live to ensure these standards are
          met.
        </p>
      </>
    ),
  },
  {
    id: "4",
    title: "Loot Boxes & Gambling: The EU Regulatory Storm",
    date: "Aug 10, 2023",
    category: "Intellectual Property",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary:
      "With Belgium and the Netherlands leading the charge, the EU is closing in on loot box mechanics. We discuss compliant monetization strategies for the European market.",
    content: (
      <>
        <p>
          The definition of &apos;gambling&apos; in video games is expanding.
          While the UK has decided against an immediate ban, the EU Parliament
          has voted to take action to protect consumers, specifically minors.
        </p>
        <h3>Transparency Mechanics</h3>
        <p>
          To operate safely in the EU, games must now disclose exact drop rates
          within the UI of the purchase screen. Furthermore, &apos;pity
          timers&apos; (guaranteed drops after X attempts) are becoming an
          industry standard to argue against the &apos;chance&apos; element in
          court.
        </p>
      </>
    ),
  },
  {
    id: "5",
    title: "M&A in Gaming: Trends for 2024",
    date: "July 22, 2023",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    author: "Elena Vance",
    summary:
      "Consolidation continues, but regulatory scrutiny is at an all-time high. How to structure your studio for a successful exit in a hostile antitrust environment.",
    content: (
      <>
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
      </>
    ),
  },
];
