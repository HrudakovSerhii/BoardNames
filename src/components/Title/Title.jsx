import React from "react";

import s from "./styles/title.scss";

const Title = ({ text, boltedText, className = "" }) => {
   if (!boltedText) return <span className={`${s.root} ${className}`}>{text}</span>;
   else {
      const separator = "_";

      const normalText = text.replaceAll(boltedText, separator);
      const normalTextArray = normalText.split(" ");

      return (
         <span className={`${s.root} ${className}`}>
            {normalTextArray.map((t, i) => {
               if (t === separator) return <span key={i}>{`${!i ? "" : " "}${boltedText}`}</span>;
               else return `${!i ? "" : " "}${t}`;
            })}
         </span>
      );
   }
};

export default Title;
