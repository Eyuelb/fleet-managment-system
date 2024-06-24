import {
  timestamp,
  pgTable,
  text,
  uuid,
  date,
  integer,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
const common = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt", {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
};
export const statusEnum = pgEnum("status", [
  "Requested",
  "Approved",
  "Rejected",
]);

export const users = pgTable("users", {
  ...common,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  password: text("password"),
  image: text("image"),
  roleId: uuid("roleId")
    .notNull()
    .references(() => roles.id),
});
export const roles = pgTable("roles", {
  ...common,
  name: text("name").notNull(),
  description: text("description"),
});

export const vehicles = pgTable("vehicles", {
  ...common,
  name: text("name").notNull(),
  type: text("type"),
  make: text("make"),
  model: text("model"),
  year: integer("year"),
  licensePlate: text("licensePlate"),
  status: text("status"),
});

export const routes = pgTable(
  "routes",
  {
    ...common,
    startLocation: text("startLocation"),
    endLocation: text("endLocation"),
    distance: numeric("distance"),
  },
  (routes) => ({
    name: text("name").default(
      `${routes.startLocation} - ${routes.endLocation}`
    ),
  })
);

export const maintenance = pgTable("maintenance", {
  ...common,
  vehicleId: uuid("vehicleId").references(() => vehicles.id),
  requestedByUserId: uuid("requestedByUserId").references(() => users.id),
  description: text("description"),
  status: statusEnum("status"),
});

export const fleet = pgTable("fleet", {
  ...common,
  vehicleId: uuid("vehicleId").references(() => vehicles.id),
  driverId: uuid("driverId").references(() => users.id),
  routeId: uuid("routeId").references(() => routes.id),
  approvedBy: uuid("approvedBy").references(() => users.id),
  status: statusEnum("status"),
});
