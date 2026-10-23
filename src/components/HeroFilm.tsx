const POSTER = "/assets/video/hero-rLicrajNvqM-poster.webp";
const POSTER_SRCSET = "/assets/video/hero-rLicrajNvqM-poster-640.webp 640w, /assets/video/hero-rLicrajNvqM-poster.webp 768w";
const POSTER_AVIF_SRCSET = "/assets/video/hero-rLicrajNvqM-poster-640.avif 640w, /assets/video/hero-rLicrajNvqM-poster.avif 768w";
const POSTER_SIZES = "(max-width: 860px) 100vw, 560px";

/** Homepage hero film. The poster paints first. The boot script attaches sources after that paint, or after the first input. */
export default function HeroFilm() {
  return (
    <div className="hero__media">
      <div className="hero__frame">
        <picture>
          <source type="image/avif" srcSet={POSTER_AVIF_SRCSET} sizes={POSTER_SIZES} />
          <img
            className="hero__poster"
            src={POSTER}
            srcSet={POSTER_SRCSET}
            sizes={POSTER_SIZES}
            alt=""
            width={768}
            height={432}
            fetchPriority="high"
            decoding="auto"
          />
        </picture>
        <video
          className="hero__film"
          width={1280}
          height={720}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <button type="button" className="hero__play" data-dialog="video" data-video-src="/assets/video/kinexis-explainer-v5e-sticker.mp4" aria-label="Play video with sound">
          <span className="play" aria-hidden="true">
            <svg width="46" height="46" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 12 50 32 18 52Z" fill="#031b4e" stroke="#031b4e" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M18 12 50 32 18 52Z" fill="#031b4e" stroke="#fff" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
