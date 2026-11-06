import { preload } from "react-dom";
import { imageSrcSet, imageVariant, still } from "@/lib/image-sources";

const POSTER = "/assets/video/kinexis-explainer-v5f-preview-poster.webp";
const POSTER_WIDTHS = [640, 768, 960] as const;
const POSTER_SRCSET = imageSrcSet(POSTER, POSTER_WIDTHS);
const POSTER_AVIF_SRCSET = imageSrcSet(POSTER, POSTER_WIDTHS, "avif");
// The framed film renders at roughly 560px on desktop. This selects 640w at 1x
// and 960w at high density instead of downloading 768w for a ~300px slot.
const POSTER_SIZES = "(max-width: 720px) calc(100vw - 32px), 560px";

/** Homepage hero film. The poster paints first. The boot script attaches sources after that paint, or after the first input. */
export default function HeroFilm() {
  preload(imageVariant(POSTER, 640, "avif"), { as: "image", imageSrcSet: POSTER_AVIF_SRCSET, imageSizes: POSTER_SIZES, type: "image/avif", fetchPriority: "high" });

  return (
    <>
      <div className="hero__media">
      <div className="hero__frame">
        <picture>
          <source type="image/avif" srcSet={POSTER_AVIF_SRCSET} sizes={POSTER_SIZES} />
          <img
            className="hero__poster"
            src={still(POSTER)}
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
