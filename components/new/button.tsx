import * as React from 'react';
import cx from 'classnames';
import Link from 'next/link';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  label: string;
  variant?: 'transparent' | 'blue' | 'red' | 'yellow';
  size?: 'normal' | 'small';
  to?: string;
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

  if (onClick) {
    props.onClick = onClick;
  }

  if (to) {
    if (to.startsWith('http')) {
      Element = 'a';
      props.target = '_blank';
      props.href = to;
    } else {
      Element = Link;
      props.to = to;
    }
  }

  return (
    <Element
      className={cx(
        'inline-block cursor-pointer rounded-full  text-center font-bold uppercase  leading-none transition duration-300 hover:scale-105',
        variant === 'transparent' && 'bg-transparent text-white hover:bg-blue',
        variant === 'blue' && 'bg-blue text-white',
        size === 'normal' && 'px-6 py-4 text-lg shadow-md',
        className,
      )}
      {...props}
      {...rest}
    >
      {label}
    </Element>
  );
};
