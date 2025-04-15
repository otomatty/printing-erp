'use client';

import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, industries } from './works-filter';

export interface Work {
  id: number;
  title: string;
  category: string;
  industry: string;
  image: string;
  description: string;
  technologies: string[];
  year: number;
}

interface WorksListProps {
  works: Work[];
}

const WorksList: React.FC<WorksListProps> = ({ works }) => {
  if (works.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          該当する実績がありません。別の条件でお試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <div
          key={work.id}
          className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={work.image}
              alt={work.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 m-2 rounded">
              {categories.find((c) => c.id === work.category)?.name}
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-1">
              {industries.find((i) => i.id === work.industry)?.name} |{' '}
              {work.year}年
            </p>
            <h3 className="text-xl font-bold mb-2">{work.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {work.description}
            </p>
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">使用技術・サービス</p>
              <div className="flex flex-wrap gap-1">
                {work.technologies.map((tech) => (
                  <span
                    key={`${work.id}-${tech}`}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/services/it-digital/works/${work.id}`}
              className="text-primary text-sm font-medium hover:underline"
            >
              詳細を見る &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorksList;
