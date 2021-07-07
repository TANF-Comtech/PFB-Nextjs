import { arrayShuffle } from "../../lib/utils/arrayShuffle";

import fallbackOne from "../../public/fallbacks/01_PFB_General.jpg";
import fallbackTwo from "../../public/fallbacks/02_PFB_General.jpg";
import fallbackThree from "../../public/fallbacks/03_PFB_General.jpg";
import fallbackFour from "../../public/fallbacks/04_PFB_General.jpg";
import fallbackFive from "../../public/fallbacks/05_PFB_General.jpg";
import fallbackSix from "../../public/fallbacks/06_PFB_General.jpg";

// Set all fallback images into an array
// Exported in case you need to count it for randomization purposes
const fallbackArr = [
  {
    path: fallbackOne,
    alt: "Paved bike lane with rider looking down",
  },
  {
    path: fallbackTwo,
    alt: "Man on bike with helmet on country ride",
  },
  {
    path: fallbackThree,
    alt: "Woman pausing on country ride watching golden hour sunset",
  },
  {
    path: fallbackFour,
    alt: "Young kid on first bike smiling at camera",
  },
  {
    path: fallbackFive,
    alt: "Man truing wheel in a bike shop",
  },
  {
    path: fallbackSix,
    alt: "Two women riding bikes along the beach",
  },
];

/**
 * <FallbackImage>
 *
 * Just exports a random 1600x900px to you, use as needed.
 * We use a shuffle on the array of random images above
 * The, we just send back the first one post shuffle
 *
 */
const FallbackImage = () => {
  arrayShuffle(fallbackArr);
  return fallbackArr;
};

export default FallbackImage;
