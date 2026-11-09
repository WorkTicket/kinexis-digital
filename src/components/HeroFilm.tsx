import { preload } from "react-dom";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";

const POSTER = "/assets/video/kinexis-explainer-v5f-preview-poster.webp";
const POSTER_WIDTHS = [480, 640, 768, 960] as const;
const POSTER_SRCSET = imageSrcSet(POSTER, POSTER_WIDTHS);
const POSTER_AVIF_SRCSET = imageSrcSet(POSTER, POSTER_WIDTHS, "avif");
// Mobile slot ~360 CSS px; sizes 270px makes DPR 1.75 pick 480w (~15KB) instead
// of 640w, which is enough sharpness for the framed film without bloating LCP.
const POSTER_SIZES = "(max-width: 720px) 270px, 560px";

/** Homepage hero film. The poster paints first. The boot script attaches sources after that paint, or after the first input. */
export default function HeroFilm() {
  preload(imageVariant(POSTER, 480, "avif"), { as: "image", imageSrcSet: POSTER_AVIF_SRCSET, imageSizes: POSTER_SIZES, type: "image/avif", fetchPriority: "high" });

  return (
    <>
      <div className="hero__media">
      <div className="hero__frame">
        <picture>
          <source type="image/avif" srcSet={POSTER_AVIF_SRCSET} sizes={POSTER_SIZES} />
          <img
            className="hero__poster"
            src={imageVariant(POSTER, 640, "webp")}
            srcSet={POSTER_SRCSET}
            sizes={POSTER_SIZES}
            alt=""
            width={960}
            height={540}
            fetchPriority="high"
            // sync decode: poster is the LCP element and is already preloaded as AVIF.
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
