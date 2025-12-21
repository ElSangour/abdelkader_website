import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ 
  title, 
  description, 
  children, 
  className = '',
  onClick 
}: CardProps) {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6";
  const clickableClasses = onClick ? "cursor-pointer hover:scale-105 transform transition-transform" : "";
  
  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}