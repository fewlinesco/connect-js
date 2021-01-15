import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { GraphqlErrors } from "../errors";
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

export async function deleteUser(
  managementCredentials: ManagementCredentials,
  userId: string,
): Promise<DeleteUserStatus> {
  const operation = {
    query: DELETE_USER_MUTATION,
    variables: { userId },
  };

  const { data, errors } = await fetchManagement<{
    deleteUser: DeleteUserStatus;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.deleteUser;
}
