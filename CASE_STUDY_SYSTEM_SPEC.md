# CASE_STUDY_SYSTEM_SPEC

> Comprehensive specification for building premium, data-driven case
> study pages.

# Purpose

This document is the source of truth for all case study implementations.
The objective is that coding agents make **zero design decisions** and
only populate verified content.

# Design Principles

-   Data first.
-   Scan in under 60 seconds.
-   Metrics over prose.
-   Reusable components.
-   Accessibility first.
-   Mobile-first responsive implementation.
-   Preserve the master template.

# Repository Structure

``` text
/case-studies/
  landscaping/
  plumbing/
  technology/
templates/
  case-study-template.html
docs/
  CASE_STUDY_SYSTEM_SPEC.md
```

# Universal Page Architecture

1.  Hero
2.  Project Overview
3.  Executive Summary
4.  Before We Started
5.  Growth Strategy
6.  Results
7.  Deliverables & Technology Stack
8.  Key Takeaways / FAQ / CTA

# Global Content Rules

-   Never fabricate metrics.
-   Insert TODO markers when data is missing.
-   Replace every placeholder.
-   Use concise, factual language.
-   Convert long paragraphs into cards, KPI tiles, timelines, or
    comparison grids whenever practical.

# Component Specifications

## Hero

Purpose: communicate the single biggest business outcome immediately.

Requirements: - Anonymous industry label unless approved. - Primary KPI
headline. - Supporting KPI strip (3--5 metrics). - Services rendered. -
Engagement duration. - Primary CTA.

## Project Overview

Use compact definition cards: - Industry - Business type - Location -
Duration - Objectives - Services - Platform - Hosting

## Executive Summary

100--150 words maximum covering challenge, strategy, and measurable
outcome.

## Before We Started

Three equal columns: - Business - Marketing - Website Each with 3--5
specific observations.

## Growth Strategy

Exactly three strategy cards: - Objective - Actions Taken - Outcome
(must reference measurable impact where available).

## Results

Largest visual section. Include: - KPI grid - Before/after comparison -
Progress chart - Timeline only when real intermediate data exists.

## Deliverables & Technology Stack

List only completed work. Group technology by Development,
Infrastructure, Analytics, SEO, Marketing.

## FAQ & CTA

Questions must be engagement-specific. Single conversion-focused CTA.

# Animation

-   Preserve prefers-reduced-motion.
-   Use subtle fades and translations.
-   Never block interaction during animation.

# Accessibility

-   WCAG 2.2 AA.
-   Semantic headings.
-   Keyboard accessible.
-   Focus-visible styles.
-   Alt text.
-   ARIA where needed.

# Responsive

Breakpoints: - Mobile - Tablet - Desktop No horizontal scrolling.
Minimum touch target 44px.

# SEO

Unique: - Title - Description - Canonical - Open Graph - Twitter Cards -
JSON-LD Organization - Breadcrumb - Article/CreativeWork schema if
appropriate.

# Performance Budget

-   LCP \<2.5s
-   CLS \<0.1
-   INP \<200ms target
-   Lazy-load non-critical media.
-   Optimize images.

# Industry Guidance

## Landscaping

Focus on local SEO, lead generation, outdoor project imagery.

## Plumbing

Focus on emergency services, trust, phone calls, local search.

## Technology / SaaS

Focus on demos, organic acquisition, product credibility.

# QA Checklist

-   No placeholders.
-   No lorem ipsum.
-   No invented metrics.
-   Mobile verified.
-   Accessibility verified.
-   SEO verified.
-   Performance verified.
-   Consistent spacing.
-   Consistent icons.
-   Charts reflect verified data only.

# Future Expansion

Document every new reusable component before using it in production so
all future case studies remain consistent.
