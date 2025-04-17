'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../../custom/container';

export type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
  id?: string;
};

type FAQSectionProps = {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
  withBackground?: boolean;
  withQAStyle?: boolean;
};

export default function FAQSection({
  title = 'よくあるご質問',
  description,
  faqs,
  className = '',
  withBackground = true,
  withQAStyle = false,
}: FAQSectionProps) {
  // FAQアイテムの開閉状態を管理
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    // 最初は最初の項目だけを開いた状態にする
    const initialState: Record<string, boolean> = {};
    if (faqs.length > 0) {
      initialState[faqs[0]?.question || ''] = true;
    }
    return initialState;
  });

  // 各FAQの実際の高さを格納するためのオブジェクト
  const [contentHeights, setContentHeights] = useState<Record<string, number>>(
    {}
  );

  // 各FAQの内容部分へのrefを格納するオブジェクト
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 要素の高さを測定して保存する関数 - useCallbackでメモ化
  const updateHeight = useCallback(() => {
    for (const faq of faqs) {
      const element = contentRefs.current[faq.question];
      if (element) {
        // スクロール高さに少し余裕を持たせる（見切れ防止のため）
        const height = element.scrollHeight + 20;
        setContentHeights((prev) => ({
          ...prev,
          [faq.question]: height,
        }));
      }
    }
  }, [faqs]);

  // 開閉の切り替え
  const toggleItem = (question: string) => {
    setOpenItems((prev) => {
      const newState = {
        ...prev,
        [question]: !prev[question],
      };

      // 開閉状態が変わったあとで、少し遅延させて高さを再計算
      setTimeout(updateHeight, 100);

      return newState;
    });
  };

  // 初期表示時と画面サイズ変更時の高さ計算
  useEffect(() => {
    // DOM更新後に高さを測定するために少し遅延させる
    setTimeout(updateHeight, 100);

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [updateHeight]); // updateHeightだけを依存配列に入れる

  // refコールバック関数
  const setContentRef = (question: string) => (el: HTMLDivElement | null) => {
    contentRefs.current[question] = el;
  };

  return (
    <section
      className={`${className} ${withBackground ? 'bg-gray-50' : ''} py-16 lg:py-32`}
    >
      <Container>
        {title && (
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            {title}
          </h2>
        )}
        {description && <p className="text-gray-600 mb-6">{description}</p>}

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.id || faq.question}
              className="mb-6 border-b border-gray-200 pb-6 last:border-0 last:pb-0"
            >
              {withQAStyle ? (
                // Q&A スタイル
                <>
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.question)}
                    className="w-full text-left focus:outline-none focus-visible:ring focus-visible:ring-primary group cursor-pointer rounded-md hover:bg-gray-50 transition-colors p-2"
                    aria-expanded={openItems[faq.question]}
                  >
                    <div className="flex items-start">
                      <div className="bg-primary text-primary-foreground font-bold w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        Q
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 flex-grow group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out group-hover:text-primary mt-1 ${
                          openItems[faq.question] ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openItems[faq.question]
                        ? `${contentHeights[faq.question] || 2000}px`
                        : '0px',
                      opacity: openItems[faq.question] ? 1 : 0,
                      transform: openItems[faq.question]
                        ? 'translateY(0)'
                        : 'translateY(-8px)',
                    }}
                  >
                    <div
                      className="pl-12 mt-2 text-gray-600 pb-2"
                      ref={setContentRef(faq.question)}
                    >
                      {typeof faq.answer === 'string' ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // シンプルスタイル
                <>
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.question)}
                    className="flex justify-between items-center w-full py-4 text-left font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary group cursor-pointer hover:bg-gray-50 rounded-md transition-colors px-2 -mx-2"
                    aria-expanded={openItems[faq.question]}
                  >
                    <span className="text-lg group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out group-hover:text-primary ${
                        openItems[faq.question] ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openItems[faq.question]
                        ? `${contentHeights[faq.question] || 2000}px`
                        : '0px',
                      opacity: openItems[faq.question] ? 1 : 0,
                      transform: openItems[faq.question]
                        ? 'translateY(0)'
                        : 'translateY(-8px)',
                    }}
                  >
                    <div
                      className="pb-4 text-gray-600"
                      ref={setContentRef(faq.question)}
                    >
                      {typeof faq.answer === 'string' ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
