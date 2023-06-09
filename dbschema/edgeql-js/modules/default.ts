// GENERATED by @edgedb/generate v0.0.8
// Run 'npx @edgedb/generate edgeql-js' to re-generate

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $AdminλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "password": $.LinkDesc<$AdminPassword, $.Cardinality.One, {}, false, false,  false, false>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "profile": $.LinkDesc<$AdminProfile, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Admin = $.ObjectType<"default::Admin", $AdminλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
  {email: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Admin = $.makeType<$Admin>(_.spec, "55c7a3de-c58d-11ed-906c-0be212ce5eea", _.syntax.literal);

const Admin: $.$expr_PathNode<$.TypeSet<$Admin, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Admin, $.Cardinality.Many), null);

export type $AdminPasswordλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "hash": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<password[is Admin]": $.LinkDesc<$Admin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<password": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $AdminPassword = $.ObjectType<"default::AdminPassword", $AdminPasswordλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $AdminPassword = $.makeType<$AdminPassword>(_.spec, "55c69c8c-c58d-11ed-b9f8-ed4fc87bb5aa", _.syntax.literal);

const AdminPassword: $.$expr_PathNode<$.TypeSet<$AdminPassword, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($AdminPassword, $.Cardinality.Many), null);

export type $AdminProfileλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "first_name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "last_name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, true, false, false>;
  "<profile[is Admin]": $.LinkDesc<$Admin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<profile": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $AdminProfile = $.ObjectType<"default::AdminProfile", $AdminProfileλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $AdminProfile = $.makeType<$AdminProfile>(_.spec, "55c942c0-c58d-11ed-9df0-a58285469a9e", _.syntax.literal);

const AdminProfile: $.$expr_PathNode<$.TypeSet<$AdminProfile, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($AdminProfile, $.Cardinality.Many), null);

export type $AnswerλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "answer_id": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "locale": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "score": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "question": $.LinkDesc<$Question, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "<answers[is Question]": $.LinkDesc<$Question, $.Cardinality.Many, {}, false, false,  false, false>;
  "<answers": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Answer = $.ObjectType<"default::Answer", $AnswerλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $Answer = $.makeType<$Answer>(_.spec, "55cc2936-c58d-11ed-bc82-dfae6ed50ba7", _.syntax.literal);

const Answer: $.$expr_PathNode<$.TypeSet<$Answer, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Answer, $.Cardinality.Many), null);

export type $BranchλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "branch_id": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
}>;
type $Branch = $.ObjectType<"default::Branch", $BranchλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $Branch = $.makeType<$Branch>(_.spec, "55d143b2-c58d-11ed-90cc-1b1811a3369c", _.syntax.literal);

const Branch: $.$expr_PathNode<$.TypeSet<$Branch, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Branch, $.Cardinality.Many), null);

export type $QuestionλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "answers": $.LinkDesc<$Answer, $.Cardinality.Many, {}, false, false,  false, false>;
  "level": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "locale": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "question_id": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "status": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "title2": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<question[is Answer]": $.LinkDesc<$Answer, $.Cardinality.Many, {}, false, false,  false, false>;
  "<question": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Question = $.ObjectType<"default::Question", $QuestionλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $Question = $.makeType<$Question>(_.spec, "55cd6486-c58d-11ed-bdd7-3d43821456a6", _.syntax.literal);

const Question: $.$expr_PathNode<$.TypeSet<$Question, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Question, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "password": $.LinkDesc<$UserPassword, $.Cardinality.One, {}, false, false,  false, false>;
  "created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "onboarded": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "updated_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "profile": $.LinkDesc<$UserProfile, $.Cardinality.One, {}, false, false,  false, false>;
  "<user[is Answer]": $.LinkDesc<$Answer, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
  {email: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $User = $.makeType<$User>(_.spec, "55cf115a-c58d-11ed-8ad0-bb7abfcec0e6", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $UserPasswordλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "hash": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<password[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<password": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $UserPassword = $.ObjectType<"default::UserPassword", $UserPasswordλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $UserPassword = $.makeType<$UserPassword>(_.spec, "55cb317a-c58d-11ed-a2f0-fbfb0b688171", _.syntax.literal);

const UserPassword: $.$expr_PathNode<$.TypeSet<$UserPassword, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($UserPassword, $.Cardinality.Many), null);

export type $UserProfileλShape = $.typeutil.flatten<_std.$Object_6180590ebee511eda417ff62456c3296λShape & {
  "first_name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "last_name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, true, false, false>;
  "<profile[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<profile": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $UserProfile = $.ObjectType<"default::UserProfile", $UserProfileλShape, null, [
  ..._std.$Object_6180590ebee511eda417ff62456c3296['__exclusives__'],
]>;
const $UserProfile = $.makeType<$UserProfile>(_.spec, "55d24c30-c58d-11ed-ae18-b73e016f7134", _.syntax.literal);

const UserProfile: $.$expr_PathNode<$.TypeSet<$UserProfile, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($UserProfile, $.Cardinality.Many), null);



export { $Admin, Admin, $AdminPassword, AdminPassword, $AdminProfile, AdminProfile, $Answer, Answer, $Branch, Branch, $Question, Question, $User, User, $UserPassword, UserPassword, $UserProfile, UserProfile };

type __defaultExports = {
  "Admin": typeof Admin;
  "AdminPassword": typeof AdminPassword;
  "AdminProfile": typeof AdminProfile;
  "Answer": typeof Answer;
  "Branch": typeof Branch;
  "Question": typeof Question;
  "User": typeof User;
  "UserPassword": typeof UserPassword;
  "UserProfile": typeof UserProfile
};
const __defaultExports: __defaultExports = {
  "Admin": Admin,
  "AdminPassword": AdminPassword,
  "AdminProfile": AdminProfile,
  "Answer": Answer,
  "Branch": Branch,
  "Question": Question,
  "User": User,
  "UserPassword": UserPassword,
  "UserProfile": UserProfile
};
export default __defaultExports;
