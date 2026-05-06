import Image from 'next/image'
import React from 'react'
import logo from '@/assets/svgs/logo.svg'
import Typography from '../primitives/inputs/Typography'
import { Path } from '@/type/type';

// IMAGES
import agent from '@/assets/svgs/agent-portrait.jpg';
import blueprint from '@/assets/svgs/blueprint-desk.jpg'
import { paths } from '@/constant/data';


export function PublicNav() {
  const links = ["Platform", "Solutions", "Network", "Insights"];
  return (
    <header className="absolute top-0 inset-x-0 z-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Image src={logo} alt='' loading='lazy' className=''/>
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-ink-soft">
          {links.map((l, i) => (
            <a key={l} href="#" className={i === 0 ? "text-brand" : "hover:text-ink transition"}>
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#join"
          className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-sm hover:bg-brand/90 transition"
        >
          Join the Network
        </a>
      </div>
    </header>
  );
}

export function PublicHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.985 0.008 255) 0%, oklch(0.96 0.015 255) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-1/2 -z-10 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(115deg, oklch(0.93 0.012 256) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-700 text-ink">
            Architect
            <br />
            <span className="text-brand">Your</span>
            <br />
            Financial
            <br />
            Future.
          </h1>
          <p className="mt-8 max-w-md text-base text-ink-soft leading-relaxed">
            Moving beyond the transactional, we build enduring economic structures
            through field precision and institutional authority.
          </p>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-brand/60" />
            <span className="eyebrow">The Methodology</span>
          </div>
          <div className="rounded-2xl bg-white border border-hairline p-6 shadow-[var(--shadow-card)] max-w-sm ml-auto">
            <h3 className="text-base font-600 text-ink">Tonal Integrity</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Defining financial boundaries through intentional design and structural transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Framework() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <h2 className="text-4xl lg:text-5xl font-700 text-ink leading-[1.05]">
            Redefining the
            <br />
            <span className="text-brand">Micro-Capital</span>
            <br />
            Framework.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
            CooCredit isn't just a platform; it's a blueprint for regional prosperity.
            We empower agents to act as the primary architects of their community's
            financial destiny.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 text-sm font-600 text-brand hover:gap-3 transition-all"
          >
            Explore the Blueprint <span aria-hidden>→</span>
          </a>
        </div>
        <div className="lg:col-span-4 lg:col-start-6">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-surface">
            <Image
              src={agent}
              alt="Field agent portrait"
              width={800}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-5">
            <p className="eyebrow">Stability</p>
            <p className="mt-1 font-600 text-ink">Institutional Trust</p>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-5">
          <div className="rounded-2xl bg-brand p-6 text-brand-foreground">
            <h3 className="font-600">Regulated Flow</h3>
            <p className="mt-2 text-sm opacity-90 leading-relaxed">
              Precision disbursement algorithms ensuring capital reaches the right foundations.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src={blueprint}
              alt="Architectural blueprint"
              width={800}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}



export function PathCard({ p }: { p: Path }) {
  const featured = p.featured;
  return (
    <div
      className={
        "relative rounded-2xl p-7 flex flex-col h-full transition " +
        (featured
          ? "bg-brand text-brand-foreground shadow-[0_20px_50px_-20px_oklch(0.55_0.22_258/0.55)] lg:-translate-y-4"
          : "bg-white border border-hairline shadow-[var(--shadow-card)]")
      }
    >
      <div className="flex items-start justify-between">
        <div
          className={
            "h-9 w-9 rounded-full " +
            (featured ? "bg-white/20" : "bg-brand/10")
          }
        />
        <span
          className={
            "font-display text-3xl font-600 " +
            (featured ? "text-white/40" : "text-ink/15")
          }
        >
          {p.num}
        </span>
      </div>
      <h3 className={"mt-10 text-2xl font-600 " + (featured ? "" : "text-ink")}>
        {p.title}
      </h3>
      <p
        className={
          "mt-1 text-[0.7rem] font-600 tracking-[0.18em] uppercase " +
          (featured ? "text-white/70" : "text-ink-soft")
        }
      >
        {p.role}
      </p>
      <p
        className={
          "mt-4 text-sm leading-relaxed " +
          (featured ? "text-white/85" : "text-ink-soft")
        }
      >
        {p.desc}
      </p>
      <ul className="mt-5 space-y-2 text-sm">
        {p.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (featured ? "bg-white" : "bg-brand")
              }
            />
            <span className={featured ? "text-white" : "text-ink"}>{b}</span>
          </li>
        ))}
      </ul>
      <button
        className={
          "mt-7 w-full rounded-md py-3 text-xs font-600 tracking-[0.18em] uppercase transition " +
          (featured
            ? "bg-white text-brand hover:bg-white/90"
            : "border border-ink/15 text-ink hover:bg-ink hover:text-white")
        }
      >
        {p.cta}
      </button>
    </div>
  );
}

