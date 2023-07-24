import React from 'react';
import styled from 'styled-components';

const LogoIcon = styled.svg`
  cursor: pointer !important;
  display: block !important;
  height: ${(props) => props.logoWidth || '60px'} !important;
  margin: ${(props) => props.logoMargin || '0 auto'} !important;
  min-height: 50px !important;
`;

/**
 * <Logo>
 *
 * Logo is a versatile component that gives you access to the PFB logo (but not logotype)
 * It really isn't doing much, just displaying a logo really
 * In the main section, we have the "flow" class gives us some nice automatic padding around sibling elements
 *
 * @param {text} className - allows us to extend Logo
 * @param {text} logoMargin - we can adjust the margins (default: `0 auto`)
 * @param {text} logoWidth - adjustable width, but notice we use the value for height
 *    that's because the logo is square, so we can control both with one size!
 * @param {text} logoViewbox - so we can change the size of the box
 *
 */
function Logo({ className, logoMargin, logoWidth, logoViewbox }) {
  return (
    <>
      <LogoIcon
        className={className}
        logoMargin={logoMargin}
        logoWidth={logoWidth}
        viewBox={logoViewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="cls-3"
          fill="#e2231b"
          d="M323.09,279v25.38a10.57,10.57,0,0,0,10.58,10.57H437.56a10.58,10.58,0,0,0,10.58-10.57V279Z"
          transform="translate(-250.87 -183.92)"
        />
        <path
          className="cls-4"
          fill="#fff"
          d="M408.55,294l.32-.3L405.2,290l-.29.27a28.27,28.27,0,0,1-38.59,0L366,290l-3.66,3.66.31.3a33.46,33.46,0,0,0,45.88,0Z"
          transform="translate(-250.87 -183.92)"
        />
        <path
          className="cls-5"
          fill="#00a1df"
          d="M437.56,183.92H333.66a10.58,10.58,0,0,0-10.57,10.58v79.21H448.14V194.5A10.58,10.58,0,0,0,437.56,183.92Z"
          transform="translate(-250.87 -183.92)"
        />
        <path
          className="cls-4"
          fill="#fff"
          d="M432.51,256.48a18.83,18.83,0,0,0-23.84-18.13l-4.9-13.47H410a2.33,2.33,0,0,1,2.29,2.33h0a2.35,2.35,0,0,1-2.34,2.34h-.33v2.66h.33a5,5,0,0,0,.07-10h-10.1l2.71,7.45H373.71l-1.26-3.84a7.94,7.94,0,0,0,1-.3,5.57,5.57,0,0,1,2.77-.49,19.3,19.3,0,0,0,2.58-.2,3.32,3.32,0,0,0-3.17-2.18c-1.71.07-5.35.79-7.24.59s-4.07-.69-4.46.4-.2,1.59,1.78,1.88,2.65,0,3.88.28l1.68,5.1-5.53,8.91a18.82,18.82,0,1,0-16.33,33.89h15.14a18.8,18.8,0,0,0,11.19-15.87h4.68a3.13,3.13,0,0,0,2.23-.95l21.58-22.81,1.88,5.18a18.82,18.82,0,0,0,0,34.45h15.14A18.81,18.81,0,0,0,432.51,256.48Zm-65,10.57a14.94,14.94,0,1,1-3.87-23.93l-6.5,10.47h-.31a2.91,2.91,0,1,0,2.57,4.26h12.42A14.85,14.85,0,0,1,367.54,267.05Zm-8.11-11.92v0L366,244.56a14.33,14.33,0,0,1,1.56,1.36,14.82,14.82,0,0,1,4.31,9.21Zm16.31,0A18.8,18.8,0,0,0,368,241.26l4.34-7,6.89,20.86Zm6-1v0l-7.17-21.71h27.45Zm21.34,12.94a15,15,0,0,1,0-21.14,15.18,15.18,0,0,1,4.31-3l4.22,11.59a2.91,2.91,0,1,0,2.56-.89L410,242a14.95,14.95,0,0,1,14.27,25.05,14.94,14.94,0,0,1-21.14,0Z"
          transform="translate(-250.87 -183.92)"
        />
        <rect className="cls-4" fill="#fff" x="72.22" y="89.79" width="125.05" height="5.23" />
      </LogoIcon>
    </>
  );
}

export default Logo;
