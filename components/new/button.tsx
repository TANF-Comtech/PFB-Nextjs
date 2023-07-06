import * as React from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { linkResolver } from '~/utils';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  label: string;
  variant?: 'transparent' | 'blue' | 'red' | 'gold' | 'white';
  size?: 'normal' | 'small';
  to?: string | any;
};

export const Button = ({
  label,
  variant = 'blue',
  size = 'normal',
  onClick = undefined,
  to = undefined,
  className = '',
  ...rest
}: ButtonProps) => {
  let Element: any = 'button';
  let props: any = {};
  let href = to;

  if (typeof to === 'object') {
    href = linkResolver(to);
  }

  if (onClick) {
    props.onClick = onClick;
  }

  if (href) {
    if (href.startsWith('http')) {
      Element = 'a';
      if (!href.startsWith('https://peopleforbikes.org')) {
        props.target = '_blank';
      }
      props.href = href;
    } else {
      Element = Link;
      props.href = href;
    }
  }

  return (
    <Element
      className={cx(
        'inline-block cursor-pointer rounded-lg text-center font-bold uppercase leading-none transition duration-300 hover:scale-105',
        variant === 'transparent' && 'bg-transparent text-white hover:bg-blue',
        variant === 'blue' && 'bg-blue text-white',
        variant === 'red' && 'bg-redAccent text-white',
        variant === 'gold' && 'bg-gold text-black',
        variant === 'white' && 'bg-white text-black',
        size === 'normal' && 'px-6 py-4 text-lg shadow-md',
        size === 'small' && 'px-3 py-2 text-base shadow-md',
        className,
      )}
      {...props}
      {...rest}
    >
      {label}
    </Element>
  );
};
