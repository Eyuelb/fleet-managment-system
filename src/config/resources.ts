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
    path: "groups",
    model: schema.groups,
  },
  {
    path: "vehicles",
    model: schema.vehicles,
  },
  {
    path: "routes",
    model: schema.routes,
  },
  {
    path: "fleet",
    model: schema.fleet,
  },
  {
    path: "services",
    model: schema.serviceRequest,
  },
] as const;
