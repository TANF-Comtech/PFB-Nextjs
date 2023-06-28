import * as React from 'react';
import Image from 'next/image';

export const ActionCard = ({ number, total, title, description, image }) => {
  return (
    <li className="group block list-none">
      <div className="relative flex aspect-[3/4] w-[20rem] items-center justify-center overflow-hidden">
        <Image
          src={`${image}`}
          layout="fill"
          className="absolute inset-0 z-0 block h-full w-full object-cover transition duration-700 group-hover:scale-105"
          alt=""
        />
        <div className="absolute inset-0 z-10 flex h-[200%] w-full -translate-y-1/4 bg-gradient-to-b from-transparent via-pure-black/25 to-pure-black transition duration-700 group-hover:-translate-y-1/2" />
        <div className="relative z-20 flex h-full flex-col gap-4 p-8 text-white">
          <div className="font-bold">
            {number}/{total}
          </div>
          <h4 className="text-shadow font-dharma text-5xl font-bold leading-none">{title}</h4>
          <div className="opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="text-shadow block text-sm">{description}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
