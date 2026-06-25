"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import { Link } from "@/i18n/navigation";
import { Linkedin } from "lucide-react";
import type { Author } from "@/content/authors";

type Props = { author: Author };

export default function AuthorPageClient({ author }: Props) {
  return (
    <>
      <HeroArchetype
        archetype="article"
        label="Team"
        headline={author.name}
        subtitle={`${author.jobTitle}. ${author.credentials}.`}
        ctaLabel="Work With Our Team"
        ctaHref="/contact"
      />

      <section className="section-padding bg-bg-dark">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title="About" />

          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <span className="text-2xl font-bold text-neon-cyan/60">
                {author.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-semibold text-white">{author.name}</p>
              <p className="text-sm text-muted">{author.jobTitle}</p>
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-neon-cyan/70 hover:text-neon-cyan transition-colors duration-200"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>

          <p className="mt-6 text-muted leading-relaxed">{author.bio}</p>
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neon-cyan mb-4">Areas of expertise</h3>
            <ul className="flex flex-wrap gap-2">
              {author.expertise.map((item) => (
                <li key={item} className="rounded-full border border-white/[0.08] px-3 py-1 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10">
            <Link href="/about" className="text-sm text-neon-cyan hover:underline">
              ← Back to About
            </Link>
          </p>
        </div>
      </section>

      <CTAArchetype
        archetype="story"
        headline="Want to work with this team?"
        subtitle="Book a strategy call and we will match you with the right specialist for your goals."
        ctaLabel="Book a Call"
        ctaHref="/contact"
      />
    </>
  );
}
