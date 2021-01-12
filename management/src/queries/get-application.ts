import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import type { ProviderApplication } from "../@types/connect-application";
import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

const GET_APPLICATION_QUERY = gql`
  query getApplicationQuery($id: String!) {
    provider {
      application(filters: { id: $id }) {
        id
        defaultHomePage
        redirectUris
        name
        description
      }
    }
  }
`;

export async function getApplication(
  managementCredentials: ManagementCredentials,
  id: string,
): Promise<FetchResult<{ provider: ProviderApplication }>> {
  const operation = {
    query: GET_APPLICATION_QUERY,
    variables: { id },
  };

  return fetchManagement(
    managementCredentials,

    operation,
  ) as FetchResult<{
    provider: ProviderApplication;
  }>;
}
