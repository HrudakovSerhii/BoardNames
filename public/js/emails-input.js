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

      return templateEl.content; // window.document.importNode(, true);
   };

   const inputField = window.document.createElement("div");
   inputField.className = "emails-input " + className;

   const onClick = function (e) {
      e.stopPropagation();

      const value = e.target.value;
      console.log(e.target, "onClick");
   };

   const onEnter = function (e) {
      e.stopPropagation();

      const value = e.target.value;
      console.log(value, "onEnter");
   };

   const onKeyPress = function (e) {
      e.stopPropagation();

      if (e.target.value.slice(-1) === ",") {
         const value = e.target.value.slice(0, e.target.value.length - 1);

         addEmail(value);

         e.currentTarget.value = "";
      }
   };

   const onFocusOut = function (e) {
      e.stopPropagation();

      const value = e.target.value;

      if (value) pasteEmails(value);

      e.currentTarget.value = "";
   };

   const getEmailNode = function (email) {
      const newEmailNode = getElByTemplate(_emailItemTemplate);
      const id = (_counter += 1);

      newEmailNode.querySelector(".email-item span").textContent = email;
      newEmailNode.querySelector(".email-item").setAttribute("key", id.toString());
      newEmailNode.querySelector(".email-item .email-item-remove-button").addEventListener("click", removeEmail);

      return newEmailNode;
   };

   // TODO: notify parentNode about emails number change
   const addEmail = function (email) {
      const isInvalid = !emailRegexp.test(email);
      const emailNode = getEmailNode(email);

      if (isInvalid) {
         emailNode.querySelector(".email-item").className += ` invalid-email-item ${incorrectEmailClassName}`;
      }

      inputField.insertBefore(emailNode, inputField.querySelector(".email--item-new"));
   };

   // TODO: notify parentNode about emails number change
   const removeEmail = function (e) {
      e.target.removeEventListener("click", this);
      e.target.parentNode.remove();
   };

   const getEmailCount = function () {
      return _counter;
   };

   const init = function (initEmails) {
      const emails = initEmails.split(",");
      const newEmailInputNode = getElByTemplate(_newEmailItemTemplate);

      newEmailInputNode.querySelector(".email-input--item-new").addEventListener("input", onKeyPress);

      inputField.append(newEmailInputNode);
      parentNode.append(inputField);

      for (let i = 0; i < emails.length; i += 1) {
         const email = emails[i];

         addEmail(email);
      }
   };

   return {
      el: inputField,
      count: _counter,
      addEmail,
      getEmailCount
   };
};
