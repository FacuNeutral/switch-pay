//* @type Integration Component
//* @context Design Tokens
//* @utility Preview landing producida estilo editorial/marketing que demuestra obligatoriamente todos los design tokens de color y la mayoría de tokens dimensionales.

import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Quote,
  Mail,
  Check,
  AlertTriangle,
  Info,
  X,
  Heart,
  Layers,
  Sparkles,
  Play,
} from "lucide-react";

export default function DTPreviewLanding() {
  return (
    <div className="w-full min-w-0 space-y-0 font-primary">
      {/* ==========================================
         Hero Section
         — primary, primary-off, primary-hover, primary-foreground
         — neutral-dark, neutral, neutral-off-dark, neutral-off
         — accent (decorative), typography, spacing
         ========================================== */}
      <section className="relative overflow-hidden bg-neutral-dark dark:bg-neutral-dark">
        {/* <Tag> Background decoration */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary blur-lg" />
          <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-accent blur-lg" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/25">
            <Sparkles size={12} />
            Now in Beta
          </span>

          <h1 className="text-3xl font-extrabold text-neutral dark:text-neutral leading-tight">
            Build Stunning Products with a{" "}
            <span className="text-primary">Design System</span> That Scales
          </h1>

          <p className="text-base text-neutral-off dark:text-neutral-off leading-relaxed font-secondary">
            Ship faster with consistent, accessible components. From prototype to
            production — every pixel intentional, every token semantic.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shadow-md">
              Start Building
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-neutral-off/30 text-neutral dark:text-neutral hover:bg-neutral/10 transition-colors">
              <Play size={14} />
              Watch Demo
            </button>
          </div>

          {/* <Tag> Trust strip */}
          <div className="pt-10 flex flex-col items-center gap-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-off dark:text-neutral-off">
              Trusted by leading teams
            </p>
            <div className="flex items-center gap-6 text-neutral-off/50 dark:text-neutral-off/50">
              {["Acme Corp", "Nebula", "Stark Ind.", "Capsule", "Helix"].map((name) => (
                <span key={name} className="text-xs font-bold tracking-wide">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Features — 3 cards
         — primary, accent, secondary (one per card)
         — neutral, neutral-dark, neutral-off, neutral-off-dark
         — radius, shadow, spacing
         ========================================== */}
      <section className="bg-neutral dark:bg-neutral-dark py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral">
              Everything You Need to Ship
            </h2>
            <p className="text-sm text-neutral-off-dark dark:text-neutral-off font-secondary">
              Three pillars that make your design system production-ready from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: primary */}
            <div className="group p-6 rounded-2xl bg-neutral dark:bg-neutral-surface-dark border border-neutral dark:border-neutral-surface-dark hover:border-primary/40 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
              <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Lightning Fast</h3>
              <p className="text-sm text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary">
                Optimized tokens compiled at build time. Zero runtime overhead, instant theme
                switching, and tree-shaken utilities.
              </p>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
                Learn more <ArrowRight size={12} />
              </button>
            </div>

            {/* Card: accent */}
            <div className="group p-6 rounded-2xl bg-neutral dark:bg-neutral-surface-dark border border-neutral dark:border-neutral-surface-dark hover:border-accent/40 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Fully Accessible</h3>
              <p className="text-sm text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary">
                WCAG AA contrast ratios baked into every palette. Keyboard navigation, focus
                rings, and screen reader support built in.
              </p>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors">
                Learn more <ArrowRight size={12} />
              </button>
            </div>

            {/* Card: secondary */}
            <div className="group p-6 rounded-2xl bg-neutral dark:bg-neutral-surface-dark border border-neutral dark:border-neutral-surface-dark hover:border-secondary/40 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Layers size={20} className="text-secondary" />
              </div>
              <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Composable</h3>
              <p className="text-sm text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary">
                Mix and match primitives to build complex layouts. Every component is a
                controlled surface with predictable API.
              </p>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary-hover transition-colors">
                Learn more <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Stats Strip
         — tertiary, tertiary-off, primary-off, accent-off, secondary-off
         — neutral-dark, neutral
         ========================================== */}
      <section className="bg-neutral-dark dark:bg-neutral-dark border-y border-neutral-surface-dark">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-primary-off">50+</p>
            <p className="text-xs text-neutral-off dark:text-neutral-off font-secondary">Components</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-accent-off">12k</p>
            <p className="text-xs text-neutral-off dark:text-neutral-off font-secondary">GitHub Stars</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-secondary-off">99%</p>
            <p className="text-xs text-neutral-off dark:text-neutral-off font-secondary">Uptime SLA</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-tertiary-off">4.9</p>
            <p className="text-xs text-neutral-off dark:text-neutral-off font-secondary">User Rating</p>
          </div>
        </div>
      </section>

      {/* ==========================================
         Testimonials
         — accent, accent-foreground, secondary, secondary-foreground
         — neutral, neutral-dark, neutral-off, neutral-off-dark, neutral-surface-dark
         — radius, shadow
         ========================================== */}
      <section className="bg-neutral dark:bg-neutral-dark py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral">
              What People Are Saying
            </h2>
            <p className="text-sm text-neutral-off-dark dark:text-neutral-off font-secondary">
              Hear from the teams that ship with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark space-y-4 shadow-sm">
              <Quote size={24} className="text-accent/40" />
              <p className="text-sm text-neutral-dark dark:text-neutral leading-relaxed font-secondary italic">
                "The token system saved us weeks of design-dev alignment. We went from
                scattered hex values to a single source of truth overnight."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                  SK
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-dark dark:text-neutral">Sarah Kim</p>
                  <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off">Design Lead, Acme</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-tertiary text-tertiary" />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark space-y-4 shadow-sm">
              <Quote size={24} className="text-secondary/40" />
              <p className="text-sm text-neutral-dark dark:text-neutral leading-relaxed font-secondary italic">
                "Switching palettes in real-time during client demos is a game changer.
                The dark mode support alone justified the adoption."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                  MR
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-dark dark:text-neutral">Marco Reyes</p>
                  <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off">CTO, Nebula Labs</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < 4 ? "fill-tertiary text-tertiary" : "text-neutral-off/30"} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Pricing
         — primary, primary-foreground, primary-hover
         — accent, accent-foreground, accent-hover
         — secondary, secondary-foreground, secondary-hover
         — tertiary, tertiary-hover
         — neutral, neutral-dark, neutral-off, neutral-off-dark, neutral-surface-dark
         ========================================== */}
      <section className="bg-neutral dark:bg-neutral-dark py-16 border-t border-neutral dark:border-neutral-surface-dark">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-tertiary/15 text-tertiary border border-tertiary/25">
              Pricing
            </span>
            <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral">
              Simple, Transparent Plans
            </h2>
            <p className="text-sm text-neutral-off-dark dark:text-neutral-off font-secondary">
              Start free. Scale when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Free tier */}
            <div className="p-6 rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark space-y-5 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Starter</h3>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off mt-0.5 font-secondary">For individuals & side projects</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-neutral-dark dark:text-neutral">$0</span>
                <span className="text-xs text-neutral-off-dark dark:text-neutral-off">/month</span>
              </div>
              <ul className="space-y-2">
                {["5 components", "Light mode only", "Community support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-neutral-off-dark dark:text-neutral-off font-secondary">
                    <Check size={12} className="text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl text-xs font-semibold border border-neutral-off-dark/20 dark:border-neutral-off/20 text-neutral-dark dark:text-neutral hover:bg-neutral-off-dark/5 dark:hover:bg-neutral-off/5 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro tier — featured */}
            <div className="p-6 rounded-2xl border-2 border-primary bg-neutral dark:bg-neutral-surface-dark space-y-5 shadow-md relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                Popular
              </span>
              <div>
                <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Pro</h3>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off mt-0.5 font-secondary">For growing teams & startups</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-primary">$29</span>
                <span className="text-xs text-neutral-off-dark dark:text-neutral-off">/month</span>
              </div>
              <ul className="space-y-2">
                {["All components", "Dark mode", "Priority support", "Custom palettes"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-neutral-off-dark dark:text-neutral-off font-secondary">
                    <Check size={12} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise tier */}
            <div className="p-6 rounded-2xl border border-secondary/30 bg-neutral dark:bg-neutral-surface-dark space-y-5 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-neutral-dark dark:text-neutral">Enterprise</h3>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off mt-0.5 font-secondary">For large orgs & custom needs</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-secondary">$99</span>
                <span className="text-xs text-neutral-off-dark dark:text-neutral-off">/month</span>
              </div>
              <ul className="space-y-2">
                {["Everything in Pro", "SSO + RBAC", "SLA guarantee", "Dedicated engineer"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-neutral-off-dark dark:text-neutral-off font-secondary">
                    <Check size={12} className="text-secondary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl text-xs font-semibold border border-secondary/40 text-secondary hover:bg-secondary/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Blog / Articles — editorial section
         — info, warning, success, error (category badges)
         — neutral, neutral-dark, neutral-off, neutral-off-dark, neutral-surface-dark
         — tertiary
         ========================================== */}
      <section className="bg-neutral dark:bg-neutral-dark py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral">
                From the Blog
              </h2>
              <p className="text-sm text-neutral-off-dark dark:text-neutral-off font-secondary">
                Insights, tutorials, and updates from the team.
              </p>
            </div>
            <button className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
              View all posts <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Article 1 */}
            <article className="group rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center">
                <TrendingUp size={32} className="text-primary/60" />
              </div>
              <div className="p-5 space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-info/10 text-info border border-info/20">
                  Tutorial
                </span>
                <h3 className="text-sm font-bold text-neutral-dark dark:text-neutral leading-snug">
                  Building a Token System from Scratch
                </h3>
                <p className="text-xs text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary line-clamp-2">
                  Learn how to create semantic design tokens that scale across platforms
                  and maintain consistency in large codebases.
                </p>
                <p className="text-[10px] text-neutral-off dark:text-neutral-off">
                  8 min read · Dec 14, 2025
                </p>
              </div>
            </article>

            {/* Article 2 */}
            <article className="group rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video bg-linear-to-br from-warning/20 via-tertiary/10 to-error/10 flex items-center justify-center">
                <AlertTriangle size={32} className="text-warning/60" />
              </div>
              <div className="p-5 space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-warning/10 text-warning border border-warning/20">
                  Case Study
                </span>
                <h3 className="text-sm font-bold text-neutral-dark dark:text-neutral leading-snug">
                  Migrating 200+ Components to Tokens
                </h3>
                <p className="text-xs text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary line-clamp-2">
                  How a team of five engineers replaced hardcoded values with semantic
                  tokens across an enterprise codebase in two weeks.
                </p>
                <p className="text-[10px] text-neutral-off dark:text-neutral-off">
                  12 min read · Nov 30, 2025
                </p>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group rounded-2xl border border-neutral dark:border-neutral-surface-dark bg-neutral dark:bg-neutral-surface-dark overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video bg-linear-to-br from-success/20 via-accent/10 to-info/10 flex items-center justify-center">
                <Shield size={32} className="text-success/60" />
              </div>
              <div className="p-5 space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-success/10 text-success border border-success/20">
                  Best Practices
                </span>
                <h3 className="text-sm font-bold text-neutral-dark dark:text-neutral leading-snug">
                  Accessibility-first Color Palettes
                </h3>
                <p className="text-xs text-neutral-off-dark dark:text-neutral-off leading-relaxed font-secondary line-clamp-2">
                  A practical guide to creating palettes that meet WCAG AA contrast
                  requirements without sacrificing visual identity.
                </p>
                <p className="text-[10px] text-neutral-off dark:text-neutral-off">
                  6 min read · Nov 12, 2025
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==========================================
         Feedback States — compact inline
         — info, warning, success, error
         — neutral-dark, neutral, neutral-off-dark, neutral-off
         ========================================== */}
      <section className="bg-neutral dark:bg-neutral-dark border-t border-neutral dark:border-neutral-surface-dark py-10">
        <div className="max-w-5xl mx-auto px-6 space-y-5">
          <h3 className="text-sm font-bold text-neutral-dark dark:text-neutral">System Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-info/8 border border-info/20">
              <Info size={15} className="text-info shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-neutral-dark dark:text-neutral">Info</p>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off font-secondary">3 tokens updated</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-success/8 border border-success/20">
              <Check size={15} className="text-success shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-neutral-dark dark:text-neutral">Success</p>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off font-secondary">Changes saved</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-warning/8 border border-warning/20">
              <AlertTriangle size={15} className="text-warning shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-neutral-dark dark:text-neutral">Warning</p>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off font-secondary">Low contrast ratio</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-error/8 border border-error/20">
              <X size={15} className="text-error shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-neutral-dark dark:text-neutral">Error</p>
                <p className="text-[10px] text-neutral-off-dark dark:text-neutral-off font-secondary">Invalid hex value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Newsletter CTA
         — primary, primary-foreground, primary-hover
         — tertiary (decorative)
         — neutral, neutral-dark, neutral-off, neutral-surface-dark
         ========================================== */}
      <section className="bg-neutral-dark dark:bg-neutral-dark border-t border-neutral-surface-dark">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="rounded-2xl bg-linear-to-r from-primary/10 via-accent/5 to-secondary/10 border border-neutral-surface-dark p-10 text-center space-y-5">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto">
              <Mail size={22} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-neutral dark:text-neutral">
              Stay in the Loop
            </h2>
            <p className="text-sm text-neutral-off dark:text-neutral-off font-secondary">
              Get notified about new components, palette drops, and design system tips.
              No spam, unsubscribe anytime.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-surface-dark border border-neutral-off-dark/20 text-xs text-neutral-off">
                you@company.com
              </div>
              <button className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         Footer
         — neutral, neutral-dark, neutral-off, neutral-off-dark, neutral-surface-dark
         — primary, accent, secondary, tertiary (social icons)
         — error (heart)
         ========================================== */}
      <footer className="bg-neutral-dark dark:bg-neutral-dark border-t border-neutral-surface-dark py-10">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral dark:text-neutral uppercase tracking-wider">Product</h4>
              <ul className="space-y-1.5">
                {["Components", "Tokens", "Palettes", "Changelog"].map((item) => (
                  <li key={item}>
                    <span className="text-xs text-neutral-off dark:text-neutral-off hover:text-neutral transition-colors cursor-pointer font-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral dark:text-neutral uppercase tracking-wider">Resources</h4>
              <ul className="space-y-1.5">
                {["Documentation", "Tutorials", "Blog", "API"].map((item) => (
                  <li key={item}>
                    <span className="text-xs text-neutral-off dark:text-neutral-off hover:text-neutral transition-colors cursor-pointer font-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral dark:text-neutral uppercase tracking-wider">Company</h4>
              <ul className="space-y-1.5">
                {["About", "Careers", "Contact", "Press"].map((item) => (
                  <li key={item}>
                    <span className="text-xs text-neutral-off dark:text-neutral-off hover:text-neutral transition-colors cursor-pointer font-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral dark:text-neutral uppercase tracking-wider">Connect</h4>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center cursor-pointer hover:bg-primary/25 transition-colors">
                  <span className="text-[10px] font-bold text-primary">X</span>
                </span>
                <span className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center cursor-pointer hover:bg-accent/25 transition-colors">
                  <span className="text-[10px] font-bold text-accent">GH</span>
                </span>
                <span className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center cursor-pointer hover:bg-secondary/25 transition-colors">
                  <span className="text-[10px] font-bold text-secondary">DC</span>
                </span>
                <span className="w-7 h-7 rounded-lg bg-tertiary/15 flex items-center justify-center cursor-pointer hover:bg-tertiary/25 transition-colors">
                  <span className="text-[10px] font-bold text-tertiary">YT</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-surface-dark flex items-center justify-between">
            <p className="text-[10px] text-neutral-off/50 dark:text-neutral-off/50 font-secondary">
              © 2025 Design Tokens. All rights reserved.
            </p>
            <p className="text-[10px] text-neutral-off/50 dark:text-neutral-off/50 font-secondary flex items-center gap-1">
              Made with <Heart size={10} className="text-error fill-error" /> for designers & developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
