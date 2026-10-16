// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InAppExampleLink } from "./InAppExampleLink";

afterEach(() => { cleanup(); document.documentElement.classList.remove("in-app-browser"); });
const href = "https://example.com/real-client";
describe("client examples in WebViews", () => {
  it("keeps desktop examples in a separate tab", () => {
    render(<InAppExampleLink href={href}>View live website</InAppExampleLink>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link")).toHaveAttribute("href", href);
  });
  it("uses the same tab when the preflight identifies an in-app browser", () => {
    document.documentElement.classList.add("in-app-browser");
    render(<InAppExampleLink href={href}>View live website</InAppExampleLink>);
    expect(screen.getByRole("link")).not.toHaveAttribute("target");
    expect(screen.getByRole("link")).toHaveAttribute("href", href);
  });
  it("also handles an in-app class added after hydration", () => {
    render(<InAppExampleLink href={href}>View live website</InAppExampleLink>);
    document.documentElement.classList.add("in-app-browser");
    const link = screen.getByRole("link");
    link.addEventListener("click", event => event.preventDefault());
    fireEvent.click(link);
    expect(link).not.toHaveAttribute("target");
  });
});
