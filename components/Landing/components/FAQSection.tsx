import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'How do I get started?',
    answer:
      'Simply sign up for a free account, create your first redirect, and start tracking your traffic—all through our user-friendly interface.',
  },
  {
    question: 'Can I integrate my redirects with my existing apps?',
    answer:
      'Yes! Our advanced API lets you seamlessly incorporate redirection functionality into your applications and workflows.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'Security and privacy are top priorities. We utilize a secure global network to ensure fast, safe redirection while keeping your data compliant with industry standards.',
  },
  {
    question: 'Do you offer analytics?',
    answer:
      'Absolutely. Our dashboard provides detailed insights into your traffic, helping you optimize performance and understand user behavior.',
  },
  {
    question: 'What if I need help?',
    answer:
      'Our support team is here for you. Visit our support center or contact us directly for any assistance.',
  },
];

const FAQSection = (): React.JSX.Element => {
  return (
    <div className="min-h-main flex flex-col items-center  py-[10vh]  md:px-[10vw] px-[5vw]">
      <h2 className="text-[8vw] md:text-[3vw] font-anton text-primaryBlack dark:text-white">
        <span className="text-main">Frequently Asked</span> Questions
      </h2>
      <h3 className="text-[4vw] text-center  md:text-[1vw] mt-2 font-medium text-primaryBlack dark:text-white">
        Everything you need to know about Quickleap
      </h3>
      <div className="w-full flex flex-col gap-[2vh] pt-[5vh] flex-grow">
        {FAQS.map((faq, index) => {
          return (
            <Accordion key={index} collapsible className="!w-full" type="single">
              <AccordionItem className="w-full bg-white" value="item-1">
                <AccordionTrigger className="py-6 text-start">{faq.question}</AccordionTrigger>
                <AccordionContent className="bg-bg">
                  <p className="text-sm md:text-base text-primaryBlack dark:text-white">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
