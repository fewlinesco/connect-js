import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { Identity, IdentityCommandVariables } from "../@types/identity";
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

export type RemoveIdentityFromUser = Promise<
  FetchResult<{ removeIdentityFromUser: { id: string } & Identity[] }>
>;

export async function removeIdentityFromUser(
  managementCredentials: ManagementCredentials,
  variables: IdentityCommandVariables,
): RemoveIdentityFromUser {
  const operation = {
    query: REMOVE_IDENTITY_FROM_USER,
    variables,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as RemoveIdentityFromUser;
}
