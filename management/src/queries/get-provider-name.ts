import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const GET_PROVIDER_NAME_QUERY = gql`
  query getProviderName {
    provider {
      name
    }
  }
`;

export type ProviderName = { name: string };

export async function getProviderName(
  managementCredentials: ManagementCredentials,
): Promise<ProviderName> {
  const operation = {
    query: GET_PROVIDER_NAME_QUERY,
    variables: {},
  };

  const { data, errors } = await fetchManagement<{ provider: ProviderName }>(
    managementCredentials,
    operation,
  );

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
