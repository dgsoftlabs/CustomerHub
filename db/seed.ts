import { db } from "./index";
import { customers } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Seeding database...");

  const newCustomers: (typeof customers.$inferInsert)[] = [];

  for (let i = 0; i < 1000; i++) {
    newCustomers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
    });
  }

  console.log("Inserting 1000 customers...");
  
  // Insert in batches to avoid SQLite limits if necessary, though 1000 might fit.
  // Better to be safe and do chunks of 100.
  const chunkSize = 100;
  for (let i = 0; i < newCustomers.length; i += chunkSize) {
    const chunk = newCustomers.slice(i, i + chunkSize);
    await db.insert(customers).values(chunk);
    console.log(`Inserted chunk ${i / chunkSize + 1}`);
  }

  console.log("Seeding complete!");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
