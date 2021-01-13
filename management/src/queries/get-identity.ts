import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { SingleIdentityProviderUser } from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const GET_USER_IDENTITY_QUERY = gql`
  query getUserIdentityQuery($userId: String!, $id: String!) {
    provider {
      id
      name
      user(filters: { userId: $userId }) {
        id
        identity(filters: { id: $id }) {
          id
          primary
          status
          type
          value
        }
      }
    }
  }
`;

export type GetIdentity = Promise<
  FetchResult<{ provider: SingleIdentityProviderUser }>
>;

export type GetIdentityVariables = {
  userId: string;
  id: string;
};

export async function getIdentity(
  managementCredentials: ManagementCredentials,
  variables: GetIdentityVariables,
): GetIdentity {
  const operation = {
    query: GET_USER_IDENTITY_QUERY,
    variables,
  };

  return fetchManagement(managementCredentials, operation) as GetIdentity;
}
