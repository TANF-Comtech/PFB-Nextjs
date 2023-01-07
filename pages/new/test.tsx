import * as React from 'react';
import { useState, useEffect, useCallback, Children } from 'react';
import cx from 'classnames';
import { atom, useAtom } from 'jotai';
import useScrollPosition from '@react-hook/window-scroll';

import { Page } from '~/components/new/page';

export default function TestPage() {
  return (
    <Page title="Test page">
      <div className="relative mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center bg-[#000000]">
        <video
          src="/new/Stocksy_comp_watermarked_4935063.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
          playsInline
          autoPlay
          muted
          loop
        />
        <div className="vignette absolute inset-0 z-10 h-full w-full" />
        <div className="relative z-20 flex flex-col">
          <h2 className="font-dharma text-[14rem] font-bold uppercase leading-none text-white/50">
            Test page
          </h2>
        </div>
      </div>
      <div className="flex h-[500vh] flex-col gap-64 bg-pure-black p-64">
        <div className="mx-auto block aspect-video w-[1024px] bg-pure-white">
          <Carousel id="testCarousel">
            <div>item one</div>
            <div>item two</div>
            <div>item three</div>
          </Carousel>
        </div>
        <ScrollBasedToastExample />
      </div>
    </Page>
  );
}

type CarouselProps = {
  id: string;
  children: Array<React.ReactNode>;
};

const Carousel = ({ id, children }: CarouselProps) => {
  const childrenArray = Children.toArray(children);
  const childrenCount = Children.count(children);
  const lastSlideIndex = childrenCount - 1;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onBackClick = useCallback(() => {
    if (activeIndex === 0) return;

    setActiveIndex((index: number) => index - 1);
  }, [activeIndex]);

  const onNextClick = useCallback(() => {
    if (activeIndex === lastSlideIndex) return;

    setActiveIndex((index: number) => index + 1);
  }, [activeIndex, lastSlideIndex]);

  useEffect(() => {
    document
      .getElementById(`${id}-${activeIndex}`)
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, [id, activeIndex]);

  return (
    <div className="relative flex h-full w-full items-center">
      <button
        onClick={onBackClick}
        className="absolute left-0 flex h-16 w-16 flex-shrink-0 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow"
      >
        back
      </button>
      <div className="flex h-full w-full max-w-full snap-x snap-mandatory overflow-x-scroll">
        {Children.map(childrenArray, (child: React.ReactNode, index: number) => (
          <div
            key={`${id}-${index.toString()}`}
            id={`${id}-${index.toString()}`}
            className="flex h-full w-full flex-shrink-0 snap-center items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={onNextClick}
        className="absolute right-0 flex h-16 w-16 flex-shrink-0 translate-x-1/2 items-center justify-center rounded-full bg-white shadow"
      >
        next
      </button>
    </div>
  );
};

const ScrollBasedToastExample = () => {
  const scrollY = useScrollPosition();
  const hasScrolled = scrollY >= 500;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen || hasBeenDismissed) return;

    if (hasScrolled && !hasBeenDismissed) {
      setIsOpen(true);
    }
  }, [isOpen, hasScrolled, hasBeenDismissed]);

  const onClose = useCallback(() => {
    setHasBeenDismissed(true);
    setIsOpen(false);
  }, []);

  return (
    <Toast isOpen={isOpen} onClose={onClose}>
      the toast!
    </Toast>
  );
};

type ToastProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Toast = ({ isOpen, onClose, children }: ToastProps) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] flex h-full w-full items-end justify-end">
      <div
        className={cx(
          !isOpen ? 'translate-y-[100px] opacity-0' : 'translate-y-0 opacity-100',
          'pointer-events-auto relative m-16 block bg-pure-white p-16 shadow-xl transition duration-700',
        )}
      >
        {children}
        <button onClick={onClose} className="absolute top-0 right-0 z-100 cursor-pointer p-4">
          X
        </button>
      </div>
    </div>
  );
};
