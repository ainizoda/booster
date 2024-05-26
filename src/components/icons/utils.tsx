export const SpinnerSM = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="26"
    height="26"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "transparent",
    }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <circle
        strokeDasharray="164.93361431346415 56.97787143782138"
        r="35"
        strokeWidth="10"
        stroke="#ffffff"
        fill="none"
        cy="50"
        cx="50"
      >
        <animateTransform
          keyTimes="0;1"
          values="0 50 50;360 50 50"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        ></animateTransform>
      </circle>
      <g></g>
    </g>
  </svg>
);

export const ToastCheckMark = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8333 0C8.69071 0 6.59619 0.635364 4.81466 1.82575C3.03313 3.01613 1.64459 4.70806 0.824643 6.6876C0.00469391 8.66713 -0.209842 10.8454 0.208164 12.9468C0.626171 15.0483 1.65795 16.9786 3.17301 18.4937C4.68808 20.0087 6.6184 21.0405 8.71986 21.4585C10.8213 21.8765 12.9995 21.662 14.9791 20.842C16.9586 20.0221 18.6505 18.6335 19.8409 16.852C21.0313 15.0705 21.6667 12.976 21.6667 10.8333C21.6667 9.41068 21.3865 8.00196 20.842 6.6876C20.2976 5.37323 19.4996 4.17898 18.4937 3.17301C17.4877 2.16704 16.2934 1.36906 14.9791 0.824638C13.6647 0.280212 12.256 0 10.8333 0ZM10.8333 19.5C9.11923 19.5 7.44362 18.9917 6.0184 18.0394C4.59317 17.0871 3.48234 15.7335 2.82638 14.1499C2.17042 12.5663 1.99879 10.8237 2.3332 9.14255C2.6676 7.46138 3.49302 5.91713 4.70508 4.70507C5.91713 3.49302 7.46139 2.6676 9.14256 2.33319C10.8237 1.99879 12.5663 2.17042 14.1499 2.82638C15.7336 3.48234 17.0871 4.59316 18.0394 6.01839C18.9917 7.44362 19.5 9.11923 19.5 10.8333C19.5 13.1319 18.5869 15.3363 16.9616 16.9616C15.3363 18.5869 13.1319 19.5 10.8333 19.5Z"
      fill="white"
    />
    <path
      d="M13.7573 6.92294L9.66226 12.3396L7.89642 10.0538C7.71972 9.82679 7.46009 9.6793 7.17465 9.64374C6.8892 9.60819 6.60132 9.68748 6.37434 9.86418C6.14736 10.0409 5.99987 10.3005 5.96431 10.586C5.92876 10.8714 6.00806 11.1593 6.18476 11.3863L8.81726 14.7554C8.91928 14.8845 9.04937 14.9887 9.19766 15.06C9.34595 15.1314 9.50854 15.168 9.67309 15.1671C9.83853 15.1667 10.0017 15.1284 10.15 15.0552C10.2984 14.9819 10.428 14.8757 10.5289 14.7446L15.4798 8.2446C15.655 8.01475 15.7318 7.72468 15.6932 7.43822C15.6546 7.15176 15.5038 6.89237 15.2739 6.7171C15.0441 6.54184 14.754 6.46506 14.4675 6.50366C14.1811 6.54226 13.9217 6.69308 13.7464 6.92294H13.7573Z"
      fill="white"
    />
  </svg>
);

export const ListIcon = () => (
  <svg
    width="12"
    height="148"
    viewBox="0 0 12 148"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="11" width="2" height="126" fill="white" />
    <circle cx="6" cy="142" r="6" fill="white" />
    <circle cx="6" cy="74" r="6" fill="white" />
    <circle cx="6" cy="6" r="6" fill="white" />
  </svg>
);

export const ArrowRight = () => (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.6406 5.66633L1.64032 0.24875C1.43634 0.0659411 1.17382 -0.0218399 0.910227 0.00462968C0.646638 0.0310992 0.403472 0.169662 0.233977 0.389975C0.0644832 0.610288 -0.0175252 0.894395 0.0059109 1.18008C0.029347 1.46577 0.156317 1.72975 0.359018 1.91422L5.43737 6.4991L0.359018 11.084C0.155536 11.2682 0.0278641 11.5324 0.0040471 11.8185C-0.0197699 12.1047 0.0622161 12.3893 0.231995 12.61C0.401774 12.8307 0.645461 12.9693 0.909525 12.9955C1.17359 13.0216 1.43644 12.9332 1.64032 12.7495L7.6406 7.3318C7.75311 7.22996 7.84361 7.1026 7.90571 6.95871C7.96781 6.81482 8 6.65791 8 6.49907C8 6.34022 7.96781 6.18331 7.90571 6.03942C7.84361 5.89553 7.75311 5.76817 7.6406 5.66633Z"
      fill="white"
    />
  </svg>
);
