import * as schema from "@db/schema";

export const resourcesConfig = [
  {
    path: "users",
    model: schema.users,
  },
  {
    path: "roles",
    model: schema.roles,
  },
  {
    path: "vehicles",
    model: schema.vehicles,
  },
  {
    path: "fleet-request",
    model: schema.fleetRequest,
  },
  {
    path: "maintenance-request",
    model: schema.maintenanceRequest,
  },
  {
    path: "fuel-request",
    model: schema.fuelRequest,
  },
] as const;

type Paths = typeof resourcesConfig[number]['path']
export const getSource = (path:Paths) => {
    return resourcesConfig.find((d)=>d.path === path) as typeof resourcesConfig[number]
}