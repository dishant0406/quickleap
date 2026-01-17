import Link from 'next/link';

import type { ProgrammaticPage } from '@/lib/seo/types';

interface ProgrammaticPageProps {
  page: ProgrammaticPage;
}

const ProgrammaticPage = ({ page }: ProgrammaticPageProps): React.JSX.Element => {
  return (
    <main className="mx-auto mt-nav max-w-5xl px-4 pb-16 pt-12 text-primaryBlack">
      <nav className="mb-6 text-sm text-muted-foreground">
        {page.breadcrumbs.map((crumb, index) => (
          <span key={crumb.url}>
            <Link className="hover:text-primaryBlack" href={crumb.url.replace(/^https?:\/\/[^/]+/, '')}>
              {crumb.name}
            </Link>
            {index < page.breadcrumbs.length - 1 ? ' / ' : ''}
          </span>
        ))}
      </nav>

      <header className="rounded-2xl border border-border bg-white px-6 py-10 shadow-sm">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Programmatic SEO
        </p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
        <p className="max-w-2xl text-base text-muted-foreground">{page.intro}</p>
      </header>

      <section className="mt-10 grid gap-6">
        {page.sections.map((section) => (
          <article
            key={section.heading}
            className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm"
          >
            <h2 className="mb-4 text-xl font-semibold">{section.heading}</h2>
            <div className="space-y-3 text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
        <div className="space-y-4">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-border px-4 py-3">
              <summary className="cursor-pointer font-medium">{faq.question}</summary>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Related solutions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {page.relatedLinks.map((link) => (
            <Link
              key={link.intentKey}
              className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-primaryBlack transition hover:border-primaryBlack"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProgrammaticPage;
