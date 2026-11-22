import { Fragment } from 'react';
import type { Rich } from '@/i18n/types';

/** Renders text with its inline highlights (`span.hl`) and bold bits. */
export function RichText({ value }: { value: Rich }) {
  if (typeof value === 'string') return <>{value}</>;
  return (
    <>
      {value.map((seg, i) =>
        typeof seg === 'string' ? (
          <Fragment key={i}>{seg}</Fragment>
        ) : 'hl' in seg ? (
          <span key={i} className="hl">
            {seg.hl}
          </span>
        ) : (
          <b key={i}>{seg.b}</b>
        ),
      )}
    </>
  );
}
