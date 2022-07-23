import * as React from 'react';
import cx from 'classnames';

type ButtonProps = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: 'blue' | 'lightGray' | 'darkGray';
  size?: 'large' | 'small';
};

export const Button = ({
  label,
  type = 'button',
  onClick,
  variant = 'blue',
  size = 'large',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        variant === 'blue' && 'bg-blue text-white',
        variant === 'lightGray' && 'bg-lightestGray text-black',
        variant === 'darkGray' && 'bg-darkestGray text-white',
        size === 'large' && 'px-8 py-4 text-base sm:px-12 sm:py-6 sm:text-2xl',
        size === 'small' && 'px-8 py-4 text-base sm:text-xl',
        'cursor-pointer rounded-lg font-bold uppercase',
      )}
    >
      {label}
    </button>
  );
};
