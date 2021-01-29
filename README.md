# BoardNames

Simple web application writen with ReactJS and VanillaJS. Application present single view to show list of email address in it.


## Functionality

Button "Add email" add random email to email list
Button "Get Emails Count" alert notification with number of emails in list. (Invalid emails included)

Email list works as input component. You can type in as in regular input field. After "comma" or "enter" key pressed all entered text
before will transform to email blocks. If multiple separate with comma emails pasted, they all will be converted to email blocks.
"asd@mail.com,more@gmail.com"

## Features

Every email address checked with validation function. Invalid format emails will be rendered with red underline. 

EmailsInput store entered emails. If entered email address already exist email list notification alert will pop up with message.
Entered value will be cleared. 

## Design features
Component using EmailInput function to create email list. There is list of style properties
that can be passed as arguments to change style/layout of EmailInput view.

- _className_                  Custom style name of EmailInput root view
- _validEmailItemClassName_    Custom style name of valid email item view
- _invalidEmailItemClassName_  Custom style for invalid email item view
- _removeButtonClassName_      Custom style name of email item remove button view
- _inputClassName_             Custom style name of email item remove button view

## Functional features
Component EmailsInput exist inside of container that should be passed using "parentNode" property name. 
No EmailsInput will be rendered if container is not provided.
List of functional properties:

- _parentNode_          EmailInput container element
- _inputPlaceHolder_    Input field placeHolder Custom style name of email item remove button view
- _onChange_            Event handler to catch Emails list updates
- _value_               Initial value of Emails list. Should contain email addresses divided by comma (email@one.com,email@two.com...)

### To work with emails list data you can use one of returned properties from EmailsInput:
- _addEmail_      add new Emails in a list,
- _getEmails_     return emails string array
- _getEmailCount_ return emails count number
- _el_            return EmailInput element reference

Production version hosted on https://github.com/HrudakovSerhii/hrudakovserhii.github.io
