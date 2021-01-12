import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

const GET_PROVIDER_NAME_QUERY = gql`
  query getProviderName {
    provider {
      name
    }
  }
`;

export async function getProviderName(
  managementCredentials: ManagementCredentials,
): Promise<FetchResult<{ provider: { name: string } }>> {
  const operation = {
    query: GET_PROVIDER_NAME_QUERY,
    variables: {},
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    provider: { name: string };
  }>;
}
