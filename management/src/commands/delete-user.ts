import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import type {
  DeleteUserInput,
  DeleteUserStatus,
} from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(input: { userId: $userId }) {
      status
    }
  }
`;

export async function deleteUser(
  managementCredentials: ManagementCredentials,
  command: DeleteUserInput,
): Promise<FetchResult> {
  const operation = {
    query: DELETE_USER_MUTATION,
    variables: command,
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    deleteUser: DeleteUserStatus;
  }>;
}
