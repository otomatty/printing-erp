import type React from 'react';
import Container from '../custom/container';

export interface FAQItem {
  question: string;
  answer: string;
  id?: string;
}

interface ServiceFAQProps {
  title?: string;
  faqs: FAQItem[];
}

const ServiceFAQ: React.FC<ServiceFAQProps> = ({
  title = 'よくあるご質問',
  faqs,
}) => {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.id || `faq-${index}-${faq.question.substring(0, 10)}`}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceFAQ;
