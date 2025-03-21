import { memo } from "react";

const DirectIcon = () => {
  return (
    <svg
      color="purple"
      fill="purple"
      height="96"
      viewBox="0 0 96 96"
      width="96"
    >
      <circle
        cx="48"
        cy="48"
        fill="none"
        r="47"
        stroke="purple"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
      <line
        fill="none"
        stroke="purple"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="69.286"
        x2="41.447"
        y1="33.21"
        y2="48.804"
      ></line>
      <polygon
        fill="none"
        points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
        stroke="purple"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  );
};

export default memo(DirectIcon);
