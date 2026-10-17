import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MetaPixelPreconnect } from "./MetaPixelPreconnect";

describe("MetaPixelPreconnect", () => {
  const html = renderToStaticMarkup(<MetaPixelPreconnect />);

  it("warms the Meta pixel library origin with a crossorigin preconnect", () => {
    expect(html).toContain('rel="preconnect"');
    expect(html).toContain('href="https://connect.facebook.net"');
    expect(html).toContain('crossorigin="anonymous"');
  });

  it("resolves www.facebook.com with a dns-prefetch", () => {
    expect(html).toContain('rel="dns-prefetch"');
    expect(html).toContain('href="https://www.facebook.com"');
  });

  it("does not request the library itself", () => {
    expect(html).not.toContain("fbevents.js");
    expect(html).not.toContain("<script");
  });
});
