import React from "react";

import s from "./styles/button.scss";

const Button = ({ disabled, title, onClick }) => {
   return (
      <button className={s.root} disabled={disabled} onClick={() => onClick()}>
         <span>{title}</span>
      </button>
   );
};

export default Button;
