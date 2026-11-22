import { Fragment } from 'react';

/**
 * The black tape that scrolls under the hero: what Melania makes, and an invitation to write.
 * The phrases run twice so the loop is seamless; screen readers get them once, as a list.
 */
export function Tape({ phrases }: { phrases: string[] }) {
  const all = [...phrases, ...phrases];
  return (
    <div className="tape">
      <ul className="sr-only">
        {phrases.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div aria-hidden="true">
        {all.map((p, i) => (
          <Fragment key={i}>
            {i > 0 ? ' ' : ''}
            {p} <b>✶</b>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
