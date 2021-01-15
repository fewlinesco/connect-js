import gql from "graphql-tag";

import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";
import { CreateUserWithIdentitiesInput, ManagementCredentials } from "../types";

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
  { identities, localeCode }: CreateUserWithIdentitiesInput,
): Promise<{ id: string }> {
  const operation = {
    query: CREATE_USER_WITH_IDENTITIES_MUTATION,
    variables: { identities, localeCode },
  };

  const { data, errors } = await fetchManagement<{
    createUserWithIdentities: { id: string };
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.createUserWithIdentities;
}
