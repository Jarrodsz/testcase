import type { Question, User } from "app/db.server";
import { client, e } from "app/db.server";
import { z } from "zod";

import { makeDomainFunction } from "domain-functions";

export const questionFormSchema = z.object({
  title: z.string().min(1, "title is required."),
  body: z.string().min(1, "body is required."),
});

export const updateQuestionFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  questionbody: z.string().min(1, "Body is required."),
});

export const getQuestions2 = makeDomainFunction(z.any())(async () => ({
  //todo
}));

export function getQuestionListItems({ userId }: { userId: User["id"] }) {
  return e
    .select(e.Question, (question) => ({
      id: true,
      title: true,
      filter: e.op(question.user.id, "=", e.uuid(userId)),
      order_by: { expression: question.created_at, direction: e.DESC },
    }))
    .run(client);
}

export const getQuestion2 = makeDomainFunction(z.object({ id: z.string() }))(
  async ({ id }) => ({
    //todo
  })
);

export function getQuestion({
  id,
  userId,
}: {
  id: Question["id"];
  userId: User["id"];
}) {
  return e
    .select(e.Question, (question) => ({
      ...e.Question["*"],
      filter: e.op(
        e.op(question.user.id, "=", e.uuid(userId)),
        "and",
        e.op(question.id, "=", e.uuid(id))
      ),
    }))
    .assert_single()
    .run(client);
}

const userIdSchema = z.string().nonempty();

// const createQuestion2 = makeDomainFunction(
//   newQuestionFormSchema,
//   userIdSchema
// )((fields, jokesterId) => db.joke.create({ data: { ...fields, jokesterId } }));

// export const createQuestion = makeDomainFunction(
//   userIdSchema
//   newQuestionFormSchema,
// )(async ({ fields, userId }) => {
//   console.log("userId", userId);
//   console.log("title", fields.title);
//   console.log("body", fields.body);
//   const question = await e
//     .insert(e.Question, {
//       title,
//       body,
//       user: e.select(e.User, (user) => ({
//         filter_single: e.op(user.id, "=", e.uuid(userId)),
//       })),
//     })
//     .run(client);
//   console.log("question", question);
//   return question;
// });
// //

// // example
// const createJoke = makeDomainFunction(
//   newQuestionFormSchema,
//   userIdSchema
// )((fields, jokesterId) => db.joke.create({ data: { ...fields, jokesterId } }));

export const createQuestion = makeDomainFunction(
  questionFormSchema,
  userIdSchema
)(async (fields, userId) => {
  const question = await e
    .insert(e.Question, {
      ...fields,
      user: e.select(e.User, (user) => ({
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      })),
    })
    .run(client);
  console.log("question", question);
  return question;
});

export const updateQuestion = makeDomainFunction(
  questionFormSchema,
  userIdSchema
)(async (fields, userId) => {
  const question = await e
    .insert(e.Question, {
      ...fields,
      user: e.select(e.User, (user) => ({
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      })),
    })
    .run(client);
  console.log("question", question);
  return question;
});

export function deleteQuestion({
  id,
  userId,
}: {
  id: Question["id"];
  userId: User["id"];
}) {
  return e
    .delete(e.Question, (question) => ({
      filter: e.op(
        e.op(question.user.id, "=", e.uuid(userId)),
        "and",
        e.op(question.id, "=", e.uuid(id))
      ),
    }))
    .run(client);
}
