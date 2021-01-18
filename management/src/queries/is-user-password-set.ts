import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { ManagementCredentials } from "../types";

const IS_USER_PASSWORD_SET_QUERY = gql`
  query isUserPasswordSet($userId: String!) {
    provider {
      user(filters: { userId: $userId }) {
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
): Promise<boolean> {
  const operation = {
    query: IS_USER_PASSWORD_SET_QUERY,
    variables: { userId },
  };

  const { data, errors } = await fetchManagement<{
    provider: {
      user: {
        passwords: {
          available: boolean;
        };
      };
    };
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider.user.passwords.available;
}
