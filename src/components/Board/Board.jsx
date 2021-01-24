import React from "react";

import Button from "../Button/Button";
import Title from "../Title/Title";

import { BoardContent } from "./components/BoardContent";

import { useEmails } from "../../hooks/emailHooks";

import s from "./styles/board.scss";

const Board = ({}) => {
   const { emails, addNew, remove, getCount } = useEmails();

   return (
      <div className={s.root}>
         <div className={s.headTitle}>
            <Title className={s.title} text="Share Board name with others" boltedText="Board name" />
         </div>
         <div className={s.content}>
            <BoardContent emails={emails} onRemove={remove} />
         </div>
         <div className={s.controls}>
            <Button title="Add email" onClick={addNew} />
            <Button title="Get emails count" onClick={getCount} />
         </div>
      </div>
   );
};

export default Board;
