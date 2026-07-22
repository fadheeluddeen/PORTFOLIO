import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Crown, Trophy, Maximize2, X } from "lucide-react";

/**
 * The Bookshelf — a walnut bookcase that tells the story of what I've
 * learned and what I'm learning now. Each certification / course is a
 * book spine; awards get a gold crown; the "Currently reading" shelf
 * holds the credentials still in progress (marked with a bookmark).
 *
 * Books that have a scanned certificate (`image`) are clickable — they
 * pull off the shelf and open the certificate in an in-page lightbox.
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
  onOpen,
}: {
  cert: Cert;
  index: number;
  bookmark?: boolean;
  onOpen: (cert: Cert) => void;
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
      <button
        type="button"
        onClick={() => onOpen(cert)}
        className="book is-clickable group"
        style={{ background, height }}
        aria-label={`${cert.title} — ${cert.org}. View certificate`}
        title={`${cert.title} — view certificate`}
      >
        {inner}
        <span className="pointer-events-none absolute inset-x-0 bottom-1 z-[2] flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-3 text-white/90" />
        </span>
      </button>
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

/* In-page certificate viewer */
function CertLightbox({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Rendered via a portal to document.body so the fixed overlay escapes any
  // ancestor with backdrop-filter/transform/filter (e.g. the backdrop-blur
  // section wrapper in App.tsx), which would otherwise become the containing
  // block for `position: fixed` and shove the modal off-screen.
  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="skeuo relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4 px-1 pt-1">
          <div className="min-w-0">
            <h3 className="font-display truncate text-base font-bold sm:text-lg">{cert.title}</h3>
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">
              {cert.org}
              {cert.year ? ` · ${cert.year}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="skeuo-btn-ghost grid size-9 shrink-0 place-items-center rounded-full"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="skeuo-inset flex-1 overflow-auto rounded-xl p-2">
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function Bookshelf({
  items,
  inProgress,
}: {
  items: Cert[];
  inProgress: readonly string[];
}) {
  const [selected, setSelected] = useState<Cert | null>(null);

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
            <Book key={cert.title} cert={cert} index={i} onOpen={setSelected} />
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
              onOpen={setSelected}
            />
          ))}
          <div className="trophy-obj" title="Always learning">
            <Trophy className="trophy-cup size-8 opacity-80" strokeWidth={1.5} />
            <span className="trophy-label">Next up</span>
          </div>
        </div>
        <div className="shelf-plank" />
      </div>

      {selected && <CertLightbox cert={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
