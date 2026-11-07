function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.073C24 5.446 18.627 0 12 0S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

export default function FacebookChooser({ english, spanish }: { english?: string; spanish?: string }) {
  if (!english && !spanish) return null;

  if (!english || !spanish) {
    return (
      <a className="footer-social__btn footer-social__btn--wide" href={english || spanish} target="_blank" rel="noopener noreferrer" aria-label="Kinexis Digital on Facebook">
        <FacebookIcon />
        <span>Facebook</span>
      </a>
    );
  }

  return (
    <div className="fb-chooser relative" data-fb="">
      <button
        type="button"
        className="footer-social__btn footer-social__btn--wide"
        aria-expanded={false}
        aria-haspopup="menu"
        aria-label="Choose a Kinexis Digital Facebook page"
      >
        <FacebookIcon />
        <span>Facebook</span>
      </button>
      <div className="fb-menu absolute top-full left-0 z-20 pt-2 invisible opacity-0 transition duration-150">
        <div role="menu" aria-label="Facebook pages" className="flex items-center gap-0.5 rounded-full bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,.22)]">
          <a
            className="rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.04em] text-brand-navy transition hover:bg-[#1877F2] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-bright"
            role="menuitem"
            href={english}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="English Facebook page"
          >
            English page
          </a>
          <span className="mx-0.5 h-3 w-px bg-brand-navy/20" aria-hidden="true" />
          <a
            className="rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.04em] text-brand-navy transition hover:bg-[#1877F2] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-bright"
            role="menuitem"
            href={spanish}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spanish Facebook page"
          >
            Spanish page
          </a>
        </div>
      </div>
    </div>
  );
}
