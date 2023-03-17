/* eslint-disable prettier/prettier */
//@ts-ignore-all

import bcrypt from "bcryptjs";
import { client, e } from "app/db.server";

// METHODS
// todo

// START SEEDS
async function seed() {

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    client.close();
  });
