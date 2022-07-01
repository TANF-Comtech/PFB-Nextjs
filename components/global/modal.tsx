import * as React from 'react';
import { Fragment } from 'react';
import cx from 'classnames';
import { Dialog, Transition } from '@headlessui/react';

type ModalProps = {
  dark?: boolean;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ dark = false, show, onClose, children }: ModalProps) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[1010] bg-black/50" />
        </Transition.Child>
        <div className="!fixed !inset-0 z-[1020] !overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-5 sm:p-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-screen-lg transform overflow-hidden rounded-xl bg-white p-5 text-left shadow-xl transition-all sm:p-10">
                <button
                  onClick={onClose}
                  className={cx(
                    'absolute top-0 right-0 p-5 text-2xl font-bold',
                    dark && 'text-white',
                  )}
                >
                  X
                </button>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
