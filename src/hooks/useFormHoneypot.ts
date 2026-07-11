"use client";

import { useRef, useState } from "react";

/** Client-side honeypot + timing fields for spam protection on form POSTs. */
export function useFormHoneypot() {
  const loadedAt = useRef(Date.now()).current;
  const [hp, setHp] = useState("");

  return {
    honeypotProps: {
      name: "_hp",
      value: hp,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHp(e.target.value),
      tabIndex: -1,
      autoComplete: "off",
      "aria-hidden": true,
      className: "absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0",
    } satisfies React.InputHTMLAttributes<HTMLInputElement>,
    honeypotPayload: { _hp: hp, _ts: loadedAt },
  };
}