export function Paths() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-8">
            <p className="eyebrow text-brand">Structural Paths</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-700 text-ink">
              Your Position in the Grid
            </h2>
          </div>
          <p className="lg:col-span-4 text-sm text-ink-soft leading-relaxed">
            Choose your structural focus. Each role is designed as a foundational pillar
            of the CooCredit network.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((p) => (
            <PathCard key={p.num} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperatingSystem() {
  return (
    <section className="py-24 lg:py-32 bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <h2 className="text-4xl lg:text-5xl font-700 text-ink leading-[1.05]">
            The Architect's
            <br />
            Operating System.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
            Our interface uses atmospheric depth and editorial hierarchy to make complex
            data readable in high-stakes field environments.
          </p>
          <div className="mt-7 flex gap-3">
            <span className="rounded-full bg-brand text-brand-foreground px-4 py-1.5 text-xs font-600 uppercase tracking-wider">
              Optimized
            </span>
            <span className="rounded-full bg-orange-500 text-white px-4 py-1.5 text-xs font-600 uppercase tracking-wider">
              Secure
            </span>
          </div>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-7 border border-hairline shadow-[var(--shadow-card)]">
            <span className="inline-block rounded-full bg-brand/10 text-brand px-3 py-1 text-[0.65rem] font-600 uppercase tracking-wider">
              Analytics
            </span>
            <h3 className="mt-4 text-xl font-600 text-ink">Fluid Analytics</h3>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              Asymmetrical data visualization that prioritizes mission-critical KPIs above
              all secondary metadata.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-7 border border-hairline shadow-[var(--shadow-card)] sm:translate-y-8">
            <span className="inline-block rounded-full bg-orange-500/15 text-orange-600 px-3 py-1 text-[0.65rem] font-600 uppercase tracking-wider">
              Active
            </span>
            <h3 className="mt-4 text-xl font-600 text-ink">Field Security</h3>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              Multi-layered biometric verification built into every architectural
              interaction for total field safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




export function CTA() {
  return (
    <section id="join" className="relative py-28 overflow-hidden text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.04 262) 0%, oklch(0.18 0.04 260) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(125deg, oklch(1 0 0 / 0.04) 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow text-white/70">Network Entry</p>
        <h2 className="mt-4 text-5xl lg:text-6xl font-700 leading-[1.05]">
          Ready to
          <br />
          Commence?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button className="rounded-md bg-brand px-6 py-3 text-sm font-600 text-brand-foreground hover:bg-brand/90 transition">
            Apply to the Network
          </button>
          <button className="rounded-md bg-white/10 backdrop-blur px-6 py-3 text-sm font-600 text-white border border-white/20 hover:bg-white/15 transition">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}


export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-display text-lg font-700 text-ink">
            Coo<span className="text-brand">Credit</span>
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            © {new Date().getFullYear()} CooCredit. Financial Architecture. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-ink-soft">
          {["Privacy Policy", "Terms of Service", "Compliance", "Global Support"].map((l) => (
            <a key={l} href="#" className="hover:text-ink transition">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

