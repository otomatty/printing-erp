'use client';

import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '~/components/custom/container';

export type CaseStudyProps = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  type: string;
  title: string;
  tags: {
    industry: string;
    development: string;
  };
  metrics: {
    primary: {
      text: string;
      isPositive: boolean;
    };
    secondary: {
      text: string;
      isPositive: boolean;
    };
  };
  description: string;
};

export type CaseStudiesSectionProps = {
  title: string;
  description: string;
  caseStudies: CaseStudyProps[];
  viewMoreLink: string;
  viewMoreText: string;
};

const UpIcon = () => (
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <title>上昇傾向</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

const DownIcon = () => (
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <title>下降傾向（良い変化）</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

const CaseStudyCard: React.FC<{ caseStudy: CaseStudyProps }> = ({
  caseStudy,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={caseStudy.imageUrl}
          alt={caseStudy.imageAlt}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1">
          {caseStudy.type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2">{caseStudy.title}</h3>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
            {caseStudy.tags.industry}
          </span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
            {caseStudy.tags.development}
          </span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-green-600 text-sm">
            {caseStudy.metrics.primary.isPositive ? <UpIcon /> : <DownIcon />}
            {caseStudy.metrics.primary.text}
          </div>
          <div className="flex items-center text-green-600 text-sm">
            {caseStudy.metrics.secondary.isPositive ? <UpIcon /> : <DownIcon />}
            {caseStudy.metrics.secondary.text}
          </div>
        </div>
        <p className="text-xs text-gray-600">{caseStudy.description}</p>
      </div>
    </div>
  );
};

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  title,
  description,
  caseStudies,
  viewMoreLink,
  viewMoreText,
}) => {
  return (
    <section className="py-16 lg:py-60 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={viewMoreLink}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {viewMoreText}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CaseStudiesSection;
