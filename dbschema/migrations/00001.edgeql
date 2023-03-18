CREATE MIGRATION m1uvkajpxhnfoibpki3m3yyf2ke2axjehrtphzp5qaj5ejf2q4a6uq
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::AdminPassword {
      CREATE REQUIRED PROPERTY hash: std::str;
  };
  CREATE TYPE default::Admin {
      CREATE REQUIRED LINK password: default::AdminPassword;
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::AdminProfile {
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY name := ((((.first_name ++ ' ') ++ .last_name) IF EXISTS (.last_name) ELSE .first_name));
  };
  ALTER TYPE default::Admin {
      CREATE REQUIRED LINK profile: default::AdminProfile;
  };
  CREATE TYPE default::UserPassword {
      CREATE REQUIRED PROPERTY hash: std::str;
  };
  CREATE TYPE default::Answer {
      CREATE REQUIRED PROPERTY answer_id: std::int64;
      CREATE REQUIRED PROPERTY locale: std::str;
      CREATE REQUIRED PROPERTY score: std::int64;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Question {
      CREATE MULTI LINK answers: default::Answer;
      CREATE REQUIRED PROPERTY level: std::int64;
      CREATE REQUIRED PROPERTY locale: std::str;
      CREATE REQUIRED PROPERTY question_id: std::int64;
      CREATE REQUIRED PROPERTY status: std::int64;
      CREATE REQUIRED PROPERTY title2: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::Answer {
      CREATE LINK question: default::Question;
  };
  CREATE TYPE default::User {
      CREATE REQUIRED LINK password: default::UserPassword;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY onboarded: std::bool;
      CREATE PROPERTY updated_at: std::datetime;
  };
  ALTER TYPE default::Answer {
      CREATE LINK user: default::User;
  };
  CREATE TYPE default::Branch {
      CREATE REQUIRED PROPERTY branch_id: std::int64;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::UserProfile {
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY name := ((((.first_name ++ ' ') ++ .last_name) IF EXISTS (.last_name) ELSE .first_name));
  };
  ALTER TYPE default::User {
      CREATE REQUIRED LINK profile: default::UserProfile;
  };
};
