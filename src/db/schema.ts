import {
  timestamp,
  pgTable,
  text,
  uuid,
  date,
  integer,
  numeric,
  pgEnum,
  json,
  doublePrecision,
} from "drizzle-orm/pg-core";
const common = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
};
export const statusEnum = pgEnum("statusEnum", ["Submitted", "Approved", "Rejected"]);
export const requestEnum = pgEnum("requestEnum", ["Fuel", "Maintenance","Fleet"]);

export const users = pgTable("users", {
  ...common,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  password: text("password"),
  image: text("image"),
  roleId: uuid("roleId"),
});
export const roles = pgTable("roles", {
  ...common,
  name: text("name").notNull(),
  description: text("description"),
});
export const groups = pgTable("groups", {
  ...common,
  name: text("name").notNull(),
  description: text("description"),
});
export const units = pgTable("units", {
  ...common,
  name: text("name").notNull(),
  description: text("description"),
});
export const userGroup = pgTable("userGroup", {
  ...common,
  userId: uuid("userId").notNull(),
  groupId: uuid("groupId").notNull(),
});

export const userUnit = pgTable("userUnit", {
  ...common,
  userId: uuid("userId").notNull(),
  unitId: uuid("unitId").notNull(),
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

export const routes = pgTable("routes", {
  ...common,
  name: text("routeName").notNull().unique(),
  startLocation: text("startLocation"),
  endLocation: text("endLocation"),
  startX: text("startX"),
  startY: text("startY"),
  endX: text("endX"),
  endY: text("endY"),
  distance: text("distance"),
  meta: json("meta"),
});

export const serviceRequest = pgTable("serviceRequest", {
  ...common,
  userId: uuid("userId").notNull(),
  request: requestEnum("requestEnum"),
  userGroupId: uuid("userGroupId"),
  userUnitId: uuid("userUnitId"),
});

export const fleet = pgTable("fleet", {
  ...common,
  vehicleId: uuid("vehicleId"),
  driverId: uuid("driverId"),
  routeId: uuid("routeId"),
  approvedBy: uuid("approvedBy"),
  status: statusEnum("statusEnum"),
});
