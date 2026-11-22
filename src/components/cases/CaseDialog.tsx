import { caseDialogId, caseTitleId, type CaseStudy } from '@/content/cases';
import { CaseBlocks } from './CaseBlocks';

/*
 * One case study, as a side sheet <dialog>. Opened by any element with data-case="case-<key>",
 * closed by data-close, Esc or a click on the backdrop (see PageScripts).
 */
export function CaseDialog({ c, closeLabel }: { c: CaseStudy; closeLabel: string }) {
  return (
    <dialog className="case" id={caseDialogId(c.key)} aria-labelledby={caseTitleId(c.key)}>
      <div className="case-in">
        <div className="case-top">
          <span className="tag">
            <span className={`sw sw-${c.swatch}`}></span>
            <span>
              {c.folder}
              <small>{c.tarot}</small>
            </span>
          </span>
          <button className="close" type="button" data-close="">
            {closeLabel}
          </button>
        </div>
        <h2 id={caseTitleId(c.key)}>{c.title}</h2>
        {c.owner !== undefined && <p className="owner">{c.owner}</p>}
        <p className="tagline">{c.tagline}</p>
        <CaseBlocks blocks={c.blocks} />
        <div className="next">
          {c.next.map((a) =>
            'close' in a ? (
              <button key={a.label} className="chip" type="button" data-close="">
                {a.label}
              </button>
            ) : (
              <button key={a.label} className="chip" type="button" data-case={caseDialogId(a.open)}>
                {a.label}
              </button>
            ),
          )}
        </div>
      </div>
    </dialog>
  );
}
