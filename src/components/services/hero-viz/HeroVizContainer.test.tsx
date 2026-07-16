// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import HeroVizContainer from "./HeroVizContainer";

afterEach(() => cleanup());

vi.mock("@/lib/framer", () => ({
  m: new Proxy(
    {},
    {
      get: () => (props: Record<string, unknown>) => {
        const { children } = props;
        return <div data-testid="motion-div">{children as React.ReactNode}</div>;
      },
    }
  ),
}));

vi.mock("./ServiceHeroVizParts", () => ({
  BrowserFrame: ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div data-testid="browser-frame" data-label={label}>{children}</div>
  ),
  FloatingBadge: ({ label, value }: { label: string; value: string }) => (
    <div data-testid="floating-badge" data-label={label} data-value={value}>{label}: {value}</div>
  ),
  HeroVizShell: ({ children }: { children: React.ReactNode }) => <div data-testid="hero-viz-shell">{children}</div>,
  HeroVizStage: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="hero-viz-stage" className={className}>{children}</div>
  ),
}));

describe("HeroVizContainer", () => {
  it("renders BrowserFrame with label and children", () => {
    const { container } = render(
      <HeroVizContainer browserLabel="Test Dashboard">
        <div data-testid="child">content</div>
      </HeroVizContainer>
    );
    expect(container.querySelector('[data-testid="browser-frame"]')).toHaveAttribute("data-label", "Test Dashboard");
    expect(container.querySelector('[data-testid="child"]')).toHaveTextContent("content");
  });

  it("renders badges when provided", () => {
    const { container } = render(
      <HeroVizContainer
        browserLabel="Test"
        badges={[
          { label: "Growth", value: "+280%" },
          { label: "Score", value: "98", accent: "emerald" },
        ]}
      >
        <div>content</div>
      </HeroVizContainer>
    );
    expect(container.querySelectorAll('[data-testid="floating-badge"]')).toHaveLength(2);
  });

  it("renders without badges", () => {
    const { container } = render(
      <HeroVizContainer browserLabel="Empty">
        <div>content</div>
      </HeroVizContainer>
    );
    expect(container.querySelector('[data-testid="floating-badge"]')).toBeNull();
  });

  it("passes highlight prop through", () => {
    const { container } = render(
      <HeroVizContainer browserLabel="Test" highlight>
        <div>content</div>
      </HeroVizContainer>
    );
    expect(container.querySelector('[data-testid="browser-frame"]')).toBeInTheDocument();
  });

  it("applies stageClassName to the stage wrapper", () => {
    const { container } = render(
      <HeroVizContainer browserLabel="Test" stageClassName="items-start">
        <div>content</div>
      </HeroVizContainer>
    );
    expect(container.querySelector('[data-testid="hero-viz-stage"]')).toHaveClass("items-start");
  });
});
