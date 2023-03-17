module default {

  type Admin {
      required property email -> str { constraint exclusive };
      
      required link password -> AdminPassword;
      required link profile -> AdminProfile;
  }

  type AdminProfile {
      property first_name -> str;
      property last_name -> str;
      property name := .first_name ++ ' ' ++ .last_name
      IF EXISTS .last_name
      ELSE .first_name;
  }

  type AdminPassword {
      required property hash -> str;
  }

}