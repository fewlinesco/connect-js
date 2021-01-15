import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { ProviderUser } from "../@types/provider-user";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const GET_USER_IDENTITIES_QUERY = gql`
  query getUserIdentitiesQuery($userId: String!) {
    provider {
      id
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

export async function getIdentities(
  managementCredentials: ManagementCredentials,
  userId: string,
): Promise<ProviderUser> {
  const operation = {
    query: GET_USER_IDENTITIES_QUERY,
    variables: { userId },
  };

  const { data, errors } = await fetchManagement<{ provider: ProviderUser }>(
    managementCredentials,
    operation,
  );

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
