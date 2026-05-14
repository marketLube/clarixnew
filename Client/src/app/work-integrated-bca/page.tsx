import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "./LeadForm";

const WHATSAPP_URL = "https://wa.me/918590179090";
const WHATSAPP_DISPLAY = "+91 85901 79090";

export const metadata: Metadata = {
  title: "Work-Integrated BCA Program — Graduate with 2 Years of Experience",
  description:
    "India's first work-integrated BCA program. Hybrid learning, assured placements with top global MNCs, and 2 years of real industry experience before you graduate.",
  alternates: { canonical: "/work-integrated-bca" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Work-Integrated BCA — 2 Years Experience Before Graduation",
    description:
      "India's first work-integrated BCA program. Hybrid, assured placements, real industry experience from Year 2.",
    type: "website",
  },
};

const benefits = [
  {
    title: "India's First Work-Integrated BCA",
    description:
      "A pioneering hybrid program built with industry from day one. Learn the way modern teams actually build software.",
  },
  {
    title: "Hybrid Learning Model",
    description:
      "Best of both worlds — flexible online classes blended with on-campus mentorship, projects and labs.",
  },
  {
    title: "Work From Year 2",
    description:
      "Step into real teams at top MNCs from your second year. Salary, mentors, deadlines — the real thing.",
  },
  {
    title: "Assured Placements",
    description:
      "Curriculum co-designed with hiring partners means you graduate already inside the system.",
  },
];

const timeline = [
  {
    year: "Year 1",
    label: "Foundations",
    description:
      "Build rock-solid fundamentals — programming, data structures, problem-solving, communication. Hybrid classes with industry-grade tooling from week one.",
  },
  {
    year: "Year 2",
    label: "Work Begins",
    description:
      "Join real engineering teams at top MNCs. Earn while you learn. Apply theory on actual products with real users, on real timelines.",
  },
  {
    year: "Year 3",
    label: "Career Launch",
    description:
      "Graduate with a BCA degree and 2 full years of verifiable industry experience. Most students convert their work role into a full-time offer.",
  },
];

const recruiters = [
  "Google",
  "Meta",
  "Microsoft",
  "Amazon",
  "EY",
  "Deloitte",
  "PwC",
  "UST",
  "Accenture",
  "Infosys",
  "TCS",
  "Wipro",
];

const trustPills = [
  "100% Placement Support",
  "Industry-Mentored",
  "Hybrid Mode",
  "2 Years Work Experience",
];

