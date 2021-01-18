import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { ManagementCredentials } from "../types";
import { ProviderApplication } from "../types";

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

export async function getProviderApplication(
  managementCredentials: ManagementCredentials,
  connectApplicationId: string,
): Promise<ProviderApplication> {
  const operation = {
    query: GET_APPLICATION_QUERY,
    variables: { id: connectApplicationId },
  };

  const { data, errors } = await fetchManagement<{
    provider: { application: ProviderApplication };
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.provider.application;
}
