import Button from "./Button";
import TeamClient from "./TeamClient";
import { lawyersService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";
import { LawyerDetailTranslations } from "./LawyerDetailPopup";

// Translation keys for Team section
export interface TeamTranslations {
  title: string;
  subtitle: string;
  cta: string;
  noTeam?: string;
  detail: LawyerDetailTranslations;
}

interface TeamProps {
  locale: string;
}

const Team = async ({ locale }: TeamProps) => {
  // Fetch only 3 featured lawyers directly at database level
  const [{ data: lawyers }, dict] = await Promise.all([
    lawyersService.getFeaturedWithLimit(3),
    getDictionary(locale as Locale),
  ]);

  const translations: TeamTranslations = {
    title: dict.home.team.title,
    subtitle: dict.home.team.subtitle,
    cta: dict.home.team.cta,
    noTeam: dict.home.team.noTeam,
    detail: dict.lawyers.detail,
  };

  return (
    <section id="team" className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              {translations.subtitle}
            </span>
            <h2 className="text-5xl font-light text-[#0B1B3B]">
              {translations.title}
            </h2>
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" href="/lawyers">
              {translations.cta}
            </Button>
          </div>
        </div>

        {/* Members Grid + Popup — Client Component handles interactivity */}
        <TeamClient
          lawyers={lawyers || []}
          locale={locale}
          translations={translations}
        />

        <div className="mt-16 md:hidden text-center">
          <Button variant="secondary" href="/lawyers">
            {translations.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Team;
