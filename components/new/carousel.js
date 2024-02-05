import React from 'react';
import cx from 'classnames';
import Flickity from 'react-flickity-component';

import { ClientOnly } from '~/components/new/client-only';

export const Carousel = ({ className = '', children }) => {
  return (
    <ClientOnly>
      <Flickity
        className={cx('carousel', className)}
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate={false}
        static={true}
      >
        {children}
      </Flickity>
    </ClientOnly>
  );
};

const options = {
  autoPlay: 4000,
  initialIndex: 0,
  lazyLoad: false,
  prevNextButtons: true,
  pageDots: false,
  wrapAround: true,
};