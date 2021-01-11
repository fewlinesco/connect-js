import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { IdentityCommandProps } from "../@types/identity";
import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

const REMOVE_IDENTITY_FROM_USER = gql`
  mutation removeIdentityFromUser(
    $userId: String!
    $type: IdentityTypes!
    $value: String!
  ) {
    removeIdentityFromUser(
      input: { userId: $userId, type: $type, value: $value }
    ) {
      id
      identities {
        id
        primary
        value
        type
        status
      }
    }
  }
`;

export async function removeIdentityFromUser(
  managementCredentials: ManagementCredentials,

  { userId, type, value }: IdentityCommandProps,
): Promise<FetchResult> {
  const operation = {
    query: REMOVE_IDENTITY_FROM_USER,
    variables: { userId, type, value },
  };

  return fetchManagement(managementCredentials, operation);
}
