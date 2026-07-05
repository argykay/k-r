import React from 'react';

export type SectionHeadingProps = {
  title: string;
  id?: string;
};

export const SectionHeading = ({ title, id }: SectionHeadingProps) => (
  <h2 id={id} className="mb-6 text-style-header-4 text-black">
    {title}
  </h2>
);
