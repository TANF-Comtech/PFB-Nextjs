import styled from "styled-components";

const LogoIcon = styled.svg`
  cursor: pointer;
  display: block;
  height: ${props => props.logoWidth || '60px'};
  margin: ${props => props.logoMargin || '0 auto'};
  min-height: 50px; 
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
 *    that's because the logo is square, so we can control both with on size!
 * 
 */
function Logo({ className, logoMargin, logoWidth }) {
  return (
    <LogoIcon
      className={ className }
      logoMargin={ logoMargin }
      logoWidth={ logoWidth }
      viewBox="0 0 89 94"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Menu" transform="translate(-57.000000, -105.000000)">
          <path
            d="M751,-2 L751,1076 L0,1076 L0,-2 L751,-2 Z"
            id="Line"
            stroke="#979797"
            strokeWidth="2"
            strokeLinecap="square"
            fillRule="nonzero"
          ></path>
          <rect
            id="Rectangle-3"
            fill="#FFFFFF"
            fillRule="nonzero"
            x="0"
            y="0"
          ></rect>
          <g
            id="PFB_LOGO_HORIZ"
            transform="translate(57.000000, 105.000000)"
          >
            <g id="pfb_logo" transform="translate(0.000000, 0.818000)">
              <path
                d="M60.143,77.444 C55.919,81.415 50.243,83.856 44,83.856 C37.759,83.856 32.085,81.418 27.86,77.444 L27.637,77.242 L30.215,74.661 L30.423,74.857 C33.993,78.177 38.758,80.218 44,80.218 C49.244,80.218 54.009,78.177 57.58,74.857 L57.788,74.661 L60.375,77.242 L60.143,77.444 Z M7.10542736e-15,66.879 L7.10542736e-15,84.735 C7.10542736e-15,88.853 3.33,92.182 7.444,92.182 L80.559,92.182 C84.67,92.182 88.009,88.853 88.009,84.735 L88.009,66.879 L7.10542736e-15,66.879 L7.10542736e-15,66.879 Z"
                id="Fill-16"
                fill="#CE2A2B"
              ></path>
              <path
                d="M88.009,7.453 C88.009,3.339 84.671,0 80.56,0 L7.444,0 C3.33,0 0.001,3.339 0.001,7.453 L0.001,63.191 L18.52,63.191 C13.859,61.148 10.606,56.49 10.597,51.071 C10.606,43.762 16.531,37.83 23.838,37.83 C26.071,37.83 28.154,38.377 30.005,39.348 L33.902,33.062 L32.72,29.485 C31.853,29.295 31.352,29.497 29.993,29.293 C28.6,29.082 28.456,28.731 28.737,27.961 C29.012,27.191 30.548,27.539 31.874,27.683 C33.203,27.823 35.771,27.314 36.972,27.268 C38.643,27.191 39.199,28.801 39.199,28.801 C39.199,28.801 38.292,28.935 37.384,28.935 C36.489,28.935 36.34,28.935 35.436,29.293 C35.201,29.378 34.968,29.445 34.736,29.497 L35.625,32.2 L55.971,32.2 L54.062,26.959 L61.176,26.959 C63.097,26.981 64.64,28.547 64.64,30.468 C64.64,32.411 63.066,33.984 61.127,33.984 L60.895,33.984 L60.895,32.115 L61.121,32.115 C62.031,32.109 62.764,31.376 62.764,30.468 C62.764,29.564 62.04,28.838 61.154,28.822 L56.777,28.822 L60.223,38.31 C61.35,37.995 62.535,37.83 63.766,37.83 C71.075,37.83 77.004,43.762 77.004,51.071 C77.004,56.49 73.751,61.148 69.09,63.191 L88.009,63.191 L88.009,7.453"
                id="Fill-17"
                fill="#2795C6"
              ></path>
              <path
                d="M50.524,51.07 C50.524,45.652 53.765,41.009 58.429,38.95 L57.091,35.306 L41.904,51.355 C41.504,51.767 40.945,52.024 40.34,52.024 L37.054,52.026 C36.693,57.036 33.553,61.263 29.173,63.191 L58.444,63.191 C53.78,61.147 50.524,56.489 50.524,51.07"
                id="Fill-19"
                fill="#2795C6"
              ></path>
              <path
                d="M30.182,42.677 L25.569,50.106 C25.569,50.106 25.579,50.112 25.579,50.115 L34.317,50.115 C34.091,47.585 32.974,45.325 31.284,43.636 C30.939,43.285 30.576,42.973 30.182,42.677"
                id="Fill-20"
                fill="#2795C6"
              ></path>
              <path
                d="M31.628,40.357 C34.694,42.587 36.768,46.106 37.052,50.116 L39.536,50.116 L34.682,35.433 L31.628,40.357"
                id="Fill-21"
                fill="#2795C6"
              ></path>
              <path
                d="M23.763,53.118 C22.63,53.118 21.713,52.205 21.713,51.071 C21.713,49.942 22.63,49.022 23.763,49.022 C23.83,49.022 23.91,49.028 23.983,49.034 L28.559,41.669 C27.141,40.949 25.55,40.552 23.839,40.552 C20.937,40.558 18.317,41.718 16.402,43.627 C14.499,45.543 13.326,48.16 13.326,51.071 C13.326,53.979 14.499,56.594 16.402,58.506 C18.317,60.415 20.937,61.585 23.839,61.585 C26.75,61.585 29.374,60.415 31.283,58.506 C32.975,56.814 34.093,54.553 34.316,52.025 L25.577,52.025 C25.232,52.681 24.551,53.118 23.763,53.118"
                id="Fill-22"
                fill="#2795C6"
              ></path>
              <path
                d="M71.198,43.629 C69.29,41.729 66.669,40.55 63.761,40.547 C62.866,40.547 61.995,40.666 61.155,40.877 L64.133,49.05 C65.114,49.203 65.868,50.043 65.868,51.069 C65.868,52.203 64.949,53.119 63.816,53.119 C62.688,53.119 61.763,52.203 61.763,51.069 C61.763,50.532 61.974,50.043 62.316,49.668 L59.353,41.518 C58.229,42.041 57.2,42.755 56.323,43.629 C54.417,45.544 53.241,48.162 53.241,51.069 C53.241,53.981 54.417,56.595 56.323,58.507 C58.232,60.416 60.853,61.583 63.761,61.583 C66.669,61.583 69.29,60.416 71.198,58.507 C73.105,56.595 74.28,53.981 74.28,51.069 C74.28,48.162 73.105,45.544 71.198,43.629"
                id="Fill-23"
                fill="#2795C6"
              ></path>
              <polyline
                id="Fill-24"
                fill="#2795C6"
                points="41.3 49.38 41.303 49.401 55.573 34.107 36.257 34.107 41.3 49.38"
              ></polyline>
            </g>
          </g>
        </g>
      </g>
    </LogoIcon>
  );
}

export default Logo;
