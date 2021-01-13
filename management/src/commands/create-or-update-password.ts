import type { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { User } from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const CREATE_OR_UPDATE_PASSWORD_MUTATION = gql`
  mutation createOrUpdatePassword($cleartextPassword: String!, $userId: ID!) {
    createOrUpdatePassword(
      input: { cleartextPassword: $cleartextPassword, userId: $userId }
    ) {
      id
    }
  }
`;

export type CreateOrUpdatePassword = Promise<
  FetchResult<{
    createOrUpdatePassword: User;
  }>
>;

export type CreateOrUpdatePasswordVariables = {
  cleartextPassword: string;
  userId: string;
};

export async function createOrUpdatePassword(
  managementCredentials: ManagementCredentials,
  variables: CreateOrUpdatePasswordVariables,
): CreateOrUpdatePassword {
  const operation = {
    query: CREATE_OR_UPDATE_PASSWORD_MUTATION,
    variables,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as CreateOrUpdatePassword;
}