export default function WorkIntegratedBcaLanding() {
  return (
    <div className="w-full bg-[#f6f7ff] text-[#162447] font-poppins">
      {/* Minimal Brand Header */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-[#e2e8f0]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <Link href="/" className="flex items-center" aria-label="Clarix Education home">
            <Image
              src="/clarixlogo.svg"
              alt="Clarix Education"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full bg-[#513392] hover:bg-[#3f2672] text-white font-medium text-[13px] md:text-[14px] px-4 py-2 md:px-5 md:py-2.5 transition-colors shadow-[0_6px_18px_rgba(81,51,146,0.25)]"
          >
            <span>Apply Now</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h12m0 0l-5-5m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(81,51,146,0.18) 0%, rgba(81,51,146,0) 55%), radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0) 55%), linear-gradient(180deg, #f6f7ff 0%, #ffffff 100%)",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-[1280px] px-4 pt-5 pb-8 md:px-8 md:pt-16 md:pb-20 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#513392]/20 bg-white/80 backdrop-blur px-3 py-1 md:py-1.5 mb-3 md:mb-5 shadow-[0_2px_8px_rgba(81,51,146,0.08)]">
                <span className="inline-block h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#513392]" aria-hidden="true" />
                <span className="text-[11px] md:text-[13px] font-medium tracking-[0.02em] text-[#513392]">
                  India's first Work-Integrated BCA
                </span>
              </div>

              <h1 className="font-poppins font-semibold tracking-[-0.02em] text-[24px] leading-[1.15] sm:text-[34px] md:text-[44px] lg:text-[52px] xl:text-[60px] text-[#162447] mx-auto lg:mx-0 max-w-[340px] sm:max-w-none">
                Graduate with a degree{" "}
                <span className="text-[#513392]">and 2 years</span>{" "}
                of real industry experience.
              </h1>

              <p className="hidden lg:block mt-5 md:mt-6 text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-[#4b5468] max-w-[640px]">
                A hybrid, work-integrated BCA designed with global hiring
                partners. From Year 2, you're already inside top MNCs —
                building real products, drawing a stipend, and proving yourself
                where it matters.
              </p>

              <div className="hidden lg:flex mt-7 md:mt-8 flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#513392] hover:bg-[#3f2672] text-white font-medium text-[15px] md:text-[16px] px-6 py-3.5 md:px-7 md:py-4 transition-all shadow-[0_10px_28px_rgba(81,51,146,0.32)] hover:shadow-[0_14px_36px_rgba(81,51,146,0.42)] hover:-translate-y-0.5"
                >
                  <span>Get Program Details</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#513392] transition-transform group-hover:translate-x-0.5">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M4 10h12m0 0l-5-5m5 5l-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#513392]/25 bg-white text-[#513392] font-medium text-[14px] md:text-[15px] px-5 py-3 md:px-6 md:py-3.5 hover:bg-[#f3eefe] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.42 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
                  </svg>
                  <span>Talk on WhatsApp</span>
                </a>
              </div>

              <div className="hidden lg:flex mt-8 flex-wrap gap-2 md:gap-3">
                {trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#e1e3ff] text-[#162447] text-[12px] md:text-[13px] font-medium px-3 py-1.5 shadow-[0_1px_3px_rgba(22,36,71,0.04)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M16.667 5.833 8.333 14.167 4.167 10"
                        stroke="#513392"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Form card — first view on mobile, side panel on desktop */}
            <div className="lg:col-span-5">
              <div
                id="apply"
                className="scroll-mt-20 lg:scroll-mt-24 rounded-[18px] md:rounded-[24px] bg-white border border-[#e1e3ff] shadow-[0_20px_60px_-20px_rgba(81,51,146,0.25)] p-4 md:p-7"
              >
                <h2 className="text-[17px] md:text-[22px] font-semibold text-[#162447] tracking-[-0.01em] text-center lg:text-left">
                  Talk to our admissions team
                </h2>
                <p className="mt-1 text-[12px] md:text-[14px] text-[#767e92] leading-snug md:leading-relaxed text-center lg:text-left">
                  Drop your details — we'll continue the chat on WhatsApp.
                </p>
                <div className="mt-4 md:mt-5">
                  <LeadForm />
                </div>
              </div>
            </div>

            {/* Mobile-only: pills + WhatsApp link below the form */}
            <div className="lg:hidden flex flex-col items-center gap-4 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#e1e3ff] text-[#162447] text-[12px] font-medium px-3 py-1.5 shadow-[0_1px_3px_rgba(22,36,71,0.04)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M16.667 5.833 8.333 14.167 4.167 10"
                        stroke="#513392"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>
              <p className="text-[14px] text-[#4b5468] leading-relaxed max-w-[460px] px-2">
                A hybrid, work-integrated BCA. From Year 2 you're already
                inside top MNCs — building real products and drawing a
                stipend.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#513392]/25 bg-white text-[#513392] font-medium text-[14px] px-5 py-2.5 hover:bg-[#f3eefe] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.42 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
                </svg>
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-[#eef0ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20 lg:py-24">
          <div className="max-w-[760px]">
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#513392]">
              Why this program
            </p>
            <h2 className="mt-3 text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-tight text-[#162447]">
              A degree built for the way you'll actually work.
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] text-[#4b5468] leading-relaxed">
              Most BCA programs prepare you for a job that doesn't exist
              anymore. This one drops you straight into the one that does — at
              companies hiring engineers right now.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {benefits.map((benefit, idx) => (
              <div
                key={benefit.title}
                className="rounded-[18px] bg-[#f6f7ff] border border-[#e1e3ff] p-5 md:p-6 transition-all hover:border-[#513392]/30 hover:shadow-[0_10px_30px_-15px_rgba(81,51,146,0.35)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#513392] text-white text-[14px] font-semibold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-[16px] md:text-[17px] font-semibold text-[#162447] tracking-[-0.01em]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[13px] md:text-[14px] text-[#4b5468] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="bg-[#f6f7ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20 lg:py-24">
          <div className="max-w-[760px]">
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#513392]">
              How it works
            </p>
            <h2 className="mt-3 text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-tight text-[#162447]">
              Three years. Two of them, you're already working.
            </h2>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {timeline.map((phase, idx) => (
              <div
                key={phase.year}
                className="relative rounded-[20px] bg-white border border-[#e1e3ff] p-6 md:p-7 transition-all hover:border-[#513392]/30 hover:shadow-[0_16px_40px_-20px_rgba(81,51,146,0.35)]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[28px] md:text-[34px] font-bold text-[#513392] tracking-[-0.02em]">
                    {phase.year}
                  </span>
                  <span className="text-[13px] md:text-[14px] font-medium text-[#767e92]">
                    {phase.label}
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#513392]/30 via-[#e1e3ff] to-transparent" />
                <p className="mt-4 text-[14px] md:text-[15px] text-[#4b5468] leading-relaxed">
                  {phase.description}
                </p>
                {idx < timeline.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 items-center justify-center rounded-full bg-white border border-[#e1e3ff] text-[#513392] z-10"
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10h12m0 0l-5-5m5 5l-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="bg-white border-y border-[#eef0ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20 lg:py-24">
          <div className="max-w-[760px]">
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#513392]">
              Top hiring partners
            </p>
            <h2 className="mt-3 text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-tight text-[#162447]">
              The companies your résumé will start at.
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] text-[#4b5468] leading-relaxed">
              Curriculum is co-designed with the engineering and consulting
              teams that already hire from this program.
            </p>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {recruiters.map((name) => (
              <div
                key={name}
                className="group flex items-center justify-center rounded-[14px] bg-[#f6f7ff] border border-[#e1e3ff] px-4 py-5 md:py-6 transition-all hover:bg-white hover:border-[#513392]/30 hover:shadow-[0_8px_24px_-12px_rgba(81,51,146,0.3)]"
              >
                <span className="font-poppins font-semibold text-[15px] md:text-[16px] tracking-[-0.01em] text-[#162447] group-hover:text-[#513392] transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-[13px] md:text-[14px] text-[#767e92]">
            …and a growing roster of product and consulting firms across India
            and abroad.
          </p>
        </div>
      </section>

      {/* Final CTA + Form on Mobile */}
      <section className="bg-gradient-to-br from-[#513392] via-[#5b3aa3] to-[#3d2569] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] font-semibold tracking-[-0.02em] leading-tight">
                Ready to graduate with{" "}
                <span className="text-[#e8e0f5]">a head start</span>?
              </h2>
              <p className="mt-4 text-[15px] md:text-[17px] text-white/85 leading-relaxed max-w-[560px]">
                Limited seats. Selection rolls on a first-applied basis. Drop
                your details and our admissions team will walk you through
                eligibility, fees, and the next steps — over WhatsApp.
              </p>

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#513392] font-semibold text-[15px] md:text-[16px] px-6 py-3.5 md:px-7 md:py-4 hover:bg-[#f3eefe] transition-colors shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.42 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
                  </svg>
                  <span>WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-[480px]">
                <div>
                  <div className="text-[26px] md:text-[32px] font-bold tracking-[-0.02em]">
                    2 yrs
                  </div>
                  <div className="text-[12px] md:text-[13px] text-white/75 mt-1">
                    Work experience
                  </div>
                </div>
                <div>
                  <div className="text-[26px] md:text-[32px] font-bold tracking-[-0.02em]">
                    100%
                  </div>
                  <div className="text-[12px] md:text-[13px] text-white/75 mt-1">
                    Placement support
                  </div>
                </div>
                <div>
                  <div className="text-[26px] md:text-[32px] font-bold tracking-[-0.02em]">
                    12+
                  </div>
                  <div className="text-[12px] md:text-[13px] text-white/75 mt-1">
                    Global hiring partners
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[20px] md:rounded-[24px] bg-white text-[#162447] p-5 md:p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
                <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.01em]">
                  Get a call back today
                </h3>
                <p className="mt-1 text-[13px] md:text-[14px] text-[#767e92] leading-relaxed">
                  Fill in the form. We continue on WhatsApp with everything you
                  need to apply.
                </p>
                <div className="mt-5">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <footer className="bg-[#f6f7ff] border-t border-[#e2e8f0]">
        <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-footer.svg"
              alt="Clarix Education"
              width={110}
              height={36}
              className="h-8 w-auto"
            />
            <span className="text-[12px] md:text-[13px] text-[#767e92]">
              © {new Date().getFullYear()} Clarix Education
            </span>
          </div>
          <div className="flex items-center gap-4 text-[12px] md:text-[13px] text-[#767e92]">
            <Link href="/privacy-policy" className="hover:text-[#513392] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#513392] transition-colors">
              Terms
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#513392] transition-colors"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
