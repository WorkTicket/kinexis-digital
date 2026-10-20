import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import latam from "../../messages/es-419.json";
import spain from "../../messages/es-ES.json";
import { pickChromeMessages } from "./chrome-messages";

describe("localized navigation CTA", () => {
  it.each([en, latam, spain])("keeps the Messenger label in the client chrome catalog", messages => {
    const picked = pickChromeMessages({ nav: messages.nav, common: messages.common });
    expect(picked.nav).toMatchObject({ messageMessenger: messages.common.messageMessenger });
    expect(picked.common).toBeUndefined();
  });
});
