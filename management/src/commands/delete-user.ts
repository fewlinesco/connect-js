import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(input: { userId: $userId }) {
      status
    }
  }
`;

export type DeleteUserStatus = {
  status: string;
};

export type DeleteUser = Promise<
  FetchResult<{
    deleteUser: DeleteUserStatus;
  }>
>;

export type DeleteUserVariables = {
  userId: string;
};

export async function deleteUser(
  managementCredentials: ManagementCredentials,
  variables: DeleteUserVariables,
): DeleteUser {
  const operation = {
    query: DELETE_USER_MUTATION,
    variables,
  };

  return fetchManagement(managementCredentials, operation) as DeleteUser;
}
