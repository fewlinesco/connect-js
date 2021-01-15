import gql from "graphql-tag";

import { Identity, IdentityCommandInput } from "../@types/identity";
import { ManagementCredentials } from "../@types/management";
import { GraphqlErrors } from "../errors";
import { fetchManagement } from "../fetch-management";

const ADD_IDENTITY_TO_USER = gql`
  mutation addIdentityToUser(
    $userId: String!
    $type: IdentityTypes!
    $value: String!
  ) {
    addIdentityToUser(
      input: { userId: $userId, type: $type, value: $value, validated: true }
    ) {
      id
      primary
      status
      type
      value
    }
  }
`;

export async function addIdentityToUser(
  managementCredentials: ManagementCredentials,
  { userId, identityType, identityValue }: IdentityCommandInput,
): Promise<Identity> {
  const operation = {
    query: ADD_IDENTITY_TO_USER,
    variables: { userId, type: identityType, value: identityValue },
  };

  const { data, errors } = await fetchManagement<{
    AddIdentityToUser: Identity;
  }>(managementCredentials, operation);

  if (errors) {
    throw new GraphqlErrors(errors);
  }

  return data.AddIdentityToUser;
}
