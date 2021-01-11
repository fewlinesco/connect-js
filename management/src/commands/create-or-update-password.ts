import type { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { CreateOrUpdatePasswordInput, User } from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

export type CreateOrUpdatePassword = Promise<
  FetchResult<{
    createOrUpdatePassword: User;
  }>
>;

const CREATE_OR_UPDATE_PASSWORD_MUTATION = gql`
  mutation createOrUpdatePassword($cleartextPassword: String!, $userId: ID!) {
    createOrUpdatePassword(
      input: { cleartextPassword: $cleartextPassword, userId: $userId }
    ) {
      id
    }
  }
`;

export async function createOrUpdatePassword(
  managementCredentials: ManagementCredentials,
  command: CreateOrUpdatePasswordInput,
): CreateOrUpdatePassword {
  const operation = {
    query: CREATE_OR_UPDATE_PASSWORD_MUTATION,
    variables: command,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as CreateOrUpdatePassword;
}
