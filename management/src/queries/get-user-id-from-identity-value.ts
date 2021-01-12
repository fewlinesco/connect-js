import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import type { IdentityValueInput } from "../@types/Identity";
import { ManagementCredentials } from "../@types/management";
import type { ProviderUserId } from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const GET_USER_ID_FROM_IDENTITY_VALUE_QUERY = gql`
  query getUser($identities: IdentityInput!) {
    provider {
      user(filters: { identities: $identities }) {
        id
      }
    }
  }
`;

export type GetUserIdFromIdentityValue = Promise<
  FetchResult<{ provider: ProviderUserId }>
>;

export async function getUserIDFromIdentityValue(
  managementCredentials: ManagementCredentials,
  identities: IdentityValueInput,
): GetUserIdFromIdentityValue {
  const operation = {
    query: GET_USER_ID_FROM_IDENTITY_VALUE_QUERY,
    variables: { identities },
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as GetUserIdFromIdentityValue;
}
