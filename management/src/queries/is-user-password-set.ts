import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { ProviderUserPasswordSet } from "../@types/password";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const IS_USER_PASSWORD_SET_QUERY = gql`
  query isUserPasswordSet($userId: String!) {
    provider {
      id
      user(filters: { userId: $userId }) {
        id
        passwords {
          available
        }
      }
    }
  }
`;

export async function isUserPasswordSet(
  managementCredentials: ManagementCredentials,
  userId: string,
): Promise<ProviderUserPasswordSet> {
  const operation = {
    query: IS_USER_PASSWORD_SET_QUERY,
    variables: { userId },
  };

  const { data, errors } = await fetchManagement<{
    provider: ProviderUserPasswordSet;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
