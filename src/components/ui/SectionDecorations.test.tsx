// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SectionGlow, SectionDivider, SectionGridOverlay } from "./SectionDecorations";

describe("SectionGlow", () => {
  it("renders a decorative div with aria-hidden", () => {
    const { container } = render(<SectionGlow color="cyan" size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("applies custom position", () => {
    const { container } = render(<SectionGlow color="blue" position={{ top: "10px", left: "20px" }} />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("style")).toMatch(/top:\s*10px/);
    expect(el.getAttribute("style")).toMatch(/left:\s*20px/);
  });

  it("defaults to cyan color and md size", () => {
    const { container } = render(<SectionGlow />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("SectionDivider", () => {
  it("renders a decorative divider with aria-hidden", () => {
    const { container } = render(<SectionDivider />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("accepts cyan color variant", () => {
    const { container } = render(<SectionDivider color="cyan" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("SectionGridOverlay", () => {
  it("renders a decorative grid overlay with aria-hidden", () => {
    const { container } = render(<SectionGridOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("accepts custom cellSize and opacity", () => {
    const { container } = render(<SectionGridOverlay cellSize={16} opacity={0.3} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
