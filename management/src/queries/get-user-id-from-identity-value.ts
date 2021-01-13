import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

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

export type GetUserIDFromIdentityValueVariables = {
  value: string;
};

export async function getUserIDFromIdentityValue(
  managementCredentials: ManagementCredentials,
  variables: GetUserIDFromIdentityValueVariables,
): GetUserIdFromIdentityValue {
  const operation = {
    query: GET_USER_ID_FROM_IDENTITY_VALUE_QUERY,
    variables,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as GetUserIdFromIdentityValue;
}
