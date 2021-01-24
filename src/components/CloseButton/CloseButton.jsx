import React from "react";

import s from "./styles/closeButton.scss";

const closeIcon = (
   <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038" />
   </svg>
);

const CloseButton = ({ onClick }) => (
   <button onClick={() => onClick && onClick()} className={s.root}>
      {closeIcon}
   </button>
);

export default CloseButton;
