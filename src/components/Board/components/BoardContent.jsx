import React from "react";

import { BoardItem } from "./BoardItem";

import s from "../styles/board.scss";

const testEmails = [
   "ser@a-dam.com",
   "ol@gmail.com",
   "serhii1@a-dam.com",
   "olyakorolova@gmail.com",
   "serhii2@a-dam",
   "olya2@gmail.com"
];

export const BoardContent = ({ emails = testEmails, onRemove }) => {
   return (
      <div className={s.boardContent}>
         {emails?.map((email, i) => (
            <BoardItem key={email} text={email} onRemove={() => onRemove && onRemove(i)} />
         ))}
      </div>
   );
};
