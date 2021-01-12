import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { IdentityCommandProps } from "../@types/identity";
import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

const ADD_IDENTITY_TO_USER = gql`
  mutation addIdentityToUser(
    $userId: String!
    $type: IdentityTypes!
    $value: String!
  ) {
    addIdentityToUser(
      input: { userId: $userId, type: $type, value: $value, validated: true }
    ) {
      id
      primary
      status
      type
      value
    }
  }
`;

// Fix typing
export async function addIdentityToUser(
  managementCredentials: ManagementCredentials,
  { userId, type, value }: IdentityCommandProps,
): Promise<FetchResult> {
  const operation = {
    query: ADD_IDENTITY_TO_USER,
    variables: { userId, type, value },
  };

  return fetchManagement(managementCredentials, operation);
}
