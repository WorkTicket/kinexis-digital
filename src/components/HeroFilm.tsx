import { IMAGE_SIZES, imageSrcSet, imageVariant } from "@/lib/image-sources";

export const HERO_POSTER = "/assets/video/kinexis-explainer-v5f-preview-poster.webp";
/** Match CSS: ~360px mobile / ~560px desktop (+ DPR). Preload href uses 560w; imagesrcset covers 280/560/768. */
export const HERO_POSTER_WIDTHS = [280, 560, 768] as const;
/** Desktop-only upgrade — master is 960w (cannot reach true 2×1120 without a larger source). */
export const HERO_POSTER_DESKTOP_WIDTHS = [560, 768, 960] as const;
export const HERO_POSTER_SRCSET = imageSrcSet(HERO_POSTER, HERO_POSTER_WIDTHS);
export const HERO_POSTER_AVIF_SRCSET = imageSrcSet(HERO_POSTER, HERO_POSTER_WIDTHS, "avif");
export const HERO_POSTER_DESKTOP_SRCSET = imageSrcSet(HERO_POSTER, HERO_POSTER_DESKTOP_WIDTHS);
export const HERO_POSTER_DESKTOP_AVIF_SRCSET = imageSrcSet(HERO_POSTER, HERO_POSTER_DESKTOP_WIDTHS, "avif");
export const HERO_POSTER_SIZES = IMAGE_SIZES.heroFilm;
/** Desktop picture sizes — same 560 CSS slot; mobile preload/srcset stay on HERO_POSTER_* above. */
export const HERO_POSTER_DESKTOP_SIZES = "560px";

/** Homepage hero film. The poster paints first. The boot script attaches sources after that paint, or after the first input. */
export default function HeroFilm() {
  // LCP preload: react-dom preload(href) in DocumentShell (before precedence CSS).
  // Keep mobile srcset/sizes identical to the preload (280/560/768). Desktop gets a
  // min-width source with 960w so high-DPI can sharpen without changing mobile LCP.
  return (
    <>
      <div className="hero__media">
      <div className="hero__frame">
        <picture>
          <source
            type="image/avif"
            media="(min-width: 721px)"
            srcSet={HERO_POSTER_DESKTOP_AVIF_SRCSET}
            sizes={HERO_POSTER_DESKTOP_SIZES}
          />
          <source
            type="image/webp"
            media="(min-width: 721px)"
            srcSet={HERO_POSTER_DESKTOP_SRCSET}
            sizes={HERO_POSTER_DESKTOP_SIZES}
          />
          <source type="image/avif" srcSet={HERO_POSTER_AVIF_SRCSET} sizes={HERO_POSTER_SIZES} />
          <img
            className="hero__poster"
            src={imageVariant(HERO_POSTER, 560, "webp")}
            srcSet={HERO_POSTER_SRCSET}
            sizes={HERO_POSTER_SIZES}
            alt=""
            width={960}
            height={540}
            fetchPriority="high"
            // sync decode: poster is the LCP element and is preloaded as AVIF in <head>.
            decoding="sync"
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
            <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path d="M18 12 50 32 18 52Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </div>
      </div>
    </>
  );
}
