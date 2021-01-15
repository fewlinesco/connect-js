import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { ConnectApplication } from "../types";
import { ManagementCredentials } from "../types";

const UPDATE_APPLICATION_MUTATION = gql`
  mutation updateApplication(
    $id: String!
    $description: String!
    $name: String!
    $redirectUris: [String]!
    $defaultHomePage: String!
  ) {
    updateApplication(
      input: {
        id: $id
        description: $description
        name: $name
        redirectUris: $redirectUris
        defaultHomePage: $defaultHomePage
      }
    ) {
      id
      description
      redirectUris
      name
      defaultHomePage
    }
  }
`;

export async function updateConnectApplication(
  managementCredentials: ManagementCredentials,
  { id, name, description, defaultHomePage, redirectUris }: ConnectApplication,
): Promise<ConnectApplication> {
  const operation = {
    query: UPDATE_APPLICATION_MUTATION,
    variables: { id, name, description, defaultHomePage, redirectUris },
  };

  const { data, errors } = await fetchManagement<{
    updateApplication: ConnectApplication;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.updateApplication;
}
