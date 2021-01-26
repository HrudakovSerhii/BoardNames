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

   let _counter = 0;
   let _emailItemTemplate;
   let _newEmailItemTemplate;

   const emailRegexp = /(?!.*\.{2})^([A-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[A-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/;

   const emailNodeTemplate = function (emailNodeClassName = "", removeButtonClassName = "") {
      if (!_emailItemTemplate)
         _emailItemTemplate =
            `<div class="email-item ` +
            emailNodeClassName +
            `"><span></span><button class="email-item-remove-button ` +
            removeButtonClassName +
            `">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038" />
              </svg>
           </button></div>`;

      return _emailItemTemplate;
   };

   const emailInputTemplate = function (emailInputClassName, emailInputPlaceHolder = "add more people…") {
      if (!_newEmailItemTemplate) {
         _newEmailItemTemplate =
            `<div class="email--item email--item-new ` +
            emailInputClassName +
            `"><input type="email" placeholder="` +
            emailInputPlaceHolder +
            `" value="" /></div>`;
      }

      return _newEmailItemTemplate;
   };

   const inputField = window.document.createElement("div");
   const emailNodeTemplateEl = window.document.createElement("template");
   const emailInputTemplateEl = window.document.createElement("template");

   emailNodeTemplateEl.innerHTML = emailNodeTemplate(emailItemClassName, removeButtonClassName);
   emailInputTemplateEl.innerHTML = emailInputTemplate(emailInputClassName, emailInputPlaceHolder);

   const onClick = function (e) {
      e.stopPropagation();

      const value = e.target.value;
      console.log(value, "onClick");
   };

   const onEnter = function (e) {
      e.stopPropagation();

      const value = e.target.value;
      console.log(value, "onEnter");
   };

   const onKeyPress = function (e) {
      e.stopPropagation();

      if (e.which === 188) {
         const value = e.target.value;

         addEmail(value);
         e.target.setValue("");
      }
   };

   const onFocusOut = function (e) {
      e.stopPropagation();

      const value = e.target.value;
      console.log(value, "onFocusOut");
   };

   const removeEmail = function (index) {};

   const addEmail = function (email) {
      const isInvalid = !emailRegexp.test(email);
      const emailNode = getEmailNode(email);

      if (isInvalid) {
         emailNode.querySelector(".email-item").className += ` invalid-email-item ${incorrectEmailClassName}`;
      }

      inputField.insertBefore(emailNode, inputField.querySelector(".email--item-new"));
   };

   const getEmailNode = function (email) {
      const newEmailNode = document.importNode(t.content, true);
      const id = (_counter += 1);

      newEmailNode.querySelector(".email-item-remove-button").addEventListener("onclick", () => removeEmail(id));
      newEmailNode.querySelector(".email-item span").textContent = email;

      return newEmailNode;
   };

   const getEmailCount = function () {
      return _counter;
   };

   const init = function (initEmails) {
      const emails = initEmails.split(",");
      const newEmailNode = document.importNode(emailInputTemplateEl.content, true);

      newEmailNode.addEventListener("onFocusOut", onFocusOut);
      newEmailNode.addEventListener("onKeyPress", onKeyPress);

      inputField.append(newEmailNode);
      parentNode.append(inputField);

      for (let i = 0; i < emails.length; i += 1) {
         const email = emails[i];

         addEmail(email);
      }
   };

   inputField.className = "emails-input " + className;
   inputField.addEventListener("click", onClick);
   inputField.addEventListener("enter", onEnter);
   inputField.addEventListener("paste", onEnter);
   inputField.addEventListener("keydown", onKeydown);
   inputField.addEventListener("focusout", onFocusOut);

   init(value);

   return {
      el: inputField,
      count: _counter,
      addEmail,
      getEmailCount
   };
};
