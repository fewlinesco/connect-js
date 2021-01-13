import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { ProviderUser } from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const GET_USER_IDENTITIES_QUERY = gql`
  query getUserIdentitiesQuery($userId: String!) {
    provider {
      id
      name
      user(filters: { userId: $userId }) {
        id
        identities {
          id
          type
          value
          primary
          status
        }
      }
    }
  }
`;

export type GetIdentities = Promise<FetchResult<{ provider: ProviderUser }>>;

export type GetIdentitiesVariables = {
  userId: string;
};

export async function getIdentities(
  managementCredentials: ManagementCredentials,
  variables: GetIdentitiesVariables,
): GetIdentities {
  const operation = {
    query: GET_USER_IDENTITIES_QUERY,
    variables,
  };

  return fetchManagement(managementCredentials, operation) as GetIdentities;
}
