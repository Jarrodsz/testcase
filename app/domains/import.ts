import { json } from "@remix-run/node";
import { client, e } from "~/db.server";

import type { Branch, Question } from "~/db.server";


export async function ImportExcel(filename: string) {
  const path = require("path");
  const xlsx = require("xlsx");

  console.log("ACTION IMPORT");
  console.log("ON FILE", filename);

  await e.delete(e.Branch, question => ({})).run(client);
  await e.delete(e.Question, question => ({})).run(client);
  await e.delete(e.Answer, question => ({})).run(client);


  // Get the workbook and sheet data
  const workbook = xlsx.readFile(filename);
  //const filename2 = workbook.Workbook.Sheets[0].name;
  //const LOCALE = filename2.substring(0, 2); // fix this
  const LOCALE = "en";
  const sheets = workbook.SheetNames;

  // Iterate over each sheet in the workbook
  try {
    for (let i = 0; i < sheets.length; i++) {
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]);
      console.log(`Processing sheet ${i} with ${sheetData.length} rows`);

      for (let j = 0; j < sheetData.length; j++) {
        console.log(`Processing row ${j} of sheet ${i}...`);
        const {
          QUESTION_ID,
          BRANCH_ID,
          BRANCH,
          QUESTION,
          ANSWER_ID,
          STATUS,
          SCORE,
          ANSWER
        } = sheetData[j];

        // set level from the workbook name
        let LEVEL = sheets[i];

        console.log("----------------------------------------");
        console.log("ROW DATA:");
        console.log(`LEVEL: ${LEVEL}`);
        console.log(`QUESTION_ID: ${QUESTION_ID}`);
        console.log(`BRANCH_ID: ${BRANCH_ID}`);
        console.log(`BRANCH: ${BRANCH}`);
        console.log(`QUESTION: ${QUESTION}`);
        console.log(`ANSWER_ID: ${ANSWER_ID}`);
        console.log(`STATUS: ${STATUS}`);
        console.log(`SCORE: ${SCORE}`);
        console.log(`ANSWER: ${ANSWER}`);
        console.log("----------------------------------------");

        console.log(`BRANCH_ID: ${BRANCH_ID}`);

        if (BRANCH_ID) {
          const branch = await e.select(e.Branch, branch => ({
            ...e.Branch["*"],
            filter_single: e.op(branch.title, "=", BRANCH)
          })).run(client);
          console.log("XXX", branch);
          if (branch === null) {
            console.log("not found");
            console.log("creating new branch");
            const branch = e.insert(e.Branch, {
              branch_id: parseInt(BRANCH_ID, 10),
              title: BRANCH
            }).run(client);
            console.log(`Created branch '${branch}'`);
          } else {
            console.log("branch found");
          }
        }

        if (QUESTION) {
          // question with an answer on the same row ( first answer )
          console.log("Creating question...");
          const question = await e.insert(e.Question, {
            question_id: parseInt(QUESTION_ID, 10),
            title: QUESTION,
            status: parseInt(STATUS, 10),
            locale: LOCALE,
            level: parseInt(LEVEL, 10),
            answers: e.insert(e.Answer, {
              title: ANSWER,
              answer_id: parseInt(ANSWER_ID, 10),
              score: parseInt(SCORE, 10),
              locale: "en"
            })
          }).run(client);

        } else {
          console.log("question not found");
          const lastQuestion = await e.select(e.Question, question => ({
            order_by: question.id,
            limit: 1
          })).run(client);

          console.log("last question question:", lastQuestion);

          // how to insert a answer in question.answers link
          // for the lastQuestion ?

        }
      }
    }
  } catch (error) {
    console.error(error);
  }

}
