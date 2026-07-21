import { Crown, Trophy, ExternalLink } from "lucide-react";

/**
 * The Bookshelf — a walnut bookcase that tells the story of what I've
 * learned and what I'm learning now. Each certification / course is a
 * book spine; awards get a gold crown; the "Currently reading" shelf
 * holds the credentials still in progress (marked with a bookmark).
 *
 * Books that have a scanned certificate (`image`) are clickable — they
 * pull off the shelf and open the certificate in a new tab.
 */

type Cert = {
  title: string;
  org: string;
  year?: string;
  image?: string;
  featured?: boolean;
};

/* Rich, library-grade spine colours — all read well with warm-white foil text.
   Deterministically assigned by index so the shelf looks intentionally varied. */
const SPINES = [
  "linear-gradient(90deg,#26355e,#1a2542)", // deep navy
  "linear-gradient(90deg,#5a3d2b,#3c2819)", // walnut
  "linear-gradient(90deg,#1f4a44,#123430)", // forest teal
  "linear-gradient(90deg,#5c2733,#3d1a22)", // burgundy
  "linear-gradient(90deg,#3a3f5c,#262a40)", // slate indigo
  "linear-gradient(90deg,#7a5f16,#54410f)", // ochre / mustard
  "linear-gradient(90deg,#274b3a,#163026)", // pine green
];
const HEIGHTS = [190, 206, 178, 198, 210, 184, 202];

function Book({
  cert,
  index,
  bookmark = false,
}: {
  cert: Cert;
  index: number;
  bookmark?: boolean;
}) {
  const background = SPINES[index % SPINES.length];
  const height = (cert.featured ? 214 : HEIGHTS[index % HEIGHTS.length]) + "px";
  const clickable = Boolean(cert.image);

  const inner = (
    <>
      {cert.featured && (
        <span className="book-award-tag" aria-hidden>
          <Crown className="size-3.5" />
        </span>
      )}
      {bookmark && <span className="book-bookmark" aria-hidden />}
      <div className="book-content">
        <span className="book-title">{cert.title}</span>
        <div className="flex flex-col items-center gap-1">
          {cert.year && <span className="book-year">{cert.year}</span>}
          <span className="book-org">{cert.org}</span>
        </div>
      </div>
    </>
  );

  if (clickable) {
    return (
      <a
        href={cert.image}
        target="_blank"
        rel="noopener noreferrer"
        className="book is-clickable group"
        style={{ background, height }}
        aria-label={`${cert.title} — ${cert.org}. View certificate`}
        title={`${cert.title} — view certificate`}
      >
        {inner}
        <span className="pointer-events-none absolute inset-x-0 bottom-1 z-[2] flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink className="size-3 text-white/90" />
        </span>
      </a>
    );
  }

  return (
    <div className="book" style={{ background, height }} title={`${cert.title} — ${cert.org}`}>
      {inner}
    </div>
  );
}

function ShelfLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="skeuo-chip !bg-[color-mix(in_oklch,var(--gold)_22%,var(--card))] !border-[color-mix(in_oklch,var(--gold)_50%,transparent)] text-gold !text-[0.7rem] font-bold tracking-wider uppercase">
      {children}
    </span>
  );
}

export function Bookshelf({
  items,
  inProgress,
}: {
  items: Cert[];
  inProgress: readonly string[];
}) {
  return (
    <div className="bookcase">
      {/* Shelf 1 — certifications & awards */}
      <div className="shelf">
        <div className="mb-1 flex items-center gap-3 px-1">
          <ShelfLabel>Certifications &amp; Awards</ShelfLabel>
          <div className="rule-gold flex-1 opacity-40" />
        </div>
        <div className="shelf-row">
          {/* A real trophy standing on the shelf for the marquee win */}
          <div className="trophy-obj" title="1st Place — AI & ML Hackathon">
            <Trophy className="trophy-cup size-11" strokeWidth={1.5} />
            <span className="trophy-base" />
            <span className="trophy-label">1st Place</span>
          </div>
          {items.map((cert, i) => (
            <Book key={cert.title} cert={cert} index={i} />
          ))}
        </div>
        <div className="shelf-plank" />
      </div>

      {/* Shelf 2 — currently reading (in-progress credentials) */}
      <div className="shelf">
        <div className="mb-1 flex items-center gap-3 px-1">
          <ShelfLabel>Currently Reading</ShelfLabel>
          <div className="rule-gold flex-1 opacity-40" />
        </div>
        <div className="shelf-row" style={{ minHeight: 190 }}>
          {inProgress.map((title, i) => (
            <Book
              key={title}
              cert={{ title, org: "In progress" }}
              index={i + 2}
              bookmark
            />
          ))}
          <div className="trophy-obj" title="Always learning">
            <Trophy className="trophy-cup size-8 opacity-80" strokeWidth={1.5} />
            <span className="trophy-label">Next up</span>
          </div>
        </div>
        <div className="shelf-plank" />
      </div>
    </div>
  );
}
