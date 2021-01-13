import type { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { ProviderUserPasswordSet } from "../@types/password";
import { fetchManagement } from "../fetch-management";

const IS_USER_PASSWORD_SET_QUERY = gql`
  query isUserPasswordSet($userId: String!) {
    provider {
      id
      name
      user(filters: { userId: $userId }) {
        id
        passwords {
          available
        }
      }
    }
  }
`;

export type IsUserPasswordSet = Promise<
  FetchResult<{ provider: ProviderUserPasswordSet }>
>;

export type IsUserPasswordSetVariables = {
  userId: string;
};

export async function isUserPasswordSet(
  managementCredentials: ManagementCredentials,
  variables: IsUserPasswordSetVariables,
): IsUserPasswordSet {
  const operation = {
    query: IS_USER_PASSWORD_SET_QUERY,
    variables,
  };

  return fetchManagement(managementCredentials, operation) as IsUserPasswordSet;
}
