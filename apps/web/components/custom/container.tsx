import type React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow passing additional classes if needed
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-5xl mx-auto px-4 ${className}`}>{children}</div>
  );
};

export default Container;
