definition of done

EMAIL MICROSERVICE*

sign up:
  - (x) user can create account with his name, email, password, birthdate and phone number
  - user receives an confirmation email*
  - user receives an welcome email*
  - user gets redirected to the login page after creating his account

sign in:
  - (x) user can login using only email and password
  - user can login with his google account
  - user can login with his github account
  - 'forgot your password?' feature
    - send email* to verify integrity
    - update password

profile:
  - (x) user can update his phone number
  - (x) user can update his birthdate
  - (x) user can update his name
  - (x) user can delete his account
    - todo: add confirmation (email)

validation:
  - (x) validate phone number
    - (x) length
  - (x) validate birthdate (18yo or older)
  - (x) validate password (length)