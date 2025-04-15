import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface RelatedTopicLinkProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  linkUrl: string;
  imageAlt?: string;
}

const RelatedTopicLink: React.FC<RelatedTopicLinkProps> = ({
  title,
  excerpt,
  imageUrl,
  linkUrl,
  imageAlt = '',
}) => {
  return (
    <Link
      href={linkUrl}
      className="block group my-12 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden border border-gray-200"
    >
      <div className="bg-white flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 w-full relative aspect-video md:aspect-auto md:h-auto overflow-hidden">
          {/* Use aspect-video for mobile, let height be auto on md+ */}
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill // Use fill layout
            sizes="(max-width: 768px) 100vw, 33vw" // Provide sizes attribute
            style={{ objectFit: 'cover' }} // Use style for objectFit with fill
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Text Content Section */}
        <div className="md:w-2/3 w-full p-6 flex flex-col justify-center">
          {' '}
          {/* Center text vertically on larger screens */}
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {' '}
              {/* Limit excerpt lines */}
              {excerpt}
            </p>
          </div>
          <div className="mt-auto pt-2">
            {' '}
            {/* Ensure button is at the bottom with some top padding */}
            <span className="inline-flex items-center text-primary font-medium group-hover:underline">
              続きを読む
              <ArrowRight
                size={16}
                className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedTopicLink;
