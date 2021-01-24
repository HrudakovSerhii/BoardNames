import React from "react";

import Button from "../Button/Button";
import Title from "../Title/Title";

import s from "./styles/board.scss";

const Board = ({}) => {
   const onAddEmail = () => {};
   const onGetEmailsCount = () => {};

   return (
      <div className={s.root}>
         <div className={s.headTitle}>
            <Title className={s.title} text="Share Board name with others" boltedText="Board name" />
         </div>
         <div className={s.content}></div>
         <div className={s.controls}>
            <Button title="Add email" onClick={onAddEmail} />
            <Button title="Get emails count" onClick={onGetEmailsCount} />
         </div>
      </div>
   );
};

export default Board;
