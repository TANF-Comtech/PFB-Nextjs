import * as React from 'react';
import Head from 'next/head';

import { Carousel } from '~/components/new/carousel';

export default function DesignSystemPage() {
  return (
    <>
      <Head>
        <title>Design system</title>
      </Head>
      <div className="p-16">
        <div className="font-dharma text-8xl font-bold">Carousel</div>
        <Carousel className="max-w-6xl">
          <Card number={1} color="red" />
          <Card number={2} color="orange" />
          <Card number={3} color="gold" />
          <Card number={4} color="green" />
          <Card number={5} color="blue" />
          <Card number={6} color="purple" />
        </Carousel>
      </div>
    </>
  );
}

const Card = ({ number, color }) => {
  return (
    <div
      className="flex aspect-[3/4] w-[18rem] items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div className="font-dharma text-9xl font-bold text-pure-white">{number}</div>
    </div>
  );
};
