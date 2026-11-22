import { Fragment } from 'react';

/** The black tape that scrolls under the hero. The phrases run twice so the loop is seamless. */
export function Tape({ phrases }: { phrases: string[] }) {
  const all = [...phrases, ...phrases];
  return (
    <div className="tape" aria-hidden="true">
      <div>
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
