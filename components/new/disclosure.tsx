import * as React from 'react';
import { useMemo } from 'react';
import cx from 'classnames';
import { Disclosure as Element } from '@headlessui/react';

const { Button, Panel } = Element;

type DisclosureProps = React.ComponentPropsWithoutRef<'div'> & {
  label: string;
  contents: string | string[] | React.ReactNode;
};

type RenderProps = {
  open: boolean;
};

export const Disclosure = ({ label, contents, ...rest }: DisclosureProps) => {
  const newContents: React.ReactNode = useMemo(() => {
    return Array.isArray(contents) ? (
      <ul className="ml-6 mt-4 list-disc space-y-6">
        {contents.map((line: string, index: number) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    ) : (
      <>{contents}</>
    );
  }, [contents]);

  return (
    <Element as="div" {...rest}>
      {({ open }: RenderProps) => (
        <>
          <Button className="flex items-center gap-4 py-2 text-left text-blue">
            <i
              className={cx(
                'fa-solid fa-caret-right text-3xl text-white xl:text-5xl',
                open && 'rotate-90',
              )}
            />
            <span className="text-sky-500 font-dharma text-3xl font-normal xl:text-5xl">
              {label}
            </span>
          </Button>
          <Panel className="text-base text-white/80 xl:text-lg">{newContents}</Panel>
        </>
      )}
    </Element>
  );
};
