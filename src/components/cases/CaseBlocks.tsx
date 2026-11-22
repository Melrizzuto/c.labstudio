import { Fragment } from 'react';
import type { CaseBlock, CaseFigure, CaseImage } from '@/content/cases/types';
import { RichText } from '../RichText';

function Img({ img }: { img: CaseImage }) {
  return <img src={img.src} alt={img.alt} loading="lazy" width={img.width} height={img.height} />;
}

function Figure({ figure }: { figure: CaseFigure }) {
  return (
    <figure>
      <Img img={figure.img} />
      {figure.caption !== undefined && (
        <figcaption>
          <RichText value={figure.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'demo':
      return (
        <figure className="demo">
          <video src={block.src} poster={block.poster} muted loop playsInline controls preload="none" aria-label={block.label}></video>
        </figure>
      );
    case 'figure':
      return <Figure figure={block.figure} />;
    case 'pair':
      return (
        <div className="pair">
          {block.figures.map((f) => (
            <Figure key={f.img.src} figure={f} />
          ))}
        </div>
      );
    case 'facts':
      return (
        <div className="facts">
          {block.items.map((f) => (
            <div key={f.label}>
              <b>{f.label}</b>
              <span>{f.value}</span>
            </div>
          ))}
        </div>
      );
    case 'heading':
      return <h3 id={block.id}>{block.text}</h3>;
    case 'text':
      return (
        <p style={block.marginTop !== undefined ? { marginTop: block.marginTop } : undefined}>
          <RichText value={block.text} />
        </p>
      );
    case 'list':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText value={item} />
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="steps">
          {block.items.map((s) => (
            <li key={s.title}>
              <div>
                {s.when !== undefined && <span className="when">{s.when}</span>}
                <h4>{s.title}</h4>
                <p>
                  <RichText value={s.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'decisions':
      return (
        <div className="decisions">
          {block.items.map((d) => (
            <div key={d.title}>
              <b>{d.title}</b>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      );
    case 'numbers':
      return (
        <div className="numbers">
          {block.items.map((n) => (
            <div key={n.label}>
              <b>{n.value}</b>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      );
    case 'quote':
      return <p className="quote">{block.text}</p>;
    case 'tools':
      return (
        <p className="tools">
          <b>{block.label}</b> {block.text}
        </p>
      );
    case 'highlight':
      return (
        <section className="new" aria-labelledby={block.id}>
          <h3 id={block.id}>{block.title}</h3>
          <CaseBlocks blocks={block.blocks} />
        </section>
      );
    case 'badge':
      return (
        <div className="badge">
          <figure className="ph">
            <Img img={block.photo} />
          </figure>
          <dl>
            {block.facts.map((f) => (
              <Fragment key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </Fragment>
            ))}
          </dl>
          <p className="stamp" aria-hidden="true">
            {block.stamp}
          </p>
        </div>
      );
  }
}

/** The body of a case study, block by block. */
export function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </>
  );
}
