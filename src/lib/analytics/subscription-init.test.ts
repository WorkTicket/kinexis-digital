import { expect, it } from "vitest";
import { buildMetaPixelInitScript } from "./meta-pixel";
it.each([null, "rejected", "accepted"])("gates subscription-page initializer events with consent %s", consent => {
  const browser = { location: { pathname: "/pay/thanks" } } as { location: { pathname: string }; fbq: { queue: Array<ArrayLike<unknown>> } };
  const snippet = buildMetaPixelInitScript("123456789", { loadScript: false });
  new Function("window", "document", "localStorage", "navigator", `with(window){${snippet}}`)(browser, { cookie: "" }, { getItem: () => consent }, {});
  const events = browser.fbq.queue.map(args => Array.from(args)).filter(args => args[0] === "track");
  expect(events).toEqual(consent === "accepted" ? [["track", "PageView"]] : []);
});
