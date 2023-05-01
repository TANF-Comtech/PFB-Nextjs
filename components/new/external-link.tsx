import * as React from 'react';

type ExternalLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" {...rest}>
      {children}
    </a>
  );
};
