import React from 'react';
import cx from 'classnames';
import Flickity from 'react-flickity-component';

export const Slider = ({ className = '', children }) => {
  return (
    <Flickity
      className={cx('slider', className)}
      elementType="div"
      options={options}
      disableImagesLoaded={false}
      reloadOnUpdate={false}
      static={true}
    >
      {children}
    </Flickity>
  );
};

const options = {
  autoPlay: false,
  initialIndex: 0,
  lazyLoad: false,
  prevNextButtons: true,
  pageDots: true,
  wrapAround: false,
  cellAlign: 'left',
};
