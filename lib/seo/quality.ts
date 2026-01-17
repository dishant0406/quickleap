import type { ProgrammaticPage } from './types';

const MIN_WORD_COUNT = 140;

const countWords = (value: string): number =>
  value
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

export const validateProgrammaticPage = (page: ProgrammaticPage): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const content = [
    page.title,
    page.description,
    page.intro,
    ...page.sections.flatMap((section) => [section.heading, ...section.body]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');

  const wordCount = countWords(content);

  if (wordCount < MIN_WORD_COUNT) {
    console.warn(
      `Programmatic page "${page.slug.join('/')}" is thin (${wordCount} words).`
    );
  }
};
