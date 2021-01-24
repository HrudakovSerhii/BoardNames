import React from "react";
import { emailRegexp } from "../core/utils";

const testEmails = [
   "ser@a-dam.com",
   "ol@gmail.com",
   "serhii1@a-dam.com",
   "olyakorolova@gmail.com",
   "serhii2@a-dam",
   "olya2@gmail.com"
];

// TODO: save emails at localStorage
export const useEmails = () => {
   const [emails, setEmails] = React.useState(testEmails);

   const remove = (i) => {
      setEmails(emails.filter((email, index) => index !== i));
   };

   const addNew = (email) => {
      setEmails([...emails, email]);
   };

   // Return number of valid email addresses
   const getCount = () => emails.filter((email) => emailRegexp.test(email)).length;

   return {
      emails,
      remove,
      addNew,
      getCount
   };
};
