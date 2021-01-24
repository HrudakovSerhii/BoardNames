import React from "react";

import s from "../styles/board.scss";

export const NewBoardItem = () => {
   const inputRef = React.useRef();
   const [inputVisible, setInputVisible] = React.useState(false);

   const showInputField = () => {
      setInputVisible(true);
   };

   const hideInputVisible = () => {
      setInputVisible(false);
   };

   return (
      <div onClick={() => showInputField()} className={`${s.baseBoardItem} ${s.newBoardItem}`}>
         {inputVisible ? (
            <input ref={inputRef} onBlur={() => hideInputVisible()} id="newEmailInput"></input>
         ) : (
            <span>{"add more people…"}</span>
         )}
      </div>
   );
};
