import { FetchResult } from "apollo-link";
import gql from "graphql-tag";

import { ManagementCredentials } from "../@types/management";
import type {
  CreateUserWithIdentitiesInput,
  User,
} from "../@types/provider-user";
import { fetchManagement } from "../fetch-management";

const CREATE_USER_WITH_IDENTITIES_MUTATION = gql`
  mutation createUserWithIdentities(
    $identities: [IdentityInput]!
    $localeCode: String!
  ) {
    createUserWithIdentities(
      input: { identities: $identities, localeCode: $localeCode }
    ) {
      id
    }
  }
`;

export async function createUserWithIdentities(
  managementCredentials: ManagementCredentials,
  command: CreateUserWithIdentitiesInput,
): Promise<FetchResult> {
  const operation = {
    query: CREATE_USER_WITH_IDENTITIES_MUTATION,
    variables: command,
  };

  return fetchManagement(managementCredentials, operation) as FetchResult<{
    createUserWithIdentities: User;
  }>;
}
