import React from 'react';

export const ExternalLink = ({ href, children, ...rest }) => {
  return (
    <a href={href} target="_blank" {...rest}>
      {children}
    </a>
  );
};
