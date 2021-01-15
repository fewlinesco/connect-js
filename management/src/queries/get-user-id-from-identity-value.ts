import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import type { ProviderUserId } from "../@types/provider-user";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const GET_USER_ID_FROM_IDENTITY_VALUE_QUERY = gql`
  query getUser($identities: IdentityInput!) {
    provider {
      id
      user(filters: { identities: $identities }) {
        id
      }
    }
  }
`;

export async function getUserIDFromIdentityValue(
  managementCredentials: ManagementCredentials,
  identityValue: string,
): Promise<ProviderUserId> {
  const operation = {
    query: GET_USER_ID_FROM_IDENTITY_VALUE_QUERY,
    variables: { value: identityValue },
  };

  const { data, errors } = await fetchManagement<{ provider: ProviderUserId }>(
    managementCredentials,
    operation,
  );

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
