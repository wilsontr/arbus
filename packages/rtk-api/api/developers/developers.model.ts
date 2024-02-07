import { Developer } from "../../types";

interface BaseDeveloperResponse {
  success: boolean;
}

export interface AddDeveloperResponse extends BaseDeveloperResponse {}

export interface GetDevelopersApiResponse extends BaseDeveloperResponse {
  developers: Developer[];
}

export interface DeleteDeveloperResponse extends BaseDeveloperResponse {}

export interface UpdateDeveloperResponse extends BaseDeveloperResponse {}