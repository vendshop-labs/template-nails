import { useTranslations } from 'next-intl';
import { STATS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';

const STAT_KEYS = ['yearsExp', 'happyClients', 'technicians', 'googleRating'] as const;

export default function StatsBar() {
  const t = useTranslations('stats');
  return (
    <ScrollReveal direction="up">
      <div className="stats-bar">
        <div className="stats-bar__grid">
          {STATS.map((stat, i) => (
            <div key={STAT_KEYS[i]}>
              <div className="stats-bar__number">{stat.number}</div>
              <div className="stats-bar__label">{t(STAT_KEYS[i])}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
