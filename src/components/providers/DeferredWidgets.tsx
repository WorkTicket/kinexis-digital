"use client";

import dynamic from "next/dynamic";

const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/features/ChatBot"), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <BackToTop />
      <ChatBot />
    </>
  );
}
