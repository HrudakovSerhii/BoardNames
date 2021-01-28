import React from "react";

import Button from "../Button/Button";
import Title from "../Title/Title";

import EmailInput from "../../../public/emailsInput";

import { useEmails } from "../../hooks/emailHooks";

import s from "./styles/board.scss";

const Board = ({}) => {
   const { getRandomEmail, getTestEmails, alertEmailCounts } = useEmails();

   const parentNode = React.useRef();
   const emailInputField = React.useRef();
   const [emails] = React.useState(process.env.NODE_ENV === "development" ? getTestEmails() : []);

   React.useEffect(() => {
      if (parentNode.current && !emailInputField.current) {
         emailInputField.current = EmailInput(
            parentNode.current,
            () => {},
            emails.toString(),
            s.boardContent,
            `${s.baseBoardItem} ${s.boardItem}`,
            s.invalidBoardItem,
            s.closeButton,
            `${s.baseBoardItem} ${s.newBoardItem}`,
            "add more people…"
         );
      }
   }, [parentNode.current]);

   const addNewEmail = () => {
      const randomEmail = getRandomEmail();

      emailInputField.current.addEmail(randomEmail);
   };

   const getEmailsCount = () => {
      const emailCounter = emailInputField.current.getEmailCount();

      alertEmailCounts(emailCounter);
   };

   return (
      <div className={s.root}>
         <div className={s.headTitle}>
            <Title className={s.title} text="Share Board name with others" boltedText="Board name" />
         </div>
         <div ref={parentNode} className={s.content}></div>
         <div className={s.controls}>
            <Button title="Add email" onClick={() => addNewEmail()} />
            <Button title="Get emails count" onClick={getEmailsCount} />
         </div>
      </div>
   );
};

export default Board;
