import gql from "graphql-tag";

import { IdentityInput } from "../@types/identity";
import { ManagementCredentials } from "../@types/management";
import type { User } from "../@types/provider-user";
import { GraphqlErrors } from "../errors";
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

export type CreateUserWithIdentitiesInput = {
  identities: IdentityInput[];
  localeCode: string;
};

export async function createUserWithIdentities(
  managementCredentials: ManagementCredentials,
  { identities, localeCode }: CreateUserWithIdentitiesInput,
): Promise<User> {
  const operation = {
    query: CREATE_USER_WITH_IDENTITIES_MUTATION,
    variables: { identities, localeCode },
  };

  const { data, errors } = await fetchManagement<{
    createUserWithIdentities: User;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.createUserWithIdentities;
}
