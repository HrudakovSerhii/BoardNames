import React from "react";
import { getRandNumber } from "../core/utils";

const testEmails = [
   "ser@a-dam.com",
   "ol@gmail.com",
   "serhii1@a-dam.com",
   "olyakorolova@gmail.com",
   "serhii2@a-dam",
   "olya2@gmail.com"
];

const names = ["alex", "marta", "ananas", "kebab", "schrijfblok", "ben", "jerry"];
const domains = ["com", "net", "nl"];
const hosts = ["gmail", "mail", "miro", "vodka"];

// TODO: save emails at localStorage
export const useEmails = () => {
   const [emails, setEmails] = React.useState(testEmails);

   const getRandomEmail = () => {
      const randomEmail = `${names[getRandNumber(names.length - 1)]}@${hosts[getRandNumber(hosts.length - 1)]}.${
         domains[getRandNumber(domains.length - 1)]
      }`;

      return randomEmail;
   };

   const remove = (i) => {
      setEmails(emails.filter((email, index) => index !== i));
   };

   const addNew = (email) => {
      setEmails([...emails, email]);
   };

   const addNewRandom = () => {
      const randomEmail = getRandomEmail();

      addNew(randomEmail);
   };

   // Return number of valid email addresses
   const getCount = () => emails.filter((email) => emailRegexp.test(email)).length;

   return {
      emails,
      remove,
      addNew,
      addNewRandom,
      getRandomEmail
   };
};
