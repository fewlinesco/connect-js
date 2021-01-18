import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { ManagementCredentials } from "../types";

const GET_PROVIDER_NAME_QUERY = gql`
  query getProviderName {
    provider {
      name
    }
  }
`;

export async function getProviderName(
  managementCredentials: ManagementCredentials,
): Promise<string> {
  const operation = {
    query: GET_PROVIDER_NAME_QUERY,
    variables: {},
  };

  const { data, errors } = await fetchManagement<{
    provider: { name: string };
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider.name;
}
