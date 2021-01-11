import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ConnectApplication } from "../@types/connect-application";
import { ManagementCredentials } from "../@types/management";
import { fetchManagement } from "../fetch-management";

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

export async function updateApplication(
  managementCredentials: ManagementCredentials,
  command: ConnectApplication,
): Promise<FetchResult> {
  const operation = {
    query: UPDATE_APPLICATION_MUTATION,
    variables: command,
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    updateApplication: ConnectApplication;
  }>;
}
