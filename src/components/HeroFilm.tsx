const POSTER = "/assets/video/kinexis-explainer-v5f-preview-poster.webp";
const POSTER_SRCSET = "/assets/video/kinexis-explainer-v5f-preview-poster-640.webp 640w, /assets/video/kinexis-explainer-v5f-preview-poster-768.webp 768w, /assets/video/kinexis-explainer-v5f-preview-poster-960.webp 960w";
const POSTER_AVIF_SRCSET = "/assets/video/kinexis-explainer-v5f-preview-poster-640.avif 640w, /assets/video/kinexis-explainer-v5f-preview-poster-768.avif 768w, /assets/video/kinexis-explainer-v5f-preview-poster-960.avif 960w";
// The framed film renders at roughly 560px on desktop. This selects 640w at 1x
// and 960w at high density instead of downloading 768w for a ~300px slot.
const POSTER_SIZES = "(max-width: 720px) calc(100vw - 32px), 560px";

/** Homepage hero film. The poster paints first. The boot script attaches sources after that paint, or after the first input. */
export default function HeroFilm() {
  return (
    <>
      <link rel="preload" as="image" href="/assets/video/kinexis-explainer-v5f-preview-poster-640.avif" imageSrcSet={POSTER_AVIF_SRCSET} imageSizes={POSTER_SIZES} type="image/avif" fetchPriority="high" />
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
            width={960}
            height={540}
             fetchPriority="auto"
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
        <button type="button" className="hero__play" data-dialog="video" data-video-src="/assets/video/kinexis-explainer-v5f-sticker.mp4" aria-label="Play video with sound">
          <span className="play" aria-hidden="true">
            <svg width="46" height="46" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 12 50 32 18 52Z" fill="#031b4e" stroke="#031b4e" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M18 12 50 32 18 52Z" fill="#031b4e" stroke="#fff" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
      </div>
    </>
  );
}
