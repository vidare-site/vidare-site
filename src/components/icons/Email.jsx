import * as React from "react";
const SvgEmail = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 30 30"
    {...props}
  >
    <defs>
      <clipPath id="email_svg__a">
        <path d="M3.387 6.418h23.226v15.965H3.387Zm0 0" />
      </clipPath>
    </defs>
    <g clipPath="url(#email_svg__a)">
      <path
        fill="currentColor"
        d="M23.645 6.418H6.355a2.97 2.97 0 0 0-2.964 2.965v10.265a2.97 2.97 0 0 0 2.964 2.965h17.29a2.97 2.97 0 0 0 2.964-2.965V9.383a2.97 2.97 0 0 0-2.964-2.965m0 1.617c.039 0 .074.02.113.024l-7.922 6.261a1.34 1.34 0 0 1-1.672 0L6.242 8.06c.04-.004.074-.024.113-.024Zm1.347 11.613a1.35 1.35 0 0 1-1.347 1.348H6.355a1.35 1.35 0 0 1-1.347-1.348V9.383c0-.074.031-.137.043-.207l8.11 6.414c.542.43 1.19.644 1.839.644.648 0 1.297-.214 1.84-.644l8.11-6.414c.01.07.042.133.042.207Zm0 0"
      />
    </g>
  </svg>
);
export default SvgEmail;
