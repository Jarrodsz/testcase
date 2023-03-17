module default {

  type User {

      required property created_at -> datetime { default := datetime_current(); };
      property updated_at -> datetime;

      required property email -> str { constraint exclusive; }
      property onboarded -> bool;

      # CORE LINKS
      required link password -> UserPassword;
      required link profile -> UserProfile;

      # APP LINKS
      #multi link notes := .<user[is Note];
      #multi link answers_on_date -> Answer {
      #    property date -> datetime;
      #};

  }

  type UserPassword {
      required property hash -> str;
  }


  type UserProfile {
      property first_name -> str;
      property last_name -> str;
      property name := .first_name ++ ' ' ++ .last_name
      IF EXISTS .last_name
      ELSE .first_name;
  }

}
