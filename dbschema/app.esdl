module default {

    type Branch {
        required property branch_id -> int64;
        required property title -> str;
    }

    type Question {

      required property question_id -> int64;
      required property title -> str;

      required property status -> int64;
      required property locale -> str;
      required property level -> int64;

      multi link answers -> Answer;
    }

    type Answer {
      required property answer_id -> int64;
      required property title -> str;
      required property score -> int64;
      required property locale -> str;

      link user -> User;
      link question -> Question;
    }

}
