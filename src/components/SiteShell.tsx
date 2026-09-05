import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, header, footer }: Props) {
  return (
    <>
      {header}
      <div className="site-shell flex min-h-full flex-1 flex-col">
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        {footer}
      </div>
    </>
  );
}
