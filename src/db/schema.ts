import { sql } from "drizzle-orm";
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
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
};
export const tripStatus = pgEnum("trip_status", [
  "Completed",
  "OnGoing",
  "Cancelled",
  "YetToStart",
]);
export const requestStatus = pgEnum("request_status", [
  "Submitted",
  "Approved",
  "Rejected",
]);
export const visibilityStatus = pgEnum("visibility_status", [
  "Active",
  "Inactive",
]);
export const users = pgTable("users", {
  ...common,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  password: text("password"),
  image: text("image"),
  role: text("role"),
});
export const roles = pgTable("roles", {
  ...common,
  name: text("name").notNull(),
  description: text("description"),
});

export const vehicles = pgTable("vehicles", {
  ...common,
  name: text("name").notNull(),
  fuelType: text("type"),
  make: text("make"),
  model: text("model"),
  year: integer("year"),
  licensePlate: text("license_plate"),
  vehicleIdentificationNumber: text("vehicle_identification_number"),
  seatCapacity: text("seat_capacity"),
  driver: text("driver"),
  location: text("location"),
  lat: text("lat"),
  lng: text("lng"),
  status: visibilityStatus("status"),
});

export const fuelRequest = pgTable("fuel_request", {
  ...common,
  driver: text("driver").notNull(),
  vehicle: text("vehicle").notNull(),
  fuelType: text("fuel_type").notNull(),
  fuelingDateTime: timestamp("fueling_date_time", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  }).notNull(),
  gallonsLitersOfFuel: numeric("gallons_liters_of_fuel").notNull(),
  costPerGallonLiter: numeric("cost_per_gallon_liter").notNull(),
  totalCost: numeric("total_cost").notNull(),
  requestedFor: text("requested_for"),
  requestedBy: text("requested_by"),
  approvedBy: text("approved_by"),
  note: text("note"),
  status: requestStatus("status"),
});
export const maintenanceRequest = pgTable("maintenance_request", {
  ...common,
  driver: text("driver").notNull(),
  vehicle: text("vehicle").notNull(),
  maintenanceType: text("maintenance_type").notNull(),
  maintenanceServiceProviderName: text(
    "maintenance_service_provider_name"
  ).notNull(),
  maintenanceDateTime: timestamp("maintenance_date_time", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  }).notNull(),
  cost: numeric("cost").notNull(),
  chargeBearBy: text("charge_bear_by"),
  requestedFor: text("requested_for"),
  requestedBy: text("requested_by"),
  approvedBy: text("approved_by"),
  note: text("note"),
  status: requestStatus("status"),
});

export const fleetRequest = pgTable("fleet_request", {
  ...common, // User or group responsible
  driver: text("driver").notNull(),
  vehicle: text("vehicle").notNull(),
  workGroup: text("work_group"),
  startLocation: text("start_location"),
  endLocation: text("end_location"),
  startX: text("startX"),
  startY: text("startY"),
  endX: text("endX"),
  endY: text("endY"),
  distance: text("distance"),
  requestedFor: text("requested_for"),
  requestedBy: text("requested_by"),
  approvedBy: text("approved_by"),
  note: text("note"),
  tripStatus: tripStatus("trip_status"),
  status: requestStatus("status"),
});
