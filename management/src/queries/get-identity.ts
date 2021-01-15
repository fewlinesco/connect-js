import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { SingleIdentityProviderUser } from "../@types/provider-user";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const GET_USER_IDENTITY_QUERY = gql`
  query getUserIdentityQuery($userId: String!, $id: String!) {
    provider {
      id
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

export type GetIdentityInput = {
  userId: string;
  identityId: string;
};

export async function getIdentity(
  managementCredentials: ManagementCredentials,
  { userId, identityId }: GetIdentityInput,
): Promise<SingleIdentityProviderUser> {
  const operation = {
    query: GET_USER_IDENTITY_QUERY,
    variables: { userId, id: identityId },
  };

  const { data, errors } = await fetchManagement<{
    provider: SingleIdentityProviderUser;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
