import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-3xl">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
};
