import * as React from 'react';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';

export interface PresentationSlide {
  id: string;
  title: string;
  description?: string;
  image: string;
  detailContent:
    | React.ReactNode
    | ((props: { close: () => void }) => React.ReactNode);
}

export interface PresentationSliderProps {
  slides: PresentationSlide[];
  contentClassName?: string;
  autoPlayDuration?: number; // 秒
  onSlideChange?: (index: number) => void;
}

const SLIDES_TO_SHOW = 3;

export const PresentationSlider: React.FC<PresentationSliderProps> = ({
  slides,
  contentClassName,
  autoPlayDuration = 8,
  onSlideChange,
}) => {
  const [current, setCurrent] = React.useState(0); // 先頭スライドのindex
  const [isPaused, setIsPaused] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // スライド数が3未満の場合のガード
  const visibleSlides =
    slides.length < SLIDES_TO_SHOW ? slides.length : SLIDES_TO_SHOW;
  const maxIndex =
    slides.length > visibleSlides ? slides.length - visibleSlides : 0;

  React.useEffect(() => {
    if (!isPaused && slides.length > visibleSlides) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayDuration * 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoPlayDuration, slides.length, maxIndex, visibleSlides]);

  React.useEffect(() => {
    onSlideChange?.(current);
  }, [current, onSlideChange]);

  return (
    <div
      className="overflow-x-auto w-full scrollbar-none pb-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div
        className="flex flex-nowrap gap-0 transition-transform duration-500 px-80"
        style={{ minWidth: '100%' }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="px-2 box-border w-full lg:w-lg flex-shrink-0"
            style={{ minWidth: 'min(100%, 320px)' }}
          >
            <ResponsiveDialog
              trigger={
                <button
                  type="button"
                  className="relative h-[320px] md:h-[420px] flex items-end bg-gray-100 rounded-xl overflow-hidden group w-full focus:outline-none focus:ring-primary shadow-sm"
                  aria-label={`${slide.title}の詳細を開く`}
                  tabIndex={0}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover object-left z-0"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10 z-10" />
                  <div className="relative z-20 p-6 w-full flex flex-col gap-2 text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground drop-shadow mb-1">
                      {slide.title}
                    </h3>
                    {slide.description && (
                      <p className="text-foreground/90 text-sm md:text-base line-clamp-2 mb-2">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </button>
              }
              title={slide.title}
              contentClassName={contentClassName}
            >
              {(dialogProps) => (
                <div className="max-w-5xl mx-auto w-full">
                  {typeof slide.detailContent === 'function'
                    ? slide.detailContent(dialogProps)
                    : slide.detailContent}
                </div>
              )}
            </ResponsiveDialog>
          </div>
        ))}
      </div>
    </div>
  );
};
