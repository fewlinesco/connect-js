import gql from "graphql-tag";

import type { ProviderApplication } from "../@types/connect-application";
import { ManagementCredentials } from "../@types/management";
import { GraphqlErrors } from "../errors";
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

export async function getConnectApplication(
  managementCredentials: ManagementCredentials,
  connectApplicationId: string,
): Promise<ProviderApplication> {
  const operation = {
    query: GET_APPLICATION_QUERY,
    variables: { id: connectApplicationId },
  };

  const { data, errors } = await fetchManagement<{
    provider: ProviderApplication;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider;
}
