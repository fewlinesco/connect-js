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

export type GetConnectApplication = Promise<
  FetchResult<{ provider: ProviderApplication }>
>;

export type GetConnectApplicationVariables = {
  id: string;
};

export async function getConnectApplication(
  managementCredentials: ManagementCredentials,
  variables: GetConnectApplicationVariables,
): GetConnectApplication {
  const operation = {
    query: GET_APPLICATION_QUERY,
    variables,
  };

  return fetchManagement(
    managementCredentials,
    operation,
  ) as GetConnectApplication;
}
