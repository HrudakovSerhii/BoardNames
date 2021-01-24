import React from "react";

import { emailRegexp } from "../../../core/utils";

import CloseButton from "../../CloseButton/CloseButton";

import s from "../styles/board.scss";

export const BoardItem = ({ text, onRemove }) => {
   const isInvalid = !emailRegexp.test(text);

   return (
      <div className={`${s.boardItem} ${s.baseBoardItem} ${isInvalid ? s.invalidBoardItem : ""}`}>
         <span>{text}</span>
         <CloseButton onClick={onRemove} />
      </div>
   );
};
