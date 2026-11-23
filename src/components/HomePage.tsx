import { getDictionary, type Locale } from '@/i18n';
import { getCases } from '@/content/cases';
import { Header } from './Header';
import { Hero } from './Hero';
import { Tape } from './Tape';
import { Room } from './room/Room';
import { RoomStage } from './room/RoomStage';
import { Chapters } from './room/Chapters';
import { Footer } from './Footer';
import { CaseDialog } from './cases/CaseDialog';
import { PageScripts } from './PageScripts';
import { Guestbook } from './Guestbook';

/** The whole one-page site, in one language. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <Header t={t.header} />
      <main id="top">
        <Hero t={t.hero} />
        <Tape phrases={t.tape} />
        <Room
          label={t.room.label}
          cat={{ awake: t.room.miao, asleep: t.room.miaoAsleep }}
          terminal={t.room.terminal}
          dock={{
            label: t.room.dock.label,
            targets: {
              book: { id: 'percorso', text: t.room.dock.book },
              desk: { id: 'progetti', text: t.room.dock.desk },
              sofa: { id: 'divano', text: t.room.dock.sofa },
              tv: { id: 'weekend', text: t.room.dock.tv },
            },
          }}
        >
          <RoomStage t={t.room} locale={locale} />
          <Chapters t={t} />
        </Room>
      </main>
      <Footer t={t.footer} views={t.views} social={t.social} locale={locale} />
      {getCases(locale).map((c) => (
        <CaseDialog key={c.key} c={c} closeLabel={t.caseClose} />
      ))}
      <Guestbook t={t.guestbook} locale={locale} closeLabel={t.caseClose} />
      <PageScripts />
    </>
  );
}
