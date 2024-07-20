import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from ".";
import { generateSeedRows } from "@utils/helper";

const salt = genSaltSync(10);
const password = hashSync("123456", salt);
const userDefaults = {
  id: "e9e7ea95-e27e-4005-a440-1519a85adf43",
  name: "Eyuel Belete",
  email: "eyuelbelete98@gmail.com",
  password,
  roleId: "1a3988f8-46ec-4982-b1e6-7835133ff669", // Replace with actual roleId from your roles table
  refresh_token: faker.random.alphaNumeric(32),
  access_token: faker.random.alphaNumeric(32),
  image: faker.image.avatar(),
};
const roleDefaults = [
  {
    id: "1a3988f8-46ec-4982-b1e6-7835133ff669",
    name: "SuperAdmin",
    description: "SuperAdmin",
  },
  {
    id: "56a11624-a474-4984-8bdc-e4a62259a162",
    name: "User",
    description: "User",
  },
  {
    id: "ec0d77af-30f9-4b87-9d02-ceaeef20f259",
    name: "Driver",
    description: "Driver",
  },
];
const groupDefaults = [
  {
    name: "Office Management",
    description: "Handles office administration and operations.",
  },
  {
    name: "IT Department",
    description: "Manages all IT-related tasks and support.",
  },
  {
    name: "HR Team",
    description: "Responsible for human resources management and support.",
  },
];
const unitTypeDefaults = [
  {
    name: "Meeting Room",
    description: "A designated room for conducting meetings.",
  },
  {
    name: "Workstation",
    description: "Individual workspaces equipped with necessary tools.",
  },
  {
    name: "Server Room",
    description:
      "A secure area housing computer servers and networking equipment.",
  },
];

export const runUsersSeeding = async () => {
  console.log("Seeding users...");
  console.time("Users have been seeded!");
  try {
    const { table, rows } = await generateSeedRows("users", 50, () => ({
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        provider: "gmail.com",
      }),
      password, // Ensure this is hashed properly if required by your application
      role: faker.helpers.arrayElement(roleDefaults.map((row) => row.id)), // Replace with actual roleId from your roles table
      image: faker.image.avatar(),
    }));

    rows.push(userDefaults);
    await db.delete(table);
    await db.insert(table).values(rows).returning({
      id: table.id,
    });

    console.log("Users seeding complete");
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  } finally {
    console.timeEnd("Users have been seeded!");
  }
};
export const runRolesSeeding = async () => {
  console.log("Seeding roles...");
  console.time("Roles have been seeded!");

  try {
    const { table, rows } = await generateSeedRows("roles", 0, () => ({
      name: faker.random.word(),
      description: faker.lorem.sentence(),
    }));

    await db.delete(table);
    await db.insert(table).values(roleDefaults).returning({
      id: table.id,
    });

    console.log("Roles seeding complete");
  } catch (error) {
    console.error("Error seeding roles:", error);
    process.exit(1);
  } finally {
    console.timeEnd("Roles have been seeded!");
  }
};
// export const runGroupsSeeding = async () => {
//   console.log("Seeding groups...");
//   console.time("Groups have been seeded!");

//   try {
//     const { table, rows } = await generateSeedRows(
//       "groups",
//       groupDefaults.length,
//       () => ({
//         name: "",
//       })
//     );

//     await db.delete(table);
//     await db.insert(table).values(groupDefaults).returning({
//       id: table.id,
//     });

//     console.log("Groups seeding complete");
//   } catch (error) {
//     console.error("Error seeding groups:", error);
//     process.exit(1);
//   } finally {
//     console.timeEnd("Groups have been seeded!");
//   }
// };
// export const runUnitTypesSeeding = async () => {
//   console.log("Seeding unit types...");
//   console.time("Unit types have been seeded!");

//   try {
//     const { table, rows } = await generateSeedRows(
//       "units",
//       unitTypeDefaults.length,
//       () => ({
//         name: "",
//       })
//     );

//     await db.delete(table);
//     await db.insert(table).values(unitTypeDefaults).returning({
//       id: table.id,
//     });

//     console.log("Unit types seeding complete");
//   } catch (error) {
//     console.error("Error seeding unit types:", error);
//     process.exit(1);
//   } finally {
//     console.timeEnd("Unit types have been seeded!");
//   }
// };
export const runVehiclesSeeding = async () => {
  console.log("Seeding vehicles...");
  console.time("Vehicles have been seeded!");

  try {
    const { table, rows } = await generateSeedRows("vehicles", 20, () => ({
      name: faker.vehicle.vehicle(),
      type: faker.vehicle.type(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: Number(faker.datatype.number({ min: 1990, max: 2023 })),
      licensePlate: faker.vehicle.vrm(),
      status: faker.helpers.arrayElement(["Active", "Inactive"]),
      driver:`${faker.person.firstName()} ${faker.person.lastName()}`
    }));

    await db.delete(table);
    await db.insert(table).values(rows).returning({
      id: table.id,
    });

    console.log("Vehicles seeding complete");
  } catch (error) {
    console.error("Error seeding vehicles:", error);
    process.exit(1);
  } finally {
    console.timeEnd("Vehicles have been seeded!");
  }
};

(async () => {
 // await runUsersSeeding();
 // await runRolesSeeding();
  // await runGroupsSeeding();
  // await runUnitTypesSeeding();
  await runVehiclesSeeding();
  process.exit(0);
})();
