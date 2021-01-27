module.exports = function EmailsInput(
   parentNode,
   value = "",
   onChange,
   className = "",
   emailItemClassName = "",
   removeButtonClassName = "",
   incorrectEmailClassName = "",
   emailInputClassName = "",
   emailInputPlaceHolder = ""
) {
   if (typeof window === "undefined") return;
   else window.addEventListener("load", () => init(value));

   let _counter = 0;
   let _emailsList = [];

   const inputField = window.document.createElement("div");

   const _emailItemTemplate =
      `<div class="email-item ` +
      emailItemClassName +
      `">
        <span></span>
        <button class="email-item-remove-button ` +
      removeButtonClassName +
      `">
           <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038" />
           </svg>
        </button>
     </div>`;

   const _newEmailItemTemplate =
      `<div class="email--item email--item-new ` +
      emailInputClassName +
      `">
        <input class="email-input--item-new" type="email" placeholder="` +
      emailInputPlaceHolder +
      `" value="" />
     </div>`;

   const emailRegexp = /(?!.*\.{2})^([A-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[A-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/;

   const getElByTemplate = function (template) {
      const templateEl = window.document.createElement("template");

      templateEl.innerHTML = template;

      return templateEl.content;
   };

   const addEmails = function (emailsString) {
      const emails = emailsString.split(",");

      for (let i = 0; i < emails.length; i += 1) {
         const email = emails[i].trim();

         if (email && !_emailsList.find((d) => d === email)) {
            addEmailBlock(email);

            _emailsList.push(email);

            onChange && onChange(_emailsList);
         } else {
            showError(`Email ${email} already exist in board`);
         }
      }
   };

   const onRemoveEmail = function (e) {
      const emailToRemove = e.target.parentNode.querySelector(".email-item span").textContent;

      _emailsList = _emailsList.filter((email) => email !== emailToRemove);

      e.target.removeEventListener("click", this);
      e.target.parentNode.remove();

      onChange && onChange(_emailsList);
   };

   const addEmailBlock = function (email) {
      const isInvalid = !emailRegexp.test(email);
      const emailBlock = getEmailBlockNode(email);

      if (isInvalid) {
         emailBlock.querySelector(".email-item").className += ` invalid-email-item ${incorrectEmailClassName}`;
      }

      inputField.insertBefore(emailBlock, inputField.querySelector(".email--item-new"));
   };

   const showError = function (error) {
      alert(error);
   };

   // Catch ,(comma) and Enter keys press and create new emailBlocks
   const onKeyPress = function (e) {
      e.stopPropagation();

      const value = e.target.value;

      if (e.key === "," || e.key === "Enter") {
         if (value.length > 1) {
            addEmails(value);

            e.currentTarget.value = "";
         } else if (e.key === "," && !value.length) {
            showError("Email can't start with `,` character");
         }
      }
   };

   // ivan@mail.ru, max@mail.ru
   // Handle paste event on input
   const onTextInput = function (e) {
      const value = e.target.value;

      if (value.includes(",")) {
         if (value.length > 1) addEmails(value);
         else e.currentTarget.value = "";

         e.currentTarget.value = "";
      }
   };

   // Create new emailBlocks if any text left in email input
   const onFocusOut = function (e) {
      e.stopPropagation();

      const value = e.target.value;

      if (value.length) addEmails(value);

      e.currentTarget.value = "";
   };

   const getEmailBlockNode = function (email) {
      const newEmailNode = getElByTemplate(_emailItemTemplate);
      const id = (_counter += 1);

      newEmailNode.querySelector(".email-item span").textContent = email;
      newEmailNode.querySelector(".email-item").setAttribute("key", id.toString());
      newEmailNode.querySelector(".email-item .email-item-remove-button").addEventListener("click", onRemoveEmail);

      return newEmailNode;
   };

   const init = function (initEmails) {
      inputField.setAttribute("class", `emails-input ${className}`);

      const newEmailInputNode = getElByTemplate(_newEmailItemTemplate);

      newEmailInputNode.querySelector(".email-input--item-new").addEventListener("keydown", onKeyPress);
      newEmailInputNode.querySelector(".email-input--item-new").addEventListener("input", onTextInput);
      newEmailInputNode.querySelector(".email-input--item-new").addEventListener("focusout", onFocusOut);

      inputField.append(newEmailInputNode);
      parentNode.append(inputField);

      addEmails(initEmails);
   };

   return {
      el: inputField,
      getEmailCount: () => _emailsList.length,
      getEmails: () => _emailsList
   };
};
