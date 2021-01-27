import { getRandNumber } from "../core/utils";

const names = ["alex", "marta", "ananas", "kebab", "schrijfblok", "ben", "jerry"];
const domains = ["com", "net", "nl"];
const hosts = ["gmail", "mail", "miro", "vodka"];

export const useEmails = () => {
   const getRandomEmail = () => {
      const randomEmail = `${names[getRandNumber(names.length - 1)]}@${hosts[getRandNumber(hosts.length - 1)]}.${
         domains[getRandNumber(domains.length - 1)]
      }`;

      return randomEmail;
   };

   // Return 5
   const getTestEmails = () => [1, 2, 3, 4, 5].map(() => getRandomEmail());

   // Return number of valid email addresses
   const alertEmailCounts = (emailsCounter) => {
      alert(`${emailsCounter} emails in board`);
   };

   return {
      getRandomEmail,
      getTestEmails,
      alertEmailCounts
   };
};
