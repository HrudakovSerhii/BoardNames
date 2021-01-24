import React from "react";

import { BoardItem } from "./BoardItem";
import { NewBoardItem } from "./NewBoardItem";

import s from "../styles/board.scss";

export const BoardContent = ({ emails = [], onRemove }) => {
   return (
      <div className={s.boardContent}>
         {emails?.map((email, i) => (
            <BoardItem key={email} text={email} onRemove={() => onRemove && onRemove(i)} />
         ))}
         <NewBoardItem />
      </div>
   );
};
