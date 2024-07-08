import { resourcesConfig } from "../config/resources";

type ResourcesType = typeof resourcesConfig;

export type ApiResources = ResourcesType[number]["path"];